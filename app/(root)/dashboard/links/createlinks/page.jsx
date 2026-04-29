"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Link as LinkIcon, ChevronRight, Sparkles, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CreateLinks = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    url: "",
    slug: "",
  });

  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          if (isMounted) router.push("/login");
        }
      } catch (err) {
        if (isMounted) router.push("/login");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".create-header", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".create-card",
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.4",
        )
        .from(
          ".create-footer",
          {
            opacity: 0,
            duration: 0.8,
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
      className="relative p-4 sm:p-6 lg:p-12 overflow-y-auto"
    >
      {/* Aesthetic Background */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="create-header flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-8">
          <Link
            href="/dashboard/links"
            className="hover:text-primary transition-colors"
          >
            Links
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-400">Create</span>
        </nav>

        {/* Heading */}
        <header className="create-header mb-10">
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-3 tracking-tight">
            Create Smart Link
          </h1>
          <p className="text-zinc-500 text-xs lg:text-sm font-medium">
            Turn any affiliate link into a geo-targeted smart link
          </p>
        </header>

        {/* Main Creation Card */}
        <div className="create-card glass-card bg-white/1 border border-white/5 rounded-[2.5rem] p-6 lg:p-10 shadow-2xl">
          <div className="space-y-8">
            {/* URL Input */}
            <div>
              <label className="block text-[10px] lg:text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">
                Paste your affiliate link{" "}
                <span className="text-primary">*</span>
              </label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="https://amazon.com/dp/B0XXXXX?tag=creator-20"
                  className="w-full bg-white/3 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 transition-all group-hover:bg-white/5"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Slug Input */}
            <div>
              <label className="block text-[10px] lg:text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">
                Your short link
              </label>
              <div className="space-y-3">
                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                  Custom Slug
                </p>
                <div className="flex items-stretch">
                  <div className="bg-white/5 border border-white/5 border-r-0 rounded-l-2xl px-6 flex items-center text-zinc-500 text-sm font-medium">
                    linkflin.io/
                  </div>
                  <input
                    type="text"
                    placeholder="my-link"
                    className="flex-1 bg-white/3 border border-white/5 rounded-r-2xl py-4 px-6 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 transition-all"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                  />
                </div>
                <p className="text-[10px] text-zinc-600 font-medium italic">
                  Leave blank to auto-generate
                </p>
              </div>
            </div>

            {/* Advanced Toggle */}
            <button className="flex items-center space-x-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">
              <span>Show advanced options</span>
              <ChevronRight className="w-3 h-3" />
            </button>

            {/* Action Button */}
            <button className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs lg:text-sm shadow-[0_20px_50px_rgba(99,102,241,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3">
              <Sparkles className="w-4 h-4" />
              <span>Create Smart Link</span>
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="create-footer mt-10 flex items-center justify-between px-6">
          <div className="flex items-center space-x-2 text-zinc-600">
            <Info className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Free (0/10 links)
            </span>
          </div>
          <Link
            href="/subscribe"
            className="text-[10px] cursor-pointer font-black text-primary uppercase tracking-widest hover:text-white transition-colors"
          >
            Upgrade to Starter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateLinks;
