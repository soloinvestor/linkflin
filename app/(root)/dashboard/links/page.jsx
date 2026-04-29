"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Link as LinkIcon,
  Search,
  Filter,
  Plus,
  MoreVertical,
  ExternalLink,
  Copy,
  BarChart2,
  Trash2,
  ChevronRight,
  Menu,
  X,
  LayoutDashboard,
  BarChart3,
  Zap,
  Settings,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LinksPage = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setUser(data.user);
        } else {
          if (isMounted) router.push("/login");
        }
      } catch (err) {
        console.error("Fetch user error:", err);
        if (isMounted) router.push("/login");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.from(".links-content-element", {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
        onComplete: function () {
          gsap.set(this.targets(), { clearProps: "all" });
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: LinkIcon, label: "Links", href: "/dashboard/links", active: true },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Zap, label: "Auto-Convert", href: "/dashboard/auto-convert" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const links = [
    {
      id: 1,
      name: "Premium Lens Kit",
      original: "amazon.com/dp/B08XYZ...",
      short: "linkflin.io/c/lens",
      clicks: "1.2k",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Creator Workstation",
      original: "desksetup.com/pro-gear...",
      short: "linkflin.io/c/setup",
      clicks: "850",
      date: "5 days ago",
    },
    {
      id: 3,
      name: "Adobe Creative Cloud",
      original: "adobe.com/affiliate/...",
      short: "linkflin.io/c/adobe",
      clicks: "3.4k",
      date: "1 week ago",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen bg-[#030303] text-white selection:bg-primary/30"
    >
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <LinkIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black uppercase italic tracking-tight">
            linkflin
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-zinc-400 hover:text-white transition-colors"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Consistent with Dashboard) */}
      <aside
        className={`dash-sidebar fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[#050505] border-r border-white/5 flex flex-col p-8 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <LinkIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black uppercase italic tracking-tight">
            linkflin
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => router.push(item.href)}
              className={`w-full cursor-pointer flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all group ${item.active ? "bg-primary/10 text-primary border border-primary/10 shadow-[0_0_30px_rgba(99,102,241,0.05)]" : "text-zinc-500 hover:text-white hover:bg-white/[0.03]"}`}
            >
              <item.icon
                className={`w-5 h-5 transition-transform group-hover:scale-110 ${item.active ? "text-primary" : "text-zinc-500"}`}
              />
              <span className="text-xs font-black uppercase tracking-widest">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5 space-y-6">
          <div className="flex items-center space-x-4 px-2">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-primary font-black uppercase tracking-widest">
              {user?.firstName?.[0] || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-black text-white truncate uppercase tracking-widest">
                {user?.firstName || "Creator"}
              </h4>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-0.5">
                Free Plan
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
          </div>
          <button
            onClick={() => {
              fetch("/api/auth/logout", { method: "POST" });
              router.push("/");
            }}
            className="w-full flex items-center space-x-4 px-4 py-3 text-zinc-500 hover:text-red-400 transition-all group rounded-2xl hover:bg-red-500/5"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-12 pt-24 lg:pt-12 relative overflow-y-auto">
        <div className="relative z-10 max-w-6xl">
          <header className="links-content-element flex items-center justify-between mb-12 flex-wrap gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight italic uppercase">
                My Links
              </h1>
              <p className="text-zinc-500 text-xs font-medium">
                Manage and optimize your smart link collection
              </p>
            </div>
            <button className="bg-white text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
              <Plus className="w-4 h-4" />
              <span>Create Link</span>
            </button>
          </header>

          {/* Filters/Search */}
          <div className="links-content-element flex items-center space-x-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                type="text"
                placeholder="Search links..."
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-xs text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-primary/50 transition-all"
              />
            </div>
            <button className="p-3.5 bg-white/[0.03] border border-white/5 rounded-2xl text-zinc-500 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* Links List */}
          <div className="space-y-4">
            {links.map((link) => (
              <div
                key={link.id}
                className="links-content-element glass-card p-6 border border-white/5 rounded-[2rem] bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
              >
                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div className="flex items-center space-x-6 min-w-0 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <LinkIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-black text-white mb-1 truncate uppercase tracking-tight italic">
                        {link.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <p className="text-[10px] font-black text-primary truncate tracking-widest">
                          {link.short}
                        </p>
                        <button className="text-zinc-600 hover:text-white transition-colors">
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8 lg:space-x-12 shrink-0">
                    <div className="text-center hidden sm:block">
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">
                        Clicks
                      </p>
                      <div className="flex items-center space-x-1 text-white">
                        <BarChart2 className="w-3 h-3 text-primary" />
                        <span className="text-sm font-black">
                          {link.clicks}
                        </span>
                      </div>
                    </div>
                    <div className="text-center hidden sm:block">
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">
                        Created
                      </p>
                      <p className="text-xs font-bold text-zinc-400">
                        {link.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-3 rounded-xl bg-white/5 text-zinc-500 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-3 rounded-xl bg-white/5 text-zinc-500 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LinksPage;
