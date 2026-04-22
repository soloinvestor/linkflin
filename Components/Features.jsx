"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Globe, MousePointer2, ShieldCheck, Smartphone, Zap } from "lucide-react";

const features = [
  {
    name: "Real-time Analytics",
    description: "Get instant insights into your link performance with live tracking and detailed visitor demographics.",
    icon: BarChart3,
  },
  {
    name: "Global Edge Network",
    description: "Lightning-fast redirects powered by our worldwide edge network, ensuring zero latency for your users.",
    icon: Globe,
  },
  {
    name: "AI Fraud Protection",
    description: "Protect your commissions with advanced bot detection and AI-powered click fraud prevention.",
    icon: ShieldCheck,
  },
  {
    name: "Custom Domains",
    description: "Strengthen your brand by using your own custom domains for all your affiliate and short links.",
    icon: MousePointer2,
  },
  {
    name: "Deep Linking",
    description: "Automatically detect user devices and route them directly to mobile apps for higher conversion rates.",
    icon: Smartphone,
  },
  {
    name: "Smart Targeting",
    description: "Route visitors based on their location, device, or language to offer a personalized experience.",
    icon: Zap,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#9499e8]/10 border border-[#9499e8]/20 mb-6"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#9499e8]">Infrastructure</span>
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
            Linkflin provides the most advanced toolkit for modern affiliate marketers, 
            helping you optimize every single click with sub-millisecond precision.
          </motion.p>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-10 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 rounded-full bg-[#9499e8] shadow-[0_0_12px_#9499e8]" />
              </div>

              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#9499e8]/10 text-[#9499e8] mb-8 group-hover:scale-110 group-hover:bg-[#9499e8] group-hover:text-white transition-all duration-500">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.name}</h3>
              <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

