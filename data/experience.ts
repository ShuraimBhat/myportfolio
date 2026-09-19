export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  type: "Full-Time" | "Internship";
  location: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export const experiencesData: ExperienceItem[] = [
  {
    id: "wijungle-fulltime",
    company: "WiJungle",
    role: "Network Security Engineer",
    period: "Sep 2026 - Present",
    type: "Full-Time",
    location: "On-Site Deployments & Appliance Lab",
    summary:
      "Full-time engineering role responsible for on-site enterprise customer network deployments, multi-vendor device interoperability, and appliance firmware validation.",
    responsibilities: [
      "Deploy and configure enterprise Next-Generation Firewalls (NGFW) on-site at client offices alongside third-party Cisco switches and MikroTik routers.",
      "Troubleshoot real-world Layer 2 and Layer 3 customer network issues on-site, including 802.1Q VLAN trunking, MTU fragmentation mismatches, NAT policies, and default gateway routing.",
      "Execute Next-Generation Firewall testing suites: security rule policy enforcement, packet filtering validation, and regression testing across firmware updates.",
      "Patched the SSL VPN daemon codebase directly to eliminate socket leaks during 2FA re-authentication and enforce clean tun interface destruction on sudden disconnects.",
      "Utilize Wireshark, tshark, and Linux system utilities (iptables, nftables, ip route, systemd) to inspect packet traces and isolate root causes of connection drops.",
      "Validate REST APIs and administrative web management workflows, including 2FA login flows, HTTP/HTTPS response codes, and JSON schema payloads.",
    ],
    technologies: [
      "WiJungle UTM / NGFW",
      "Cisco Catalyst",
      "MikroTik RouterOS",
      "OpenVPN Daemon",
      "keepalived VRRP",
      "nftables / iptables",
      "Wireshark / Scapy",
      "Debian Linux",
      "Python",
    ],
  },
  {
    id: "wijungle-intern",
    company: "WiJungle",
    role: "Network Security Engineer Intern",
    period: "Jul 2026 - Aug 2026",
    type: "Internship",
    location: "Appliance Testing Lab",
    summary:
      "Two-month intensive internship configuring UTM firewall hardware, validating site-to-site VPN tunnels, and testing high-availability failover pairs.",
    responsibilities: [
      "Staged and configured WiJungle UTM firewall appliances, establishing IPSec site-to-site and SSL VPN remote tunnels with dynamic OSPF routing.",
      "Assisted senior engineers during on-site multi-device network rollouts, verifying trunk connectivity between Cisco switches and firewall interfaces.",
      "Configured active/passive VRRP failover pairs using keepalived; resolved split-brain conditions by auditing system logs and switching from multicast to unicast heartbeats.",
    ],
    technologies: [
      "UTM Appliances",
      "IPSec & SSL VPN",
      "keepalived VRRP",
      "OSPF Area 0",
      "802.1Q VLANs",
      "Linux Networking",
    ],
  },
  {
    id: "suprmentr-intern",
    company: "SuprMentr Technologies",
    role: "Cybersecurity & Ethical Hacking Intern",
    period: "Jan 2026 - Apr 2026",
    type: "Internship",
    location: "Remote",
    summary:
      "Three-month internship focused on practical network security assessment methodologies, traffic sniffing, and vulnerability identification.",
    responsibilities: [
      "Applied structured security assessment and ethical hacking fundamentals to examine enterprise network weaknesses and misconfigurations.",
      "Authored a Python network monitoring script utilizing Scapy to capture live packets across interfaces and flag anomalous traffic patterns.",
    ],
    technologies: [
      "Python 3",
      "Scapy",
      "Network Forensics",
      "Packet Sniffing",
      "Security Assessments",
    ],
  },
];
