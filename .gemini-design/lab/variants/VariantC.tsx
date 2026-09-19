"use client";

import React from "react";
import { LAB_MOCK_NODES, LAB_MOCK_RULES } from "../data/fixtures";
import { Table, Server, RefreshCw } from "lucide-react";

export function VariantC() {
  return (
    <div className="space-y-4">
      {/* Variant Header Info */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
            Variant C • High-Density Compact Mode
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            Network Operations Center (NOC) Condensed Telemetry
          </h3>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            4-8px micro-grid layout designed for high-information throughput, terminal aesthetics, and data-dense scanning.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-[11px] font-mono hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>
        </div>
      </div>

      {/* Condensed Metric Bar */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-xs font-mono">
        <div className="p-2.5 rounded bg-slate-50 dark:bg-[#0c0e14] border border-slate-200 dark:border-white/10">
          <span className="text-[10px] text-slate-400 block">TOTAL NODES</span>
          <span className="text-base font-bold text-slate-900 dark:text-white">4 UP</span>
        </div>
        <div className="p-2.5 rounded bg-slate-50 dark:bg-[#0c0e14] border border-slate-200 dark:border-white/10">
          <span className="text-[10px] text-slate-400 block">VRRP VRID</span>
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">51 (VIP)</span>
        </div>
        <div className="p-2.5 rounded bg-slate-50 dark:bg-[#0c0e14] border border-slate-200 dark:border-white/10">
          <span className="text-[10px] text-slate-400 block">PACKET LOSS</span>
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">0.00%</span>
        </div>
        <div className="p-2.5 rounded bg-slate-50 dark:bg-[#0c0e14] border border-slate-200 dark:border-white/10">
          <span className="text-[10px] text-slate-400 block">AVG JITTER</span>
          <span className="text-base font-bold text-slate-900 dark:text-white">0.04 ms</span>
        </div>
        <div className="p-2.5 rounded bg-slate-50 dark:bg-[#0c0e14] border border-slate-200 dark:border-white/10">
          <span className="text-[10px] text-slate-400 block">TCP SESSIONS</span>
          <span className="text-base font-bold text-cyan-600 dark:text-cyan-400">14,289</span>
        </div>
        <div className="p-2.5 rounded bg-slate-50 dark:bg-[#0c0e14] border border-slate-200 dark:border-white/10">
          <span className="text-[10px] text-slate-400 block">TLS 1.3 RATIO</span>
          <span className="text-base font-bold text-indigo-600 dark:text-indigo-400">98.4%</span>
        </div>
      </div>

      {/* High Density Table */}
      <div className="border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden bg-white dark:bg-[#0c0e14]">
        <div className="px-3 py-2 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Table className="w-3.5 h-3.5 text-amber-500" />
            Infrastructure Telemetry Matrix
          </span>
          <span className="text-slate-400 text-[10px]">Auto-polled 1s</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-white/10 text-slate-500 bg-slate-50/50 dark:bg-white/[0.02]">
                <th className="py-2 px-3">Node / Daemon</th>
                <th className="py-2 px-3">Role</th>
                <th className="py-2 px-3">IP Address</th>
                <th className="py-2 px-3 text-right">Latency</th>
                <th className="py-2 px-3 text-right">CPU</th>
                <th className="py-2 px-3 text-right">Availability</th>
                <th className="py-2 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {LAB_MOCK_NODES.map((node) => (
                <tr key={node.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="py-2 px-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-slate-400" />
                    {node.name}
                  </td>
                  <td className="py-2 px-3">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                      {node.role}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-400">{node.ip}</td>
                  <td className="py-2 px-3 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                    {node.latencyMs} ms
                  </td>
                  <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-400">
                    {node.cpuPercent}%
                  </td>
                  <td className="py-2 px-3 text-right text-slate-800 dark:text-slate-200">
                    {node.uptime}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compact Policy Hit-Counter */}
      <div className="p-3 rounded-lg bg-slate-50/60 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
        <div className="text-[11px] font-mono uppercase text-slate-500 mb-2 font-semibold">
          Firewall Policy Hit Density
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-mono">
          {LAB_MOCK_RULES.map((rule) => (
            <div
              key={rule.ruleId}
              className="p-2 rounded border border-slate-200/80 dark:border-white/5 bg-white dark:bg-[#0c0e14] flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200">{rule.ruleId}</div>
                <div className="text-[10px] text-slate-400">{rule.policyName}</div>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                {rule.hitCount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
