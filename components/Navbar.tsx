"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import PortraitFrame from "@/components/PortraitFrame";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "01. Work", href: "#work" },
    { label: "02. Experience", href: "#experience" },
    { label: "03. Stack", href: "#stack" },
    { label: "04. Credentials", href: "#credentials" },
    { label: "05. Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f9fafb]/90 backdrop-blur-md border-b border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">
        {/* Left Monogram / Brand with Mini Portrait Frame */}
        <div className="flex items-center gap-3">
          <PortraitFrame size="sm" />
          <Link
            href="/"
            className="text-base font-bold tracking-tight text-[#171717] hover:opacity-75 transition-opacity"
          >
            s.sb
          </Link>
          <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-wider text-[#737373] border-l border-[#e5e5e5] pl-3">
            Network Security Engineer
          </span>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#737373] hover:text-[#171717] transition-colors link-sweep py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Status & Contact Action */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#737373]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for roles</span>
          </div>
          <a
            href="#contact"
            className="flex items-center gap-1 text-xs font-mono font-bold text-[#171717] hover:opacity-75 transition-opacity py-1 link-sweep"
          >
            Get in touch
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#171717] hover:bg-[#e5e5e5]/50 rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e5e5e5] bg-[#f9fafb] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-mono py-2 text-[#737373] hover:text-[#171717]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#e5e5e5] flex items-center justify-between text-xs font-mono">
            <span className="text-[#737373]">Status: Available</span>
            <a href="#contact" className="font-bold text-[#171717]">
              Get in touch →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
