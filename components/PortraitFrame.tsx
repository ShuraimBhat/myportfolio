"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Camera } from "lucide-react";

interface PortraitFrameProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function PortraitFrame({ size = "md", className = "" }: PortraitFrameProps) {
  const [imageError, setImageError] = useState(false);

  // Size mapping
  const sizeClasses = {
    sm: "w-8 h-8 rounded-full",
    md: "w-28 h-28 sm:w-32 sm:h-32 rounded-2xl",
    lg: "w-36 h-36 sm:w-44 sm:h-44 rounded-2xl",
  };

  return (
    <div
      className={`relative overflow-hidden border border-[#e5e5e5] bg-[#f3f4f6] flex items-center justify-center shrink-0 group transition-all duration-300 hover:border-[#171717] ${sizeClasses[size]} ${className}`}
    >
      {!imageError ? (
        <Image
          src="/avatar.jpg"
          alt="Shuraim Shakeel Bhat | Network Security Engineer"
          fill
          sizes={size === "sm" ? "32px" : "128px"}
          className="object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-500"
          onError={() => setImageError(true)}
          priority
        />
      ) : (
        /* Sleek Editorial Placeholder for Shuraim's Photo */
        <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-[#f5f5f7] select-none">
          {size === "sm" ? (
            <User className="w-4 h-4 text-[#737373]" />
          ) : (
            <div className="flex flex-col items-center justify-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-white border border-[#e5e5e5] flex items-center justify-center text-[#171717] group-hover:scale-110 transition-transform">
                <Camera className="w-4 h-4 text-[#737373]" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#171717] font-semibold">
                Photo Space
              </span>
              <span className="text-[9px] font-mono text-[#a3a3a3] leading-tight px-1">
                Drop photo in /public/avatar.jpg
              </span>
            </div>
          )}
        </div>
      )}

      {/* Subtle corner badge for verification status in md/lg */}
      {size !== "sm" && (
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" title="Verified Engineer Profile" />
      )}
    </div>
  );
}
