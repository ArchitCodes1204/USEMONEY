"use client";

import React from 'react';
import { Sparkles, Globe, MapPin } from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  market: 'Indian' | 'Global';
  keyAIFeature: string;
  isMain?: boolean;
}

const competitors: Competitor[] = [
  { id: '1', name: 'INDmoney', market: 'Indian', keyAIFeature: 'All-in-one finance app. Tracks net worth, bills, and portfolio automatically.' },
  { id: '2', name: 'Moneyview', market: 'Indian', keyAIFeature: 'Tracks expenses using SMS. Shows bank balances, UPI spends, credit usage.' },
  { id: '3', name: 'ET Money', market: 'Indian', keyAIFeature: 'Offers mutual funds, insurance, SIPs, loans. Tracks spending and financial goals.' },
  { id: '4', name: 'Mint', market: 'Global', keyAIFeature: 'Popular global budgeting app. Tracks expenses, budgets, credit score, bills.' },
  { id: '5', name: 'UseMoney', market: 'Indian', keyAIFeature: 'Personalized Holistic Wealth AI Chatbot', isMain: true },
];

export default function CompetitorTable() {
  return (
    <div className="bg-[#111113] rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
      <div className="px-6 py-5 border-b border-zinc-800 bg-[#161618]">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Sparkles className="text-emerald-400" size={20} />
          Market Landscape
        </h3>
        <p className="text-sm text-zinc-400 mt-1">Comparing UseMoney against top Indian and Global competitors</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/50">
              <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">Product Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">Primary Market</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">Key AI Feature</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {competitors.map((comp) => (
              <tr 
                key={comp.id} 
                className={`transition-colors hover:bg-zinc-800/30 ${comp.isMain ? 'bg-emerald-500/5 hover:bg-emerald-500/10' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      comp.isMain ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {comp.name.charAt(0)}
                    </div>
                    <span className={`font-medium ${comp.isMain ? 'text-emerald-400' : 'text-zinc-200'}`}>
                      {comp.name}
                    </span>
                    {comp.isMain && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wide">
                        You
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-sm text-zinc-300">
                    {comp.market === 'Indian' ? (
                      <><MapPin size={14} className="text-orange-400" /> Indian</>
                    ) : (
                      <><Globe size={14} className="text-blue-400" /> Global</>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-zinc-400 leading-relaxed">
                    {comp.keyAIFeature}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
