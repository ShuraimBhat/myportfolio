"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ShieldCheck, Activity } from "lucide-react";
import PortraitFrame from "@/components/PortraitFrame";

export default function Hero() {
  const statementWords = [
    "Shuraim", "Shakeel", "Bhat", "is", "a", "Network", "Security", "Engineer",
    "specializing", "in", "Next-Generation", "Firewalls,", "keepalived", "VRRP",
    "high", "availability,", "and", "automated", "cross-plane", "verification."
  ];

  return (
    <section className="relative border-b border-[#e5e5e5] bg-[#f9fafb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-28">
        
        {/* Top Profile Intro Block with Dedicated Photo Space (Just like juanmoraromero.com) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12 p-6 rounded-2xl bg-white border border-[#e5e5e5] shadow-xs"
        >
          {/* Portrait Photo Space */}
          <PortraitFrame size="md" />

          {/* Intro Narrative beside portrait */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#737373]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Technical Roles &amp; Infrastructure Engineering</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight">
              Shuraim Shakeel Bhat
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#525252] max-w-xl leading-relaxed">
              Based in Kashmir · UTC+5:30 · Deploying, configuring, and verifying carrier-grade NGFWs, Cisco Catalyst cores, and Linux kernel packet filtering.
            </p>
          </div>
        </motion.div>

        {/* Directional Arrow & Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.div
            whileHover={{ x: 2, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-7 h-7 rounded flex items-center justify-center border border-[#e5e5e5] bg-white text-[#171717] shadow-2xs"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 8.66667H1V0M7.83784 4.64286L12 8.66667L7.83784 13"
                stroke="currentColor"
                strokeWidth="1.75"
              />
            </svg>
          </motion.div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#737373]">
            Statement of Practice // 2026
          </span>
        </motion.div>

        {/* Staggered Big Editorial Headline (Juan Mora Romero Reveal Animation) */}
        <h1 className="t-statement text-3xl sm:text-5xl lg:text-6xl font-bold text-[#171717] max-w-5xl leading-[1.08] flex flex-wrap gap-x-3 gap-y-1">
          {statementWords.map((word, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.15 + idx * 0.025,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mt-8 text-base sm:text-lg text-[#737373] max-w-3xl leading-relaxed"
        >
          Designing resilient enterprise transit architectures across Cisco Catalyst 3560 and MikroTik RouterOS. Validating packet lifecycles, cryptographic tunnels, and sub-millisecond failover states through synthetic Wireshark and Scapy forensics.
        </motion.p>

        {/* Quick CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#171717] text-white text-xs font-mono font-medium hover:bg-black transition-all active:scale-[0.98] cursor-pointer shadow-xs"
          >
            Explore Case Studies
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
          <a
            href="#experience"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#e5e5e5] bg-white text-[#171717] text-xs font-mono font-medium hover:bg-[#f3f4f6] transition-all active:scale-[0.98] cursor-pointer shadow-2xs"
          >
            Engineering Track Record
          </a>
        </motion.div>

        {/* Editorial Bottom Meta Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 sm:mt-24 pt-8 border-t border-[#e5e5e5] grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-mono"
        >
          <div>
            <span className="text-[#a3a3a3] uppercase block mb-1">Core Disciplines</span>
            <span className="text-[#171717] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              NGFW · VRRPv2/v3 · OSPF Area 0 · WireGuard
            </span>
          </div>

          <div>
            <span className="text-[#a3a3a3] uppercase block mb-1">Engineering Benchmark</span>
            <span className="text-[#171717] font-semibold flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-600" />
              0.28ms Failover · Zero Packet Drops Verified
            </span>
          </div>

          <div>
            <span className="text-[#a3a3a3] uppercase block mb-1">Location &amp; Availability</span>
            <span className="text-[#171717] font-semibold">
              Kashmir · Available for Remote &amp; On-Site
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
