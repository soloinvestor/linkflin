"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  LayoutDashboard,
  Link as LinkIcon,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Zap,
  Youtube,
  ArrowRight,
  User,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = () => {
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

    // Fail-safe to remove loading if it gets stuck for too long
    const timeout = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 5000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/");
    }
  };

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".dash-sidebar", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      }).from(
        ".dash-content-element",
        {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          onComplete: function () {
            gsap.set(this.targets(), { clearProps: "all" });
          },
        },
        "-=0.6",
      );
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

  const handleNavigation = (href) => {
    router.push(href);
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      active: true,
      href: "/dashboard",
    },
    { icon: LinkIcon, label: "Links", href: "/dashboard/links" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Zap, label: "Auto-Convert", href: "/dashboard/auto-convert" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen bg-[#030303] text-white selection:bg-primary/30 font-sans"
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

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        dash-sidebar fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[#050505] border-r border-white/5 flex flex-col p-8 transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0 shadow-[20px_0_50px_rgba(0,0,0,0.5)]" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <LinkIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black uppercase italic tracking-tight">
            linkflin
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {menuItems.map((item, i) => {
            const isActive = item.href === "/dashboard"; // Simplified for now, can use usePathname later
            return (
              <button
                onClick={() => handleNavigation(item.href)}
                key={i}
                className={`w-full cursor-pointer flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all group ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/10 shadow-[0_0_30px_rgba(99,102,241,0.05)]"
                    : "text-zinc-500 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "text-primary" : "text-zinc-500"}`}
                />
                <span className="text-xs font-black uppercase tracking-widest">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Bottom Profile */}
        <div className="mt-auto pt-8 border-t border-white/5 space-y-6">
          <div className="flex items-center space-x-4 px-2">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-primary font-black shadow-inner">
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
            <button className="text-zinc-600 hover:text-primary transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 px-4 py-3 text-zinc-500 hover:text-red-400 transition-all group rounded-2xl hover:bg-red-500/5"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">
              Logout
            </span>
          </button>

          <div className="flex items-center justify-center space-x-4 text-[9px] font-black uppercase tracking-widest text-zinc-700">
            <Link href="#" className="hover:text-zinc-400 transition-colors">
              Terms
            </Link>
            <span className="w-1 h-1 bg-zinc-800 rounded-full" />
            <Link href="#" className="hover:text-zinc-400 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-12 pt-24 lg:pt-12 relative overflow-y-auto">
        {/* Aesthetic Gradients */}
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl">
          {/* Welcome Header */}
          <header className="dash-content-element mb-10 lg:mb-12">
            <h1 className="text-3xl lg:text-4xl font-black text-white mb-2 lg:mb-3 tracking-tight">
              Welcome, {user?.firstName || "Mr"}!
            </h1>
            <p className="text-zinc-500 text-xs lg:text-sm font-medium">
              Ready to stop losing affiliate commissions?
            </p>
          </header>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* YouTube Auto-Convert Card */}
            <div className="dash-content-element group relative">
              <div className="glass-card p-6 lg:p-10 border border-white/5 rounded-[2rem] lg:rounded-[2.5rem] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 h-full">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 lg:mb-8 border border-red-500/20 group-hover:scale-110 transition-transform">
                  <Youtube className="w-6 h-6 lg:w-7 lg:h-7 text-red-500" />
                </div>

                <div className="mb-6 lg:mb-8">
                  <h3 className="text-xl lg:text-2xl font-black text-white mb-3 lg:mb-4 tracking-tight">
                    Auto-convert YouTube links
                  </h3>
                  <p className="text-zinc-500 text-xs lg:text-sm leading-relaxed max-w-sm">
                    We scan your channel and upgrade all your affiliate links in
                    ~2 minutes.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-primary font-black uppercase tracking-widest text-[10px] lg:text-xs group/btn">
                    <span>Start</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                  <div className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-[9px] lg:text-[10px] font-black text-primary uppercase tracking-widest">
                      Recommended
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Link Card */}
            <div className="dash-content-element group relative">
              <div className="glass-card p-6 lg:p-10 border border-white/5 rounded-[2rem] lg:rounded-[2.5rem] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 h-full">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-primary/10 flex items-center justify-center mb-6 lg:mb-8 border border-primary/20 group-hover:scale-110 transition-transform">
                  <LinkIcon className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
                </div>

                <div className="mb-6 lg:mb-8">
                  <h3 className="text-xl lg:text-2xl font-black text-white mb-3 lg:mb-4 tracking-tight">
                    Create a smart link
                  </h3>
                  <p className="text-zinc-500 text-xs lg:text-sm leading-relaxed max-w-sm">
                    Paste any affiliate link and get a linkflin.io short link
                    that works worldwide.
                  </p>
                </div>

                <button className="flex items-center space-x-2 text-primary font-black uppercase tracking-widest text-[10px] lg:text-xs group/btn">
                  <span>Create</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Verification Banner */}
          <div className="dash-content-element mt-12">
            <div className="p-6 glass-card border border-primary/20 bg-primary/5 rounded-[2rem] flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-primary/20">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-widest">
                    Account Verified
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-medium mt-1">
                    Your account is fully secured and ready for creator tools.
                  </p>
                </div>
              </div>
              <button className="bg-white text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
