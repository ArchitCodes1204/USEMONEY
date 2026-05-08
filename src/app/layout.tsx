import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionNavBar } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "usemoney.ai | Dashboard",
  description: "High-fidelity dashboard clone for usemoney.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen flex antialiased`}>
        <SessionNavBar />
        <main className="flex-1 pl-[4.5rem] p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
