"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Globe,
  MousePointer2,
  ShieldCheck,
  Smartphone,
  Zap,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    name: "Real-time Analytics",
    description:
      "Get instant insights into your link performance with live tracking and detailed visitor demographics.",
    icon: BarChart3,
  },
  {
    name: "Global Edge Network",
    description:
      "Lightning-fast redirects powered by our worldwide edge network, ensuring zero latency for your users.",
    icon: Globe,
  },
  {
    name: "AI Fraud Protection",
    description:
      "Protect your commissions with advanced bot detection and AI-powered click fraud prevention.",
    icon: ShieldCheck,
  },
  {
    name: "Custom Domains",
    description:
      "Strengthen your brand by using your own custom domains for all your affiliate and short links.",
    icon: MousePointer2,
  },
  {
    name: "Deep Linking",
    description:
      "Automatically detect user devices and route them directly to mobile apps for higher conversion rates.",
    icon: Smartphone,
  },
  {
    name: "Smart Targeting",
    description:
      "Route visitors based on their location, device, or language to offer a personalized experience.",
    icon: Zap,
  },
];

const Features = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".demo-heading", {
        scrollTrigger: {
          trigger: ".action-demo-section",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".demo-card", {
        scrollTrigger: {
          trigger: ".demo-card",
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        scale: 0.98,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".demo-row", {
        scrollTrigger: {
          trigger: ".demo-rows",
          start: "top 80%",
        },
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Infrastructure
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black tracking-tight text-white sm:text-6xl"
          >
            Everything you need <br />
            <span className="text-zinc-500">to scale globally.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-lg leading-relaxed text-zinc-400 max-w-2xl mx-auto"
          >
            Linkflin provides the most advanced toolkit for modern affiliate
            marketers, helping you optimize every single click with
            sub-millisecond precision.
          </motion.p>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-10 transition-all duration-300 will-change-transform"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>

              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {feature.name}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* See it in action Section */}
        <div className="mt-48 action-demo-section">
          <div className="text-center mb-16 overflow-hidden">
            <h2 className="text-4xl font-black text-white demo-heading">
              See it in action
            </h2>
          </div>

          <div className="max-w-4xl mx-auto demo-card glass-card p-8 sm:p-12 relative overflow-hidden border border-white/5 shadow-2xl">
            {/* Input Mockup */}
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-6 py-4 mb-12 group transition-all hover:border-primary/30">
              <span className="text-zinc-500 text-sm font-medium truncate mr-4">
                https://www.amazon.com/dp/B0DFK5Z33M?tag=creator-20
              </span>
              <span className="text-primary text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                Try your own link ↑
              </span>
            </div>

            <div className="space-y-8">
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-6">
                Here's what happens with a Smart Link:
              </p>

              <div className="space-y-4 demo-rows">
                {[
                  {
                    country: "US viewer",
                    flag: "🇺🇸",
                    link: "amazon.com/dp/B0DFK5Z33M",
                    meta: "(your original link)",
                  },
                  {
                    country: "UK viewer",
                    flag: "🇬🇧",
                    link: "amazon.co.uk/dp/B0DFK5Z33M",
                  },
                  {
                    country: "DE viewer",
                    flag: "🇩🇪",
                    link: "amazon.de/dp/B0DFK5Z33M",
                  },
                  {
                    country: "JP viewer",
                    flag: "🇯🇵",
                    link: "amazon.co.jp/dp/B0DFK5Z33M",
                  },
                  {
                    country: "AU viewer",
                    flag: "🇦🇺",
                    link: "amazon.com.au/dp/B0DFK5Z33M",
                  },
                  {
                    country: "CA viewer",
                    flag: "🇨🇦",
                    link: "amazon.ca/dp/B0DFK5Z33M",
                  },
                  {
                    country: "Mobile",
                    flag: "📱",
                    link: "opens Amazon app directly",
                    special: true,
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 group demo-row"
                  >
                    <div className="w-24 flex items-center space-x-2">
                      <span className="text-lg">{row.flag}</span>
                      <span className="text-[11px] font-black text-zinc-500 uppercase tracking-tighter">
                        {row.country}
                      </span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-zinc-700 transition-transform group-hover:translate-x-1" />
                    <div
                      className={`px-4 py-2 rounded-lg text-[11px] font-bold border transition-colors ${
                        row.special
                          ? "bg-primary/10 border-primary/20 text-primary"
                          : "bg-white/5 border-white/5 text-zinc-400 group-hover:border-white/10 group-hover:bg-white/10"
                      }`}
                    >
                      {row.link}
                      {row.meta && (
                        <span className="ml-2 text-zinc-600 font-normal">
                          {row.meta}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
              <p className="text-zinc-500 text-sm font-medium">
                This is{" "}
                <span className="text-white font-bold italic underline decoration-primary decoration-2 underline-offset-4">
                  one link
                </span>
                . Imagine all of them.
              </p>
              <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_-5px_rgba(148,153,232,0.4)]">
                Start Free →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
