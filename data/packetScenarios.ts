export interface FlowStage {
  stageId: "web-gui" | "control-plane" | "kernel-routing" | "firewall-rules" | "wire-packet";
  title: string;
  subtitle: string;
  inspected: string;
  actionTaken: string;
  sanitizedLog: string;
  status: "NORMAL" | "ANOMALY_DETECTED" | "PATCH_APPLIED" | "VERIFIED_PASS";
}

export interface PacketScenario {
  id: string;
  title: string;
  shortName: string;
  description: string;
  trafficType: string;
  scenarioType: "bugfix" | "routing" | "high-availability" | "layer2-3";
  stages: FlowStage[];
  summaryResults: {
    inspectedSummary: string;
    changeSummary: string;
    verificationSummary: string;
  };
  topologyNodes: {
    source: string;
    ingress: string;
    processing: string;
    egress: string;
    destination: string;
  };
}

export const packetScenarios: PacketScenario[] = [
  {
    id: "ssl-vpn-reconnect",
    title: "Scenario 01: SSL VPN Reconnect Socket Leak & Teardown",
    shortName: "SSL VPN Reconnect",
    description:
      "Investigating and resolving socket hang on 2FA client re-authentication. Enforcing proper socket teardown and tun0 interface lifecycle.",
    trafficType: "UDP / OpenVPN TLS v1.3 (tun0: 10.8.0.6)",
    scenarioType: "bugfix",
    topologyNodes: {
      source: "Remote Client (192.168.1.100)",
      ingress: "WAN Gateway (203.0.113.1:1194)",
      processing: "openvpn_daemon (PID 4092)",
      egress: "tun0 Interface (10.8.0.1)",
      destination: "Internal Intranet (10.0.10.25)",
    },
    stages: [
      {
        stageId: "web-gui",
        title: "1. Web GUI / Management",
        subtitle: "Client Authentication & Profile Query",
        inspected: "Administrator console logs show repeated 2FA re-authentication attempts resulting in client timeout.",
        actionTaken: "Captured client .ovpn profile schema and observed handshake initiation triggers without timeout backoff.",
        sanitizedLog: `[GUI-AUTH] User 'shuraim.engineer' requested 2FA session refresh
[GUI-AUTH] Profile: client_vpn_config.ovpn (Auth: TOTP + TLS-Crypt)
[GUI-WARN] Client failed to acknowledge session transition within 30s`,
        status: "ANOMALY_DETECTED",
      },
      {
        stageId: "control-plane",
        title: "2. Control Plane (Daemon)",
        subtitle: "Daemon Socket Descriptor Audit",
        inspected: "Queried daemon PID file descriptor table via SSH (lsof -p 4092); found orphaned socket descriptors bound to previous session IDs.",
        actionTaken: "Patched openvpn_daemon_manager.py: enforced explicit session.socket.shutdown(SHUT_RDWR) and closed orphaned file descriptors.",
        sanitizedLog: `[DAEMON] PID 4092: 18 open UDP sockets on port 1194
[DAEMON] Socket fd=24: CLOSE_WAIT (Orphaned session pointer)
[PATCH] Applying explicit shutdown(SHUT_RDWR) on re-auth trigger
[DAEMON] File descriptor 24 successfully released. Zero residual handles.`,
        status: "PATCH_APPLIED",
      },
      {
        stageId: "kernel-routing",
        title: "3. Kernel Routing Table",
        subtitle: "Linux Route Table & Transient Host Routes",
        inspected: "Inspected 'ip route show table main': stale host route 10.8.0.6 remained pointing to zombie tun0 instance.",
        actionTaken: "Integrated kernel route cleanup hook into session teardown handler to flush transient client host routes on disconnect.",
        sanitizedLog: `[KERNEL] Stale route detected: 10.8.0.6 dev tun0 proto kernel scope link
[KERNEL] Hook triggered: ip route del 10.8.0.6/32 dev tun0
[KERNEL] Active table clean. Default gateway intact via en0.`,
        status: "VERIFIED_PASS",
      },
      {
        stageId: "firewall-rules",
        title: "4. Firewall Rules (nftables)",
        subtitle: "Stateful Connection Tracking Audit",
        inspected: "Checked nftables FORWARD chains and conntrack table for abandoned connection tracking states.",
        actionTaken: "Verified conntrack entries expire cleanly once socket is destroyed, preventing connection tracking bloat.",
        sanitizedLog: `[NFTABLES] table inet filter {
  chain FORWARD {
    iifname "tun0" oifname "eth0" ctstate ESTABLISHED,RELATED accept
    iifname "tun0" drop # Policy enforcement verified
  }
}`,
        status: "VERIFIED_PASS",
      },
      {
        stageId: "wire-packet",
        title: "5. Wire Packet Capture",
        subtitle: "Scapy Synthetic Injection & Wireshark",
        inspected: "Executed automated Scapy probe script injecting test packets during active reconnect simulation.",
        actionTaken: "Confirmed that 100% of packets after reconnect traverse the newly instantiated tun0 socket with AES-256-GCM encryption.",
        sanitizedLog: `[SCAPY-SNIFF] Interface: tun0 | Total Packets: 250 | Dropped: 0
[SCAPY-SNIFF] Interface: eth0 (WAN) | Unencrypted Intranet Leaks: 0
[RESULT] Zero packet leakage. Reconnect cycle verified clean.`,
        status: "VERIFIED_PASS",
      },
    ],
    summaryResults: {
      inspectedSummary: "Orphaned socket descriptors in OpenVPN daemon preventing clean client 2FA reconnect.",
      changeSummary: "Patched openvpn_daemon_manager.py with explicit shutdown(SHUT_RDWR) and route flushing.",
      verificationSummary: "Validated across 500+ automated test reconnects; zero socket leaks and zero dropped routes.",
    },
  },
  {
    id: "split-tunnel-validation",
    title: "Scenario 02: Split-Tunnel Route Verification & Zero-Leak Audit",
    shortName: "Split-Tunnel Route Audit",
    description:
      "Validating that corporate subnet traffic routes through encrypted tun0 while general public internet traffic bypasses the VPN via the local gateway.",
    trafficType: "Dual-Route: Corporate 10.0.10.0/24 vs Public 0.0.0.0/0",
    scenarioType: "routing",
    topologyNodes: {
      source: "Remote Laptop (192.168.1.100)",
      ingress: "Routing Engine (push 'route 10.0.10.0')",
      processing: "Kernel FIB Lookup",
      egress: "tun0 (Corporate) / en0 (Public)",
      destination: "Enterprise Core (10.0.10.10) / Internet",
    },
    stages: [
      {
        stageId: "web-gui",
        title: "1. Web GUI / Management",
        subtitle: "Split-Tunnel Route List Configuration",
        inspected: "Verified administrator portal push-route configuration for subnet 10.0.10.0/24 and 10.0.20.0/24.",
        actionTaken: "Asserted that redirect-gateway flag is FALSE in generated client configuration.",
        sanitizedLog: `[GUI-CONFIG] Tunnel Mode: SPLIT_TUNNEL
[GUI-CONFIG] Push Routes: [ 10.0.10.0/24, 10.0.20.0/24 ]
[GUI-CONFIG] Default Gateway Redirect: DISABLED`,
        status: "NORMAL",
      },
      {
        stageId: "control-plane",
        title: "2. Control Plane (Daemon)",
        subtitle: "OpenVPN Push Directive Transmission",
        inspected: "Checked client connection handshake negotiation in OpenVPN daemon server logs.",
        actionTaken: "Confirmed server sends PUSH_REPLY containing isolated subnet CIDR blocks only.",
        sanitizedLog: `[DAEMON] PUSH: Received control message: 'PUSH_REQUEST'
[DAEMON] SENT: 'PUSH_REPLY,route 10.0.10.0 255.255.255.0,route 10.0.20.0 255.255.255.0'
[DAEMON] Client IP 10.8.0.6 assigned from pool 10.8.0.0/24`,
        status: "NORMAL",
      },
      {
        stageId: "kernel-routing",
        title: "3. Kernel Routing Table",
        subtitle: "Client Routing Table FIB Verification",
        inspected: "Audited client kernel routing table: confirmed default route 0.0.0.0/0 remains mapped to physical router 192.168.1.1.",
        actionTaken: "Verified host route 10.0.10.0/24 has metric 50 via utun0 interface.",
        sanitizedLog: `[ROUTE-AUDIT] Kernel IP routing table (Client Endpoint):
Destination     Gateway         Genmask         Flags Metric Iface
0.0.0.0         192.168.1.1     0.0.0.0         UG    100    en0 (Local ISP)
10.0.10.0       10.8.0.5        255.255.255.0   UG    50     utun0 (VPN)
10.8.0.0        0.0.0.0         255.255.255.0   U     0      utun0 (VPN)`,
        status: "VERIFIED_PASS",
      },
      {
        stageId: "firewall-rules",
        title: "4. Firewall Rules (nftables)",
        subtitle: "Gateway Ingress & NAT Masquerade",
        inspected: "Inspected firewall NAT table: validated POSTROUTING masquerade on eth0 for VPN client pool (10.8.0.0/24).",
        actionTaken: "Confirmed that non-corporate packets reaching firewall are dropped by default filter policy.",
        sanitizedLog: `[NFTABLES] Chain POSTROUTING (table nat)
  ip saddr 10.8.0.0/24 oif "eth0" masquerade [Packets: 45K, Bytes: 2.8M]
[NFTABLES] Chain FORWARD (table filter)
  ip saddr 10.8.0.0/24 ip daddr 10.0.10.0/24 ctstate NEW,ESTABLISHED accept`,
        status: "VERIFIED_PASS",
      },
      {
        stageId: "wire-packet",
        title: "5. Wire Packet Capture",
        subtitle: "Simultaneous Multi-Interface Sniff",
        inspected: "Ran Scapy dual-sniffer monitoring physical en0 and virtual utun0 simultaneously while querying internal vs external hosts.",
        actionTaken: "Verified internal ping to 10.0.10.10 only appears as encrypted UDP payload on en0. External ping to 1.1.1.1 remains local ICMP.",
        sanitizedLog: `[WIRE-SNIFF] Target 10.0.10.10 -> utun0 ICMP Request -> en0 UDP 1194 (Encrypted)
[WIRE-SNIFF] Target 1.1.1.1     -> en0 ICMP Request (Native ISP - Zero VPN overhead)
[AUDIT-RESULT] Clean split-tunnel separation. 0 packet leaks detected.`,
        status: "VERIFIED_PASS",
      },
    ],
    summaryResults: {
      inspectedSummary: "Routing behavior under split-tunnel configuration to detect accidental routing leakage.",
      changeSummary: "Validated client push route scope and enforced default gateway isolation in client routing table.",
      verificationSummary: "Dual-interface Scapy wire sniff confirmed complete separation of corporate and public traffic.",
    },
  },
  {
    id: "vrrp-failover",
    title: "Scenario 03: Keepalived VRRP Sub-Second High Availability Failover",
    shortName: "VRRP Failover Benchmark",
    description:
      "Benchmarking active/passive firewall cluster redundancy. Simulating master node link severance and verifying unicast heartbeat promotion.",
    trafficType: "VRRP Protocol 112 / Unicast Heartbeat (eth1: 10.0.10.10)",
    scenarioType: "high-availability",
    topologyNodes: {
      source: "Core Switch / Clients",
      ingress: "Virtual IP (10.0.10.10)",
      processing: "Keepalived Daemon (Master vs Backup)",
      egress: "Dedicated Heartbeat Link (eth1)",
      destination: "Protected Network Subnet",
    },
    stages: [
      {
        stageId: "web-gui",
        title: "1. Web GUI / Management",
        subtitle: "HA Cluster State Dashboard",
        inspected: "Cluster dashboard monitors Node 01 (Master, Priority 150) and Node 02 (Backup, Priority 100).",
        actionTaken: "Validated GUI reflects real-time keepalived state transitions within 1 second of cluster events.",
        sanitizedLog: `[GUI-HA] Cluster Status: HEALTHY
[GUI-HA] Node 01: MASTER (Priority 150) | Interface eth1 | VIP: 10.0.10.10
[GUI-HA] Node 02: BACKUP (Priority 100) | Interface eth1 | Peer: 10.0.10.11`,
        status: "NORMAL",
      },
      {
        stageId: "control-plane",
        title: "2. Control Plane (Daemon)",
        subtitle: "Keepalived State Machine & Heartbeat Listener",
        inspected: "Node 02 listens for unicast advertisement packets every 1.0 second from Node 01 on eth1.",
        actionTaken: "Simulated master network interface pull; Node 02 detected missed heartbeats and initiated state transition.",
        sanitizedLog: `[KEEPALIVED] Node 01 eth1 link DOWN (Simulated fault)
[KEEPALIVED-NODE02] Missed 3 consecutive advertisement frames from 10.0.10.10
[KEEPALIVED-NODE02] Transitioning state: BACKUP -> MASTER (Pri: 100)
[KEEPALIVED-NODE02] Entering MASTER state. Claiming VIP 10.0.10.10.`,
        status: "PATCH_APPLIED",
      },
      {
        stageId: "kernel-routing",
        title: "3. Kernel Routing Table",
        subtitle: "Virtual IP (VIP) Interface Binding & Gratuitous ARP",
        inspected: "Node 02 assigns virtual IP 10.0.10.10/24 to interface eth1:vip and broadcasts Gratuitous ARP (GARP).",
        actionTaken: "Cisco core switch receives GARP and updates CAM/ARP table mapping VIP to Node 02's MAC address in 180ms.",
        sanitizedLog: `[KERNEL] Node 02: ip addr add 10.0.10.10/24 dev eth1 label eth1:vip
[KERNEL] Sending gratuitous ARP on eth1 for 10.0.10.10
[SWITCH-LOG] Cisco Catalyst Gi1/0/2: ARP updated: 10.0.10.10 -> 00:00:5e:00:01:33`,
        status: "VERIFIED_PASS",
      },
      {
        stageId: "firewall-rules",
        title: "4. Firewall Rules (nftables)",
        subtitle: "Stateful Session Sync / Re-establishment",
        inspected: "Verified firewall security rules on promoted Master are active immediately upon VIP binding.",
        actionTaken: "Inbound and outbound corporate traffic accepted without dropping security policy context.",
        sanitizedLog: `[NFTABLES] Promoted node rules active.
[NFTABLES] Filter forward table: policy DROP (12 packets dropped)
[NFTABLES] Forward chain: 142K packets accepted on eth1:vip`,
        status: "VERIFIED_PASS",
      },
      {
        stageId: "wire-packet",
        title: "5. Wire Packet Capture",
        subtitle: "Failover Interruption Benchmark",
        inspected: "Measured active ping stream packet loss during failover event.",
        actionTaken: "Total packet loss measured: 1 frame (840ms total transition time). Sub-second high-availability failover confirmed.",
        sanitizedLog: `[BENCHMARK] Ping 10.0.10.10 - 100 packets transmitted, 99 received, 1% packet loss
[BENCHMARK] Failover execution window: 840ms (< 1.0s target)
[RESULT] Sub-second HA failover verified with zero split-brain promotion.`,
        status: "VERIFIED_PASS",
      },
    ],
    summaryResults: {
      inspectedSummary: "Active/passive firewall cluster heartbeat failure detection and VIP handover.",
      changeSummary: "Implemented unicast VRRP heartbeats and Gratuitous ARP broadcasting on keepalived promotion.",
      verificationSummary: "Sub-second failover (840ms) verified with 1 dropped packet and 0 split-brain occurrences.",
    },
  },
  {
    id: "mtu-mismatch",
    title: "Scenario 04: Layer 2/3 MTU Mismatch & 802.1Q Frame Fragmentation",
    shortName: "MTU Mismatch & Framing",
    description:
      "Diagnosing intermittent packet loss on customer on-site cutovers. Resolving DF-bit packet drops between Cisco switches and UTM interfaces.",
    trafficType: "TCP MSS / 802.1Q Tagged Frames (VLAN 10, MTU: 1500)",
    scenarioType: "layer2-3",
    topologyNodes: {
      source: "Workstation (10.0.10.50)",
      ingress: "Cisco Catalyst 2960 (Trunk Gi1/0/1)",
      processing: "UTM Appliance Gateway",
      egress: "MikroTik Edge Router",
      destination: "Enterprise WAN",
    },
    stages: [
      {
        stageId: "web-gui",
        title: "1. Web GUI / Management",
        subtitle: "Interface Status & Error Counters",
        inspected: "Customer reported HTTPS downloads hanging indefinitely while small ping packets succeeded.",
        actionTaken: "Inspected interface statistics on UTM dashboard; found rising interface 'Oversize / Frame Error' counters.",
        sanitizedLog: `[GUI-STATS] Interface eth1 (Internal Trunk): 4,812 RX Frame Errors
[GUI-STATS] Interface eth0 (WAN): Normal
[REPORT] Large TLS client handshakes timing out with TCP zero-window resets`,
        status: "ANOMALY_DETECTED",
      },
      {
        stageId: "control-plane",
        title: "2. Control Plane (Daemon)",
        subtitle: "Cisco IOS & Linux Interface Config Audit",
        inspected: "Checked Cisco switch port config: Gi1/0/1 was configured for standard MTU 1500, but 802.1Q dot1q header added 4 bytes.",
        actionTaken: "Adjusted Cisco system MTU and configured TCP MSS clamping on UTM appliance to prevent packet bloat.",
        sanitizedLog: `[CISCO-IOS] show interface gigabitethernet 1/0/1
  MTU 1500 bytes, BW 1000000 Kbit/sec, DLY 10 usec
[LINUX-UTM] ip link show eth1.10
  eth1.10@eth1: <BROADCAST,MULTICAST,UP> mtu 1496 (Mismatch with 1500 frame)`,
        status: "PATCH_APPLIED",
      },
      {
        stageId: "kernel-routing",
        title: "3. Kernel Routing Table",
        subtitle: "TCP MSS Clamping Enforcement",
        inspected: "Kernel route path MTU discovery (PMTUD) packets were dropped by intermediate firewalls blocking ICMP Type 3 Code 4.",
        actionTaken: "Enforced TCP MSS clamping in kernel: iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu.",
        sanitizedLog: `[KERNEL-MANGLE] Clamping TCP MSS to PMTU (1460 bytes)
[KERNEL-ROUTE] Path MTU Black Hole avoided for jumbo payload frames`,
        status: "PATCH_APPLIED",
      },
      {
        stageId: "firewall-rules",
        title: "4. Firewall Rules (nftables)",
        subtitle: "ICMP Type 3 Code 4 (Frag Needed) Pass-Through",
        inspected: "Verified firewall rules permit ICMP Destination Unreachable / Fragmentation Needed packets.",
        actionTaken: "Added explicit rule permitting ICMP type 3 to enable RFC 1191 Path MTU discovery across subnets.",
        sanitizedLog: `[NFTABLES] chain INPUT {
  icmp type destination-unreachable accept # RFC 1191 PMTUD allowed
}`,
        status: "VERIFIED_PASS",
      },
      {
        stageId: "wire-packet",
        title: "5. Wire Packet Capture",
        subtitle: "Wireshark Frame Length & TCP Stream Validation",
        inspected: "Executed large 100MB test download through Cisco switch and UTM gateway while capturing wire traffic with tshark.",
        actionTaken: "Confirmed all TCP data segments capped cleanly at 1460 bytes with DF flag respected. Zero dropped frames.",
        sanitizedLog: `[TSHARK-CAPTURE] Frame 412: 1514 bytes on wire (1500 IP payload + 14B Ethernet)
[TSHARK-CAPTURE] TCP MSS negotiated: 1460 bytes. Zero retransmissions.
[RESULT] MTU alignment complete. Customer HTTPS traffic stable with 0 frame drops.`,
        status: "VERIFIED_PASS",
      },
    ],
    summaryResults: {
      inspectedSummary: "HTTPS sessions hanging due to 802.1Q 4-byte overhead and blocked ICMP fragmentation warnings.",
      changeSummary: "Synchronized interface MTUs to 1500, unblocked ICMP Type 3, and enforced TCP MSS clamping.",
      verificationSummary: "Full 100MB payload transfers verified cleanly without TCP retransmissions or frame drops.",
    },
  },
];
