export interface ProofPoint {
  metric: string;
  label: string;
  detail: string;
  scopeNote: string;
}

export interface ProfileData {
  name: string;
  headline: string;
  role: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  availability: string;
  summary: string;
  proofPoints: ProofPoint[];
  resume: {
    docxUrl: string;
    pdfUrl?: string;
    lastUpdated: string;
  };
  trustBadges: {
    name: string;
    category: "hardware" | "os" | "protocol" | "tool";
  }[];
}

export const profileData: ProfileData = {
  name: "Shuraim Shakeel Bhat",
  role: "Network Security Engineer",
  company: "WiJungle",
  location: "Srinagar, Jammu & Kashmir, India",
  headline: "I build, test, and troubleshoot secure enterprise networks.",
  availability: "Open to Network Security & Infrastructure Opportunities",
  email: "shuraimbhat500@gmail.com",
  phone: "+91 7051306998",
  linkedin: "https://linkedin.com/in/shuraim-shakeel-bhat-765076237",
  github: "https://github.com/shuraimbhat", // Placeholder if public portfolio repo exists
  summary:
    "Network Security Engineer specializing in Next-Generation Firewalls (NGFW), high-availability network topologies, and SSL VPN infrastructure. Experienced in on-site multi-vendor network rollouts with Cisco switches and MikroTik routers, hands-on Layer 2/3 packet troubleshooting, and direct bug fixes in daemon source code to eliminate socket hangs and route leakage.",
  proofPoints: [
    {
      metric: "0 Leaks",
      label: "TESTED LEAK SCOPE",
      detail: "0 observed unencrypted packet leaks in automated 3-way Scapy lab suites",
      scopeNote: "Sanitized test harness measuring tun0 vs physical interface egress across 500+ test runs",
    },
    {
      metric: "< 1s",
      label: "VRRP FAILOVER",
      detail: "Sub-second virtual router promotion achieved in keepalived active/passive clusters",
      scopeNote: "Tested using unicast heartbeats with split-brain guard on Debian Linux appliances",
    },
    {
      metric: "L2 to L4",
      label: "MULTI-VENDOR ON-SITE",
      detail: "Hands-on integration of Cisco Catalyst, MikroTik, and UTM firewalls",
      scopeNote: "On-site customer office deployments configuring 802.1Q trunks, OSPF Area 0, and NAT",
    },
  ],
  resume: {
    docxUrl: "/Shuraim_Shakeel_Bhat_Resume.docx",
    pdfUrl: undefined, // Add PDF when uploaded to public/
    lastUpdated: "September 2026",
  },
  trustBadges: [
    { name: "Cisco Catalyst Switches", category: "hardware" },
    { name: "MikroTik RouterOS", category: "hardware" },
    { name: "Debian GNU/Linux Kernel", category: "os" },
    { name: "OpenVPN SSL Daemon", category: "protocol" },
    { name: "keepalived VRRP HA", category: "protocol" },
    { name: "OSPF Area 0 Backbone", category: "protocol" },
    { name: "Wireshark & Scapy", category: "tool" },
    { name: "nftables & iptables", category: "tool" },
  ],
};
