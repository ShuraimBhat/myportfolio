"use client";

import React, { useState } from "react";
import { ArrowUpRight, Mail, Check } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("shuraimbhat@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="border-b border-[#e5e5e5] bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e5e5e5]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#737373] block mb-2">
              05 // INITIATE TRANSMISSION
            </span>
            <h2 className="t-statement text-3xl sm:text-5xl font-bold text-[#171717]">
              Let&apos;s build reliable, hardened networks.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#737373] max-w-sm">
            Available for full-time Network Security roles, infrastructure audits, and appliance lab contracts.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-[#737373] block">
                Direct Electronic Mail
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="mailto:shuraimbhat@gmail.com"
                  className="text-xl sm:text-2xl font-bold text-[#171717] hover:opacity-75 transition-opacity link-sweep"
                >
                  shuraimbhat@gmail.com
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded text-xs font-mono border border-[#e5e5e5] bg-white text-[#171717] hover:bg-[#f3f4f6] cursor-pointer transition-colors"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-[#e5e5e5]">
              <span className="text-xs font-mono uppercase text-[#737373] block">
                Network Coordinates &amp; Profiles
              </span>
              <div className="space-y-3 font-mono text-xs">
                <a
                  href="https://linkedin.com/in/shuraim-shakeel-bhat-765076237"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-[#e5e5e5] bg-white hover:bg-[#f3f4f6] text-[#171717] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#737373]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    linkedin.com/in/shuraim-shakeel-bhat-765076237
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#737373]" />
                </a>

                <a
                  href="https://github.com/shuraimbhat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-[#e5e5e5] bg-white hover:bg-[#f3f4f6] text-[#171717] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#737373]" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    github.com/shuraimbhat
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#737373]" />
                </a>
              </div>
            </div>

            <div className="text-xs font-mono text-[#737373] pt-4">
              <span className="block text-[#171717] font-semibold">Location:</span>
              Kashmir · UTC+5:30 (IST) · Open to global relocation &amp; remote.
            </div>
          </div>

          {/* Right Column: Clean Editorial Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-[#e5e5e5]">
            <h3 className="text-lg font-bold text-[#171717] mb-6">
              Send Direct Message
            </h3>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                  <Check className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-emerald-900">Message Dispatched</h4>
                <p className="text-xs font-mono text-emerald-700">
                  Thank you. Your message has been logged. I will reply within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs font-mono">
                <div>
                  <label className="block text-[#737373] uppercase mb-2">
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera, Staff Infrastructure Architect"
                    className="w-full bg-[#f9fafb] border border-[#e5e5e5] rounded-lg px-4 py-3 text-sm text-[#171717] placeholder:text-[#a3a3a3] focus:border-[#171717] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#737373] uppercase mb-2">
                    Electronic Mail Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@enterprise.net"
                    className="w-full bg-[#f9fafb] border border-[#e5e5e5] rounded-lg px-4 py-3 text-sm text-[#171717] placeholder:text-[#a3a3a3] focus:border-[#171717] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#737373] uppercase mb-2">
                    Technical Scope or Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Discussing network engineering roles, NGFW perimeter auditing, or protocol verification..."
                    className="w-full bg-[#f9fafb] border border-[#e5e5e5] rounded-lg px-4 py-3 text-sm text-[#171717] placeholder:text-[#a3a3a3] focus:border-[#171717] outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#171717] hover:bg-black text-white text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Transmit Transmission
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
