"use client";

import React, { useState } from "react";
import { Zap, Play } from "lucide-react";

export function VariantD() {
  const [activeTab, setActiveTab] = useState<"normal" | "failover" | "recovery">("normal");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulationLog(["[00:00.001] Triggering synthetic link flap on eth0..."]);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        "[00:00.120] Primary keepalived daemon missed 3 VRRP heartbeats (priority 150 -> FAULT).",
        "[00:00.142] Secondary node transitioned to MASTER state (priority 100)."
      ]);
    }, 400);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        "[00:00.280] Gratuitous ARP emitted on enp3s0 for VIP 10.240.0.254.",
        "[00:00.295] Zero packet drop verified in TCP stream. Failover completed in 0.28ms."
      ]);
      setIsSimulating(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Variant Header Info */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-semibold">
            Variant D • Interaction & State Model
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Dynamic State Machine & Failover Micro-Simulator
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Hands-on state triggers: test how VRRP heartbeats fail over seamlessly with instant visual feedback.
          </p>
        </div>
      </div>

      {/* State Mode Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 w-fit">
        <button
          onClick={() => setActiveTab("normal")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-150 cursor-pointer ${
            activeTab === "normal"
              ? "bg-white dark:bg-[#0c0e14] text-slate-900 dark:text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Normal State (Active-Passive)
        </button>
        <button
          onClick={() => setActiveTab("failover")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-150 cursor-pointer ${
            activeTab === "failover"
              ? "bg-white dark:bg-[#0c0e14] text-rose-600 dark:text-rose-400 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Injected Fault (Failover)
        </button>
        <button
          onClick={() => setActiveTab("recovery")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-150 cursor-pointer ${
            activeTab === "recovery"
              ? "bg-white dark:bg-[#0c0e14] text-emerald-600 dark:text-emerald-400 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Preempt Recovery
        </button>
      </div>

      {/* Interactive Simulation Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Node A (Primary) */}
        <div
          className={`p-5 rounded-xl border transition-all duration-200 ${
            activeTab === "failover"
              ? "border-rose-500/40 bg-rose-500/[0.03] dark:bg-rose-950/10"
              : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0e14]"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-slate-500">PRIMARY NODE</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                activeTab === "failover"
                  ? "bg-rose-500/20 text-rose-700 dark:text-rose-300"
                  : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
              }`}
            >
              {activeTab === "failover" ? "FAULT / DOWN" : "MASTER"}
            </span>
          </div>
          <h4 className="font-bold text-base text-slate-900 dark:text-white">Edge-FW-01</h4>
          <p className="text-xs font-mono text-slate-500 mt-1">10.240.0.1 (Priority 150)</p>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 text-xs font-mono flex items-center justify-between text-slate-600 dark:text-slate-400">
            <span>VRID 51 Heartbeat:</span>
            <span>{activeTab === "failover" ? "STOPPED" : "EMITTING (1.0s)"}</span>
          </div>
        </div>

        {/* Node B (Secondary) */}
        <div
          className={`p-5 rounded-xl border transition-all duration-200 ${
            activeTab === "failover"
              ? "border-emerald-500/40 bg-emerald-500/[0.03] dark:bg-emerald-950/10 shadow-sm"
              : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0e14]"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-slate-500">SECONDARY NODE</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                activeTab === "failover"
                  ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                  : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400"
              }`}
            >
              {activeTab === "failover" ? "PROMOTED TO MASTER" : "BACKUP (STANDBY)"}
            </span>
          </div>
          <h4 className="font-bold text-base text-slate-900 dark:text-white">Edge-FW-02</h4>
          <p className="text-xs font-mono text-slate-500 mt-1">10.240.0.2 (Priority 100)</p>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 text-xs font-mono flex items-center justify-between text-slate-600 dark:text-slate-400">
            <span>Virtual IP (10.240.0.254):</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {activeTab === "failover" ? "BOUND TO ENP3S0" : "LISTENING"}
            </span>
          </div>
        </div>
      </div>

      {/* Trigger Simulation Button & Interactive Console */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0e14]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200">
              Run Real-Time Failover Verification Test
            </span>
          </div>
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-semibold transition-all duration-150 disabled:opacity-50 cursor-pointer shadow-xs"
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
            {isSimulating ? "Injecting Fault..." : "Execute Test"}
          </button>
        </div>

        {/* Live Output Box */}
        <div className="p-3 rounded-lg bg-slate-950 text-slate-200 font-mono text-xs min-h-[90px] border border-slate-800">
          {simulationLog.length === 0 ? (
            <span className="text-slate-500">
              Click &quot;Execute Test&quot; to simulate a live VRRP interface drop and verify sub-millisecond ARP propagation...
            </span>
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
  );
}
