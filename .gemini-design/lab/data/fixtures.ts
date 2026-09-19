export interface NetworkAlert {
  id: string;
  severity: "critical" | "warning" | "info" | "success";
  source: string;
  message: string;
  timestamp: string;
  actionTaken: string;
}

export interface NodeStatus {
  id: string;
  name: string;
  ip: string;
  role: "MASTER" | "BACKUP" | "ROUTER" | "CLIENT";
  state: "healthy" | "degraded" | "standby";
  latencyMs: number;
  cpuPercent: number;
  uptime: string;
  vrid?: number;
  priority?: number;
}

export interface FirewallRuleFixture {
  ruleId: string;
  sourceZone: string;
  destZone: string;
  action: "ALLOW" | "DROP" | "INSPECT_TLS";
  hitCount: string;
  lastMatched: string;
  policyName: string;
}

export const LAB_MOCK_NODES: NodeStatus[] = [
  {
    id: "vrrp-01",
    name: "Edge-FW-Primary (keepalived)",
    ip: "10.240.0.1 (VIP 10.240.0.254)",
    role: "MASTER",
    state: "healthy",
    latencyMs: 0.28,
    cpuPercent: 14.2,
    uptime: "99.998%",
    vrid: 51,
    priority: 150
  },
  {
    id: "vrrp-02",
    name: "Edge-FW-Secondary (keepalived)",
    ip: "10.240.0.2 (Standby)",
    role: "BACKUP",
    state: "standby",
    latencyMs: 0.31,
    cpuPercent: 4.8,
    uptime: "99.998%",
    vrid: 51,
    priority: 100
  },
  {
    id: "vpn-gw",
    name: "OpenVPN / WireGuard Tunnel",
    ip: "172.16.100.1/24 (tun0)",
    role: "ROUTER",
    state: "healthy",
    latencyMs: 8.4,
    cpuPercent: 22.1,
    uptime: "99.95%"
  },
  {
    id: "core-sw",
    name: "Cisco Catalyst Core (OSPF Area 0)",
    ip: "192.168.1.1/24",
    role: "ROUTER",
    state: "healthy",
    latencyMs: 0.12,
    cpuPercent: 18.9,
    uptime: "100.0%"
  }
];

export const LAB_MOCK_ALERTS: NetworkAlert[] = [
  {
    id: "alt-101",
    severity: "success",
    source: "keepalived[vrrp-51]",
    message: "Gratuitous ARP broadcast completed on enp3s0; VIP 10.240.0.254 verified active",
    timestamp: "10:42:15 UTC",
    actionTaken: "BGP / OSPF next-hop preserved across cluster"
  },
  {
    id: "alt-102",
    severity: "info",
    source: "snort3 / suricata",
    message: "TLS 1.3 session re-negotiated with PFS (ECDHE-ECDSA-AES256-GCM-SHA384)",
    timestamp: "10:41:58 UTC",
    actionTaken: "0 dropped packets; Zero-Trust policy matched"
  },
  {
    id: "alt-103",
    severity: "warning",
    source: "scapy-fuzz-detector",
    message: "Malformed TCP SYN packet with reserved flags from 198.51.100.42 dropped at pre-routing",
    timestamp: "10:39:12 UTC",
    actionTaken: "nftables drop rule executed; logged to syslog"
  }
];

export const LAB_MOCK_RULES: FirewallRuleFixture[] = [
  {
    ruleId: "FW-RULE-01",
    policyName: "DMZ to Internal OSPF Transit",
    sourceZone: "DMZ (vlan 20)",
    destZone: "Core (vlan 10)",
    action: "ALLOW",
    hitCount: "1,420,859",
    lastMatched: "2s ago"
  },
  {
    ruleId: "FW-RULE-02",
    policyName: "Untrusted Inbound SSL VPN",
    sourceZone: "WAN (0.0.0.0/0)",
    destZone: "VPN-GW (tun0)",
    action: "INSPECT_TLS",
    hitCount: "482,109",
    lastMatched: "now"
  },
  {
    ruleId: "FW-RULE-03",
    policyName: "Default Drop Bogon & RFC1918 WAN",
    sourceZone: "WAN (eth0)",
    destZone: "Any",
    action: "DROP",
    hitCount: "89,312",
    lastMatched: "14s ago"
  }
];
