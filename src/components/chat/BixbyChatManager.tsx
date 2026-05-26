"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Mic, Paperclip, Fingerprint } from 'lucide-react';

export function BixbyChatManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // State baru untuk fitur Voice
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Assalamualaikum. Saya Asisten AI Digital Kanwil Kemenag Provinsi Lampung. Ada yang bisa saya bantu terkait informasi layanan publik, atau keagamaan hari ini?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // --- FUNGSI MEREKAM SUARA (VOICE TO TEXT) ---
  const toggleVoiceInput = () => {
    // Cek apakah browser mendukung fitur suara (Chrome/Edge/Safari terbaru)
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Maaf, browser Anda belum mendukung fitur rekam suara. Silakan gunakan Google Chrome atau Edge.");
      return;
    }

    if (isListening) {
      // Matikan rekaman jika sedang merekam
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    // Mulai perekaman baru
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'id-ID'; // Set bahasa ke Indonesia
    recognition.interimResults = false; // Hanya ambil hasil akhir kalimat
    recognition.continuous = false; // Berhenti otomatis saat kita berhenti bicara

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      // Masukkan hasil suara ke dalam kotak teks (input)
      setMessage((prev) => prev + (prev ? " " : "") + transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Error rekaman suara:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // --- UPDATE: Fungsi handleSend dimodifikasi agar mendukung tombol otomatis ---
  const handleSend = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    
    const textToSend = customText || message;
    if (!textToSend.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setMessage(""); // Kosongkan input setelah pesan terkirim
    setIsTyping(true);

    // Simulasi balasan AI
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Waalaikumsalam. Baik, sedang memproses data dari pusat informasi terpadu Kanwil Kemenag Provinsi Lampung untuk informasi: ${textToSend}...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#10B981] text-white shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-500 hover:scale-110 hover:shadow-[0_0_40px_rgba(16,185,129,0.7)]"
          >
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-20 duration-1000" />
            <Sparkles className="absolute right-3 top-3 h-4 w-4 animate-pulse text-emerald-200" />
            <Fingerprint className="absolute inset-0 h-full w-full opacity-10" />
            <Bot className="relative z-10 h-8 w-8 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
          </button>
        )}
      </div>

      {/* Jendela Chat */}
      <div
        className={`fixed bottom-8 right-8 z-50 flex w-[90vw] flex-col overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-white/70 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-slate-950/70 sm:w-[420px] ${
          isOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-16 scale-95 opacity-0'
        }`}
        style={{ height: '650px', maxHeight: 'calc(100vh - 80px)' }}
      >
        <div className="relative overflow-hidden bg-gradient-to-r from-[#022c22] via-[#064e3b] to-[#047857] p-6 shadow-md">
          <div className="absolute -right-4 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-teal-400/20 blur-2xl" />
          <Fingerprint className="absolute -right-4 top-0 h-32 w-32 text-emerald-100 opacity-5" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 shadow-inner backdrop-blur-md border border-white/10">
                <Bot className="h-6 w-6 text-emerald-100" />
                <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#064e3b] bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,1)]" />
              </div>
              <div>
                <h3 className="font-bold text-white tracking-wide text-lg">AI Kemenag</h3>
                <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-200/80">
                  <Sparkles className="h-3 w-3 text-emerald-400" />
                  Asisten Digital Terpadu
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2.5 text-emerald-200 transition-all hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-500/20">
          <div className="flex justify-center">
            <span className="rounded-full bg-slate-200/50 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-slate-500 backdrop-blur-sm dark:bg-slate-800/50 dark:text-slate-400">
              PUSAT INFORMASI DIGITAL
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex-shrink-0 mt-1">
                  {msg.role === 'assistant' ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#064e3b] to-[#10b981] text-white shadow-lg shadow-emerald-500/20">
                      <Bot className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-200 text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`relative rounded-2xl px-5 py-3.5 text-sm shadow-sm transition-all hover:shadow-md ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-[#047857] to-[#10b981] text-white rounded-tr-sm'
                        : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 border border-emerald-100 dark:border-emerald-900/30 rounded-tl-sm backdrop-blur-md'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                  <span className="mt-1.5 text-[10px] font-medium text-slate-400">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex w-full justify-start">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#064e3b] to-[#10b981] text-white shadow-lg shadow-emerald-500/20">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-emerald-100 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-md dark:border-emerald-900/30 dark:bg-slate-900/80">
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.3s]"></div>
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]"></div>
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="relative border-t border-slate-100/50 bg-white/90 p-5 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/90">
          
          {/* --- DESAIN BARU: Horizontal Scroll (Bisa digeser ke samping) --- */}
          <div className="mb-4 flex overflow-x-auto gap-2.5 pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              "Permohonan Audiensi",
              "Izin Penelitian",
              "Pelayanan Rohaniawan/ Do'A",
              "Surat Menyurat",
              "Pengaduan"
            ].map((pertanyaan, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(undefined, pertanyaan)}
                className="whitespace-nowrap flex-shrink-0 text-[11.5px] font-semibold tracking-wide border border-emerald-500/30 text-emerald-700 bg-emerald-50/70 hover:bg-emerald-100 py-2.5 px-4 rounded-full transition-all shadow-sm cursor-pointer dark:border-emerald-500/20 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50 hover:shadow-md hover:-translate-y-0.5"
              >
                {pertanyaan}
              </button>
            ))}
          </div>
          {/* ------------------------------------------------------------- */}

          <form onSubmit={handleSend} className="relative flex items-center gap-3">
            <button
              type="button"
              className="flex-shrink-0 rounded-full p-2.5 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-800"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <div className="relative flex-1 group">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 blur transition duration-300 group-hover:opacity-20"></div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isListening ? "Mendengarkan..." : "Tanyakan informasi publik..."}
                className={`relative w-full rounded-full border-0 px-5 py-3.5 pr-12 text-sm text-slate-700 outline-none transition-all focus:ring-2 focus:ring-inset focus:ring-emerald-500 dark:bg-slate-900 dark:text-slate-200 dark:focus:bg-slate-900 ${
                  isListening 
                    ? 'bg-red-50 placeholder-red-400 ring-1 ring-inset ring-red-200' 
                    : 'bg-slate-100/80 placeholder-slate-400 focus:bg-white'
                }`}
              />
              
              <button
                type="button"
                onClick={toggleVoiceInput}
                title="Gunakan Suara"
                className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 transition-all ${
                  isListening 
                    ? 'bg-red-100 text-red-500 animate-pulse' 
                    : 'text-slate-400 hover:text-emerald-600'
                }`}
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
            
            <button
              type="submit"
              disabled={!message.trim() || isTyping}
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#047857] to-[#10b981] text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-emerald-500/40 disabled:scale-100 disabled:opacity-50"
            >
              <Send className="h-5 w-5 ml-0.5" />
            </button>
          </form>
          <div className="mt-4 flex items-center justify-center gap-1.5">
             <Fingerprint className="h-3 w-3 text-emerald-600/50" />
             <p className="text-[10px] text-slate-400/80 font-medium uppercase tracking-wider">
               KANTOR WILAYAH KEMENTERIAN AGAMA PROVINSI LAMPUNG
             </p>
          </div>
        </div>
      </div>
    </>
  );
}