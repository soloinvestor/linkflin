"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Small delay to allow layout to settle after lazy mounting
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      gsap.from(".pricing-heading > *", {
        scrollTrigger: {
          trigger: ".pricing-section",
          start: "top 95%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: ".pricing-grid",
          start: "top 95%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: "Free",
      price: 0,
      links: "10 smart links",
      features: [
        "Unlimited clicks",
        "Geo-targeting",
        "Click analytics",
        "Deep linking",
        "Health monitoring",
      ],
      cta: "Get 10 Free Smart Links",
      highlight: false,
    },
    {
      name: "Starter",
      price: isAnnual ? 7 : 9,
      links: "50 smart links",
      features: [
        "Unlimited clicks",
        "Geo-targeting",
        "Click analytics",
        "Deep linking",
        "Health monitoring",
      ],
      cta: "Start Free — Upgrade Anytime",
      highlight: false,
    },
    {
      name: "Growth",
      price: isAnnual ? 15 : 19,
      links: "200 smart links",
      features: [
        "Unlimited clicks",
        "Geo-targeting",
        "Click analytics",
        "Deep linking",
        "Health monitoring",
      ],
      cta: "Start Free — Upgrade Anytime",
      highlight: true,
      popular: true,
    },
    {
      name: "Pro",
      price: isAnnual ? 39 : 49,
      links: "Unlimited smart links",
      features: [
        "Unlimited clicks",
        "Geo-targeting",
        "Click analytics",
        "Deep linking",
        "Health monitoring",
      ],
      cta: "Start Free — Upgrade Anytime",
      highlight: false,
    },
  ];

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="py-32 relative overflow-hidden pricing-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pricing-heading">
          <h2 className="text-4xl font-black text-white mb-6">
            Smart Link Pricing: Flat-Rate Plans
          </h2>
          <p className="text-zinc-400 text-lg mb-4">
            Every plan includes every feature. Unlimited clicks. Always.
          </p>
          <p className="text-sm text-zinc-500">
            On per-click pricing tools, 10,000 clicks/month costs $50+. On
            Linkflin, it costs{" "}
            <span className="text-white font-bold">$0 extra.</span>
          </p>

          {/* Toggle */}
          <div className="mt-12 flex items-center justify-center space-x-4">
            <div className="bg-white/5 p-1 rounded-2xl border border-white/10 flex items-center">
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isAnnual ? "bg-white text-black" : "text-zinc-500 hover:text-white"}`}
              >
                Annual{" "}
                <span className="ml-2 text-[10px] text-primary opacity-80">
                  Save 20%
                </span>
              </button>
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${!isAnnual ? "bg-white text-black" : "text-zinc-500 hover:text-white"}`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card relative flex flex-col p-8 rounded-4xl transition-all duration-500 hover:scale-[1.02] ${
                plan.highlight
                  ? "bg-[#161618] border-2 border-primary/50 shadow-[0_0_40px_-10px_rgba(148,153,232,0.3)] z-10 scale-[1.05]"
                  : "bg-white/5 border border-white/5"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-5 left-1/2 px-2 py-1.5 bg-primary/20 border border-primary/30 rounded-full">
                  <span className="text-[9px] font-black text-primary uppercase tracking-widest">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-black text-white mb-6">
                  {plan.name}
                </h3>
                <div className="flex items-baseline space-x-1 mb-2">
                  <span className="text-4xl font-black text-white">
                    ${plan.price}
                  </span>
                  <span className="text-zinc-500 text-sm">/mo</span>
                </div>
                {plan.price > 0 && (
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                    ${plan.price * 12}/yr billed annually
                  </p>
                )}
                {plan.price === 0 && (
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                    Free forever
                  </p>
                )}
              </div>

              <div className="mb-10">
                <p
                  className={`text-sm font-black mb-8 ${plan.highlight ? "text-white" : "text-zinc-400"}`}
                >
                  {plan.links}
                </p>
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <Check
                        className={`w-4 h-4 ${plan.highlight ? "text-primary" : "text-zinc-700"}`}
                      />
                      <span
                        className={`text-xs font-medium ${
                          feature === "Unlimited clicks" && plan.highlight
                            ? "text-primary font-black italic"
                            : "text-zinc-500"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`cursor-pointer mt-auto w-full py-4 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  plan.highlight
                    ? "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20"
                    : "bg-transparent border border-white/10 text-white hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
