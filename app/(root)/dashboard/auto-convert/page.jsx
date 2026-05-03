"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Youtube,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ArrowRight,
  Loader2,
  RefreshCcw,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const AutoConvertPage = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/login");
        } else {
          setLoading(false);
        }
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
        y: 30,
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
            Loading Automation...
          </p>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, label: "Connect" },
    { id: 2, label: "Configure" },
    { id: 3, label: "Preview" },
    { id: 4, label: "Convert" },
    { id: 5, label: "Done" },
  ];

  return (
    <div
      ref={containerRef}
      className="p-4 sm:p-8 lg:p-12 max-w-5xl mx-auto min-h-screen"
    >
      {/* Stepper */}
      <div className="animate-up mb-16 flex items-center justify-center">
        <div className="flex items-center w-full max-w-3xl px-4">
          {steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center relative group">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 z-10 border ${
                    currentStep >= step.id
                      ? "bg-primary border-primary text-white shadow-[0_0_20px_rgba(148,153,232,0.4)]"
                      : "bg-white/5 text-zinc-600 border-white/5"
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`absolute -bottom-8 text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-500 whitespace-nowrap ${
                    currentStep >= step.id ? "text-primary" : "text-zinc-600"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px mx-2 bg-white/5 relative">
                  <div
                    className="absolute inset-0 bg-primary transition-transform duration-700 origin-left"
                    style={{
                      transform: `scaleX(${currentStep > step.id ? 1 : 0})`,
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="animate-up text-center mb-12 mt-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Zap className="w-3 h-3 text-primary" />
          <span className="text-[9px] font-black text-primary uppercase tracking-widest">
            Automation Engine v2.0
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight italic uppercase">
          Auto-Convert Descriptions
        </h1>
        <p className="text-zinc-500 font-medium max-w-2xl mx-auto text-sm leading-relaxed">
          Automatically convert affiliate links in your video descriptions to
          smart links. Boost your earnings with geo-targeting and advanced
          analytics in seconds.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="animate-up glass-card rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative mb-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

        <div className="p-8 sm:p-12 lg:p-16">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Youtube className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">
                  Connect YouTube
                </h2>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                  Step 1 of 5
                </p>
              </div>
            </div>

            <p className="text-zinc-400 text-sm mb-10 leading-relaxed font-medium">
              We need permission to read and update your video descriptions.
              This uses YouTube's official OAuth API to ensure secure and
              authorized access to your channel metadata.
            </p>

            <button
              type="button"
              className="w-full relative overflow-hidden group rounded-2xl bg-white p-6 text-xs font-black uppercase tracking-[0.3em] text-black transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-center justify-center space-x-4">
                <Youtube className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                <span className="group-hover:text-white transition-colors">
                  Connect YouTube Account
                </span>
              </div>
            </button>

            {/* Lists Container */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Do List */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  What we DO
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start space-x-4 text-xs text-zinc-400 font-medium group">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 transition-transform group-hover:scale-110" />
                    <span>
                      Read your video descriptions to find affiliate links
                    </span>
                  </li>
                  <li className="flex items-start space-x-4 text-xs text-zinc-400 font-medium group">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 transition-transform group-hover:scale-110" />
                    <span>
                      Replace raw affiliate links with geo-targeted smart links
                    </span>
                  </li>
                </ul>
              </div>

              {/* Never List */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  What we NEVER do
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start space-x-4 text-xs text-zinc-400 font-medium group">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 transition-transform group-hover:scale-110" />
                    <span>Touch your titles, thumbnails, or video tags</span>
                  </li>
                  <li className="flex items-start space-x-4 text-xs text-zinc-400 font-medium group">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 transition-transform group-hover:scale-110" />
                    <span>Delete, upload, or modify video content</span>
                  </li>
                  <li className="flex items-start space-x-4 text-xs text-zinc-400 font-medium group">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 transition-transform group-hover:scale-110" />
                    <span>Access your private emails or channel settings</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Expandable Info */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <button
                onClick={() => setIsExpanding(!isExpanding)}
                className="flex items-center space-x-3 text-[10px] font-black text-zinc-600 hover:text-white uppercase tracking-widest transition-colors group"
              >
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-500 ${isExpanding ? "rotate-180" : ""}`}
                />
                <span>Why do we need write access?</span>
              </button>
              {isExpanding && (
                <div className="mt-6 text-xs text-zinc-500 leading-relaxed font-medium pl-6 border-l border-primary/20">
                  To automatically replace your existing affiliate links with
                  smart links, we require write access specifically for video
                  metadata. This allows Linkflin to process your video
                  descriptions in bulk, saving you hours of manual work and
                  ensuring your links are always up to date.
                </div>
              )}
            </div>

            {/* Preview Comparison */}
            <div className="mt-12 p-8 rounded-3xl bg-white/2 border border-white/5 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <RefreshCcw className="w-40 h-40 text-primary rotate-12" />
              </div>
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                      Before Processing
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium italic pl-3 border-l border-zinc-800">
                    ...check out this camera{" "}
                    <span className="text-zinc-600 underline decoration-zinc-800 underline-offset-4">
                      https://amazon.com/dp/B0XXXXX?tag=creator-20
                    </span>
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_rgba(148,153,232,1)]" />
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">
                      After Conversion
                    </span>
                  </div>
                  <p className="text-xs text-white font-medium pl-3 border-l border-primary/30">
                    ...check out this camera{" "}
                    <span className="text-primary font-black underline decoration-primary/40 underline-offset-4">
                      https://linkflin.io/sony-a7iv
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-12 text-center text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em]">
              You can disconnect your channel at any time from Settings.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Features */}
      <div className="animate-up flex flex-wrap items-center justify-center gap-12 opacity-30 hover:opacity-60 transition-opacity duration-1000 mb-20">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">
            OAuth 2.0 Secure
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <RefreshCcw className="w-4 h-4 text-primary" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">
            Bulk Processing
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">
            AI detection
          </span>
        </div>
      </div>
    </div>
  );
};

export default AutoConvertPage;
