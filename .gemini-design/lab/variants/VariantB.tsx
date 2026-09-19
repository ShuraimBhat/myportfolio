"use client";

import React, { useState } from "react";
import { LAB_MOCK_NODES, LAB_MOCK_RULES } from "../data/fixtures";
import { Shield, Filter, Terminal, CheckCircle2 } from "lucide-react";

export function VariantB() {
  const [selectedNodeId, setSelectedNodeId] = useState("vrrp-01");
  const selectedNode = LAB_MOCK_NODES.find((n) => n.id === selectedNodeId) || LAB_MOCK_NODES[0];

  return (
    <div className="space-y-6">
      {/* Variant Header Info */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">
            Variant B • Modular Split-Pane Exploration
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Asymmetric Dual-Pane Policy & Live Inspection Workspace
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Two-column interactive workbench: select any node on the left to inspect deep socket telemetry on the right.
          </p>
        </div>
      </div>

      {/* Split-Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Topology Switcher */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Select Active Node:
          </div>
          {LAB_MOCK_NODES.map((node) => {
            const isSelected = node.id === selectedNodeId;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-cyan-500/10 border-cyan-500/40 shadow-sm ring-1 ring-cyan-500/20"
                    : "bg-white dark:bg-[#0c0e14] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Shield className={`w-4 h-4 ${isSelected ? "text-cyan-500" : "text-slate-400"}`} />
                    {node.name}
                  </span>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
                      isSelected
                        ? "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300"
                        : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {node.role}
                  </span>
                </div>
                <div className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>{node.ip}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{node.latencyMs} ms</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep Inspection Details */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4 mb-4">
              <div>
                <div className="text-xs font-mono uppercase text-slate-400">Node Deep Inspection</div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-2">
                  {selectedNode.name}
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </h4>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-slate-400">VRRP STATE</div>
                <div className="text-sm font-bold font-mono text-cyan-600 dark:text-cyan-400">
                  {selectedNode.role}
                </div>
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 font-mono text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                <span className="text-slate-400 block text-[11px]">VLAN & IP</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">{selectedNode.ip}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                <span className="text-slate-400 block text-[11px]">LATENCY</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{selectedNode.latencyMs} ms</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                <span className="text-slate-400 block text-[11px]">UPTIME</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">{selectedNode.uptime}</span>
              </div>
            </div>

            {/* Associated Firewall Security Policy */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-cyan-500" />
                  Active Firewall Ingress Rules
                </span>
                <span className="text-[11px] font-mono text-slate-400">nftables / iptables</span>
              </div>
              <div className="space-y-2">
                {LAB_MOCK_RULES.map((rule) => (
                  <div
                    key={rule.ruleId}
                    className="p-3 rounded-lg bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/5 flex items-center justify-between font-mono text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{rule.policyName}</span>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {rule.sourceZone} → {rule.destZone}
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          rule.action === "ALLOW"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : rule.action === "DROP"
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                            : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                        }`}
                      >
                        {rule.action}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">{rule.hitCount} hits</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Terminal Command Bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              keepalived.service active (running)
            </span>
            <span className="text-emerald-600 dark:text-emerald-400">PID 8492</span>
          </div>
        </div>
      </div>
    </div>
  );
}
