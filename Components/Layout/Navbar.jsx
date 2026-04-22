"use client";

import React, { useState, useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import gsap from "gsap";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const actionsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      gsap.set(
        [navRef.current, logoRef.current, ".nav-link", actionsRef.current],
        {
          opacity: 0,
          y: -20,
        },
      );

      tl.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
      })
        .to(
          logoRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .to(
          ".nav-link",
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .to(
          actionsRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-4 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div
          ref={logoRef}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-2 bg-[#9499e8]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white relative"
            >
              <path
                d="M12 3V21M3 12H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M5 5L19 19M19 5L5 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
              />
              <rect
                x="8"
                y="8"
                width="8"
                height="8"
                rx="2"
                fill="#030303"
                stroke="#9499e8"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tight text-white uppercase italic">
            linkflin
          </span>
        </div>

        {/* Links */}
        <div ref={linksRef} className="hidden lg:flex items-center space-x-10">
          {["Features", "Pricing", "Enterprise", "Docs"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link relative text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors py-2 group"
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9499e8] rounded-full transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
            </a>
          ))}
        </div>

        {/* Actions */}
        <div ref={actionsRef} className="flex items-center space-x-8">
          <button className="text-xs font-bold cursor-pointer uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
            Log In
          </button>
          <button className="relative overflow-hidden cursor-pointer group rounded-full bg-white px-8 py-3 text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:scale-105 active:scale-95">
            <div className="absolute inset-0 bg-gradient-to-r from-[#9499e8] to-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 group-hover:text-white transition-colors">
              Start Free
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
