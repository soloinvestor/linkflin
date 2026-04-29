"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Link as LinkIcon,
  Zap,
  Youtube,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      gsap.from(".dash-content-element", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSubscribe = () => {
    router.push("/subscribe");
  };

  const handleCreateLink = () => {
    router.push("/dashboard/links/createlinks");
  };

  return (
    <div ref={containerRef} className="relative p-4 sm:p-6 lg:p-12">
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
            <div className="glass-card p-6 lg:p-10 border border-white/5 rounded-4xl lg:rounded-[2.5rem] bg-white/1 hover:bg-white/3 transition-all duration-500 h-full">
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
                <button className="flex cursor-pointer items-center space-x-2 text-primary font-black uppercase tracking-widest text-[10px] lg:text-xs group/btn">
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
            <div className="glass-card p-6 lg:p-10 border border-white/5 rounded-4xl lg:rounded-[2.5rem] bg-white/1 hover:bg-white/3 transition-all duration-500 h-full">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-primary/10 flex items-center justify-center mb-6 lg:mb-8 border border-primary/20 group-hover:scale-110 transition-transform">
                <LinkIcon className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
              </div>

              <div className="mb-6 lg:mb-8">
                <h3 className="text-xl lg:text-2xl font-black text-white mb-3 lg:mb-4 tracking-tight">
                  Create a smart link
                </h3>
                <p className="text-zinc-500 text-xs lg:text-sm leading-relaxed max-w-sm">
                  Paste any affiliate link and get a linkflin.io short link that
                  works worldwide.
                </p>
              </div>

              <button
                onClick={handleCreateLink}
                className="flex cursor-pointer items-center space-x-2 text-primary font-black uppercase tracking-widest text-[10px] lg:text-xs group/btn"
              >
                <span>Create</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Verification Banner */}
        <div className="dash-content-element mt-12">
          <div className="p-6 glass-card border border-primary/20 bg-primary/5 rounded-4xl flex items-center justify-between flex-wrap gap-4">
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
            <button
              onClick={handleSubscribe}
              className="bg-white cursor-pointer text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
