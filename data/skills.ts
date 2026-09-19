export interface SkillGroup {
  id: string;
  category: string;
  title: string;
  description: string;
  skills: {
    name: string;
    proficiency: "Advanced" | "Proficient" | "Working Knowledge";
    note?: string;
  }[];
}

export const skillsData: SkillGroup[] = [
  {
    id: "network-security",
    category: "Security",
    title: "Firewalls & Network Security",
    description:
      "Hands-on expertise deploying, configuring, and testing appliance firewalls and encrypted virtual private networks.",
    skills: [
      { name: "WiJungle UTM & NGFW", proficiency: "Advanced", note: "Firmware testing & on-site configuration" },
      { name: "SSL VPN (OpenVPN)", proficiency: "Advanced", note: "Split/full tunnel, daemon code bug fixes" },
      { name: "IPSec VPN Configuration", proficiency: "Proficient", note: "Site-to-site tunnels, Phase 1/2, proposals" },
      { name: "keepalived VRRP HA", proficiency: "Advanced", note: "Active/passive failover, unicast heartbeats" },
      { name: "nftables & iptables", proficiency: "Advanced", note: "Filter, nat, and mangle chain rule authoring" },
      { name: "Multi-Vendor Integration", proficiency: "Advanced", note: "Cisco Catalyst, MikroTik RouterOS & UTM" },
      { name: "NAT / PAT Policies", proficiency: "Advanced", note: "SNAT, DNAT, postrouting masquerade" },
      { name: "Access Control Lists (ACLs)", proficiency: "Advanced", note: "Stateful L2-L4 rule enforcement" },
      { name: "Burp Suite", proficiency: "Working Knowledge", note: "Web security testing and assessment toolkit" },
    ],
  },
  {
    id: "routing-switching",
    category: "Networking",
    title: "Routing & Switching Protocols",
    description:
      "Deep understanding of the TCP/IP stack, dynamic routing algorithms, and enterprise Layer 2/3 transport.",
    skills: [
      { name: "TCP/IP & OSI Architecture", proficiency: "Advanced", note: "Socket lifecycles, 3-way handshakes" },
      { name: "OSPF (Open Shortest Path First)", proficiency: "Proficient", note: "Area 0 backbone, LSAs, route redistribution" },
      { name: "Enterprise Switching", proficiency: "Advanced", note: "Cisco Catalyst, trunks, STP, port roles" },
      { name: "Routing Configuration", proficiency: "Advanced", note: "Static routes, OSPF, default route control" },
      { name: "VLANs & 802.1Q Trunks", proficiency: "Advanced", note: "dot1q tagging, native VLAN alignment" },
      { name: "IPv4 Subnetting & CIDR", proficiency: "Advanced", note: "/29 VIP clusters, /30 transit links" },
      { name: "MTU Frame Synchronization", proficiency: "Advanced", note: "TCP MSS clamping, PMTUD, DF-bit handling" },
      { name: "Core Network Services", proficiency: "Advanced", note: "DNS, DHCP, ARP, ICMP, NTP/chrony" },
      { name: "Routing Loop Prevention", proficiency: "Proficient", note: "Split horizon, poison reverse, metrics" },
      { name: "Inter-VLAN Routing", proficiency: "Advanced", note: "Router-on-a-stick, switch virtual interfaces" },
    ],
  },
  {
    id: "testing-automation",
    category: "QA & Verification",
    title: "Testing, QA & Packet Forensics",
    description:
      "Automating end-to-end multi-plane test harnesses and conducting low-level packet capture forensics.",
    skills: [
      { name: "Wireshark & tshark", proficiency: "Advanced", note: "Deep frame inspection, filter expressions" },
      { name: "Python Scapy", proficiency: "Advanced", note: "Synthetic packet injection & leak auditing" },
      { name: "Playwright Automation", proficiency: "Proficient", note: "Web GUI administrative test pipelines" },
      { name: "Paramiko SSH Automation", proficiency: "Advanced", note: "Linux kernel table programmatic inspection" },
      { name: "3-Way Cross-Plane QA", proficiency: "Advanced", note: "Web UI -> Kernel -> Wire multi-tier testing" },
      { name: "REST API Validation", proficiency: "Proficient", note: "Status codes, JSON schema, 2FA workflows" },
      { name: "Regression Test Suites", proficiency: "Advanced", note: "Firmware release qualification" },
      { name: "Root-Cause Analysis", proficiency: "Advanced", note: "Packet drop & connection timeout isolation" },
    ],
  },
  {
    id: "systems-tooling",
    category: "Infrastructure",
    title: "Linux Systems & Scripting",
    description:
      "Operating system internals, networking subsystem configuration, and maintainable automation scripting.",
    skills: [
      { name: "Debian GNU/Linux", proficiency: "Advanced", note: "Kernel 6.x administration & diagnostics" },
      { name: "systemd Daemons", proficiency: "Advanced", note: "Unit file authoring, service health monitoring" },
      { name: "Virtual Interfaces", proficiency: "Advanced", note: "tun/tap, veth pairs, interface bridging" },
      { name: "Bash Shell Scripting", proficiency: "Advanced", note: "System monitoring, log parsing, cutovers" },
      { name: "Python 3 Scripting", proficiency: "Proficient", note: "Socket programming, test harnesses" },
      { name: "Git Version Control", proficiency: "Proficient", note: "Code patching, diffs, release branches" },
      { name: "Linux iproute2", proficiency: "Advanced", note: "ip route, ip rule, ip link, ip addr" },
      { name: "Proc & Sys Diagnostics", proficiency: "Advanced", note: "/proc/net/dev, /proc/sys/net/ipv4" },
    ],
  },
];
