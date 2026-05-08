"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  PieChart,
  Eye,
  BookOpen,
  Flame,
  Activity,
  Search,
  Zap,
  Brain,
  FileText,
  Target,
  Calculator,
  ShieldAlert,
  Receipt,
  FileBox,
  Link as LinkIcon,
  GraduationCap,
  Settings,
  MoreHorizontal,
  ChevronDown,
  LayoutDashboard,
  TerminalSquare,
  LineChart,
  History,
  Book,
  Sparkles,
  Trophy,
  User,
  Crown,
  CreditCard,
  Bell,
  IndianRupee,
  LogOut,
  UserCircle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const sidebarVariants = {
  open: {
    width: "16rem",
  },
  closed: {
    width: "4.5rem", // Slightly larger to fit icons comfortably
  },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

const variants = {
  open: {
    x: 0,
    opacity: 1,
    display: "block",
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    display: "none",
    transition: {
      x: { stiffness: 100 },
    },
  },
};

const flexVariants = {
  open: {
    x: 0,
    opacity: 1,
    display: "flex",
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    display: "none",
    transition: {
      x: { stiffness: 100 },
    },
  },
};

const transitionProps = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
  staggerChildren: 0.1,
} as const;

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

const SubMenu = ({ item, isCollapsed, pathname }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname?.includes(item.href || item.title.toLowerCase());

  return (
    <div className="w-full flex flex-col">
      <button
        onClick={() => !isCollapsed && setIsOpen(!isOpen)}
        className={cn(
          "flex h-9 w-full flex-row items-center rounded-md px-3 py-2 transition-colors hover:bg-zinc-800/50 hover:text-white group",
          isActive ? "text-emerald-400" : "text-zinc-400"
        )}
      >
        <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-emerald-400" : "text-zinc-400")} />
        <motion.div variants={flexVariants} className="flex-1 items-center justify-between ml-3 overflow-hidden whitespace-nowrap">
          <span className="text-[13px] font-medium">{item.title}</span>
          {item.items && (
            <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", isOpen ? "rotate-180" : "")} />
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {!isCollapsed && isOpen && item.items && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="ml-[22px] mt-1 pl-3 border-l border-zinc-800 flex flex-col gap-1">
              {item.items.map((subItem: any, idx: number) => (
                <Link
                  key={idx}
                  href={subItem.href}
                  className={cn(
                    "flex h-8 w-full flex-row items-center rounded-md px-2 transition-colors hover:text-white",
                    pathname === subItem.href ? "text-white" : "text-zinc-400"
                  )}
                >
                  {subItem.icon && <subItem.icon className="h-3.5 w-3.5 mr-2 shrink-0" />}
                  <span className="text-[13px] font-medium">{subItem.title}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function SessionNavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  const handleMouseEnter = () => setIsCollapsed(false);
  const handleMouseLeave = () => setIsCollapsed(true);

  return (
    <motion.div
      className={cn(
        "sidebar fixed left-0 top-0 z-40 h-screen shrink-0 border-r border-zinc-800 bg-black text-white"
      )}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative z-40 flex h-screen shrink-0 flex-col transition-all"
        variants={contentVariants}
      >
        {/* Top Header & New Chat Button */}
        <div className="flex flex-col px-4 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-6 overflow-hidden whitespace-nowrap h-8">
            <div className="bg-emerald-500 text-black p-1.5 rounded-lg flex items-center justify-center shrink-0">
              <span className="font-bold text-[14px] leading-none">M</span>
            </div>
            <motion.span variants={variants} className="text-xl font-bold tracking-tight">
              UseMoney<span className="text-emerald-500">.</span>
            </motion.span>
          </div>
          
          <Button 
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black justify-start px-3 h-10 shadow-none border-none shrink-0 overflow-hidden"
          >
            <Plus className="h-5 w-5 shrink-0" />
            <motion.span variants={variants} className="ml-2 font-semibold">New chat</motion.span>
          </Button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto overflow-x-hidden px-3 pb-4 relative [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700">
          <motion.ul variants={staggerVariants} className="flex flex-col gap-6 pb-4">
            
            {/* WORKSPACE */}
            <div className="flex flex-col gap-1">
              <motion.p variants={variants} className="px-3 text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-1 overflow-hidden whitespace-nowrap h-4">
                Workspace
              </motion.p>
              
              <Link href="/stocksage" className={cn(
                "flex h-9 w-full flex-row items-center rounded-md px-3 py-2 transition-colors",
                pathname === "/stocksage" || pathname === "/" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
              )}>
                <IndianRupee className="h-4 w-4 shrink-0" />
                <motion.span variants={variants} className="ml-3 text-[13px] font-medium overflow-hidden whitespace-nowrap">StockSage</motion.span>
              </Link>
              
              {[
                { title: "Holdings", icon: PieChart, href: "/holdings" },
                { title: "Watchlists", icon: Eye, href: "/watchlists" },
                { title: "Tradebook", icon: BookOpen, href: "/tradebook" },
                { title: "Portfolio Roast", icon: Flame, href: "/portfolio-roast" },
              ].map((item, i) => (
                <Link key={i} href={item.href} className="flex h-9 w-full flex-row items-center rounded-md px-3 py-2 text-zinc-400 transition-colors hover:bg-zinc-800/50 hover:text-white group">
                  <item.icon className="h-4 w-4 shrink-0 group-hover:text-zinc-300" />
                  <motion.span variants={variants} className="ml-3 text-[13px] font-medium overflow-hidden whitespace-nowrap">{item.title}</motion.span>
                </Link>
              ))}
            </div>

            {/* DISCOVER */}
            <div className="flex flex-col gap-1">
              <motion.p variants={variants} className="px-3 text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-1 overflow-hidden whitespace-nowrap h-4">
                Discover
              </motion.p>
              {[
                { title: "Markets", icon: Activity, href: "/markets" },
                { title: "Screener", icon: Search, href: "/screener" },
                { title: "Strategies", icon: Zap, href: "/strategies" },
                { title: "Research", icon: Brain, href: "/research" },
              ].map((item, i) => (
                <Link key={i} href={item.href} className="flex h-9 w-full flex-row items-center rounded-md px-3 py-2 text-zinc-400 transition-colors hover:bg-zinc-800/50 hover:text-white group">
                  <item.icon className="h-4 w-4 shrink-0 group-hover:text-zinc-300" />
                  <motion.span variants={variants} className="ml-3 text-[13px] font-medium overflow-hidden whitespace-nowrap">{item.title}</motion.span>
                </Link>
              ))}
            </div>

            {/* TOOLS */}
            <div className="flex flex-col gap-1">
              <motion.p variants={variants} className="px-3 text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-1 overflow-hidden whitespace-nowrap h-4">
                Tools
              </motion.p>
              <SubMenu 
                isCollapsed={isCollapsed} 
                pathname={pathname}
                item={{
                  title: "Paper Trading", icon: FileText, items: [
                    { title: "Dashboard", icon: LayoutDashboard, href: "/paper-trading/dashboard" },
                    { title: "Terminal", icon: TerminalSquare, href: "/paper-trading/terminal" },
                    { title: "Positions", icon: LineChart, href: "/paper-trading/positions" },
                    { title: "History", icon: History, href: "/paper-trading/history" },
                  ]
                }} 
              />
              {[
                { title: "FIRE Calculator", icon: Target, href: "/fire-calculator" },
                { title: "Calculators", icon: Calculator, href: "/calculators" },
                { title: "Risk Report", icon: ShieldAlert, href: "/risk-report" },
                { title: "Tax Report", icon: Receipt, href: "/tax-report" },
                { title: "Document Vault", icon: FileBox, href: "/document-vault" },
              ].map((item, i) => (
                <Link key={i} href={item.href} className="flex h-9 w-full flex-row items-center rounded-md px-3 py-2 text-zinc-400 transition-colors hover:bg-zinc-800/50 hover:text-white group">
                  <item.icon className="h-4 w-4 shrink-0 group-hover:text-zinc-300" />
                  <motion.span variants={variants} className="ml-3 text-[13px] font-medium overflow-hidden whitespace-nowrap">{item.title}</motion.span>
                </Link>
              ))}
            </div>

            {/* ACCOUNT */}
            <div className="flex flex-col gap-1">
              <motion.p variants={variants} className="px-3 text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-1 overflow-hidden whitespace-nowrap h-4">
                Account
              </motion.p>
              <Link href="/brokers" className="flex h-9 w-full flex-row items-center rounded-md px-3 py-2 text-zinc-400 transition-colors hover:bg-zinc-800/50 hover:text-white group">
                <LinkIcon className="h-4 w-4 shrink-0 group-hover:text-zinc-300" />
                <motion.span variants={variants} className="ml-3 text-[13px] font-medium overflow-hidden whitespace-nowrap">Brokers</motion.span>
              </Link>
              <SubMenu 
                isCollapsed={isCollapsed} 
                pathname={pathname}
                item={{
                  title: "Learning", icon: GraduationCap, items: [
                    { title: "Courses", icon: Book, href: "/learning/courses" },
                    { title: "Sage Tutor", icon: Sparkles, href: "/learning/sage-tutor" },
                    { title: "Quiz", icon: Trophy, href: "/learning/quiz" },
                  ]
                }} 
              />
              <SubMenu 
                isCollapsed={isCollapsed} 
                pathname={pathname}
                item={{
                  title: "Settings", icon: Settings, items: [
                    { title: "Account", icon: User, href: "/settings/account" },
                    { title: "Subscription", icon: Crown, href: "/settings/subscription" },
                    { title: "Billing", icon: CreditCard, href: "/settings/billing" },
                    { title: "Notifications", icon: Bell, href: "/settings/notifications" },
                  ]
                }} 
              />
            </div>
          </motion.ul>
        </div>

        {/* Bottom Profile */}
        <div className="p-3 border-t border-zinc-800">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="w-full" asChild>
              <Button variant="ghost" className="w-full flex items-center justify-start gap-3 h-12 px-2 hover:bg-zinc-800/50 group shrink-0 overflow-hidden">
                <Avatar className="h-8 w-8 shrink-0 border border-zinc-700">
                  <AvatarFallback className="bg-zinc-800 text-white text-xs">AM</AvatarFallback>
                </Avatar>
                <motion.div variants={variants} className="flex-1 flex items-center justify-between overflow-hidden whitespace-nowrap">
                  <span className="text-[14px] font-medium text-white truncate text-left w-full">Archit Mamodiya</span>
                  <MoreHorizontal className="h-4 w-4 text-zinc-500 ml-2" />
                </motion.div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-56 bg-[#161618] border-zinc-800 text-zinc-300">
              <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer" asChild>
                <Link href="/settings/account" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer" asChild>
                <Link href="/settings/subscription" className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-emerald-400" /> Upgrade to Pro
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer flex items-center gap-2">
                <LogOut className="h-4 w-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </motion.div>
    </motion.div>
  );
}
