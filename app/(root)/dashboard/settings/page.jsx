"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Globe,
  Tag,
  Save,
  Loader2,
  ShieldCheck,
  ExternalLink,
  Youtube,
  Link as LinkIcon,
  Mail,
  ArrowRight,
  CreditCard,
  Key,
  Plus,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [redirectType, setRedirectType] = useState("302");
  const [tags, setTags] = useState({
    US: "",
    UK: "",
    DE: "",
    FR: "",
    ES: "",
    IT: "",
    JP: "",
    CA: "",
    AU: "",
    IN: "",
    BR: "",
    MX: "",
  });

  const [user, setUser] = useState({
    firstName: "Mr",
    lastName: "Gurjar",
    email: "ultrongaming78@gmail.com",
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser({
            firstName: data.firstName || "User",
            lastName: data.lastName || "",
            email: data.email || ""
          });
          setLoading(false);
        } else {
          router.push("/login");
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
        y: 20,
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
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const countries = [
    { code: "US", flag: "🇺🇸", label: "US" },
    { code: "UK", flag: "🇬🇧", label: "UK" },
    { code: "DE", flag: "🇩🇪", label: "DE" },
    { code: "FR", flag: "🇫🇷", label: "FR" },
    { code: "ES", flag: "🇪🇸", label: "ES" },
    { code: "IT", flag: "🇮🇹", label: "IT" },
    { code: "JP", flag: "🇯🇵", label: "JP" },
    { code: "CA", flag: "🇨🇦", label: "CA" },
    { code: "AU", flag: "🇦🇺", label: "AU" },
    { code: "IN", flag: "🇮🇳", label: "IN" },
    { code: "BR", flag: "🇧🇷", label: "BR" },
    { code: "MX", flag: "🇲🇽", label: "MX" },
  ];

  const handleTagChange = (code, value) => {
    setTags((prev) => ({ ...prev, [code]: value }));
  };

  return (
    <div
      ref={containerRef}
      className="p-4 sm:p-6 lg:p-12 max-w-5xl mx-auto min-h-screen"
    >
      <header className="animate-up mb-12">
        <h1 className="text-3xl font-black text-white mb-2 tracking-tight uppercase italic">
          Settings
        </h1>
        <p className="text-zinc-500 text-sm font-medium">
          Manage your account and preferences
        </p>
      </header>

      <div className="space-y-8">
        {/* Default Redirect Card */}
        <section className="animate-up glass-card border border-white/5 bg-white/2 p-8 sm:p-10 rounded-4xl">
          <div className="flex items-center space-x-5 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight uppercase">
                Default Redirect
              </h2>
              <p className="text-xs font-medium text-zinc-500 mt-0.5">
                Applied to new smart links by default
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-8">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative w-5 h-5">
                <input
                  type="radio"
                  name="redirect"
                  checked={redirectType === "302"}
                  onChange={() => setRedirectType("302")}
                  className="peer appearance-none w-5 h-5 rounded-full border-2 border-white/10 checked:border-primary transition-all cursor-pointer"
                />
                <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform" />
              </div>
              <span className="text-sm font-black text-zinc-400 group-hover:text-white transition-colors">
                302 Temporary
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative w-5 h-5">
                <input
                  type="radio"
                  name="redirect"
                  checked={redirectType === "301"}
                  onChange={() => setRedirectType("301")}
                  className="peer appearance-none w-5 h-5 rounded-full border-2 border-white/10 checked:border-primary transition-all cursor-pointer"
                />
                <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform" />
              </div>
              <span className="text-sm font-black text-zinc-400 group-hover:text-white transition-colors">
                301 Permanent
              </span>
            </label>
          </div>
          <p className="text-[10px] font-medium text-zinc-600 mt-6 italic">
            302 recommended for affiliate links — lets you change destinations
            later
          </p>
        </section>

        {/* Amazon Affiliate Tags Card */}
        <section className="animate-up glass-card border border-white/5 bg-white/2 p-8 sm:p-10 rounded-4xl">
          <div className="flex items-center space-x-5 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Tag className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight uppercase">
                Amazon Affiliate Tags
              </h2>
              <p className="text-xs font-medium text-zinc-500 mt-0.5">
                Auto-applied when you create smart links with Amazon URLs
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
            {countries.map((country) => (
              <div key={country.code} className="space-y-2">
                <div className="flex items-center space-x-2 px-1">
                  <span className="text-xs">{country.flag}</span>
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    {country.label}
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="yourtag-20"
                  value={tags[country.code]}
                  onChange={(e) =>
                    handleTagChange(country.code, e.target.value)
                  }
                  className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-700 focus:outline-hidden focus:border-primary/30 focus:bg-white/5 transition-all"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
            <p className="text-[10px] font-medium text-zinc-600 flex items-center">
              Find yours at:
              <a
                href="#"
                className="ml-1 text-zinc-400 hover:text-white transition-colors flex items-center underline decoration-zinc-700 underline-offset-4"
              >
                Amazon Associates Central{" "}
                <ArrowRightIcon className="w-3 h-3 ml-1" /> Account Info
              </a>
            </p>
            <button className="w-full sm:w-auto relative overflow-hidden group rounded-xl bg-primary px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(148,153,232,0.2)]">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Tags</span>
              </div>
            </button>
          </div>
        </section>

        {/* YouTube Connection Card */}
        <section className="animate-up glass-card border border-white/5 bg-white/2 p-8 sm:p-10 rounded-4xl">
          <div className="flex items-center space-x-5">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Youtube className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight uppercase">
                YouTube Connection
              </h2>
              <p className="text-xs font-medium text-zinc-500 mt-0.5">
                Not connected. Connect your YouTube channel from the
                <button
                  onClick={() => router.push("/dashboard/auto-convert")}
                  className="ml-1 text-primary hover:underline cursor-pointer"
                >
                  Auto-Convert page
                </button>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Plan & Usage Card */}
        <section className="animate-up glass-card border border-white/5 bg-white/2 p-8 sm:p-10 rounded-4xl">
          <div className="flex items-center space-x-5 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <LinkIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight uppercase">
                Plan & Usage
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-sm font-black text-white">
                Current Plan:{" "}
                <span className="text-primary italic">Free ($0)</span>
              </p>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                Smart Links: 0 / 10 used
              </p>
            </div>

            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="w-[5%] h-full bg-primary" />
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="relative overflow-hidden group rounded-xl bg-primary px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(148,153,232,0.2)]">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">
                  Upgrade to Starter — $9/mo, 50 links
                </span>
              </button>
              <button className="rounded-xl border border-white/5 bg-white/3 px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                Manage Billing
              </button>
            </div>
          </div>
        </section>

        {/* Account Section Header */}
        <div className="animate-up pt-12">
          <h2 className="text-xl font-black text-white tracking-tight uppercase italic">
            Account
          </h2>
        </div>

        {/* Profile Information Card */}
        <section className="animate-up glass-card border border-white/5 bg-white/2 p-8 sm:p-10 rounded-4xl">
          <div className="mb-0">
            <h3 className="text-lg font-black text-white tracking-tight uppercase mb-8">
              Profile Information
            </h3>

            <div className="flex items-center space-x-6 mb-12">
              <div className="w-20 h-20 rounded-4xl bg-primary flex items-center justify-center text-white text-3xl font-black shadow-[0_0_30px_rgba(148,153,232,0.3)]">
                {user?.firstName?.[0] || "M"}
              </div>
              <div>
                <h4 className="text-xl font-black text-white tracking-tight">
                  {user?.firstName || "Mr"} {user?.lastName || "Gurjar"}
                </h4>
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                  {user?.email || "ultrongaming78@gmail.com"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">
                  First name
                </label>
                <input
                  type="text"
                  defaultValue={user?.firstName || "Mr"}
                  className="w-full bg-white/3 border border-white/5 rounded-2xl px-5 py-4 text-sm font-medium text-white focus:outline-hidden focus:border-primary/30 transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">
                  Last name
                </label>
                <input
                  type="text"
                  defaultValue={user?.lastName || "Gurjar"}
                  className="w-full bg-white/3 border border-white/5 rounded-2xl px-5 py-4 text-sm font-medium text-white focus:outline-hidden focus:border-primary/30 transition-all"
                />
              </div>
            </div>

            <div className="space-y-3 mb-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="email"
                  defaultValue={user?.email || "ultrongaming78@gmail.com"}
                  disabled
                  className="w-full bg-white/3 border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm font-medium text-zinc-400 cursor-not-allowed transition-all"
                />
              </div>
              <p className="text-[10px] font-medium text-zinc-600 px-1 italic">
                Contact support to change your email
              </p>
            </div>

            <div className="mt-10">
              <button className="relative overflow-hidden group rounded-xl bg-primary px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(148,153,232,0.2)]">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10 flex items-center justify-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Save changes</span>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Subscription Card */}
        <section className="animate-up glass-card border border-white/5 bg-white/2 p-8 sm:p-10 rounded-4xl">
          <div className="flex items-center space-x-5 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight uppercase">
                Subscription
              </h2>
              <p className="text-xs font-medium text-zinc-500 mt-0.5">
                Manage your subscription plan
              </p>
            </div>
          </div>

          <div className="bg-white/3 border border-white/5 rounded-2xl p-6 mb-8 relative group hover:bg-white/5 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-1">
                  Free Plan
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  View aggregate stats only
                </p>
              </div>
              <span className="bg-amber-500/10 text-amber-500 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20">
                Free
              </span>
            </div>
          </div>

          <button className="relative overflow-hidden group rounded-xl bg-primary px-10 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(148,153,232,0.2)]">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <div className="relative z-10 flex items-center justify-center space-x-2">
              <span>Upgrade</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </section>

        {/* Integrations Header */}
        <div className="animate-up pt-12">
          <h2 className="text-xl font-black text-white tracking-tight uppercase italic">
            Integrations
          </h2>
        </div>

        {/* API Keys Card */}
        <section className="animate-up glass-card border border-white/5 bg-white/2 p-8 sm:p-10 rounded-4xl">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-5">
              <div className="w-12 h-12 rounded-2xl bg-zinc-500/10 border border-zinc-500/20 flex items-center justify-center">
                <Key className="w-6 h-6 text-zinc-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white tracking-tight uppercase">
                  API Keys
                </h2>
                <p className="text-xs font-medium text-zinc-500 mt-0.5">
                  Connect AI assistants like Claude Desktop
                </p>
              </div>
            </div>
            <button className="relative overflow-hidden group rounded-xl bg-primary px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(148,153,232,0.2)]">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New key</span>
              </div>
            </button>
          </div>

          <div className="py-12 border-t border-white/5 flex flex-col items-center justify-center text-center">
            <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
              No API keys yet. Create one to connect an AI assistant.
            </p>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="animate-up glass-card border border-red-500/20 bg-red-500/2 p-8 sm:p-10 rounded-4xl border-dashed">
          <div className="flex items-center space-x-5 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-black text-red-500 tracking-tight uppercase">
                Danger Zone
              </h2>
              <p className="text-xs font-medium text-zinc-600 mt-0.5">
                Irreversible actions
              </p>
            </div>
          </div>

          <div className="bg-red-500/3 border border-red-500/10 rounded-2xl p-8 mb-4">
            <p className="text-xs sm:text-sm font-bold text-zinc-400 mb-8 leading-relaxed max-w-2xl">
              Deleting your account will permanently remove all your data
              including smart links, analytics, and account settings.
            </p>
            <button className="flex items-center space-x-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(239,68,68,0.2)]">
              <Trash2 className="w-4 h-4" />
              <span>Delete account</span>
            </button>
          </div>
        </section>
      </div>

      <div className="animate-up mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[9px] font-black text-zinc-800 uppercase tracking-widest">
          Linkflin Dashboard v1.2
        </p>
        <div className="flex items-center space-x-6 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white transition-colors">
            API Docs
          </a>
        </div>
      </div>
    </div>
  );
};

const ArrowRightIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

export default SettingsPage;
