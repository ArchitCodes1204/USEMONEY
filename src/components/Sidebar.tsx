"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, TrendingUp, Calculator, Settings, Menu, X, Wallet } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Investments', href: '/investments', icon: TrendingUp },
  { name: 'Tax Planner', href: '/tax-planner', icon: Calculator },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-900 rounded-md text-zinc-400 hover:text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-black border-r border-zinc-800 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="bg-emerald-500 text-white p-1.5 rounded-lg">
            <Wallet size={20} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">UseMoney<span className="text-emerald-500">.</span></span>
        </div>

        <div className="px-4 py-2">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-2">Menu</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={18} className={isActive ? 'text-emerald-400' : 'text-zinc-500'} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-800/50 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
              <span className="text-xs font-medium text-white">AM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Archit Mamodiya</p>
              <p className="text-xs text-zinc-500 truncate">Pro Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
