export interface ProjectCaseStudy {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  period: string;
  context: string;
  problem: string;
  myContribution: string;
  technicalApproach: {
    title: string;
    details: string[];
  }[];
  measurableResults: {
    metric: string;
    description: string;
  }[];
  toolsAndTech: string[];
  evidence: {
    status: "LAB_VERIFIED" | "PRODUCTION_DEPLOYED" | "TODO_PENDING";
    label: string;
    url?: string;
    note: string;
  };
  sampleTraceSnippet?: {
    filename: string;
    language: string;
    code: string;
    label: string;
  };
}

export const caseStudies: ProjectCaseStudy[] = [
  {
    id: "ngfw-ssl-vpn",
    number: "01",
    title: "Next-Gen Firewall & SSL VPN Verification Engine",
    subtitle: "Resolving daemon socket leaks and building 3-way automated cross-plane verification",
    category: "Firewall Testing & Daemon Bugfix",
    role: "Network Security Engineer (Full-Time)",
    period: "2026 - Present",
    context:
      "At WiJungle, our enterprise appliance delivers Next-Generation Firewalling and SSL VPN connectivity for remote workforces. Validating complex split-tunnel and full-tunnel policies across rapid firmware release cycles required deep-level kernel diagnostics.",
    problem:
      "During client 2FA re-authentication and sudden connection drops, open sockets remained bound in the backend daemon. Over repeated reconnects, this caused socket exhaustion, preventing new client handshakes. Furthermore, manual UI verification could not verify whether split-tunnel routing rules accidentally leaked DNS or intranet packets to the client's physical interface.",
    myContribution:
      "Traced the connection drop lifecycle through Debian kernel system logs and daemon source code. Wrote direct bugfix patches to enforce explicit socket teardown (SHUT_RDWR), flush transient host routes, and ensure reliable tun0 interface destruction. Designed an automated '3-Way Verification Engine' combining Playwright (UI), Paramiko (Kernel SSH), and Scapy (raw wire sniff).",
    technicalApproach: [
      {
        title: "Plane 1: Web GUI & Schema Validation",
        details: [
          "Automated Playwright tests to exercise administrator VPN settings, user pool allocations, and .ovpn client configuration downloads.",
          "Asserted schema correctness of cryptographic cipher lists (AES-256-GCM) and dynamic push routes.",
        ],
      },
      {
        title: "Plane 2: Linux Kernel Control Plane",
        details: [
          "Executed automated SSH commands via Paramiko inspecting /proc/net/dev, ip route, and nftables FORWARD rule counters.",
          "Verified that tun0 interfaces are created with correct /24 subnetting and torn down immediately on session close.",
        ],
      },
      {
        title: "Plane 3: Wire Data Plane & Leak Sniffing",
        details: [
          "Utilized Python Scapy to inject synthetic probe packets on both the client virtual adapter (utun0) and physical adapter (en0).",
          "Audited packet captures to confirm zero plaintext packets escape to the physical gateway when full-tunnel is enabled.",
        ],
      },
    ],
    measurableResults: [
      {
        metric: "0 Leaks Observed",
        description: "Zero unencrypted packets leaked outside encrypted tunnel across 500+ automated test suite runs in lab scope.",
      },
      {
        metric: "100% Teardown",
        description: "Eliminated socket hang bug on client renegotiation; verified clean socket disposal on sudden TCP/UDP connection drops.",
      },
      {
        metric: "Minutes vs Hours",
        description: "Cut regression validation time across multi-firmware releases through automated cross-plane execution.",
      },
    ],
    toolsAndTech: [
      "Python 3",
      "OpenVPN Daemon",
      "Scapy",
      "Playwright",
      "Paramiko SSH",
      "nftables / iptables",
      "Debian GNU/Linux",
      "Wireshark / tshark",
    ],
    evidence: {
      status: "LAB_VERIFIED",
      label: "Internal Appliance Codebase & Test Suite",
      note: "Patches applied directly to internal appliance daemon. Sanitized architecture trace available in lab demo below. TODO: Public sanitized case study write-up pending employer publication review.",
    },
    sampleTraceSnippet: {
      filename: "openvpn_daemon_manager.py",
      language: "python",
      label: "SANITIZED CODE PATCH EXCERPT",
      code: `@@ -142,8 +142,14 @@ def handle_client_renegotiate(session):
-    # UNPATCHED: Session socket remained bound during renegotiation timeout
-    pass
+    # PATCHED: Enforce explicit socket disposal & kernel route cleanup
+    if session.is_reauth_requested():
+        kernel_route_flush_transient(session.vip)
+        session.socket.shutdown(socket.SHUT_RDWR)
+        session.socket.close()
+        log.info("[VPN] Socket cleaned up cleanly for client VIP: %s", session.vip)`,
    },
  },
  {
    id: "multi-vendor-network",
    number: "02",
    title: "Enterprise Multi-Vendor Network Deployment & Redundant Topology",
    subtitle: "Integrating Cisco Catalyst, MikroTik, and UTM firewalls with sub-second keepalived VRRP failover",
    category: "On-Site Infrastructure & High Availability",
    role: "Network Security Engineer (Full-Time & Intern)",
    period: "2026",
    context:
      "Enterprise customer offices require high-reliability networking, where failure of a single firewall or gateway link cannot disrupt critical corporate operations. Deployments frequently interface with existing third-party network hardware.",
    problem:
      "Customer sites deployed heterogeneous hardware: Cisco Catalyst core switches, MikroTik branch routers, and WiJungle UTM firewalls. Key operational risks included VLAN tag mismatches on 802.1Q trunks, MTU fragmentation drops on point-to-point links, and potential split-brain dual-master states in firewall high-availability clusters.",
    myContribution:
      "Carried out on-site deployment and staging. Configured Cisco 802.1Q trunk ports with matching native VLANs, tuned MTU to 1500 bytes across all transit links, and implemented active/passive VRRP clusters with keepalived. Replaced multicast VRRP heartbeats with unicast peer targeting to prevent multicast drops on vendor switches.",
    technicalApproach: [
      {
        title: "Multi-Vendor Interoperability",
        details: [
          "Configured Cisco Catalyst switches for 802.1Q trunking (VLANs 10, 20, 30) ensuring dot1q encapsulation matches the UTM internal VLAN interfaces.",
          "Synchronized MTU to 1500 bytes across point-to-point links, eliminating DF-bit (Don't Fragment) drop issues during customer cutovers.",
        ],
      },
      {
        title: "Keepalived VRRP High-Availability Cluster",
        details: [
          "Configured dual-firewall active/passive cluster with /29 Virtual IP (10.0.10.10) shared between Master (Pri 150) and Backup (Pri 100).",
          "Implemented dedicated heartbeat link using unicast UDP heartbeats (eth1), eliminating split-brain false promotions.",
        ],
      },
      {
        title: "Dynamic Routing & Route Redistribution",
        details: [
          "Configured OSPF Area 0 backbone routing between Cisco core switches and UTM cluster.",
          "Enforced passive-interface rules on client-facing VLANs and redistributed default routes cleanly without routing loops.",
        ],
      },
    ],
    measurableResults: [
      {
        metric: "< 1s Failover",
        description: "Verified sub-second virtual router failover upon manual link severance in lab staging with zero packet re-routing loops.",
      },
      {
        metric: "0 Split-Brain Incidents",
        description: "Unicast heartbeat architecture eliminated dual-master false promotions during switch reboots.",
      },
      {
        metric: "Production Live",
        description: "Customer office networks transitioned successfully with verified inter-VLAN routing, stable NAT, and zero MTU fragmentation drops.",
      },
    ],
    toolsAndTech: [
      "WiJungle UTM",
      "Cisco Catalyst (2960 / 3850)",
      "MikroTik RouterOS",
      "keepalived VRRP",
      "OSPF Area 0",
      "802.1Q VLANs & Trunks",
      "Wireshark",
    ],
    evidence: {
      status: "PRODUCTION_DEPLOYED",
      label: "On-Site Customer Deployments & Lab Benchmark",
      note: "Deployed in client production offices and staged in WiJungle lab. Sanitized topology and keepalived configs provided in interactive lab below. TODO: Public network design guide pending publication.",
    },
    sampleTraceSnippet: {
      filename: "keepalived.conf",
      language: "nginx",
      label: "SANITIZED KEEPALIVED VRRP CONFIG",
      code: `vrrp_instance VI_1 {
    state MASTER
    interface eth1
    virtual_router_id 51
    priority 150
    advert_int 1
    unicast_src_ip 10.0.10.10
    unicast_peer {
        10.0.10.11
    }
    virtual_ipaddress {
        10.0.10.10/24 dev eth1 label eth1:vip
    }
}`,
    },
  },
];
