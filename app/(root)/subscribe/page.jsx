"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { 
  Check, 
  Zap, 
  ShieldCheck, 
  ChevronLeft, 
  CreditCard,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SubscribePage = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Immediate check for session to prevent hanging
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/login");
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Session check error:", err);
        router.push("/login");
      }
    };
    checkSession();
  }, [router]);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(".sub-element", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        onComplete: function() {
            gsap.set(this.targets(), { clearProps: "all" });
        }
      });

      gsap.to(".pricing-card", {
        borderColor: "rgba(99, 102, 241, 0.4)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
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

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for new creators getting started.",
      features: [
        "Up to 5 Smart Links",
        "Basic Analytics",
        "Standard Redirection",
        "Community Support"
      ],
      cta: "Current Plan",
      current: true
    },
    {
      name: "Pro Creator",
      price: "$19",
      description: "Advanced tools for professional creators.",
      features: [
        "Unlimited Smart Links",
        "Deep Analytics & CTR Tracking",
        "YouTube Auto-Converter",
        "Priority Support",
        "Custom Branding",
        "Geo-Targeting"
      ],
      cta: "Upgrade to Pro",
      popular: true,
      current: false
    }
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#030303] text-white selection:bg-primary/30 py-12 px-6 overflow-hidden relative"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Back Link */}
        <button 
          onClick={() => router.push("/dashboard")}
          className="sub-element flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors group mb-12"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="sub-element text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Elevate your earnings</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Choose your <span className="text-primary">power.</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            Unlock the full potential of your links with our professional creator tools and advanced auto-conversion engine.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i}
              className={`sub-element pricing-card relative glass-card p-10 lg:p-12 border rounded-[3rem] transition-all duration-500 flex flex-col ${
                plan.popular 
                  ? "bg-white/[0.02] border-primary/30 shadow-[0_20px_50px_rgba(99,102,241,0.1)]" 
                  : "bg-transparent border-white/5"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="mb-10">
                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic">{plan.name}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-5xl font-black text-white">{plan.price}</span>
                  <span className="text-zinc-500 font-medium text-sm">/month</span>
                </div>
                <p className="text-zinc-500 mt-4 text-sm leading-relaxed">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center space-x-3 group">
                    <div className={`p-1 rounded-full ${plan.popular ? "bg-primary/20" : "bg-white/5"}`}>
                      <Check className={`w-3 h-3 ${plan.popular ? "text-primary" : "text-zinc-500"}`} />
                    </div>
                    <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                disabled={plan.current}
                className={`w-full py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 ${
                  plan.current
                    ? "bg-white/5 text-zinc-500 border border-white/5 cursor-default"
                    : "bg-white text-black hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
                }`}
              >
                {plan.popular && <CreditCard className="w-4 h-4" />}
                <span>{plan.cta}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="sub-element mt-20 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-zinc-600" />
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-zinc-600" />
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Instant Activation</span>
            </div>
          </div>
          <p className="text-[10px] text-zinc-700 font-medium">Need a custom plan? <Link href="#" className="text-zinc-500 hover:text-white underline underline-offset-4">Contact Sales</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
