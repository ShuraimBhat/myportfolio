"use client";

import React from "react";
import { certificationsData, educationData } from "@/data/credentials";
import { Award, GraduationCap, CheckCircle } from "lucide-react";

export default function CertificationsEducation() {
  return (
    <section id="credentials" className="border-b border-[#e5e5e5] bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e5e5e5]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#737373] block mb-2">
              04 // CREDENTIALS &amp; ACADEMIC FOUNDATION
            </span>
            <h2 className="t-statement text-3xl sm:text-4xl font-bold text-[#171717]">
              Education &amp; Certifications
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#737373] max-w-md">
            Formal systems engineering degree and verified Cisco Networking Academy credentials.
          </p>
        </div>

        {/* Two-Column Editorial Grid */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Education */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl border border-[#e5e5e5] bg-[#f9fafb] space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#737373]">
                <GraduationCap className="w-4 h-4 text-[#171717]" />
                <span>ACADEMIC DEGREE</span>
              </div>

              <div>
                <span className="text-xs font-mono text-emerald-700 font-bold block mb-1">
                  Class of {educationData.graduationYear}
                </span>
                <h3 className="text-2xl font-bold text-[#171717]">
                  {educationData.degree}
                </h3>
                <p className="text-sm font-semibold text-[#525252] mt-1">
                  {educationData.major}
                </p>
                <p className="text-xs text-[#737373] mt-2">
                  {educationData.institution} · {educationData.university}
                </p>
              </div>

              <div className="pt-4 border-t border-[#e5e5e5]">
                <span className="text-xs font-mono uppercase text-[#737373] block mb-2 font-semibold">
                  Core Focus Areas
                </span>
                <ul className="space-y-1.5 text-xs text-[#525252] font-mono">
                  {educationData.focusAreas.map((area, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[11px] font-mono text-[#a3a3a3] pt-2 border-t border-[#e5e5e5]">
                {educationData.note}
              </p>
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#737373] mb-2">
              <Award className="w-4 h-4 text-[#171717]" />
              <span>VERIFIED CERTIFICATIONS &amp; ACADEMIC TRAINING</span>
            </div>

            <div className="divide-y divide-[#e5e5e5] border-y border-[#e5e5e5]">
              {certificationsData.map((cert) => (
                <div key={cert.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-[#171717]">{cert.title}</h4>
                    <p className="text-xs font-mono text-[#737373] mt-0.5">
                      {cert.issuer} · {cert.credentialNote}
                    </p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
