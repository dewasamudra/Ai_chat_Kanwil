"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, X, Send, Bot, User, Sparkles } from "lucide-react";
import { SpeechHandler } from "@/lib/utils/speechHandler";
import { getChatbotResponse } from "@/lib/services/dashboard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

interface BixbyPanelProps {
  isOpen: boolean;
  onClose: () => void;
  orbState: "idle" | "listening" | "thinking";
  setOrbState: (state: "idle" | "listening" | "thinking") => void;
}

export function BixbyPanel({ isOpen, onClose, orbState, setOrbState }: BixbyPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Halo! Saya Bixby Kanwil Kemenag Provinsi Lampung. Ada yang bisa saya bantu hari ini?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const speechHandlerRef = useRef<SpeechHandler | null>(null);

  useEffect(() => {
    speechHandlerRef.current = new SpeechHandler(
      (text) => setInputValue(text),
      () => setOrbState("idle"),
      (err) => {
        console.error("Speech Error:", err);
        setOrbState("idle");
      }
    );
  }, [setOrbState]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleListen = () => {
    if (!speechHandlerRef.current?.isSupported) {
      alert("Browser Anda tidak mendukung fitur suara.");
      return;
    }
    if (orbState === "listening") {
      speechHandlerRef.current?.stopListening();
      setOrbState("idle");
    } else {
      speechHandlerRef.current?.startListening();
      setOrbState("listening");
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMsg: Message = { id: Date.now().toString(), sender: "user", text };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    setOrbState("thinking");

    const response = await getChatbotResponse(text);
    
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "bot", text: response.text },
    ]);
    setOrbState("idle");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[360px] max-w-[calc(100vw-3rem)] h-[550px] max-h-[80vh] flex flex-col rounded-3xl glass-panel overflow-hidden z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/20 flex justify-between items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-slate-800 dark:text-slate-100">Bixby Assistant</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4 pb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                  msg.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                }`}
              >
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`p-3 rounded-2xl text-sm shadow-sm ${
                  msg.sender === "user"
                    ? "bg-primary text-white rounded-tr-sm"
                    : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-tl-sm text-slate-700 dark:text-slate-200"
                }`}
                style={{ whiteSpace: "pre-line" }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {orbState === "thinking" && (
            <div className="flex gap-3 self-start max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-sm">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-tl-sm flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-white/20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
        <div className="relative flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleListen}
            className={`rounded-full shrink-0 transition-all duration-300 ${
              orbState === "listening"
                ? "bg-purple-100 text-purple-600 border-purple-300 animate-pulse"
                : "hover:bg-slate-100"
            }`}
          >
            <Mic className={`w-5 h-5 ${orbState === "listening" ? "text-purple-600" : ""}`} />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend(inputValue);
            }}
            placeholder="Tanya Bixby..."
            className="rounded-full bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-inner focus-visible:ring-purple-500 pr-10"
          />
          <Button
            size="icon"
            onClick={() => handleSend(inputValue)}
            className="absolute right-1 w-8 h-8 rounded-full bg-primary hover:bg-primary/90 transition-transform active:scale-95"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
