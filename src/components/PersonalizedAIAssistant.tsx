"use client";

import React, { useEffect, useState } from 'react';
import { Bot, Sparkles, User, ArrowRight, TrendingUp } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function PersonalizedAIAssistant() {
  const [greeting, setGreeting] = useState('');
  const [message, setMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [marketStatus, setMarketStatus] = useState<'OPEN' | 'CLOSED'>('CLOSED');
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [dayType, setDayType] = useState('');

  useEffect(() => {
    // Market Status Logic (IST)
    const checkMarketStatus = () => {
      const now = new Date();
      
      // Update local time and timezone display
      const timeFormatter = new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      });
      setCurrentTimeStr(timeFormatter.format(now));

      const dateFormatter = new Intl.DateTimeFormat(undefined, {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
      setDateStr(dateFormatter.format(now));

      const localDay = now.getDay();
      if (localDay === 0 || localDay === 6) {
        setDayType('Weekend');
      } else {
        setDayType('Weekday');
      }

      const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const day = istTime.getDay(); // 0 is Sunday, 6 is Saturday
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      
      const year = istTime.getFullYear();
      const month = String(istTime.getMonth() + 1).padStart(2, '0');
      const date = String(istTime.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${date}`;

      // Typical NSE Holidays for 2026 (Example list)
      const holidays = [
        "2026-01-26", "2026-03-03", "2026-04-03", "2026-04-14", 
        "2026-05-01", "2026-08-15", "2026-10-02", "2026-11-08", "2026-12-25"
      ];

      if (day === 0 || day === 6 || holidays.includes(dateString)) {
        setMarketStatus('CLOSED');
        return;
      }

      const timeInMinutes = hours * 60 + minutes;
      const marketOpenMinutes = 9 * 60 + 15; // 09:15 AM
      const marketCloseMinutes = 15 * 60 + 30; // 03:30 PM

      if (timeInMinutes >= marketOpenMinutes && timeInMinutes < marketCloseMinutes) {
        setMarketStatus('OPEN');
      } else {
        setMarketStatus('CLOSED');
      }
    };

    // Initial check
    checkMarketStatus();
    // Update every minute
    const intervalId = setInterval(checkMarketStatus, 60000);
    // Determine Time of Day
    const hour = new Date().getHours();
    let timeGreeting = 'Good evening';
    if (hour >= 5 && hour < 12) {
      timeGreeting = 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      timeGreeting = 'Good afternoon';
    }

    // Check User Status in localStorage
    const hasVisited = localStorage.getItem('usemoney_visited');
    const userName = 'Archit Mamodiya'; // Hardcoded for this mockup based on the screenshot

    if (!hasVisited) {
      // New User
      setGreeting(`${timeGreeting}, ${userName}!`);
      setMessage('Welcome to your financial journey. What are we researching today?');
      localStorage.setItem('usemoney_visited', 'true');
    } else {
      // Returning User
      setGreeting(`${timeGreeting}, ${userName}!`);
      setMessage('Welcome back to your insights. What are we researching today?');
    }

    setIsLoaded(true);

    return () => clearInterval(intervalId);
  }, []);

  if (!isLoaded) {
    return <div className="h-48 animate-pulse bg-zinc-900/50 rounded-2xl mb-8"></div>;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#111113] to-black border border-zinc-800 p-8 sm:p-12 shadow-2xl mb-8 flex flex-col items-center text-center">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        <div className={cn(
          "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-6 transition-colors",
          marketStatus === 'OPEN' 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
            : "bg-zinc-900 border-zinc-800 text-zinc-400"
        )}>
          <span className={cn(
            "w-2 h-2 rounded-full",
            marketStatus === 'OPEN' ? "bg-emerald-500 animate-pulse" : "bg-zinc-500"
          )}></span>
          MARKET {marketStatus} {currentTimeStr && <span className="opacity-60 font-mono text-[10px] ml-1">{currentTimeStr}</span>}
          {dateStr && (
            <>
              <span className="opacity-40 mx-2">•</span>
              <span className="opacity-90">{dateStr}</span>
            </>
          )}
          {dayType && (
            <>
              <span className="opacity-40 mx-2">•</span>
              <span className="opacity-90">{dayType}</span>
            </>
          )}
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight mb-4">
          <span className="opacity-90">{greeting.split(',')[0]},</span>{' '}
          <span className="text-emerald-400 italic">{greeting.split(',')[1]}</span>
        </h1>
        
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
          {message.split('What')[0]} <span className="text-white">What are we</span> <span className="text-emerald-400 italic">researching</span> <span className="text-white">today?</span>
        </p>

        {/* Mock Search / Input Area */}
        <div className="w-full max-w-3xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative flex items-center bg-[#161618] border border-zinc-700/50 rounded-xl px-4 py-3 shadow-inner">
            <Bot className="text-emerald-500 mr-3" size={24} />
            <input 
              type="text" 
              placeholder="Ask UseMoney anything..." 
              className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-500 text-lg"
            />
            <button className="bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg px-4 py-2 text-sm font-semibold transition-colors flex items-center gap-2">
              <Sparkles size={16} />
              Research
            </button>
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:bg-zinc-800 transition-colors">
              <TrendingUp size={14} className="text-emerald-400" /> Market pulse
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:bg-zinc-800 transition-colors">
              <User size={14} className="text-blue-400" /> How's my portfolio?
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:bg-zinc-800 transition-colors">
              <Sparkles size={14} className="text-orange-400" /> Roast my holdings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
