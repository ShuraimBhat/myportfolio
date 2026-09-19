"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
type Entry = { command: string; output: string };
const responses: Record<string, string> = {
  status: "[lab] NGFW gateway / running\n[ha] keepalived VRRP master / vip 10.0.10.10\n[vpn] tun0 online / full-tunnel verified\n[trace] 0 observed packet leaks",
  "route -n": "destination       gateway       iface\n0.0.0.0/0          192.168.1.1   en0\n10.8.0.0/24        -             tun0\n10.0.10.0/24       10.8.0.5      tun0",
  "vpn-audit": "[1/3] web policy ........ pass\n[2/3] kernel routes ...... pass\n[3/3] wire egress ........ pass\nresult: clean handoff / lab scope only",
  trace: "client / en0  →  policy check  →  tun0  →  gateway / vip\npacket path: encrypted / verified\nlatency: 0.28ms lab trace",
  skills: "network security   NGFW · SSL VPN · VRRP · OSPF\ncybersecurity       Burp Suite · Scapy · Wireshark\nautomation           Playwright · Paramiko · Python\nsystems              Debian · nftables · iproute2",
  help: "status       appliance and HA state\nroute -n    print the active routing table\nvpn-audit   run the 3-plane verification trace\nskills      show network security toolkit\ncontact     print direct contact details\nclear       clear the shell",
  contact: "email      shuraimbhat500@gmail.com\nlinkedin   linkedin.com/in/shuraim-shakeel-bhat-765076237",
};
const quickCommands = ["status", "trace", "vpn-audit", "skills", "help"];
export default function InteractiveCLI() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Entry[]>([{ command: "status", output: responses.status }]);
  const outputRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight; }, [history]);
  const run = (value: string) => {
    const command = value.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") { setHistory([]); return; }
    const output = responses[command] ?? `shuraim.b: command not found: ${command}\ntry "help" for available diagnostics`;
    setHistory((current) => [...current, { command: value, output }]);
    setInput("");
  };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); run(input); };
  return <div className="aesthetic-cli">
    <div className="aesthetic-cli__head"><span>shuraim.b / lab shell</span><span>sanitized trace</span></div>
    <div className="aesthetic-cli__quick">{quickCommands.map((command) => <motion.button key={command} type="button" whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }} onClick={() => run(command)}>{command}</motion.button>)}</div>
    <div className="aesthetic-cli__output" ref={outputRef} aria-live="polite">
      <div className="aesthetic-cli__welcome">debian 12 / network security lab / type <strong>help</strong></div>
      <AnimatePresence initial={false}>{history.map((entry, index) => <motion.div className="aesthetic-cli__entry" key={`${entry.command}-${index}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}><div><span>shuraim.b@lab:~$</span> {entry.command}</div><pre>{entry.output}</pre></motion.div>)}</AnimatePresence>
    </div>
    <form className="aesthetic-cli__form" onSubmit={submit}><label htmlFor="aesthetic-cli-input">shuraim.b@lab:~$</label><span className="aesthetic-cli__cursor" aria-hidden="true" /><input id="aesthetic-cli-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="type a command" autoComplete="off" /><motion.button type="submit" aria-label="Run command" whileHover={{ x: 2 }} whileTap={{ scale: 0.9 }}><ArrowUpRight size={15} /></motion.button></form>
  </div>;
}
