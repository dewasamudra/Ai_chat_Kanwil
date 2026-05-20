"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

interface BixbyOrbProps {
  state: "idle" | "listening" | "thinking";
  onClick: () => void;
  isOpen: boolean;
}

export function BixbyOrb({ state, onClick, isOpen }: BixbyOrbProps) {
  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 z-50 animate-bixby-idle group hover:scale-110"
      style={{
        background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
        backgroundSize: "200% 200%",
      }}
    >
      {state === "idle" && <MessageSquare className="text-white w-7 h-7 group-hover:scale-110 transition-transform" />}
      {state === "listening" && (
        <div className="flex gap-1 items-center justify-center h-6">
          <div className="w-1 bg-white rounded-full animate-wave-1 h-6"></div>
          <div className="w-1 bg-white rounded-full animate-wave-2 h-4"></div>
          <div className="w-1 bg-white rounded-full animate-wave-3 h-5"></div>
          <div className="w-1 bg-white rounded-full animate-wave-4 h-3"></div>
        </div>
      )}
      {state === "thinking" && (
        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      )}
    </button>
  );
}
