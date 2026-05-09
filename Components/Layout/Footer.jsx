"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-primary blur-lg opacity-20" />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-8 h-8 text-white relative z-10"
                >
                  <path
                    d="M12 3V21M3 12H21M18.5 5.5L5.5 18.5M18.5 18.5L5.5 5.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 9L12 6L9 9M15 15L12 18L9 15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-2xl font-black text-white tracking-tight italic uppercase">
                linkflin
              </span>
            </div>
            <p className="text-zinc-500 font-medium text-sm leading-relaxed max-w-xs">
              Smart links for YouTube creators. Geo-targeted, app-opening,
              always monitored.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">
              Product
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-zinc-500 hover:text-white transition-colors text-sm font-medium"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-500 hover:text-white transition-colors text-sm font-medium"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="mailto:soloinvestorbusiness@gmail.com"
                  className="text-zinc-500 hover:text-white transition-colors text-sm font-medium"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-zinc-500 hover:text-white transition-colors text-sm font-medium"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-zinc-500 hover:text-white transition-colors text-sm font-medium"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-medium text-zinc-600">
            Copyright © 2026 LinkFlin
          </p>
          <div className="flex items-center space-x-8">
            <Link
              href="#"
              className="text-xs font-medium text-zinc-600 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs font-medium text-zinc-600 hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
