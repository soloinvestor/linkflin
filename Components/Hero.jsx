"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Shield, Lock, Globe, Zap, MousePointer2 } from "lucide-react";

const Hero = () => {
  const checklist = [
    "10 smart links free forever",
    "Flat pricing — no per-click fees",
    "No credit card required",
    "Works with Claude via MCP",
  ];

  const routes = [
    { country: "amazon.com", flag: "🇺🇸", label: "original" },
    { country: "amazon.co.uk", flag: "🇬🇧", label: "auto" },
    { country: "amazon.de", flag: "🇩🇪", label: "auto" },
    { country: "amazon.co.jp", flag: "🇯🇵", label: "auto" },
  ];

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#9499e8]/10 to-transparent pointer-events-none" />
      <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-[#9499e8]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-96 h-96 bg-[#6366f1]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left Column: Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-[#9499e8] animate-pulse" />
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">v2.0 is live</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl leading-[1.1]"
            >
              Maximize your <br />
              <span className="gradient-text">affiliate revenue.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 text-lg leading-relaxed text-zinc-400 max-w-lg"
            >
              One smart link sends US viewers to amazon.com, UK viewers to
              amazon.co.uk, and opens the app on mobile — automatically. Stop
              losing commissions from international clicks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4"
            >
              {checklist.map((item) => (
                <div key={item} className="flex items-center space-x-3 group">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#9499e8]/10 flex items-center justify-center group-hover:bg-[#9499e8]/20 transition-colors">
                    <Check className="h-3 w-3 text-[#9499e8]" />
                  </div>
                  <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8"
            >
              <button className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9499e8] to-[#6366f1] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300" />
                <div className="relative rounded-xl bg-[#9499e8] px-8 py-5 text-base font-bold text-white hover:bg-[#8388d7] transition-all text-center">
                  Create Your First Smart Link
                </div>
              </button>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#030303] bg-zinc-800" />
                  ))}
                </div>
                <p className="text-xs text-zinc-500 font-medium leading-snug">
                  Join <span className="text-white">2,400+</span> creators <br />
                  earning more today.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 flex items-center space-x-6"
            >
              <div className="flex items-center space-x-2 text-zinc-500">
                <Shield className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Secure OAuth</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center space-x-2 text-zinc-500">
                <Lock className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Private Data</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-16 lg:mt-0 relative"
          >
            {/* Background Glow for Card */}
            <div className="absolute -inset-10 bg-[#9499e8]/10 blur-[80px] rounded-full opacity-50 pointer-events-none" />
            
            <div className="relative mx-auto max-w-[460px] glass-card overflow-hidden">
              {/* Window Header */}
              <div className="bg-white/5 px-4 py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="bg-white/5 rounded-full px-4 py-1.5 text-[10px] text-zinc-400 font-medium border border-white/5 tracking-wide">
                  linkflin.to/my-gear
                </div>
                <div className="w-10" />
              </div>

              <div className="p-8 space-y-8">
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-3">Target URL</p>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <p className="text-sm font-medium text-zinc-300 truncate">amazon.com/dp/B8DFK5Z33M?tag=user-20</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold text-[#9499e8] tracking-widest uppercase">Smart Routing Active</p>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 rounded-full bg-[#9499e8]" />
                      <div className="w-1 h-1 rounded-full bg-[#9499e8]/50" />
                      <div className="w-1 h-1 rounded-full bg-[#9499e8]/20" />
                    </div>
                  </div>
                  
                  {routes.map((route) => (
                    <div key={route.country} className="flex items-center justify-between bg-white/5 rounded-xl p-3 px-4 border border-white/5 group hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-4">
                        <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all">{route.flag}</span>
                        <span className="text-sm font-medium text-zinc-300">{route.country}</span>
                      </div>
                      <span className="text-[9px] font-bold text-zinc-500 uppercase px-2 py-1 rounded bg-white/5 border border-white/5">
                        {route.label}
                      </span>
                    </div>
                  ))}
                  
                  <div className="flex items-center justify-between bg-[#9499e8]/10 rounded-xl p-4 px-4 border border-[#9499e8]/20 mt-6 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-lg bg-[#9499e8]/20 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#9499e8]">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                          <path d="M12 18h.01" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-sm font-bold text-white block">App Deep Linking</span>
                        <span className="text-[10px] text-zinc-400 font-medium">Bypass browser directly to app</span>
                      </div>
                    </div>
                    <Check className="h-4 w-4 text-[#9499e8]" />
                  </div>
                </div>
              </div>

              {/* Window Footer */}
              <div className="bg-white/5 px-8 py-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">System Healthy</span>
                </div>
                <span className="text-[11px] font-bold text-zinc-500">Uptime: 99.99%</span>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                <Globe className="h-3.5 w-3.5 text-zinc-500" />
                <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">150+ countries</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                <Zap className="h-3.5 w-3.5 text-zinc-500" />
                <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Fast Redirect</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                <MousePointer2 className="h-3.5 w-3.5 text-zinc-500" />
                <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Real-time stats</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Works With Section */}
        <div className="mt-32 pt-12 border-t border-white/5">
          <p className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase mb-10 text-center lg:text-left">Integration Ecosystem</p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-16 gap-y-8 opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale brightness-200">
            <span className="text-lg font-bold">Amazon</span>
            <span className="text-lg font-bold">ShareASale</span>
            <span className="text-lg font-bold">Impact</span>
            <span className="text-lg font-bold">CJ Affiliate</span>
            <span className="text-lg font-bold">Rakuten</span>
            <span className="text-lg font-bold">Any Link</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

