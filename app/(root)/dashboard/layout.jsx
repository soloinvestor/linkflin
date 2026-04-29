"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  LayoutDashboard,
  Link as LinkIcon,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
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
      gsap.from(".dash-sidebar", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
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
      className="flex min-h-screen bg-background text-white selection:bg-primary/30 font-sans"
    >
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
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
            const isActive = pathname === item.href;
            return (
              <Link
                href={item.href}
                key={i}
                className={`w-full flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all group ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/10 shadow-[0_0_30px_rgba(99,102,241,0.05)]"
                    : "text-zinc-500 hover:text-white hover:bg-white/3"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "text-primary" : "text-zinc-500"}`}
                />
                <span className="text-xs font-black uppercase tracking-widest">
                  {item.label}
                </span>
              </Link>
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
            className="w-full cursor-pointer flex items-center space-x-4 px-4 py-3 text-zinc-500 hover:text-red-400 transition-all group rounded-2xl hover:bg-red-500/5"
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

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
