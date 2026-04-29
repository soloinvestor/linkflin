"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MessageSquare,
  Check,
  ArrowRight,
  LucideClipboardCheck,
  LucideZap,
  LucideBuilding2,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ClaudeIntegration = () => {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const statsContainerRef = useRef(null);
  const stepsContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Claude Integration Left Side (Text)
      gsap.from(".claude-text-content > *", {
        scrollTrigger: {
          trigger: ".claude-text-content",
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      // 2. Chat Cards (Right Side)
      gsap.from(".chat-card", {
        scrollTrigger: {
          trigger: ".chat-cards-column",
          start: "top 80%",
        },
        opacity: 0,
        x: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });

      // 3. Stats Section
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });

      // 4. Three Steps Section
      gsap.from(".step-card", {
        scrollTrigger: {
          trigger: ".steps-grid",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power4.out",
      });
      
      gsap.from(".steps-heading", {
        scrollTrigger: {
          trigger: ".steps-heading",
          start: "top 90%",
        },
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const chatCards = [
    {
      query: "Create smart links for all the products in my latest video description",
      result: "Creates geo-targeted linkflin.to links for every affiliate URL found",
    },
    {
      query: "Show me which links got the most UK clicks this month",
      result: "Pulls click analytics by country, device, and referrer",
    },
    {
      query: "Replace the affiliate links in my top 50 videos with smart links",
      result: "Runs YouTube auto-convert with preview and one-click rollback",
    },
  ];

  const stats = [
    { value: "40%+", label: "of online traffic comes from outside the US" },
    { value: "$0", label: "earned when a non-localized Amazon link loses the affiliate cookie" },
    { value: "3 weeks", label: "average time a broken link goes unnoticed" },
  ];

  const steps = [
    {
      step: "Step 1",
      title: "Paste any affiliate link",
      desc: "Drop in an Amazon link, ShareASale link, or any URL. We handle the rest.",
      icon: LucideClipboardCheck
    },
    {
      step: "Step 2",
      title: "Get a smart link back",
      desc: "Your link is now geo-targeted, app-opening, and monitored 24/7. One short URL that works everywhere.",
      icon: LucideZap
    },
    {
      step: "Step 3",
      title: "Share it anywhere",
      desc: "YouTube descriptions, TikTok bios, blog posts, emails — one link, every platform.",
      icon: LucideBuilding2
    }
  ];

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Claude Integration Part */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center mb-48">
          <div className="claude-text-content max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">AI-Native</span>
            </div>
            
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-8 leading-[1.1]">
              Manage your links <br />
              from <span className="gradient-text">Claude.</span>
            </h2>
            
            <p className="text-lg leading-relaxed text-zinc-400 mb-10 max-w-lg">
              Linkflin is the first smart link platform with a dedicated{" "}
              <span className="text-white font-medium border-b border-primary/40">MCP integration</span>. 
              Create links, pull analytics, and update YouTube descriptions — just by asking.
            </p>

            <div className="grid grid-cols-2 gap-y-4 mb-10">
              {["Claude Desktop", "Claude Code", "Claude Cowork", "Cursor, Windsurf & more"].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-zinc-500">{item}</span>
                </div>
              ))}
            </div>

            <button className="flex items-center space-x-2 text-primary font-bold text-sm uppercase tracking-widest group">
              <span>Read the setup guide</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Chat Mockup Column */}
          <div className="chat-cards-column mt-16 lg:mt-0 space-y-6">
            {chatCards.map((card, i) => (
              <div
                key={i}
                className="chat-card glass-card p-6 border border-white/5 relative group hover:border-white/10 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="mt-1 shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-100 mb-3 leading-relaxed">
                      "{card.query}"
                    </p>
                    <div className="flex items-center space-x-2">
                      <Check className="h-3 w-3 text-primary/60" />
                      <p className="text-[11px] font-medium text-zinc-500 italic">
                        {card.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest pt-4">
              18 tools available via MCP — free on all plans
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-grid text-center">
          <h2 className="text-3xl font-black text-white mb-24 max-w-4xl mx-auto leading-tight">
            Why international viewers cost you affiliate commissions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item flex flex-col items-center">
                <div className="text-6xl font-black text-primary mb-6 tracking-tighter">
                  {stat.value}
                </div>
                <p className="text-sm font-medium text-zinc-400 max-w-[240px] leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-24">
            <button className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] hover:text-white transition-colors">
              Linkflin fixes all three.{" "}
              <span className="text-primary border-b border-primary/30 ml-1">Here's how ↓</span>
            </button>
          </div>
        </div>

        {/* 3 Steps Section */}
        <div className="steps-container pt-40">
          <h1 className="steps-heading text-center text-4xl font-black text-white mb-24 max-w-4xl mx-auto leading-tight">
            How Smart Links Work: 3 Steps
          </h1>
          
          <div className="steps-grid grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="step-card bg-primary/5 border border-primary/20 p-10 rounded-2xl flex items-center flex-col gap-10 group hover:bg-primary/10 transition-colors"
              >
                <div className="border border-primary/20 w-14 h-14 flex items-center justify-center rounded-full bg-background group-hover:border-primary transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-primary uppercase tracking-widest mb-2">
                    {item.step}
                  </p>
                  <h2 className="text-xl font-black text-white leading-tight mb-4">
                    {item.title}
                  </h2>
                  <p className="text-base leading-relaxed text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ClaudeIntegration;
