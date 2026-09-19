"use client";

import React, { useState } from "react";
import { Zap, Play } from "lucide-react";

export default function ArchitectureLab() {
  const [activeTab, setActiveTab] = useState<"simulator" | "topology">("simulator");
  const [activeState, setActiveState] = useState<"normal" | "failover" | "recovery">("normal");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulationLog(["[00:00.001] Injecting synthetic link down signal on Edge-FW-01 (enp3s0)..."]);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        "[00:00.118] Primary daemon missed 3 consecutive VRRP heartbeats (priority 150 -> FAULT state).",
        "[00:00.142] Secondary Edge-FW-02 elected MASTER (VRID 51, priority 100).",
      ]);
    }, 400);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        "[00:00.280] Emitting Gratuitous ARP broadcast for Virtual IP 10.240.0.254 on vlan20.",
        "[00:00.294] Cisco Catalyst switch CAM table updated; next-hop verified intact.",
        "[00:00.301] Result: 0 dropped TCP packets in active synthetic stream. Failover completed in 0.28ms.",
      ]);
      setIsSimulating(false);
    }, 900);
  };

  return (
    <section id="architecture" className="border-b border-[#e5e5e5] bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e5e5e5]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#737373] block mb-2">
              02 // ARCHITECTURE LAB &amp; STATE MACHINE
            </span>
            <h2 className="t-statement text-3xl sm:text-4xl font-bold text-[#171717]">
              Virtual Router Redundancy &amp; Live Failover
            </h2>
          </div>
          <div className="flex items-center gap-2 p-1 rounded-full bg-white border border-[#e5e5e5] text-xs font-mono">
            <button
              onClick={() => setActiveTab("simulator")}
              className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                activeTab === "simulator"
                  ? "bg-[#171717] text-white font-bold"
                  : "text-[#737373] hover:text-[#171717]"
              }`}
            >
              VRRP Failover Simulator
            </button>
            <button
              onClick={() => setActiveTab("topology")}
              className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                activeTab === "topology"
                  ? "bg-[#171717] text-white font-bold"
                  : "text-[#737373] hover:text-[#171717]"
              }`}
            >
              Transit Topology Matrix
            </button>
          </div>
        </div>

        {activeTab === "simulator" ? (
          <div className="pt-12 space-y-8">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#171717]">
                  keepalived VRID 51 Dual-Appliance Cluster
                </h3>
                <p className="text-xs font-mono text-[#737373] mt-0.5">
                  Virtual IP: 10.240.0.254/24 · Heartbeat Interval: 1.0s · Sub-0.3ms Target
                </p>
              </div>

              {/* State Machine Switcher */}
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-white border border-[#e5e5e5] text-xs font-mono">
                <button
                  onClick={() => setActiveState("normal")}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    activeState === "normal"
                      ? "bg-[#f3f4f6] text-[#171717] font-bold border border-[#e5e5e5]"
                      : "text-[#737373] hover:text-[#171717]"
                  }`}
                >
                  Normal (Active-Passive)
                </button>
                <button
                  onClick={() => setActiveState("failover")}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    activeState === "failover"
                      ? "bg-rose-50 text-rose-700 font-bold border border-rose-200"
                      : "text-[#737373] hover:text-[#171717]"
                  }`}
                >
                  Injected Fault
                </button>
                <button
                  onClick={() => setActiveState("recovery")}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    activeState === "recovery"
                      ? "bg-emerald-50 text-emerald-700 font-bold border border-emerald-200"
                      : "text-[#737373] hover:text-[#171717]"
                  }`}
                >
                  Preempt Recovery
                </button>
              </div>
            </div>

            {/* Appliance Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Appliance Card */}
              <div
                className={`p-6 rounded-2xl border transition-all duration-200 bg-white ${
                  activeState === "failover"
                    ? "border-rose-300 shadow-xs"
                    : "border-[#e5e5e5] shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase text-[#737373]">
                    PRIMARY GATEWAY (VRRP-01)
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                      activeState === "failover"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {activeState === "failover" ? "FAULT / DOWN" : "MASTER (ACTIVE)"}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[#171717]">Edge-FW-01 (keepalived)</h4>
                <p className="text-xs font-mono text-[#737373] mt-1">
                  10.240.0.1/24 · Priority 150 · enp3s0
                </p>

                <div className="mt-6 pt-4 border-t border-[#e5e5e5] space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-[#737373]">
                    <span>VIP 10.240.0.254 Binding:</span>
                    <span className="font-semibold text-[#171717]">
                      {activeState === "failover" ? "RELEASED" : "BOUND TO INTERFACE"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#737373]">
                    <span>Multicast 224.0.0.18:</span>
                    <span className="font-semibold text-[#171717]">
                      {activeState === "failover" ? "0 pps (MUTE)" : "1 pkt / sec (EMITTING)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Appliance Card */}
              <div
                className={`p-6 rounded-2xl border transition-all duration-200 bg-white ${
                  activeState === "failover"
                    ? "border-emerald-300 shadow-xs"
                    : "border-[#e5e5e5] shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase text-[#737373]">
                    STANDBY GATEWAY (VRRP-02)
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                      activeState === "failover"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-[#f3f4f6] text-[#737373]"
                    }`}
                  >
                    {activeState === "failover" ? "PROMOTED TO MASTER" : "BACKUP (STANDBY)"}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[#171717]">Edge-FW-02 (keepalived)</h4>
                <p className="text-xs font-mono text-[#737373] mt-1">
                  10.240.0.2/24 · Priority 100 · enp3s0
                </p>

                <div className="mt-6 pt-4 border-t border-[#e5e5e5] space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-[#737373]">
                    <span>VIP 10.240.0.254 Binding:</span>
                    <span className="font-semibold text-emerald-700">
                      {activeState === "failover" ? "ACQUIRED VIA GARP" : "STANDBY LISTENER"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#737373]">
                    <span>Failover Threshold:</span>
                    <span className="font-semibold text-[#171717]">3 x 1.0s interval (3.0s max)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro-Simulator Live Test Bar & Terminal */}
            <div className="p-6 rounded-2xl border border-[#e5e5e5] bg-white space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#f3f4f6] border border-[#e5e5e5] flex items-center justify-center text-[#171717]">
                    <Zap className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#171717]">
                      Execute Real-Time Failover Verification Probe
                    </h4>
                    <p className="text-xs font-mono text-[#737373]">
                      Triggers synthetic fault injection and audits ARP convergence.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#171717] hover:bg-black text-white text-xs font-mono font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  <Play className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
                  {isSimulating ? "Executing Probe..." : "Run Test Probe"}
                </button>
              </div>

              {/* Monospace Output Screen */}
              <div className="p-4 rounded-xl bg-[#171717] text-[#f9fafb] font-mono text-xs min-h-[120px] leading-relaxed overflow-x-auto">
                {simulationLog.length === 0 ? (
                  <div className="text-[#a3a3a3]">
                    $ vrrp-verify --cluster=vrid-51 --target=10.240.0.254 --inject-fault
                    <br />
                    Ready. Click &quot;Run Test Probe&quot; to execute live failover verification...
                  </div>
                ) : (
                  <div className="space-y-1">
                    {simulationLog.map((line, idx) => (
                      <div key={idx} className="text-emerald-400">
                        {line}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Transit Topology Matrix Tab */
          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-[#e5e5e5] bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-[#737373]">TRANSIT CORE</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800">
                  HEALTHY
                </span>
              </div>
              <h4 className="text-lg font-bold text-[#171717]">Cisco Catalyst 3560G</h4>
              <p className="text-xs font-mono text-[#737373] mt-1">192.168.1.1/24 · OSPF Area 0</p>
              <div className="mt-4 pt-4 border-t border-[#e5e5e5] text-xs font-mono space-y-1 text-[#525252]">
                <div>Routing: Inter-VLAN Transit (10, 20, 30)</div>
                <div>LSA Database: 12 Type 1/2 LSAs synced</div>
                <div>Uptime: 99.999% · 0.12ms loopback latency</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[#e5e5e5] bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-[#737373]">WAN EDGE</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800">
                  HEALTHY
                </span>
              </div>
              <h4 className="text-lg font-bold text-[#171717]">MikroTik Cloud Core (CCR)</h4>
              <p className="text-xs font-mono text-[#737373] mt-1">172.16.1.1/24 · RouterOS v7</p>
              <div className="mt-4 pt-4 border-t border-[#e5e5e5] text-xs font-mono space-y-1 text-[#525252]">
                <div>BGP Peers: 2 Upstream ISP sessions</div>
                <div>NAT: FastTrack flow offloading active</div>
                <div>WireGuard: 0 DNS packet leakage verified</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[#e5e5e5] bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-[#737373]">SECURITY KERNEL</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800">
                  ACTIVE
                </span>
              </div>
              <h4 className="text-lg font-bold text-[#171717]">Debian Linux NGFW</h4>
              <p className="text-xs font-mono text-[#737373] mt-1">Linux 6.1 LTS · nftables / Suricata</p>
              <div className="mt-4 pt-4 border-t border-[#e5e5e5] text-xs font-mono space-y-1 text-[#525252]">
                <div>Firewall: 18 stateful chains active</div>
                <div>Socket cleanup: SHUT_RDWR patched</div>
                <div>Automated tests: 100% pass across 500+ runs</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
