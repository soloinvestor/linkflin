"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  LayoutDashboard,
  Link as LinkIcon,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Globe,
  Zap,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const containerRef = useRef(null);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/"); // Fallback
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".dash-sidebar", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".dash-header",
          {
            y: -20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .from(
          ".dash-card",
          {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.3",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      label: "Total Clicks",
      value: "124.5k",
      change: "+12.5%",
      icon: BarChart3,
      color: "text-blue-400",
    },
    {
      label: "Active Links",
      value: "84",
      change: "+4",
      icon: LinkIcon,
      color: "text-primary",
    },
    {
      label: "Conversions",
      value: "12.2k",
      change: "+8.2%",
      icon: Zap,
      color: "text-yellow-400",
    },
    {
      label: "Revenue",
      value: "$4,250",
      change: "+15.3%",
      icon: TrendingUp,
      color: "text-green-400",
    },
  ];

  const recentLinks = [
    {
      name: "My Favorite Camera Gear 2024",
      url: "linkflin.io/c/gear24",
      clicks: "12.4k",
      ctr: "8.2%",
    },
    {
      name: "The Ultimate Desk Setup",
      url: "linkflin.io/c/desk",
      clicks: "8.1k",
      ctr: "6.5%",
    },
    {
      name: "Creator Essentials Pack",
      url: "linkflin.io/c/essentials",
      clicks: "3.2k",
      ctr: "9.1%",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen bg-[#030303] text-white selection:bg-primary/30"
    >
      {/* Sidebar */}
      <aside className="dash-sidebar hidden lg:flex flex-col w-72 bg-white/[0.02] border-r border-white/5 p-8 relative z-20">
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <LinkIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black uppercase italic tracking-tight">
            linkflin
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: LinkIcon, label: "My Links" },
            { icon: BarChart3, label: "Analytics" },
            { icon: Globe, label: "Geo-Rules" },
            { icon: Settings, label: "Settings" },
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-zinc-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-4 px-4 py-3 text-zinc-500 hover:text-red-400 transition-colors mt-auto group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">
            Sign Out
          </span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 relative">
        {/* Background mesh */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <header className="dash-header flex items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl font-black text-white mb-2">Dashboard</h1>
              <p className="text-zinc-500 font-medium">
                Welcome back, Samarth!
              </p>
            </div>
            <button className="flex items-center space-x-3 bg-white text-black px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_-5px_rgba(255,255,255,0.2)]">
              <Plus className="w-4 h-4" />
              <span>Create New Link</span>
            </button>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="dash-card glass-card p-6 border border-white/5 rounded-3xl hover:border-white/10 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black text-green-400 px-2 py-1 bg-green-400/10 rounded-lg">
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-black text-white">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* Recent Links */}
          <div className="dash-card glass-card border border-white/5 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-white">
                Recent Smart Links
              </h2>
              <button className="text-xs font-black text-primary uppercase tracking-widest hover:text-white transition-colors">
                View All Links
              </button>
            </div>

            <div className="space-y-4">
              {recentLinks.map((link, i) => (
                <div
                  key={i}
                  className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-transparent hover:border-white/5 hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <LinkIcon className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">
                        {link.name}
                      </h4>
                      <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">
                        {link.url}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-12">
                    <div className="hidden sm:block text-right">
                      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">
                        Clicks
                      </p>
                      <p className="text-sm font-black text-white">
                        {link.clicks}
                      </p>
                    </div>
                    <div className="hidden sm:block text-right">
                      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">
                        CTR
                      </p>
                      <p className="text-sm font-black text-white">
                        {link.ctr}
                      </p>
                    </div>
                    <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
