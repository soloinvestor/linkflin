"use client";

import React from "react";
import { Linkedin, Instagram, X } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-transparent border-t border-white/5 relative overflow-hidden">
      {/* Footer Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
        <div className="xl:grid xl:grid-cols-3 xl:gap-20">
          <div className="space-y-10">
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M12 3V21M3 12H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <rect
                    x="8"
                    y="8"
                    width="8"
                    height="8"
                    rx="2"
                    fill="#030303"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase italic">
                linkflin
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500 max-w-xs font-medium">
              Empowering global commerce with high-fidelity link infrastructure.
              Track, target, and scale with Linkflin.
            </p>
            <div className="flex space-x-5">
              {[X, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-[10px] font-black leading-6 text-white uppercase tracking-[0.2em] mb-8">
                  Platform
                </h3>
                <ul role="list" className="space-y-4">
                  {[
                    "Smart Routing",
                    "Deep Linking",
                    "Analytics",
                    "API Docs",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm font-medium text-zinc-500 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-[10px] font-black leading-6 text-white uppercase tracking-[0.2em] mb-8">
                  Resources
                </h3>
                <ul role="list" className="space-y-4">
                  {["Pricing", "Case Studies", "Blog", "Status"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm font-medium text-zinc-500 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-[10px] font-black leading-6 text-white uppercase tracking-[0.2em] mb-8">
                  Company
                </h3>
                <ul role="list" className="space-y-4">
                  {["About", "Customers", "Careers", "News"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm font-medium text-zinc-500 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-[10px] font-black leading-6 text-white uppercase tracking-[0.2em] mb-8">
                  Legal
                </h3>
                <ul role="list" className="space-y-4">
                  {["Privacy", "Terms", "Cookies", "Compliance"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm font-medium text-zinc-500 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold tracking-widest text-zinc-600 uppercase">
            &copy; {new Date().getFullYear()} LINKFLIN INFRASTRUCTURE INC.
          </p>
          <div className="flex items-center space-x-8 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
            <span className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span>All Systems Operational</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
