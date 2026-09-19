"use client";

import { useState } from "react";
import { packetScenarios, PacketScenario, FlowStage } from "@/data/packetScenarios";
import {
  ChevronRight,
  ChevronLeft,
  Terminal,
  Radio,
  Check,
  AlertCircle,
  FileCode,
  ArrowRight,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { triggerTechConfetti } from "@/lib/confetti";

export default function PacketPathReplay() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("ssl-vpn-reconnect");
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const activeScenario: PacketScenario =
    packetScenarios.find((s) => s.id === selectedScenarioId) || packetScenarios[0];

  const currentStage: FlowStage = activeScenario.stages[activeStageIndex];

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    setActiveStageIndex(0);
    triggerTechConfetti();
  };

  const handlePrevStage = () => {
    setActiveStageIndex((prev) => (prev > 0 ? prev - 1 : activeScenario.stages.length - 1));
  };

  const handleNextStage = () => {
    const nextIdx = activeStageIndex < activeScenario.stages.length - 1 ? activeStageIndex + 1 : 0;
    setActiveStageIndex(nextIdx);
    if (nextIdx === activeScenario.stages.length - 1) {
      triggerTechConfetti();
    }
  };

  const handleStageClick = (sIdx: number) => {
    setActiveStageIndex(sIdx);
    if (sIdx === activeScenario.stages.length - 1) {
      triggerTechConfetti();
    }
  };

  const getStatusBadge = (status: FlowStage["status"]) => {
    switch (status) {
      case "ANOMALY_DETECTED":
        return {
          label: "Anomaly Flagged",
          className: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
          icon: AlertCircle,
        };
      case "PATCH_APPLIED":
        return {
          label: "Patch Applied",
          className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
          icon: FileCode,
        };
      case "VERIFIED_PASS":
        return {
          label: "Verified Pass",
          className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
          icon: Check,
        };
      default:
        return {
          label: "Normal Flow",
          className: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30",
          icon: Activity,
        };
    }
  };

  return (
    <SpotlightCard
      tilt={false}
      spotlightColor="rgba(16, 185, 129, 0.12)"
      className="rounded-2xl border-slate-200/80 dark:border-white/[0.12] shadow-xl dark:shadow-2xl p-6 sm:p-8 space-y-8"
    >
      
      {/* Top Bar: Title & Sanitized Lab Data Disclaimer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase mb-1">
            <Radio className="w-3.5 h-3.5" />
            <span>Interactive Diagnostic Engine</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Packet Path Replay: Multi-Tier Convergence
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans mt-1">
            Trace packet transformation across all five networking planes: from Web GUI schema down to wire frame capture.
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="self-start md:self-auto px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300 font-mono text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400" />
          <span>LAB SIMULATION &bull; SANITIZED TEST DATA</span>
        </div>
      </div>

      {/* Scenario Selector Pills with Sliding Motion Indicator */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
          Select Diagnostic Scenario:
        </div>
        <div
          role="tablist"
          aria-label="Packet Path Replay Scenarios"
          className="flex flex-wrap gap-2 relative"
        >
          {packetScenarios.map((scenario) => {
            const isSelected = scenario.id === selectedScenarioId;
            return (
              <button
                key={scenario.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                aria-controls={`scenario-panel-${scenario.id}`}
                id={`scenario-tab-${scenario.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleScenarioChange(scenario.id)}
                className={`relative px-4 py-2 min-h-[44px] rounded-xl text-xs font-mono transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 z-10 cursor-pointer ${
                  isSelected
                    ? "text-emerald-700 dark:text-emerald-400 font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="active-scenario-pill"
                    className="absolute inset-0 rounded-xl bg-emerald-500/15 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)] -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {scenario.shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Scenario Overview Card */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] space-y-2 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-slate-900 dark:text-white font-bold text-sm">
            {activeScenario.title}
          </span>
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 text-[11px] self-start sm:self-auto font-semibold">
            {activeScenario.trafficType}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 font-sans text-xs sm:text-sm leading-relaxed">
          {activeScenario.description}
        </p>

        {/* Node schematic path */}
        <div className="pt-2 border-t border-slate-200/80 dark:border-white/[0.06] flex flex-wrap items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300">
          <span className="text-slate-400 dark:text-slate-500">PATH:</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{activeScenario.topologyNodes.source}</span>
          <ArrowRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
          <span className="text-slate-700 dark:text-slate-300">{activeScenario.topologyNodes.ingress}</span>
          <ArrowRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{activeScenario.topologyNodes.processing}</span>
          <ArrowRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
          <span className="text-amber-600 dark:text-amber-400 font-semibold">{activeScenario.topologyNodes.egress}</span>
          <ArrowRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
          <span className="text-purple-600 dark:text-purple-400 font-semibold">{activeScenario.topologyNodes.destination}</span>
        </div>
      </div>

      {/* Five-Stage Directional Flow Graph with Dynamic Progress Pulse */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="font-semibold uppercase tracking-wider">
            5-Stage Directional Packet Pipeline (Click stage to inspect):
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevStage}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
              aria-label="Previous pipeline stage"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-slate-900 dark:text-white font-mono text-xs font-bold">
              {activeStageIndex + 1} / {activeScenario.stages.length}
            </span>
            <button
              type="button"
              onClick={handleNextStage}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
              aria-label="Next pipeline stage"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Directional Stage Nodes Bar with Motion Indicator */}
        <div
          role="tablist"
          aria-label="Pipeline Stages"
          className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-xs relative"
        >
          {activeScenario.stages.map((stage, sIdx) => {
            const isStageActive = sIdx === activeStageIndex;
            const badge = getStatusBadge(stage.status);
            const StatusIcon = badge.icon;

            return (
              <button
                key={stage.stageId}
                role="tab"
                type="button"
                aria-selected={isStageActive}
                aria-controls={`stage-panel-${stage.stageId}`}
                id={`stage-tab-${stage.stageId}`}
                tabIndex={isStageActive ? 0 : -1}
                onClick={() => handleStageClick(sIdx)}
                className={`relative p-3.5 min-h-[44px] rounded-xl text-left transition-all border flex flex-col justify-between space-y-2 focus-visible:ring-2 focus-visible:ring-emerald-400 z-10 cursor-pointer ${
                  isStageActive
                    ? "border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] bg-emerald-500/10"
                    : "bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.2] hover:bg-slate-100 dark:hover:bg-white/[0.04]"
                }`}
              >
                {isStageActive && (
                  <motion.span
                    layoutId="active-stage-indicator"
                    className="absolute inset-0 rounded-xl bg-emerald-500/10 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${isStageActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"}`}>
                    0{sIdx + 1}.
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] border flex items-center gap-1 ${badge.className}`}>
                    <StatusIcon className="w-2.5 h-2.5" />
                    <span>{stage.status.split("_")[0]}</span>
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-900 dark:text-white leading-tight">
                  {stage.title.split(". ")[1] || stage.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Detail Inspector Panel with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.stageId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          id={`stage-panel-${currentStage.stageId}`}
          role="tabpanel"
          aria-labelledby={`stage-tab-${currentStage.stageId}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-[#08090d] border border-slate-200/80 dark:border-white/[0.08]"
        >
          {/* Left: What was Inspected & Action Taken (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.06] pb-3">
              <div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                  STAGE 0{activeStageIndex + 1} INSPECTION
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
                  {currentStage.title}
                </h4>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">{currentStage.subtitle}</div>
              </div>

              {(() => {
                const badge = getStatusBadge(currentStage.status);
                const BadgeIcon = badge.icon;
                return (
                  <div className={`px-2.5 py-1 rounded-full text-xs font-mono border flex items-center gap-1.5 ${badge.className}`}>
                    <BadgeIcon className="w-3 h-3" />
                    <span>{badge.label}</span>
                  </div>
                );
              })()}
            </div>

            {/* Inspected Details */}
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                [1] What Was Inspected:
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                {currentStage.inspected}
              </p>
            </div>

            {/* Action Taken */}
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-wider">
                [2] What Was Changed / Configured:
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                {currentStage.actionTaken}
              </p>
            </div>
          </div>

          {/* Right: Sanitized Kernel / Protocol Log Box (6 Cols) */}
          <div className="lg:col-span-6 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px] pb-1 border-b border-slate-200 dark:border-white/[0.06]">
              <span className="text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1.5">
                <Terminal className="w-3 h-3" />
                <span>LOG / CONSOLE CAPTURE</span>
              </span>
              <span className="text-slate-500">[SANITIZED LAB TRACE]</span>
            </div>

            <pre
              className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 dark:border-white/[0.08] overflow-x-auto leading-relaxed text-[11px] h-[200px]"
              tabIndex={0}
              aria-label="Sanitized stage telemetry log"
            >
              {currentStage.sanitizedLog}
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Scenario Technical Takeaway Footer */}
      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div>
          <div className="text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px]">Root Cause Inspected</div>
          <div className="text-slate-900 dark:text-white font-sans text-xs mt-1 leading-normal">
            {activeScenario.summaryResults.inspectedSummary}
          </div>
        </div>
        <div>
          <div className="text-emerald-600 dark:text-emerald-400 uppercase font-bold text-[10px]">Remediation Deployed</div>
          <div className="text-slate-900 dark:text-white font-sans text-xs mt-1 leading-normal">
            {activeScenario.summaryResults.changeSummary}
          </div>
        </div>
        <div>
          <div className="text-cyan-600 dark:text-cyan-400 uppercase font-bold text-[10px]">Verification Outcome</div>
          <div className="text-slate-900 dark:text-white font-sans text-xs mt-1 leading-normal">
            {activeScenario.summaryResults.verificationSummary}
          </div>
        </div>
      </div>

    </SpotlightCard>
  );
}
