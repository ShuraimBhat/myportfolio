"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#e5e5e5] bg-white py-12 text-xs font-mono text-[#737373]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="font-bold text-[#171717] text-sm">s.sb</span>
          <span className="hidden sm:inline text-[#d4d4d4]">/</span>
          <span>Shuraim Shakeel Bhat</span>
          <span className="hidden sm:inline text-[#d4d4d4]">/</span>
          <span>Network Security Engineer</span>
        </div>

        {/* Center / Right Info */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Telemetry: 0.28ms VIP Latency Verified</span>
          </div>
          <span>Kashmir · 2026</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#171717] hover:opacity-75 transition-opacity cursor-pointer link-sweep"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
