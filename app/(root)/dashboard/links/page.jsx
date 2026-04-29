"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Link as LinkIcon, Plus, ArrowRight, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LinksPage = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
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
      const tl = gsap.timeline();

      tl.from(".links-header", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".links-empty-content",
          {
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.4",
        )
        .from(
          ".links-footer-note",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        );
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

  return (
    <div
      ref={containerRef}
      className="relative min-h-[calc(100vh-80px)] flex flex-col p-4 sm:p-6 lg:p-12"
    >
      {/* Aesthetic Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex flex-col">
        {/* Header Section */}
        <header className="links-header mb-16">
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight">
            Smart Links
          </h1>
          <p className="text-zinc-500 text-xs lg:text-sm font-medium">
            Manage your geo-targeted affiliate links
          </p>
        </header>

        {/* Empty State Content */}
        <div className="links-empty-content flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/2 border border-white/5 flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(255,255,255,0.02)]">
            <LinkIcon className="w-8 h-8 lg:w-10 lg:h-10 text-zinc-600" />
          </div>

          <h2 className="text-2xl lg:text-3xl font-black text-white mb-6 tracking-tight italic uppercase">
            One link that works everywhere
          </h2>

          <p className="text-zinc-500 text-sm lg:text-base leading-relaxed max-w-xl mb-12 font-medium">
            Smart links send your viewers to the right store for their country.
            Paste one link in your video description — a viewer in Germany sees
            <span className="text-zinc-300"> Amazon.de</span>, a viewer in Japan
            sees
            <span className="text-zinc-300"> Amazon.co.jp</span>. Automatically.
          </p>

          <button
            onClick={() => router.push("/dashboard/links/createlinks")}
            className="group relative cursor-pointer bg-primary text-white px-8 py-4 rounded-2xl text-xs lg:text-sm font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(99,102,241,0.2)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center space-x-3">
              <span>Create Your First Smart Link</span>
            </span>
          </button>
        </div>

        {/* Footer Note */}
        <div className="links-footer-note mt-16 pt-12 border-t border-white/5 text-center">
          <Link
            href="/dashboard/auto-convert"
            className="group flex items-center justify-center space-x-2 text-zinc-500 hover:text-primary transition-colors text-xs lg:text-sm font-black uppercase tracking-widest"
          >
            <Zap className="w-4 h-4" />
            <span>
              Have a YouTube channel with affiliate links? Auto-Convert All Your
              Videos
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LinksPage;
