"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Settings, User, Bell, Shield, CreditCard, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) router.push("/login");
        else setLoading(false);
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
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const sections = [
    { icon: User, label: "Profile", desc: "Manage your personal information" },
    { icon: Bell, label: "Notifications", desc: "Configure how you get alerts" },
    { icon: Shield, label: "Security", desc: "Protect your account with 2FA" },
    { icon: CreditCard, label: "Billing", desc: "Manage your subscription plan" },
  ];

  return (
    <div ref={containerRef} className="p-4 sm:p-6 lg:p-12 max-w-4xl mx-auto">
      <header className="animate-up mb-16">
        <h1 className="text-4xl font-black text-white mb-2 tracking-tight italic uppercase">
          Settings
        </h1>
        <p className="text-zinc-500 text-sm font-medium">Configure your account and application preferences.</p>
      </header>

      <div className="animate-up space-y-4">
        {sections.map((section, i) => (
          <div 
            key={i} 
            className="glass-card p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <section.icon className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">{section.label}</h3>
                <p className="text-xs text-zinc-500 font-medium mt-1">{section.desc}</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-primary/30 transition-colors">
              <Settings className="w-3 h-3 text-zinc-700 group-hover:text-primary transition-colors group-hover:rotate-90 duration-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="animate-up mt-12 p-8 rounded-3xl bg-red-500/[0.02] border border-red-500/10">
        <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] mb-4">Danger Zone</h3>
        <p className="text-xs text-zinc-500 font-medium mb-6">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="text-[10px] font-black text-red-400 hover:text-red-500 uppercase tracking-widest transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
