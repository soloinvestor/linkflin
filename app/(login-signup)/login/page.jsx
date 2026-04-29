"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowLeft, Mail, Lock, Github, Chrome, Loader2 } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const backgroundRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const res = await fetch("/api/auth/google/url");
      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setError("Failed to initialize Google Login");
      setIsGoogleLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          router.push("/dashboard");
        }
      } catch (err) {
        // Not logged in, stay on page
      }
    };
    checkSession();
  }, [router]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Glows Animation
      gsap.to(".glow-1", {
        x: "30%",
        y: "20%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".glow-2", {
        x: "-20%",
        y: "-30%",
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Entrance Animation
      const tl = gsap.timeline();

      tl.from(".login-card", {
        y: 20,
        opacity: 0,
        scale: 0.98,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        ".login-element",
        {
          y: 10,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          onComplete: function () {
            gsap.set(this.targets(), { clearProps: "all" });
          },
        },
        "<",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-background flex items-center justify-center p-4 overflow-hidden selection:bg-primary/30"
    >
      {/* Dynamic Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="glow-1 absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="glow-2 absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6366f1]/10 blur-[150px] rounded-full" />
      </div>

      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors group z-20"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-xs font-black uppercase tracking-[0.2em]">
          Back to Linkflin
        </span>
      </Link>

      {/* Login Card */}
      <div className="login-card relative w-full max-w-[440px] z-10">
        <div className="glass-card p-8 sm:p-10 border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

          <div className="text-center mb-10">
            <h1 className="login-element text-3xl font-black text-white mb-3 tracking-tight">
              Welcome Back
            </h1>
            <p className="login-element text-sm text-zinc-500 font-medium">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="login-element p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </div>
            )}
            {/* Social Logins */}
            <div className="mb-8">
              <button
                type="button"
                disabled={isGoogleLoading}
                onClick={handleGoogleLogin}
                className="login-element flex w-full mx-auto items-center justify-center space-x-3 bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGoogleLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Chrome className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                )}
                <span className="text-[10px] font-black text-zinc-400 group-hover:text-white uppercase tracking-widest">
                  {isGoogleLoading ? "Connecting..." : "Google"}
                </span>
              </button>
            </div>

            <div className="login-element relative flex items-center group">
              <div className="absolute left-4 text-zinc-500 group-focus-within:text-primary transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
              />
            </div>

            <div className="login-element relative flex items-center group">
              <div className="absolute left-4 text-zinc-500 group-focus-within:text-primary transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
              />
            </div>

            <div className="login-element flex items-center justify-between px-1">
              <button className=" cursor-pointer text-[10px] font-black text-primary hover:text-white uppercase tracking-widest transition-colors">
                Forgot Password?
              </button>
            </div>

            <button
              disabled={isLoading}
              className="login-element w-full relative overflow-hidden group rounded-2xl bg-white py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div
                className={`absolute inset-0 bg-linear-to-r from-primary to-secondary transition-opacity ${isLoading ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              />
              <div className="relative z-10 flex items-center justify-center space-x-2">
                {isLoading && (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                )}
                <span
                  className={`${isLoading ? "text-white" : "group-hover:text-white"} transition-colors`}
                >
                  {isLoading ? "Logging in..." : "Log In Now"}
                </span>
              </div>
            </button>
          </form>

          <div className="login-element mt-10 text-center">
            <p className="text-xs text-zinc-500 font-medium">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-primary font-black uppercase tracking-widest hover:text-white transition-colors ml-1"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
