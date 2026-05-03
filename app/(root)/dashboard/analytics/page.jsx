"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BarChart3,
  Loader2,
  Globe,
  Smartphone,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Calendar,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const AnalyticsPage = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const [hasLinks, setHasLinks] = useState(false);

  useEffect(() => {
    if (!hasLinks && !loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [hasLinks, loading]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) router.push("/login");
        else setLoading(false);
      } catch (err) {
        router.push("/login");
      }
    };
    checkSession();
  }, [router]);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.from(".animate-up", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
            Calculating Data...
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Total Clicks", value: "1,247", icon: TrendingUp },
    { label: "Today", value: "83", icon: Clock },
    { label: "This Week", value: "412", icon: Calendar },
    { label: "Month", value: "34%", icon: BarChart3 },
    { label: "International", value: "28%", icon: Globe },
  ];

  return (
    <div
      ref={containerRef}
      className="p-4 sm:p-6 lg:p-12 max-w-7xl mx-auto min-h-screen relative"
    >
      {/* Background Blurred Content Group */}
      <div
        className={`transition-all duration-1000 ${!hasLinks ? "blur-[15px] scale-[0.98] pointer-events-none opacity-40 select-none" : ""}`}
      >
        {/* Header */}
        <header className="animate-up mb-12">
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight uppercase italic">
            Analytics
          </h1>
          <p className="text-zinc-500 text-sm font-medium">
            Overview of your top-performing smart links
          </p>
        </header>

        {/* Stats Grid */}
        <div className="animate-up grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card p-6 border border-white/5 bg-white/2"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  {stat.label}
                </p>
                <stat.icon className="w-3 h-3 text-zinc-600" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Chart Visualization (Simulated) */}
        <div className="animate-up glass-card border border-white/5 bg-white/1 p-8 min-h-[600px] overflow-hidden">
          <div className="flex items-end justify-between h-64 gap-2 mb-20 opacity-20">
            {[40, 70, 45, 90, 65, 80, 30, 60, 85, 50, 75, 40, 95, 60].map(
              (h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/20 rounded-t-lg"
                  style={{ height: `${h}%` }}
                />
              ),
            )}
          </div>
          <div className="grid grid-cols-2 gap-12 opacity-10">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-white/10 rounded-full w-full" />
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-white/10 rounded-full w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Central Overlay Card (Only visible when no links) */}
      {!hasLinks && (
        <div className="fixed inset-0 z-35 flex items-center justify-center p-4 lg:pl-72 pt-24 lg:pt-0 pointer-events-none overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in duration-700 pointer-events-auto my-auto">
            <h2 className="text-xl sm:text-2xl font-black text-black mb-2 sm:mb-3 tracking-tight leading-tight">
              Your analytics will appear here
            </h2>
            <p className="text-zinc-500 text-[11px] sm:text-xs mb-6 sm:mb-8 font-medium leading-relaxed">
              Once viewers start clicking your smart links, you'll see deep
              insights into your audience.
            </p>

            <div className="space-y-6 mb-10">
              {[
                {
                  icon: Globe,
                  text: "Global distribution & country breakdown",
                },
                { icon: Smartphone, text: "Mobile vs desktop audience data" },
                {
                  icon: BarChart3,
                  text: "Top performing links & click-through rates",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center border border-zinc-200/50">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[11px] font-black text-zinc-800 uppercase tracking-wide">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-zinc-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-8 sm:mb-10 border border-zinc-200/50">
              <p className="text-[8px] sm:text-[9px] font-black text-black uppercase tracking-[0.2em] mb-3 sm:mb-4 opacity-50">
                To start getting data:
              </p>
              <ol className="space-y-2">
                {[
                  "Create a unique smart link",
                  "Share it in your video descriptions",
                  "Wait for your audience to engage",
                ].map((step, i) => (
                  <li
                    key={i}
                    className="text-[9px] sm:text-[10px] font-black text-zinc-500 flex items-center uppercase tracking-wider"
                  >
                    <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[7px] mr-3 shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <button
              onClick={() => router.push("/dashboard/links")}
              className="w-full relative cursor-pointer overflow-hidden group rounded-xl bg-primary p-4 sm:p-5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(148,153,232,0.4)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <div className="relative z-10 flex items-center justify-center space-x-3">
                <span>Go to Links</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </div>
        </div>
      )}
      {/* Bottom Footer Details */}
      <div className="animate-up mt-12 flex items-center justify-between opacity-20 hover:opacity-50 transition-opacity duration-700">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <MapPin className="w-3 h-3" />
            <span className="text-[8px] font-black uppercase tracking-widest">
              Global Tracking
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-3 h-3" />
            <span className="text-[8px] font-black uppercase tracking-widest">
              Device Analysis
            </span>
          </div>
        </div>
        <p className="text-[8px] font-black uppercase tracking-widest">
          v1.2.0-stable
        </p>
      </div>
    </div>
  );
};

export default AnalyticsPage;
