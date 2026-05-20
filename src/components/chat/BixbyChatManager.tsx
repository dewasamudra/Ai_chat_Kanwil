"use client";

import React, { useState } from "react";
import { BixbyOrb } from "./BixbyOrb";
import { BixbyPanel } from "./BixbyPanel";

export function BixbyChatManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [orbState, setOrbState] = useState<"idle" | "listening" | "thinking">("idle");

  return (
    <>
      <BixbyOrb state={orbState} onClick={() => setIsOpen(true)} isOpen={isOpen} />
      <BixbyPanel isOpen={isOpen} onClose={() => setIsOpen(false)} orbState={orbState} setOrbState={setOrbState} />
    </>
  );
}
