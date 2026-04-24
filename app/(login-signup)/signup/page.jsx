"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowLeft, Mail, Lock, User, Github, Chrome, ShieldCheck, Loader2 } from "lucide-react";

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const backgroundRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Glows Animation
      gsap.to(".glow-1", {
        x: "20%",
        y: "30%",
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".glow-2", {
        x: "-30%",
        y: "-20%",
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Entrance Animation
      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.from(".signup-card", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      })
      .from(".signup-element", {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-[#030303] flex items-center justify-center p-4 overflow-hidden selection:bg-primary/30">
      {/* Dynamic Background */}
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="glow-1 absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#6366f1]/10 blur-[120px] rounded-full" />
        <div className="glow-2 absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      {/* Back to Home */}
      <Link 
        href="/"
        className="absolute top-8 left-8 flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors group z-20"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-xs font-black uppercase tracking-[0.2em]">Back to Linkflin</span>
      </Link>

      {/* Signup Card */}
      <div className="signup-card relative w-full max-w-[480px] z-10">
        <div className="glass-card p-8 sm:p-10 border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="text-center mb-8">
            <h1 className="signup-element text-3xl font-black text-white mb-3 tracking-tight">Create Account</h1>
            <p className="signup-element text-sm text-zinc-500 font-medium">Join 5,000+ creators optimizing their earnings</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="signup-element p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </div>
            )}
            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button type="button" className="signup-element flex items-center justify-center space-x-3 bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer">
                <Chrome className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                <span className="text-[10px] font-black text-zinc-400 group-hover:text-white uppercase tracking-widest">Google</span>
              </button>
              <button type="button" className="signup-element flex items-center justify-center space-x-3 bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer">
                <Github className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                <span className="text-[10px] font-black text-zinc-400 group-hover:text-white uppercase tracking-widest">GitHub</span>
              </button>
            </div>

            <div className="signup-element flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 flex items-center group">
                <div className="absolute left-4 text-zinc-500 group-focus-within:text-primary transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First Name"
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-sm text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-primary/50 focus:bg-white/[0.08] transition-all"
                />
              </div>
              <div className="relative flex-1 flex items-center group">
                <div className="absolute left-4 text-zinc-500 group-focus-within:text-primary transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Last Name"
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-sm text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-primary/50 focus:bg-white/[0.08] transition-all"
                />
              </div>
            </div>

            <div className="signup-element relative flex items-center group">
              <div className="absolute left-4 text-zinc-500 group-focus-within:text-primary transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Work Email"
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-sm text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-primary/50 focus:bg-white/[0.08] transition-all"
              />
            </div>

            <div className="signup-element relative flex items-center group">
              <div className="absolute left-4 text-zinc-500 group-focus-within:text-primary transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create Password"
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-sm text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-primary/50 focus:bg-white/[0.08] transition-all"
              />
            </div>

            <div className="signup-element pt-2">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/50" />
                <span className="text-[10px] leading-relaxed font-bold text-zinc-500 group-hover:text-zinc-300 uppercase tracking-widest transition-colors">
                  I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                </span>
              </label>
            </div>

            <button 
              disabled={isLoading}
              className="signup-element w-full relative overflow-hidden group rounded-2xl bg-white py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-center justify-center space-x-2">
                {isLoading && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                <span className={`${isLoading ? "text-white" : "group-hover:text-white"} transition-colors`}>
                  {isLoading ? "Creating Account..." : "Start Free Trial"}
                </span>
              </div>
            </button>
          </form>

          <div className="signup-element mt-8 text-center flex items-center justify-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-zinc-600" />
            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Secure & Encrypted</p>
          </div>

          <div className="signup-element mt-8 text-center">
            <p className="text-xs text-zinc-500 font-medium">
              Already using Linkflin?{" "}
              <Link href="/login" className="text-primary font-black uppercase tracking-widest hover:text-white transition-colors ml-1">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
