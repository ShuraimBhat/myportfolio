"use client";

import React from "react";
import { experiencesData } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="border-b border-[#e5e5e5] bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e5e5e5]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#737373] block mb-2">
              02 // EXPERIENCE &amp; TRACK RECORD
            </span>
            <h2 className="t-statement text-3xl sm:text-4xl font-bold text-[#171717]">
              Professional Experience
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#737373] max-w-md">
            Production engineering deployments, firewall testing suites, and appliance kernel bugfixes.
          </p>
        </div>

        {/* Timeline List */}
        <div className="divide-y divide-[#e5e5e5]">
          {experiencesData.map((exp) => (
            <div key={exp.id} className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Dates & Location */}
              <div className="lg:col-span-3 text-xs font-mono text-[#737373]">
                <span className="text-sm font-bold text-[#171717] block mb-1">
                  {exp.period}
                </span>
                <span className="block">{exp.type}</span>
                <span className="block text-[#a3a3a3] mt-1">{exp.location}</span>
              </div>

              {/* Company & Role */}
              <div className="lg:col-span-4">
                <h3 className="text-2xl font-bold text-[#171717]">{exp.company}</h3>
                <p className="text-sm font-semibold text-[#525252] mt-1">{exp.role}</p>
                <p className="text-xs text-[#737373] mt-3 leading-relaxed">
                  {exp.summary}
                </p>
              </div>

              {/* Responsibilities & Tech Stack */}
              <div className="lg:col-span-5 space-y-4">
                <ul className="space-y-2 text-xs sm:text-sm text-[#525252]">
                  {exp.responsibilities.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-[#171717] font-bold mt-1 text-[10px]">/</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#f3f4f6] text-[#525252] border border-[#e5e5e5]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
