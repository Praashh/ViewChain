"use client"
import React from "react";

export const ScrollingTokenWarningBanner = () => {
  return (
    <div className="relative overflow-hidden whitespace-nowrap bg-black text-red-400 py-3 font-semibold mb-20">
      <div className="inline-block whitespace-nowrap animate-[scroll_15s_linear_infinite]">
        <span className="mr-12">
          We don't have any tokens anywhere, if you find then it's scam, this project was just for a hackathon
        </span>
        <span className="mr-12">
          We don't have any tokens anywhere, if you find then it's scam, this project was just for a hackathon
        </span>
      </div>

      {/* Inline keyframes — pure Tailwind-compatible */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

