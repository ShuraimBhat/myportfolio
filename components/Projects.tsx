"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { caseStudies, ProjectCaseStudy } from "@/data/projects";
import { ArrowUpRight, Check, X, Shield, Terminal, ChevronLeft, ChevronRight } from "lucide-react";

export default function Projects() {
  const [activeStudy, setActiveStudy] = useState<ProjectCaseStudy | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const currentProject = caseStudies[carouselIndex];

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  return (
    <section id="work" className="border-b border-[#e5e5e5] bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        
        {/* Section Header with Live Gallery Counter (from juanmoraromero.com) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e5e5e5]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#737373] block mb-2">
              01 // SELECTED CASE STUDIES
            </span>
            <h2 className="t-statement text-3xl sm:text-4xl font-bold text-[#171717]">
              Engineered Infrastructure &amp; Verification
            </h2>
          </div>

          {/* Interactive Slide Controls & Counter */}
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-[#737373]">
              <span className="text-sm font-bold text-[#171717]">
                0{carouselIndex + 1}
              </span>{" "}
              / 0{caseStudies.length}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-[#e5e5e5] flex items-center justify-center hover:bg-[#f3f4f6] text-[#171717] transition-colors cursor-pointer"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-[#e5e5e5] flex items-center justify-center hover:bg-[#f3f4f6] text-[#171717] transition-colors cursor-pointer"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Interactive Showcase Slide (Gallery Canvas Style) */}
        <div className="py-12 border-b border-[#e5e5e5]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="p-8 sm:p-10 rounded-2xl bg-[#f9fafb] border border-[#e5e5e5] space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#171717] text-white">
                    FEATURED {currentProject.number}
                  </span>
                  <span className="text-xs font-mono text-[#737373]">
                    {currentProject.category} · {currentProject.period}
                  </span>
                </div>
                <button
                  onClick={() => setActiveStudy(currentProject)}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#171717] hover:opacity-75 link-sweep py-1 cursor-pointer w-fit"
                >
                  Inspect Architecture Specs
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#171717]">
                  {currentProject.title}
                </h3>
                <p className="text-sm sm:text-base text-[#525252] mt-2 max-w-3xl leading-relaxed">
                  {currentProject.problem}
                </p>
              </div>

              {/* Highlight Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {currentProject.measurableResults.map((res, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-[#e5e5e5] text-xs font-mono">
                    <span className="text-base font-bold text-[#171717] block">
                      {res.metric}
                    </span>
                    <span className="text-[#737373] text-[11px] mt-1 block">
                      {res.description}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {currentProject.toolsAndTech.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-white border border-[#e5e5e5] text-[#525252]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Complete Case Studies Index List */}
        <div className="divide-y divide-[#e5e5e5] pt-4">
          {caseStudies.map((project, idx) => (
            <article
              key={project.id}
              onClick={() => setCarouselIndex(idx)}
              className={`py-8 group transition-colors px-4 -mx-4 rounded-xl cursor-pointer ${
                carouselIndex === idx ? "bg-[#f3f4f6]/60" : "hover:bg-[#f9fafb]/80"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-2 text-xs font-mono text-[#737373]">
                  <span className="text-lg font-bold text-[#171717] block">
                    {project.number}
                  </span>
                  <span>{project.period}</span>
                </div>

                <div className="lg:col-span-7">
                  <h4 className="text-lg sm:text-xl font-bold text-[#171717] group-hover:text-black transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#737373] mt-0.5">
                    {project.subtitle}
                  </p>
                </div>

                <div className="lg:col-span-3 flex lg:justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveStudy(project);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#171717] hover:opacity-75 py-1.5 border-b border-[#171717] cursor-pointer"
                  >
                    Inspect Details
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal with Smooth Backdrop & Scale Reveal */}
      <AnimatePresence>
        {activeStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveStudy(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className="bg-white border border-[#e5e5e5] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-6 border-b border-[#e5e5e5]">
                <div>
                  <span className="text-xs font-mono text-[#737373]">
                    {`${activeStudy.number} // ${activeStudy.category}`}
                  </span>
                  <h3 className="text-2xl font-bold text-[#171717] mt-1">
                    {activeStudy.title}
                  </h3>
                  <p className="text-xs font-mono text-[#737373] mt-0.5">
                    {activeStudy.role} · {activeStudy.period}
                  </p>
                </div>
                <button
                  onClick={() => setActiveStudy(null)}
                  className="p-2 text-[#737373] hover:text-[#171717] rounded-lg border border-[#e5e5e5] hover:bg-[#f9fafb] cursor-pointer transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="py-6 space-y-6 text-xs sm:text-sm text-[#525252]">
                <div>
                  <h4 className="font-bold text-xs font-mono uppercase text-[#171717] mb-2">
                    Engineering Context &amp; Problem
                  </h4>
                  <p className="leading-relaxed bg-[#f9fafb] p-4 rounded-xl border border-[#e5e5e5]">
                    {activeStudy.problem}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-xs font-mono uppercase text-[#171717] mb-2">
                    Technical Approach (3-Plane Architecture)
                  </h4>
                  <div className="space-y-3">
                    {activeStudy.technicalApproach.map((plane, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-[#e5e5e5]">
                        <span className="font-bold font-mono text-xs text-[#171717] block mb-2 flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5 text-emerald-600" />
                          {plane.title}
                        </span>
                        <ul className="space-y-1.5 list-disc list-inside text-xs text-[#525252]">
                          {plane.details.map((detail, dIdx) => (
                            <li key={dIdx} className="leading-relaxed">
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {activeStudy.sampleTraceSnippet && (
                  <div>
                    <h4 className="font-bold text-xs font-mono uppercase text-[#171717] mb-2 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" />
                      Trace Log ({activeStudy.sampleTraceSnippet.filename})
                    </h4>
                    <pre className="p-4 rounded-xl bg-[#171717] text-[#f9fafb] font-mono text-xs overflow-x-auto leading-relaxed">
                      <code>{activeStudy.sampleTraceSnippet.code}</code>
                    </pre>
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-xs font-mono uppercase text-[#171717] mb-2">
                    Measurable Results
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    {activeStudy.measurableResults.map((res, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#f9fafb] border border-[#e5e5e5]">
                        <div className="font-bold text-emerald-700 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          {res.metric}
                        </div>
                        <p className="text-[#737373] mt-1 text-[11px] leading-relaxed">
                          {res.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#e5e5e5] flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Evidence: {activeStudy.evidence.status}
                </span>
                <button
                  onClick={() => setActiveStudy(null)}
                  className="px-4 py-2 rounded-full bg-[#171717] text-white text-xs font-mono hover:bg-black cursor-pointer"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
