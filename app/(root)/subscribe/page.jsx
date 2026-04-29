"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Check,
  Zap,
  ShieldCheck,
  ChevronLeft,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SubscribePage = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState("monthly");

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
      const tl = gsap.timeline();

      tl.from(".sub-header", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        ".pricing-card",
        {
          y: 40,
          opacity: 0,
          scale: 0.95,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.2)",
          onComplete: function () {
            gsap.set(this.targets(), { clearProps: "all" });
          },
        },
        "-=0.4",
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

  const plans = [
    {
      name: "Free",
      monthlyPrice: "0",
      annualPrice: "0",
      links: "10",
      description: "Free forever",
      tag: "No Credit Card",
      features: [
        "10 smart links",
        "Unlimited clicks",
        "Geo-targeting",
        "Click analytics",
        "Deep linking",
        "Health monitoring",
      ],
      cta: "Start Free",
      dashed: true,
    },
    {
      name: "Starter",
      monthlyPrice: "9",
      annualPrice: "7",
      links: "50",
      description: "Billed monthly",
      features: [
        "50 smart links",
        "Unlimited clicks",
        "Geo-targeting",
        "Click analytics",
        "Deep linking",
        "Health monitoring",
      ],
      cta: "Get Started",
    },
    {
      name: "Growth",
      monthlyPrice: "19",
      annualPrice: "15",
      links: "200",
      description: "Billed monthly",
      tag: "Most Popular",
      features: [
        "200 smart links",
        "Unlimited clicks",
        "Geo-targeting",
        "Click analytics",
        "Deep linking",
        "Health monitoring",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Pro",
      monthlyPrice: "49",
      annualPrice: "39",
      links: "Unlimited",
      description: "Billed monthly",
      features: [
        "Unlimited smart links",
        "Unlimited clicks",
        "Geo-targeting",
        "Click analytics",
        "Deep linking",
        "Health monitoring",
        "Priority support",
      ],
      cta: "Get Started",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-white selection:bg-primary/30 py-16 px-6 relative overflow-x-hidden"
    >
      {/* Optimized Background Decor - Removed blurs for performance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full opacity-50" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-secondary/5 rounded-full opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Sign out / Top Nav */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center space-x-2 text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer">
            <span>Sign out</span>
          </button>
        </div>

        {/* Header */}
        <div className="sub-header text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
            Choose your plan
          </h1>
          <p className="text-zinc-500 text-lg max-w-3xl mx-auto mb-2">
            Start free or upgrade anytime. Every plan includes every feature.
            Unlimited clicks.
          </p>
          <p className="text-zinc-600 text-sm">
            On per-click pricing tools, 10,000 clicks/month costs $50+. On
            Linkflin, it costs{" "}
            <span className="text-primary font-bold">$0 extra</span>.
          </p>
        </div>

        {/* Toggle */}
        <div className="sub-header flex items-center justify-center space-x-4 mb-20">
          <div className="bg-white/5 p-1 rounded-xl flex items-center border border-white/5">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 cursor-pointer rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${billingCycle === "monthly" ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-white"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 cursor-pointer rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${billingCycle === "annual" ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-white"}`}
            >
              Annual <span className="text-primary ml-1">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-300 group overflow-hidden ${
                plan.popular
                  ? "bg-white/5 border-primary/30 shadow-[0_20px_50px_rgba(99,102,241,0.1)] scale-105 z-20"
                  : "bg-white/2 border-white/5 hover:border-white/10"
              } border ${plan.dashed ? "border-dashed border-white/20" : ""}`}
            >
              {/* No backdrop blur on cards for scroll performance */}
              {plan.popular && (
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Zap className="w-24 h-24 text-primary" />
                </div>
              )}

              {plan.tag && (
                <div
                  className={`mb-6 self-start px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    plan.popular
                      ? "bg-primary/20 text-primary"
                      : "bg-white/5 text-zinc-500"
                  }`}
                >
                  {plan.tag}
                </div>
              )}

              <div className="mb-8 relative z-10">
                <h3
                  className={`text-2xl font-black mb-4 ${plan.popular ? "text-white" : "text-zinc-100"}`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-black italic">$</span>
                  <span className="text-5xl font-black tracking-tight italic">
                    {billingCycle === "monthly"
                      ? plan.monthlyPrice
                      : plan.annualPrice}
                  </span>
                  <span
                    className={`text-sm font-bold ml-1 ${plan.popular ? "text-zinc-500" : "text-zinc-600"}`}
                  >
                    /mo
                  </span>
                </div>
                <p
                  className={`text-[10px] font-black uppercase tracking-widest ${plan.popular ? "text-zinc-500" : "text-zinc-600"}`}
                >
                  {billingCycle === "annual" && plan.monthlyPrice !== "0"
                    ? "Billed annually"
                    : plan.description}
                </p>
              </div>

              <div
                className={`pt-6 border-t ${plan.popular ? "border-white/10" : "border-white/5"} mb-8 flex-1 relative z-10`}
              >
                <p
                  className={`text-lg font-black mb-6 ${plan.popular ? "text-white" : "text-zinc-300"}`}
                >
                  <span
                    className={plan.popular ? "text-primary" : "text-white"}
                  >
                    {plan.links}
                  </span>{" "}
                  smart links
                </p>
                <div className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-start space-x-3">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${plan.popular ? "text-primary" : "text-zinc-600"}`}
                      />
                      <span
                        className={`text-sm font-medium ${plan.popular ? "text-zinc-300" : "text-zinc-500"}`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all relative z-10 cursor-pointer ${
                  plan.popular
                    ? "bg-primary text-white hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(99,102,241,0.3)]"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Footer Guarantee */}
        <div className="sub-header mt-24 text-center flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3 text-zinc-600">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest italic">
              30-Day Money Back Guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
