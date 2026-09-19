"use client";

import { useState } from "react";
import { ShieldCheck, Cpu, Check, Layers, Server, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "@/components/ui/SpotlightCard";

type NodeKey = "client" | "gateway" | "standby" | "switch" | "intranet";

interface NodeDetails {
  title: string;
  role: string;
  ip: string;
  interface: string;
  protocol: string;
  metrics: string[];
}

const NODES_DATA: Record<NodeKey, NodeDetails> = {
  client: {
    title: "Client Endpoint",
    role: "Remote Worker / Test Runner",
    ip: "192.168.1.100 (Physical) / 10.8.0.6 (Virtual)",
    interface: "en0 & utun0 (MTU: 1500)",
    protocol: "OpenVPN TLS v1.3 / AES-256-GCM",
    metrics: [
      "tun0 interface active with /24 subnet",
      "Dynamic push route: 10.0.10.0/24 via 10.8.0.5",
      "Scapy automated leak probe runner installed",
    ],
  },
  gateway: {
    title: "NGFW Gateway Core (Active)",
    role: "VRRP MASTER Appliance",
    ip: "203.0.113.1 (WAN) / 10.0.10.10 (Cluster VIP)",
    interface: "eth0 (WAN), eth1 (Cluster/VIP), tun0 (VPN)",
    protocol: "VRRP Priority 150 / OSPF Area 0",
    metrics: [
      "Keepalived MASTER state with unicast heartbeat",
      "nftables FORWARD policy DROP with ctstate matching",
      "Zero socket hang bugfix verified in daemon",
    ],
  },
  standby: {
    title: "NGFW Appliance (Standby)",
    role: "VRRP BACKUP Node",
    ip: "10.0.10.11 (Peer Node Address)",
    interface: "eth1 (Sync & Heartbeat Listen)",
    protocol: "VRRP Priority 100 (Sub-second failover)",
    metrics: [
      "Continuous unicast healthcheck from Master",
      "Split-brain protection active (0 dual-masters)",
      "Ready for instant hot cutover if heartbeat drops",
    ],
  },
  switch: {
    title: "Core Switch (Cisco Catalyst)",
    role: "L2/L3 Distribution Core",
    ip: "10.0.10.2 (Switch Management)",
    interface: "Gi1/0/1 - Gi1/0/24 (802.1Q Trunks)",
    protocol: "OSPF Area 0 Neighbor / 802.1Q VLANs",
    metrics: [
      "Configured on-site for native VLAN alignment",
      "Dynamic OSPF route redistribution enabled",
      "MTU 1500 synchronized to avoid fragmented frames",
    ],
  },
  intranet: {
    title: "Protected Intranet & DMZ",
    role: "Enterprise Resource Target",
    ip: "10.0.10.0/24 & 10.0.20.0/24",
    interface: "Internal Security Zone VLAN 10",
    protocol: "HTTPS / SSH / Internal Core Services",
    metrics: [
      "Accessible solely through verified VPN tunnel",
      "Zero unauthorized public route leaks",
      "Protected by stateful firewall inspection",
    ],
  },
};

export default function TopologyVisualizer() {
  const [tunnelMode, setTunnelMode] = useState<"split" | "full">("split");
  const [selectedNode, setSelectedNode] = useState<NodeKey>("gateway");
  const [activePlane, setActivePlane] = useState<1 | 2 | 3>(2);

  const activeNodeData = NODES_DATA[selectedNode];

  return (
    <div className="space-y-8 pt-6">
      
      {/* Topology Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Appliance Cluster &amp; Transit Topology
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans mt-1">
            Simulated high-availability topology model showing interface bindings, keepalived VRRP heartbeats, and client route propagation.
          </p>
        </div>

        {/* Tunnel Mode Switcher with Sliding Indicator */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.1] p-1 rounded-xl self-start md:self-auto text-xs font-mono relative">
          <button
            type="button"
            onClick={() => setTunnelMode("split")}
            className={`relative px-3.5 py-1.5 min-h-[36px] rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 z-10 cursor-pointer ${
              tunnelMode === "split"
                ? "text-slate-950 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            {tunnelMode === "split" && (
              <motion.span
                layoutId="tunnel-mode-pill"
                className="absolute inset-0 rounded-lg bg-emerald-400 -z-10 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            SPLIT-TUNNEL
          </button>
          <button
            type="button"
            onClick={() => setTunnelMode("full")}
            className={`relative px-3.5 py-1.5 min-h-[36px] rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 z-10 cursor-pointer ${
              tunnelMode === "full"
                ? "text-slate-950 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            {tunnelMode === "full" && (
              <motion.span
                layoutId="tunnel-mode-pill"
                className="absolute inset-0 rounded-lg bg-emerald-400 -z-10 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            FULL-TUNNEL
          </button>
        </div>
      </div>

      {/* Interactive Topology Canvas & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Visual Topology Flow (8 Cols) */}
        <div className="lg:col-span-8">
          <SpotlightCard
            tilt={false}
            spotlightColor="rgba(16, 185, 129, 0.1)"
            className="rounded-2xl border-slate-200/80 dark:border-white/[0.1] p-6 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3.5 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold">TOPOLOGY NODE SCHEMATIC</span>
              </div>
              <span className="text-amber-600 dark:text-amber-400 text-[11px] font-semibold">
                [LAB BENCHMARK MODEL &bull; SANITIZED]
              </span>
            </div>

            {/* Node Selector Row */}
            <div
              role="tablist"
              aria-label="Topology Nodes"
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs"
            >
              {/* Client Node */}
              <button
                role="tab"
                type="button"
                aria-selected={selectedNode === "client"}
                aria-controls="topology-node-inspector"
                onClick={() => setSelectedNode("client")}
                className={`p-3.5 min-h-[44px] rounded-xl text-left transition-all border space-y-1.5 focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer ${
                  selectedNode === "client"
                    ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "bg-slate-50 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.2]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-900 dark:text-white font-bold flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    Client Node
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">ENDPOINT</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">utun0: 10.8.0.6</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {tunnelMode === "split" ? "Split Routes (10.0.10.0/24)" : "Default (0.0.0.0/0)"}
                </div>
              </button>

              {/* Gateway Core */}
              <button
                role="tab"
                type="button"
                aria-selected={selectedNode === "gateway"}
                aria-controls="topology-node-inspector"
                onClick={() => setSelectedNode("gateway")}
                className={`p-3.5 min-h-[44px] rounded-xl text-left transition-all border space-y-1.5 focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer ${
                  selectedNode === "gateway"
                    ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "bg-slate-50 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.2]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-900 dark:text-white font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    NGFW Gateway
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">VRRP MASTER</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">VIP: 10.0.10.10</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Pri: 150 &bull; tun0 Active
                </div>
              </button>

              {/* Core Switch */}
              <button
                role="tab"
                type="button"
                aria-selected={selectedNode === "switch"}
                aria-controls="topology-node-inspector"
                onClick={() => setSelectedNode("switch")}
                className={`p-3.5 min-h-[44px] rounded-xl text-left transition-all border space-y-1.5 focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer ${
                  selectedNode === "switch"
                    ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "bg-slate-50 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.2]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-900 dark:text-white font-bold flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    Core Switch
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">CISCO</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">VLAN 10, 20 Trunks</div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                  OSPF Area 0 Neighbor
                </div>
              </button>
            </div>

            {/* Sub-row: Standby Appliance & Intranet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <button
                role="tab"
                type="button"
                aria-selected={selectedNode === "standby"}
                aria-controls="topology-node-inspector"
                onClick={() => setSelectedNode("standby")}
                className={`p-3.5 min-h-[44px] rounded-xl text-left transition-all border space-y-1 focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer ${
                  selectedNode === "standby"
                    ? "bg-emerald-500/10 border-emerald-500/50"
                    : "bg-slate-50 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.15]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    Standby Firewall (VRRP BACKUP)
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">10.0.10.11</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  Unicast Heartbeat Listener &bull; Ready for instant cutover
                </div>
              </button>

              <button
                role="tab"
                type="button"
                aria-selected={selectedNode === "intranet"}
                aria-controls="topology-node-inspector"
                onClick={() => setSelectedNode("intranet")}
                className={`p-3.5 min-h-[44px] rounded-xl text-left transition-all border space-y-1 focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer ${
                  selectedNode === "intranet"
                    ? "bg-emerald-500/10 border-emerald-500/50"
                    : "bg-slate-50 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.15]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Protected Subnets (10.0.10.0/24)
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">SECURED</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  Encrypted ingress via tun0 &bull; Stateful L2-L4 inspection
                </div>
              </button>
            </div>

            {/* Traffic Path Schematic Flow with Animated Flow */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200/80 dark:border-white/[0.06] font-mono text-xs space-y-2">
              <div className="text-slate-600 dark:text-slate-400 text-[11px] uppercase font-bold tracking-wider">
                ACTIVE TRAFFIC PATH SCHEMATIC &bull; {tunnelMode.toUpperCase()} TUNNEL
              </div>
              <div className="flex flex-wrap items-center gap-2 text-slate-700 dark:text-slate-300 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 font-semibold">Client (10.8.0.6)</span>
                <span className="text-slate-400 dark:text-slate-500">&rarr;</span>
                <span className="px-2 py-0.5 rounded bg-white dark:bg-white/[0.05] text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-transparent">tun0 (UDP/1194)</span>
                <span className="text-slate-400 dark:text-slate-500">&rarr;</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold">NGFW VIP (10.0.10.10)</span>
                <span className="text-slate-400 dark:text-slate-500">&rarr;</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-semibold">Cisco Core Switch</span>
                <span className="text-slate-400 dark:text-slate-500">&rarr;</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold">Target Subnet</span>
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-1 font-sans">
                {tunnelMode === "split"
                  ? "Split-tunnel: Intranet packets (10.0.10.0/24) encapsulate via tun0; public internet routes natively via client ISP gateway."
                  : "Full-tunnel: Default route 0.0.0.0/0 redirected through tun0; all client traffic traverses gateway firewall rules."}
              </div>
            </div>

          </SpotlightCard>
        </div>

        {/* Selected Node Details & Cross-Plane Verification Tabs (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Node Inspector Card */}
          <SpotlightCard
            tilt={true}
            spotlightColor="rgba(56, 189, 248, 0.12)"
            id="topology-node-inspector"
            className="rounded-2xl border-slate-200/80 dark:border-white/[0.1] p-5 font-mono text-xs space-y-3 shadow-md dark:shadow-none"
          >
            <div className="border-b border-slate-200 dark:border-white/[0.08] pb-2.5">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">NODE INSPECTOR</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{activeNodeData.title}</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{activeNodeData.role}</div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div>
                <span className="text-slate-400 dark:text-slate-500">IP: </span>
                <span className="text-slate-900 dark:text-white font-bold">{activeNodeData.ip}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500">IFACE: </span>
                <span className="text-slate-700 dark:text-slate-200">{activeNodeData.interface}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500">PROTO: </span>
                <span className="text-slate-700 dark:text-slate-200">{activeNodeData.protocol}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80 dark:border-white/[0.06] space-y-1 text-xs">
              <div className="text-slate-500 dark:text-slate-400 font-semibold uppercase text-[10px]">Verified Operational Parameters:</div>
              {activeNodeData.metrics.map((m, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-300 text-[11px]">
                  <span className="text-emerald-500 dark:text-emerald-400">&bull;</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </SpotlightCard>

          {/* 3-Way Cross-Plane Selector */}
          <SpotlightCard
            tilt={false}
            spotlightColor="rgba(16, 185, 129, 0.1)"
            className="rounded-2xl border-slate-200/80 dark:border-white/[0.1] p-5 font-mono text-xs space-y-3 shadow-md dark:shadow-none"
          >
            <div className="border-b border-slate-200 dark:border-white/[0.08] pb-2.5">
              <div className="text-xs text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-wider">
                3-WAY CROSS-PLANE QA
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-sans">
                Automated regression suite verifying zero leakage.
              </div>
            </div>

            <div role="tablist" aria-label="3-Way Test Planes" className="flex gap-1 bg-slate-100 dark:bg-black/40 p-1 rounded-xl relative border border-slate-200/60 dark:border-transparent">
              {[1, 2, 3].map((plane) => (
                <button
                  key={plane}
                  role="tab"
                  type="button"
                  aria-selected={activePlane === plane}
                  onClick={() => setActivePlane(plane as 1 | 2 | 3)}
                  className={`relative flex-1 py-1.5 min-h-[32px] rounded-lg text-xs font-bold transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 z-10 cursor-pointer ${
                    activePlane === plane
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {activePlane === plane && (
                    <motion.span
                      layoutId="cross-plane-indicator"
                      className="absolute inset-0 rounded-lg bg-white dark:bg-white/[0.12] shadow-sm dark:shadow-none -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  PLANE {plane}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-700 dark:text-slate-300 min-h-[70px]">
              <AnimatePresence mode="wait">
                {activePlane === 1 && (
                  <motion.div
                    key="plane1"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-1.5"
                  >
                    <div className="text-slate-900 dark:text-white font-semibold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Plane 1: Web GUI &amp; Client Schema</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 font-sans text-xs leading-relaxed">
                      Playwright asserts admin input validation, user CIDR pool generation, and .ovpn cryptographic settings.
                    </p>
                  </motion.div>
                )}

                {activePlane === 2 && (
                  <motion.div
                    key="plane2"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-1.5"
                  >
                    <div className="text-slate-900 dark:text-white font-semibold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Plane 2: Linux Control Plane &amp; Sockets</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 font-sans text-xs leading-relaxed">
                      Paramiko SSH polls tun0 virtual device state, socket descriptor lifecycle, and nftables FORWARD rules.
                    </p>
                  </motion.div>
                )}

                {activePlane === 3 && (
                  <motion.div
                    key="plane3"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-1.5"
                  >
                    <div className="text-slate-900 dark:text-white font-semibold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Plane 3: Wire Data Plane &amp; Scapy Sniff</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 font-sans text-xs leading-relaxed">
                      Scapy injects synthetic TCP/ICMP payloads simultaneously across physical en0 and tun0 to guarantee zero unencrypted leaks.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SpotlightCard>

        </div>

      </div>

    </div>
  );
}
