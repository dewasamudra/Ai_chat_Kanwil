"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, Sparkles, Mic, Paperclip, MessageSquare } from 'lucide-react';

export function BixbyChatManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
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

  const toggleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Maaf, browser Anda belum mendukung fitur rekam suara. Silakan gunakan Google Chrome atau Edge.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'id-ID'; 
    recognition.interimResults = false; 
    recognition.continuous = false; 

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
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
    setMessage(""); 
    setIsTyping(true);

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

  // MENGAMBIL GAMBAR DARI FOLDER PUBLIC (PASTI BERHASIL)
  const logoKemenagUrl = "/logo.png";

  return (
    <>
      {/* Floating Action Button - Logo Pesan */}
      <div className="fixed bottom-8 right-8 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#014D25] via-[#016533] to-[#0FA958] text-white shadow-[0_0_25px_rgba(1,101,51,0.5)] transition-all duration-500 hover:scale-110 hover:shadow-[0_0_40px_rgba(1,101,51,0.7)]"
          >
            <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-20 duration-1000" />
            <Sparkles className="absolute right-3 top-3 h-4 w-4 animate-pulse text-yellow-300" />
            <MessageSquare className="relative z-10 h-7 w-7 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
          </button>
        )}
      </div>

      {/* Jendela Chat */}
      <div
        className={`fixed bottom-8 right-8 z-50 flex w-[90vw] flex-col overflow-hidden rounded-[2rem] border border-green-500/20 bg-white/70 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-slate-950/70 sm:w-[420px] ${
          isOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-16 scale-95 opacity-0'
        }`}
        style={{ height: '650px', maxHeight: 'calc(100vh - 80px)' }}
      >
        {/* Header Tema Kemenag */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#013b1d] via-[#016533] to-[#0b8a46] p-6 shadow-md border-b border-yellow-500/20 z-20">
          <div className="absolute -right-4 -top-10 h-32 w-32 rounded-full bg-yellow-400/10 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-green-400/20 blur-2xl" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg border border-green-100 p-1.5">
                {/* Logo Kemenag di Header */}
                <img src={logoKemenagUrl} alt="Logo Kemenag" className="h-full w-full object-contain" />
                <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 shadow-[0_0_10px_rgba(34,197,94,1)]" />
              </div>
              <div>
                <h3 className="font-bold text-white tracking-wide text-lg">AI Kemenag</h3>
                <p className="flex items-center gap-1.5 text-xs font-medium text-green-100/90">
                  <Sparkles className="h-3 w-3 text-yellow-300" />
                  Asisten Digital Terpadu
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2.5 text-green-100 transition-all hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* --- AREA CHAT DENGAN BACKGROUND GEDUNG --- */}
        <div className="relative flex-1 overflow-hidden">
          {/* Background Image Gedung (Contoh: Kemenag Pusat) */}
          <div
  className="absolute inset-0 z-0 opacity-100"
  style={{
    backgroundImage: 'url("/bg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
/>

<div className="absolute inset-0 z-0 bg-white/10" />
          {/* Overlay Putih/Gelap agar teks tetap sangat nyaman dibaca (Efek Kaca) */}
          <div className="absolute inset-0 z-0 bg-white/85 dark:bg-slate-950/85 backdrop-blur-[1px]" />
          
          {/* Chat Log Konten Utama */}
          <div className="relative z-10 h-full overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-green-600/20">
            <div className="flex justify-center">
              <span className="rounded-full bg-green-50/80 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-green-700 border border-green-200/50 backdrop-blur-md dark:bg-green-900/40 dark:text-green-400 dark:border-green-800/50 shadow-sm">
                PUSAT INFORMASI DIGITAL
              </span>
            </div>

            {messages.map((msg, index) => (
              <React.Fragment key={msg.id}>
                {/* Bubble Pesan */}
                <div className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="flex-shrink-0 mt-1">
                      {msg.role === 'assistant' ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-md border border-green-100 p-1 dark:border-green-800">
                          {/* Logo Kemenag sebagai Avatar Chat AI */}
                          <img src={logoKemenagUrl} alt="Logo Kemenag" className="h-full w-full object-contain" />
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
                            ? 'bg-gradient-to-br from-[#016533] to-[#0FA958] text-white rounded-tr-sm'
                            : 'bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-200 border border-green-100/50 dark:border-green-900/30 rounded-tl-sm backdrop-blur-md'
                        }`}
                      >
                        <p className="leading-relaxed">{msg.content}</p>
                      </div>
                      <span className="mt-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-400 drop-shadow-sm">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* MENU INTERAKTIF (Ala WA Business) */}
                {index === 0 && msg.role === 'assistant' && (
                  <div className="flex w-full justify-start mt-[-12px]">
                    <div className="flex w-full max-w-[85%] gap-3 flex-row">
                      <div className="flex-shrink-0 w-8"></div>
                      <div className="flex flex-col w-[260px] rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-green-100/50 dark:border-green-900/30 shadow-md overflow-hidden backdrop-blur-md">
                        <div className="bg-gradient-to-r from-[#016533] to-[#0b8a46] px-4 py-3 border-b border-green-800/30">
                          <span className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="h-3 w-3 text-yellow-300" />
                            Pilih Layanan Cepat
                          </span>
                        </div>
                        <div className="flex flex-col">
                          {[
                            "Permohonan Audiensi",
                            "Izin Penelitian",
                            "Pelayanan Rohaniawan/ Do'A",
                            "Surat Menyurat",
                            "Pengaduan"
                          ].map((pertanyaan, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSend(undefined, pertanyaan)}
                              className="group flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-slate-100/50 dark:border-slate-800/50 hover:bg-green-50 dark:hover:bg-green-900/30 transition-all last:border-0"
                            >
                              <span className="text-left group-hover:text-green-700 dark:group-hover:text-green-400">{pertanyaan}</span>
                              <span className="text-green-500 group-hover:text-green-600 group-hover:translate-x-1 transition-all text-xl leading-none">›</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}

            {isTyping && (
              <div className="flex w-full justify-start">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-md border border-green-100 p-1 dark:border-green-800">
                    <img src={logoKemenagUrl} alt="Logo Kemenag" className="h-full w-full object-contain opacity-50 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-green-100 bg-white/90 px-5 py-4 shadow-sm backdrop-blur-md dark:border-green-900/30 dark:bg-slate-900/90">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-600 [animation-delay:-0.3s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-600 [animation-delay:-0.15s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-600"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        {/* --- AKHIR AREA CHAT --- */}

        {/* Input Area */}
        <div className="relative border-t border-slate-100/50 bg-white/90 p-5 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/90 z-20">
          <form onSubmit={handleSend} className="relative flex items-center gap-3">
            <button
              type="button"
              className="flex-shrink-0 rounded-full p-2.5 text-slate-400 transition-colors hover:bg-green-50 hover:text-green-700 dark:hover:bg-slate-800"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <div className="relative flex-1 group">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 opacity-0 blur transition duration-300 group-hover:opacity-20"></div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isListening ? "Mendengarkan..." : "Tanyakan informasi publik..."}
                className={`relative w-full rounded-full border-0 px-5 py-3.5 pr-12 text-sm text-slate-700 outline-none transition-all focus:ring-2 focus:ring-inset focus:ring-green-600 dark:bg-slate-900 dark:text-slate-200 dark:focus:bg-slate-900 ${
                  isListening 
                    ? 'bg-red-50 placeholder-red-400 ring-1 ring-inset ring-red-200' 
                    : 'bg-slate-100/90 placeholder-slate-400 focus:bg-white'
                }`}
              />
              
              <button
                type="button"
                onClick={toggleVoiceInput}
                title="Gunakan Suara"
                className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 transition-all ${
                  isListening 
                    ? 'bg-red-100 text-red-500 animate-pulse' 
                    : 'text-slate-400 hover:text-green-600'
                }`}
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
            
            <button
              type="submit"
              disabled={!message.trim() || isTyping}
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#016533] to-[#0FA958] text-white shadow-lg shadow-green-600/25 transition-all hover:scale-105 hover:shadow-green-600/40 disabled:scale-100 disabled:opacity-50"
            >
              <Send className="h-5 w-5 ml-0.5" />
            </button>
          </form>
          
          {/* Footer Logo Kemenag RI */}
          <div className="mt-4 flex items-center justify-center gap-2">
  <img
    src="/logo.png"
    alt="Logo Kemenag"
    className="h-5 w-5 object-contain opacity-80"
  />
  <p className="text-[10px] text-slate-400/80 font-medium uppercase tracking-wider">
    KANTOR WILAYAH KEMENTERIAN AGAMA PROVINSI LAMPUNG
  
             </p>
          </div>
        </div>
      </div>
    </>
  );
}