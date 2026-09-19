"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LayoutGrid, Check, Copy, ArrowLeft, SlidersHorizontal, Monitor } from "lucide-react";
import { VariantA } from "../variants/VariantA";
import { VariantB } from "../variants/VariantB";
import { VariantC } from "../variants/VariantC";
import { VariantD } from "../variants/VariantD";
import { VariantE } from "../variants/VariantE";

export type Density = "compact" | "comfortable" | "spacious";
export type VariantKey = "all" | "A" | "B" | "C" | "D" | "E";

export function LabShell() {
  const [selectedVariant, setSelectedVariant] = useState<VariantKey>("all");
  const [density, setDensity] = useState<Density>("comfortable");
  const [copied, setCopied] = useState(false);

  const densityPadding =
    density === "compact"
      ? "p-3 sm:p-4 gap-4"
      : density === "spacious"
      ? "p-6 sm:p-10 gap-10"
      : "p-4 sm:p-6 gap-6";

  const handleCopyFeedback = () => {
    const text = `Design Lab Review:
- Chosen Variant: ${selectedVariant === "all" ? "Comparing All Variants" : `Variant ${selectedVariant}`}
- Preferred Density: ${density}
- Feedback: `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-[#f8fafc] font-sans antialiased">
      {/* Top sticky control navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#090a0d]/80 backdrop-blur-md px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left branding */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition-colors"
              title="Return to Main Portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  DESIGN LAB v1.0
                </span>
                <span className="text-xs font-mono text-slate-400">Next.js 16 • Tailwind v4</span>
              </div>
              <h1 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                5 Distinct UI Design Explorations
              </h1>
            </div>
          </div>

          {/* Center / Right controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Density Selector */}
            <div className="flex items-center rounded-lg bg-slate-100 dark:bg-white/5 p-1 border border-slate-200 dark:border-white/10 text-xs font-mono">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
              <button
                onClick={() => setDensity("compact")}
                className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
                  density === "compact"
                    ? "bg-white dark:bg-[#0c0e14] text-slate-900 dark:text-white shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Compact
              </button>
              <button
                onClick={() => setDensity("comfortable")}
                className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
                  density === "comfortable"
                    ? "bg-white dark:bg-[#0c0e14] text-slate-900 dark:text-white shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Comfortable
              </button>
              <button
                onClick={() => setDensity("spacious")}
                className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
                  density === "spacious"
                    ? "bg-white dark:bg-[#0c0e14] text-slate-900 dark:text-white shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Spacious
              </button>
            </div>

            {/* Copy Feedback button */}
            <button
              onClick={handleCopyFeedback}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-mono font-medium transition-colors cursor-pointer text-slate-700 dark:text-slate-300"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              {copied ? "Copied Prompt!" : "Copy Feedback"}
            </button>

            {/* Dark / Light Mode Toggle */}
            <ThemeToggle />
          </div>
        </div>

        {/* Variant Tabs Navigation */}
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setSelectedVariant("all")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedVariant === "all"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold"
                : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Compare All Side-by-Side
          </button>
          <button
            onClick={() => setSelectedVariant("A")}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedVariant === "A"
                ? "bg-emerald-600 text-white font-bold"
                : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Variant A (Hierarchy)
          </button>
          <button
            onClick={() => setSelectedVariant("B")}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedVariant === "B"
                ? "bg-cyan-600 text-white font-bold"
                : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Variant B (Modular Layout)
          </button>
          <button
            onClick={() => setSelectedVariant("C")}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedVariant === "C"
                ? "bg-amber-600 text-white font-bold"
                : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Variant C (High Density)
          </button>
          <button
            onClick={() => setSelectedVariant("D")}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedVariant === "D"
                ? "bg-rose-600 text-white font-bold"
                : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Variant D (Interactions)
          </button>
          <button
            onClick={() => setSelectedVariant("E")}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedVariant === "E"
                ? "bg-indigo-600 text-white font-bold"
                : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Variant E (Brand & Depth)
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`max-w-7xl mx-auto flex flex-col ${densityPadding}`}>
        {selectedVariant === "all" ? (
          <div className="space-y-12">
            {/* Banner guidance */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    Side-by-Side Review Mode
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Scroll down to review each variant. Tell me which one fits best or which elements to synthesize into the final design!
                  </p>
                </div>
              </div>
            </div>

            <section className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#090b10]/60 backdrop-blur-xs">
              <VariantA />
            </section>

            <section className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#090b10]/60 backdrop-blur-xs">
              <VariantB />
            </section>

            <section className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#090b10]/60 backdrop-blur-xs">
              <VariantC />
            </section>

            <section className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#090b10]/60 backdrop-blur-xs">
              <VariantD />
            </section>

            <section className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#090b10]/60 backdrop-blur-xs">
              <VariantE />
            </section>
          </div>
        ) : (
          <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0c0e14]/90 shadow-sm backdrop-blur-xs">
            {selectedVariant === "A" && <VariantA />}
            {selectedVariant === "B" && <VariantB />}
            {selectedVariant === "C" && <VariantC />}
            {selectedVariant === "D" && <VariantD />}
            {selectedVariant === "E" && <VariantE />}
          </section>
        )}
      </main>
    </div>
  );
}
