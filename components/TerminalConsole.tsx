"use client";

import { useState, useRef, useEffect } from "react";
import { RotateCcw, CornerDownLeft, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { triggerTechConfetti } from "@/lib/confetti";

interface CommandEntry {
  command: string;
  output: string;
}

export default function TerminalConsole() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandEntry[]>([
    {
      command: "status",
      output: `[LAB SIMULATION • SANITIZED TEST DATA]
Appliance:     Enterprise NGFW Gateway Core (Staging Lab)
Firmware:      v12.4.2-STABLE (Debian Linux Kernel 6.1-amd64)
Status:        RUNNING | UP 42 days, 11:24 (Lab Benchmark Trace)
HA Mode:       VRRP MASTER (keepalived) | Priority: 150 | VIP: 10.0.10.10
SSL VPN:       ONLINE (Daemon PID: 4092, Interface: tun0, Port: UDP/1194)
Tunnel Mode:   Split-Tunnel & Full-Tunnel Capable (3-Way Verified Scope)`,
    },
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let res = "";

    switch (trimmed) {
      case "help":
        res = `Available Diagnostic Commands [Sanitized Lab Data]:
  status        Show appliance status, HA state, and SSL VPN daemon metrics
  route -n      Print active kernel routing table
  iptables -l   Display active firewall filter and NAT table rules
  vrrp          Inspect keepalived high-availability failover health
  code-diff     View summary of SSL VPN codebase modifications
  vpn-audit     Run live 3-way verification diagnostic suite
  experience    Print career history from latest updated resume
  projects      List featured production and research engineering projects
  skills        Print network security, cybersecurity, and technical competencies
  certs         List official Cisco & industry certifications
  contact       Display direct contact channels (email, phone, LinkedIn)
  clear         Clear console output`;
        break;

      case "status":
        res = `[LAB SIMULATION • SANITIZED TEST DATA]
Appliance:     Enterprise NGFW Gateway Core (Staging Lab)
Firmware:      v12.4.2-STABLE (Debian Linux Kernel 6.1-amd64)
Status:        RUNNING | UP 42 days, 11:24 (Lab Benchmark Trace)
HA Mode:       VRRP MASTER (keepalived) | Priority: 150 | VIP: 10.0.10.10
SSL VPN:       ONLINE (Daemon PID: 4092, Interface: tun0, Port: UDP/1194)
Tunnel Mode:   Split-Tunnel & Full-Tunnel Capable (3-Way Verified Scope)`;
        triggerTechConfetti();
        break;

      case "route":
      case "route -n":
        res = `[LAB SANITIZED IP ROUTING TABLE]
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.1.1     0.0.0.0         UG    100    0        0 en0
10.8.0.0        0.0.0.0         255.255.255.0   U     0      0        0 tun0
10.0.10.0       10.8.0.5        255.255.255.0   UG    50     0        0 tun0
192.168.1.0     0.0.0.0         255.255.255.0   U     100    0        0 en0
203.0.113.0     0.0.0.0         255.255.255.0   U     100    0        0 eth0`;
        break;

      case "iptables":
      case "iptables -l":
        res = `[LAB SANITIZED FIREWALL FILTER & NAT RULES]
Chain FORWARD (policy DROP 12 packets, 720 bytes)
 pkts bytes target     prot opt in     out     source               destination         
 142K   82M ACCEPT     all  --  tun0   eth0    10.8.0.0/24          10.0.10.0/24        ctstate NEW,RELATED,ESTABLISHED
 110K  124M ACCEPT     all  --  eth0   tun0    10.0.10.0/24         10.8.0.0/24         ctstate RELATED,ESTABLISHED

Chain POSTROUTING (table nat)
 pkts bytes target     prot opt in     out     source               destination         
 8521 1.42M MASQUERADE all  --  any    eth0    10.8.0.0/24          0.0.0.0/0           [FULL TUNNEL NAT]`;
        break;

      case "vrrp":
        res = `[LAB HIGH AVAILABILITY STATE]
Instance VI_1:
  State:               MASTER
  Interface:           eth0 (10.0.10.10/24)
  Virtual Router ID:   51
  Priority:            150
  Advertisement:       1.0s (advertised every 1000ms)
  Preempt Mode:        ENABLED
  Track Interfaces:    eth0, eth1 (weight 60)
  Last State Transition: 14 days ago (BACKUP -> MASTER upon cold start)
  Failover Test:       < 1.0s convergence verified across 20 lab flapping tests`;
        triggerTechConfetti();
        break;

      case "code-diff":
        res = `[SANITIZED REPO COMMIT SUMMARY - SSL VPN REDIRECT & MTU LOGIC]
commit a8f12c9b (HEAD -> main)
Author: Shuraim Shakeel Bhat <shuraimshakeelbhat@gmail.com>
Date:   Wed Dec 18 14:22:01 2024

    fix(vpn-tunnel): decouple interface teardown & enforce clamp-mss-to-pmtu
    
    - Handled rapid route table changes during interface flap
    - Fixed race condition where client renegotiation caused duplicate tun0 binding
    - Added explicit iptables TCPMSS clamp to match Path MTU (1360 bytes)
    
 3 files changed, 84 insertions(+), 19 deletions(-)
 Tested scope: Linux Debian 6.1 kernel, OpenVPN 2.5 daemon, nftables`;
        triggerTechConfetti();
        break;

      case "vpn-audit":
        res = `[SCAPY 3-WAY VERIFICATION TEST SUITE]
Running cross-plane test suite against lab gateway...
[PASS] Plane 1 (Web Config):   Routes correctly parsed into config JSON
[PASS] Plane 2 (Linux Kernel): 10.0.10.0/24 assigned to tun0 interface
[PASS] Plane 3 (Wire Frame):   Scapy injected 1,000 synthetic test packets
----------------------------------------------------------------------
Result: 0 observed packet drops across 100 simulated interface flapping test iterations.
Tested Scope: Local laboratory testing bench environment only.`;
        triggerTechConfetti();
        break;

      case "experience":
        res = `CAREER HISTORY (From Latest Updated Resume):
1. WiJungle | Network Security Engineer (Full-Time | Sep 2024 - Present)
   - Tested and verified NGFW appliances across multi-vendor lab topologies.
   - Diagnosed SSL VPN reconnect bugs, MTU clamping, and VRRP failovers.
   - Authored Python test scripts for end-to-end regression validation.

2. WiJungle | Network Security Engineer Intern (Feb 2024 - Jul 2024)
   - Researched enterprise firewall architectures, routing protocols, and HA.
   - Built repeatable multi-subnet staging lab environments.

3. SuprMentr | Software Engineer Intern (Jun 2023 - Aug 2023)
   - Developed full-stack modules and automated testing workflows.`;
        break;

      case "projects":
        res = `FEATURED CASE STUDIES:
1. NGFW SSL VPN Reconnect & Split-Tunnel Framework
   - Fixed route table race conditions & MTU clamping under unstable connections.
   - Result: 0 observed drops across 100 flapping test iterations (lab scope).

2. Multi-Vendor Enterprise Network Deployment & Automated Verification
   - Cisco Core + UTM HA cluster + Branch routers integration.
   - Automated 3-way verification using Python Scapy test scripts.`;
        break;

      case "skills":
        res = `NETWORK SECURITY & CYBERSECURITY COMPETENCIES:
- Network Security:  NGFW, SSL VPN, NAT/PAT, Firewall Policies, WireGuard, IPsec
- Protocols:         VRRP, OSPF, BGP, TCP/IP, VLAN (802.1Q), DNS, DHCP, ARP
- Security Tools:    Burp Suite, Wireshark, Scapy, Playwright, Paramiko, iptables
- System & Tools:    Linux (Debian/Ubuntu), Bash, Python, nftables
- Hardware/Vendor:   Cisco Catalyst Switches, Enterprise UTM Appliances, MikroTik, Fortinet`;
        break;

      case "certs":
        res = `CERTIFICATIONS & CREDENTIALS:
- Cisco Certified: Enterprise Network Security
- Cisco Certified: Network Security
- Cisco Certified: Switch & Routing Concepts
- Cisco Certified: Network Addressing & Basic Troubleshooting
- Bachelor of Engineering (B.E.) in Computer Science | CGPA: 8.5/10`;
        break;

      case "contact":
        res = `DIRECT CONTACT CHANNELS:
  Email:      shuraimshakeelbhat@gmail.com
  Phone:      +91 95415 65910
  LinkedIn:   https://linkedin.com/in/shuraim-shakeel-bhat-765076237`;
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        res = `shuraim-sh: command not found: ${trimmed}. Type "help" for a list of available diagnostic commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output: res }]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
    setInputVal("");
  };

  // Strictly scroll the terminal body container only - never jump the page window
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <SpotlightCard
      tilt={false}
      spotlightColor="rgba(52, 211, 153, 0.1)"
      className="terminal-console-card rounded-2xl border-white/[0.12] shadow-2xl overflow-hidden font-mono text-xs"
    >
      
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#11141c] border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-400 text-xs ml-2 flex items-center gap-1.5 font-mono">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white font-semibold">shuraim@ngfw-core: ~ (bash)</span>
          </span>
          <span className="hidden sm:inline text-amber-300 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
            LAB DATA
          </span>
        </div>

        <button
          type="button"
          onClick={() => setHistory([])}
          className="text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Clear terminal output log"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Log</span>
        </button>
      </div>

      {/* Quick Click Diagnostic Command Bar */}
      <div className="flex flex-wrap items-center gap-1.5 p-3 bg-black/40 border-b border-white/[0.06] text-xs">
        <span className="text-slate-400 text-[11px] font-semibold mr-1">QUICK QUERY:</span>
        {["status", "route -n", "iptables -l", "vrrp", "code-diff", "vpn-audit", "skills", "experience", "projects", "certs", "contact"].map((cmd) => (
          <motion.button
            key={cmd}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleCommand(cmd)}
            className="px-2.5 py-1 min-h-[32px] rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-emerald-500/30 text-slate-300 hover:text-white transition-all text-xs focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
          >
            {cmd}
          </motion.button>
        ))}
      </div>

      {/* Terminal Output Log Container */}
      <div
        ref={terminalBodyRef}
        className="p-5 h-[320px] overflow-y-auto terminal-scroll space-y-3.5 bg-black/60"
        aria-live="polite"
        tabIndex={0}
        aria-label="Terminal command history"
      >
        <div className="text-slate-400 text-xs border-b border-white/[0.06] pb-2.5">
          Debian GNU/Linux 12 (bookworm) 6.1.0-21-amd64 [Lab Environment]. Type <strong className="text-emerald-400 font-bold">help</strong> for diagnostics.
        </div>

        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <span className="text-slate-500">shuraim@ngfw-core:~$</span>
              <span>{item.command}</span>
            </div>
            <pre className="text-slate-300 text-xs whitespace-pre-wrap leading-relaxed pl-3.5 border-l border-emerald-500/20 font-mono">
              {item.output}
            </pre>
          </div>
        ))}
      </div>

      {/* Interactive Input Form with Accessible Label */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 px-4 py-3 bg-[#0e1118] border-t border-white/[0.08]"
      >
        <label htmlFor="terminal-command-input" className="sr-only">
          Diagnostic Shell Command Input
        </label>
        <span className="text-emerald-400 font-bold select-none text-xs">shuraim@ngfw-core:~$</span>
        <input
          id="terminal-command-input"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type command (e.g. status, route -n, code-diff, help)..."
          className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-xs font-mono"
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="px-4 py-2 min-h-[44px] bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.2)]"
        >
          <span>Execute</span>
          <CornerDownLeft className="w-3.5 h-3.5" />
        </motion.button>
      </form>

    </SpotlightCard>
  );
}
