"use client";

import React from "react";
import { LAB_MOCK_NODES, LAB_MOCK_ALERTS } from "../data/fixtures";
import { ShieldCheck, Activity, Cpu, ArrowUpRight, Server } from "lucide-react";

export function VariantA() {
  return (
    <div className="space-y-6">
      {/* Variant Header Info */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
            Variant A • Hierarchy Focus
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Executive High-Level Telemetry & Topology Status
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Optimized for rapid visual scanning by technical recruiters and engineering managers.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Cluster Synchronized
        </span>
      </div>

      {/* KPI Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-mono">
            <span>VIP STATE</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-2">
            10.240.0.254
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            MASTER • VRID 51 (Priority 150)
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-mono">
            <span>FAILOVER LATENCY</span>
            <Activity className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-2">
            0.28 ms
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            GARP broadcast verified
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-mono">
            <span>CPU UTILIZATION</span>
            <Cpu className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-2">
            14.2%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            2 Cores • nftables kernel bypass
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-mono">
            <span>UPTIME INTEGRITY</span>
            <Server className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-2">
            99.998%
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            Continuous health ping active
          </div>
        </div>
      </div>

      {/* Primary Infrastructure Nodes List */}
      <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50/50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold">
            Cluster Nodes & Routing Roles
          </h4>
          <span className="text-xs text-slate-500 font-mono">4 Nodes Online</span>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {LAB_MOCK_NODES.map((node) => (
            <div
              key={node.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    node.state === "healthy"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                />
                <div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-white">
                    {node.name}
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {node.ip}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-bold">
                  {node.role}
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  {node.latencyMs} ms
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {node.uptime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Verification Alerts */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#0c0e14]/50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase text-slate-600 dark:text-slate-400 font-medium">
            Recent Daemon Verifications
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="space-y-2">
          {LAB_MOCK_ALERTS.map((alert) => (
            <div
              key={alert.id}
              className="p-2.5 rounded-lg bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  [{alert.source}]
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  {alert.message}
                </span>
              </div>
              <span className="text-slate-400 shrink-0 text-[11px]">
                {alert.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
