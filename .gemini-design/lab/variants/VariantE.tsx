"use client";

import React from "react";
import { Shield, Radio, Lock, Sparkles, Network } from "lucide-react";

export function VariantE() {
  return (
    <div className="space-y-6">
      {/* Variant Header Info */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Variant E • Expressive Cyber Brand & Depth
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Tactile Glassmorphism & High-Fidelity Cyber Defense Surface
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Modern layered lighting, radial ambient glows, frosted card elevations, and cybernetic network aesthetics.
          </p>
        </div>
      </div>

      {/* Hero Showcase Card with Cyber Mesh & Ambient Glow */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-emerald-500/30 bg-gradient-to-b from-slate-50 to-white dark:from-[#0f141f] dark:to-[#090c13] p-6 shadow-lg shadow-emerald-500/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/15 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-3">
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
              ACTIVE DEFENSE MATRIX • REAP-04
            </div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              High Availability Virtual Router Redundancy
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl mt-1">
              Zero-downtime failover with keepalived VRRPv2/v3, nftables stateful packet tracking, and cross-plane daemon verification.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-black/40 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shrink-0 min-w-[200px] text-right">
            <span className="text-[11px] font-mono text-slate-400 block">SYSTEM CONVERGENCE</span>
            <span className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 block mt-1">
              &lt; 0.3 ms
            </span>
            <span className="text-[11px] font-mono text-slate-500">Continuous telemetry</span>
          </div>
        </div>
      </div>

      {/* Cybernetic Cards with Ambient Depth */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="group relative rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-[#0c0e14]/80 backdrop-blur-md p-5 hover:border-emerald-500/50 transition-all duration-300 shadow-xs hover:shadow-md hover:shadow-emerald-500/5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5" />
          </div>
          <h5 className="font-bold text-sm text-slate-900 dark:text-white">NGFW Stateful Inspection</h5>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Application-layer deep packet inspection (DPI) with custom Scapy fuzz test verification.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
            <span>nftables flow offload</span>
            <span>ENABLED</span>
          </div>
        </div>

        <div className="group relative rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-[#0c0e14]/80 backdrop-blur-md p-5 hover:border-cyan-500/50 transition-all duration-300 shadow-xs hover:shadow-md hover:shadow-cyan-500/5">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Network className="w-5 h-5" />
          </div>
          <h5 className="font-bold text-sm text-slate-900 dark:text-white">OSPF Area 0 Backbone</h5>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Dynamic shortest-path first routing convergence across Cisco Catalyst and Linux gateways.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono text-cyan-600 dark:text-cyan-400 font-medium">
            <span>LSA Type 1/2</span>
            <span>SYNCED</span>
          </div>
        </div>

        <div className="group relative rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-[#0c0e14]/80 backdrop-blur-md p-5 hover:border-amber-500/50 transition-all duration-300 shadow-xs hover:shadow-md hover:shadow-amber-500/5">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Lock className="w-5 h-5" />
          </div>
          <h5 className="font-bold text-sm text-slate-900 dark:text-white">SSL VPN WireGuard Tunnel</h5>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            ChaCha20-Poly1305 encrypted encapsulation with zero DNS leak verification.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono text-amber-600 dark:text-amber-400 font-medium">
            <span>ECDH Handshake</span>
            <span>VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
