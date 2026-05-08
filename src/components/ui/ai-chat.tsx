"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { VoiceChat } from "./ia-siri-chat";

export default function AIChatCard({ className }: { className?: string }) {
  const [messages, setMessages] = useState<{ sender: "ai" | "user"; text: string }[]>([
    { sender: "ai", text: "👋 Hello! I'm your UseMoney AI assistant powered by Groq. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Voice State
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Sync scroll
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleToggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    // Stop any current TTS
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsVoiceSpeaking(false);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ Speech recognition is not supported in this browser. Please try Chrome or Safari." }]);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (e: any) => {
        console.error("Speech recognition error:", e.error || e);
        setIsListening(false);
        if (e.error === "not-allowed") {
           setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ Microphone access was denied. Please allow microphone access to use Voice Chat." }]);
        } else if (e.error === "no-speech") {
           // just ignore or notify
        }
      };
      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        handleSend(transcript);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error("Failed to start speech recognition:", e);
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (!isVoiceMode) return; // Only speak if voice mode is active
    
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsVoiceSpeaking(true);
      utterance.onend = () => setIsVoiceSpeaking(false);
      utterance.onerror = () => setIsVoiceSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = typeof overrideText === 'string' ? overrideText : input;
    if (!textToSend.trim() || isTyping) return;
    
    const userMessage = textToSend;
    const currentMessages = [...messages];
    
    setMessages([...currentMessages, { sender: "user", text: userMessage }]);
    if (typeof overrideText !== 'string') setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: currentMessages,
          message: userMessage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.response }]);
        speakText(data.response);
      } else {
        setMessages((prev) => [...prev, { sender: "ai", text: `⚠️ Error: ${data.error}` }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ Network error. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={cn(
      "relative w-[90vw] transition-all duration-500 ease-in-out", 
      isVoiceMode ? "sm:w-[800px]" : "sm:w-[400px]", 
      "h-[500px] sm:h-[600px] max-h-[80vh] rounded-2xl overflow-hidden p-[2px]", 
      className
    )}>
      {/* Animated Outer Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-emerald-500/30"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner Card Container - Flex Row for side-by-side */}
      <div className="relative flex w-full h-full rounded-xl border border-white/10 overflow-hidden bg-black/90 backdrop-blur-xl divide-x divide-zinc-800">
        
        {/* LEFT: Text Chat */}
        <div className="flex flex-col w-full sm:w-[400px] h-full shrink-0 relative bg-black/40">
          {/* Inner Animated Background (Text side) */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#0a0a0b] via-black to-[#0a1510] -z-10"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          />

          {/* Header */}
          <div className="px-4 py-3 border-b border-zinc-800 relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 text-black p-1 rounded-sm flex items-center justify-center shrink-0">
                <span className="font-bold text-[10px] leading-none">M</span>
              </div>
              <h2 className="text-sm font-semibold text-white tracking-tight">UseMoney AI</h2>
            </div>
            
            {/* Voice Mode Toggle */}
            <button 
              onClick={() => {
                setIsVoiceMode(!isVoiceMode);
                // Cancel any ongoing speech when closing voice mode
                if (isVoiceMode && typeof window !== "undefined" && "speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                  setIsVoiceSpeaking(false);
                  if (isListening) recognitionRef.current?.stop();
                }
              }}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                isVoiceMode ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" : "bg-zinc-800 text-zinc-400 hover:text-white"
              )}
              title={isVoiceMode ? "Close Voice Chat" : "Open Voice Chat"}
            >
              {isVoiceMode ? <X className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollContainerRef} className="flex-1 px-4 py-4 overflow-y-auto space-y-4 text-sm flex flex-col relative z-10">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "px-3.5 py-2.5 rounded-2xl max-w-[85%] shadow-md backdrop-blur-md leading-relaxed",
                  msg.sender === "ai"
                    ? "bg-zinc-800/80 text-zinc-200 self-start border border-zinc-700/50 rounded-bl-sm"
                    : "bg-emerald-500 text-black font-medium self-end rounded-br-sm"
                )}
              >
                {msg.text}
              </motion.div>
            ))}

            {/* AI Typing Indicator */}
            {isTyping && (
              <motion.div
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm max-w-[30%] bg-zinc-800/80 border border-zinc-700/50 self-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-150"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-300"></span>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-zinc-800 relative z-10 bg-black/50">
            <input
              className="flex-1 px-3 py-2.5 text-sm bg-zinc-900 rounded-lg border border-zinc-800 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              placeholder="Message UseMoney AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isTyping}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="p-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT: Voice Chat */}
        <AnimatePresence>
          {isVoiceMode && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 400, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden sm:flex flex-col h-full bg-[#050505] relative overflow-hidden shrink-0"
            >
              <VoiceChat 
                onToggleListening={handleToggleListening}
                isListening={isListening}
                isProcessing={isTyping}
                isSpeaking={isVoiceSpeaking}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
}
