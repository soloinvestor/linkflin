"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative isolate overflow-hidden glass-card px-6 py-24 shadow-2xl sm:px-24 xl:py-32 border border-white/10"
        >
          {/* Decorative Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/30 blur-[120px] rounded-full -z-10" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#6366f1]/20 blur-[120px] rounded-full -z-10" />

          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-8 leading-[1.1]">
              Ready to <span className="gradient-text">skyrocket</span> <br />
              your revenue?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-400">
              Join over 10,000+ top-tier marketers who trust Linkflin to power 
              their international affiliate infrastructure.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/signup"
                className="w-full sm:w-auto text-center rounded-2xl bg-white px-10 py-5 text-lg font-bold text-black transition-all hover:bg-zinc-100 hover:scale-105 active:scale-95 block shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Create Free Account
              </Link>
              <button className="text-lg font-bold text-white flex items-center group px-8 py-5">
                Contact Sales <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2 text-primary" />
              </button>
            </div>
            <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-x-12 gap-y-4">
              {["No credit card", "Free forever tier", "Instant setup"].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

