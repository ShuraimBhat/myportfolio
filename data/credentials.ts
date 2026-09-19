export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: "Cisco" | "Industry Training" | "Job Simulation";
  status: "Completed" | "Training Completed";
  dateOrPeriod?: string;
  description: string;
  credentialNote: string;
}

export interface Education {
  degree: string;
  major: string;
  institution: string;
  university: string;
  graduationYear: string;
  focusAreas: string[];
  note: string;
}

export const certificationsData: Certification[] = [
  {
    id: "ccna-training",
    title: "CCNA (Cisco Certified Network Associate) Training",
    issuer: "Cisco Networking Academy",
    category: "Cisco",
    status: "Training Completed",
    description:
      "Comprehensive networking curriculum: IP connectivity, subnetting, switching concepts, OSPF routing, ACLs, IP services, and network fundamentals.",
    credentialNote: "Training program curriculum completed via Cisco NetAcad.",
  },
  {
    id: "cisco-network-security",
    title: "Cisco Network Security Certificate",
    issuer: "Coursera / Cisco Networking Academy",
    category: "Cisco",
    status: "Completed",
    description:
      "Firewall architectures, IPSec/SSL VPN deployment, access control lists, network segmentation, and enterprise perimeter defense.",
    credentialNote: "Verified certificate issued through Coursera Cisco partnership.",
  },
  {
    id: "cisco-soc-analyst",
    title: "Cisco SOC Analyst Certificate",
    issuer: "Coursera / Cisco Networking Academy",
    category: "Cisco",
    status: "Completed",
    description:
      "Security operations center workflows: traffic monitoring, alert triage, incident response, packet capture forensics, and threat containment.",
    credentialNote: "Verified certificate issued through Coursera Cisco partnership.",
  },
  {
    id: "cisco-intro-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    category: "Cisco",
    status: "Completed",
    description:
      "Core defensive security principles: threat landscape analysis, confidentiality/integrity/availability (CIA) triad, and vulnerability identification.",
    credentialNote: "Completed through Cisco Networking Academy online.",
  },
  {
    id: "suprmentr-training",
    title: "Cybersecurity & Ethical Hacking Training",
    issuer: "SuprMentr Technologies",
    category: "Industry Training",
    status: "Completed",
    dateOrPeriod: "Jan 2026 - Apr 2026",
    description:
      "Three-month structured hands-on program covering penetration testing basics, network reconnaissance, packet analysis, and practical security audits.",
    credentialNote: "Practical internship training certificate from SuprMentr.",
  },
  {
    id: "forage-simulations",
    title: "Cybersecurity Job Simulations",
    issuer: "Forage (Mastercard & Commonwealth Bank)",
    category: "Job Simulation",
    status: "Completed",
    description:
      "Practical industry problem sets: incident response playbooks, phishing alert investigation, security design reviews, and compliance reporting.",
    credentialNote: "Completed virtual experience programs for Mastercard and Commonwealth Bank.",
  },
];

export const educationData: Education = {
  degree: "Bachelor of Engineering (B.E.)",
  major: "Computer Science & Engineering",
  institution: "Ghousia College of Engineering, Ramanagaram",
  university: "Visvesvaraya Technological University (VTU)",
  graduationYear: "2026",
  focusAreas: [
    "Computer Networks & Protocols",
    "Network Security & Cryptography",
    "Operating Systems & Linux Architecture",
    "TCP/IP Suite & Systems Engineering",
  ],
  note: "Official academic transcripts, degree verification, and certificate credentials available upon request.",
};
