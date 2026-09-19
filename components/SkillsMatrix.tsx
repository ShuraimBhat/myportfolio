"use client";

import React from "react";
import { skillsData } from "@/data/skills";

export default function SkillsMatrix() {
  return (
    <section id="stack" className="border-b border-[#e5e5e5] bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e5e5e5]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#737373] block mb-2">
              03 // CAPABILITIES &amp; ENGINEERING STACK
            </span>
            <h2 className="t-statement text-3xl sm:text-4xl font-bold text-[#171717]">
              Technical Competencies
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#737373] max-w-md">
            Protocol engineering, perimeter security, kernel routing, and automated wire forensics.
          </p>
        </div>

        {/* 4-Column Editorial Matrix */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((group, idx) => (
            <div key={group.id} className="space-y-4">
              <div className="pb-3 border-b border-[#e5e5e5]">
                <span className="text-xs font-mono text-[#737373] block">
                  {`0${idx + 1} // ${group.category}`}
                </span>
                <h3 className="text-base font-bold text-[#171717] mt-1">
                  {group.title}
                </h3>
              </div>

              <ul className="space-y-3">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="text-xs">
                    <span className="font-semibold text-[#171717] block">
                      {skill.name}
                    </span>
                    {skill.note && (
                      <span className="text-[11px] font-mono text-[#737373] block mt-0.5">
                        {skill.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
