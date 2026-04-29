"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // Initial state
      gsap.set(logoRef.current, { opacity: 0, y: 20 });
      gsap.set(progressRef.current, { scaleX: 0 });

      // Animation Sequence
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(progressRef.current, {
        scaleX: 1,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: function() {
          const progress = Math.round(this.progress() * 100);
          if (percentRef.current) {
            percentRef.current.textContent = `${progress}%`;
          }
        }
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.2,
      });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center">
        {/* Logo Animation */}
        <div ref={logoRef} className="flex items-center space-x-3 mb-12">
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full" />
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white relative"
            >
              <path
                d="M12 3V21M3 12H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M5 5L19 19M19 5L5 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
              />
              <rect
                x="8"
                y="8"
                width="8"
                height="8"
                rx="2"
                fill="#030303"
                stroke="var(--color-primary)"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className="text-4xl font-black tracking-tighter text-white uppercase italic">
            linkflin
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative mb-4">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full w-full bg-primary origin-left shadow-[0_0_15px_rgba(148,153,232,0.5)]"
          />
        </div>

        {/* Percentage text */}
        <div 
          ref={percentRef}
          className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]"
        >
          0%
        </div>

        {/* Status text */}
        <div className="mt-2 text-[8px] font-medium text-zinc-700 uppercase tracking-widest animate-pulse">
          Initializing Infrastructure...
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
    </div>
  );
};

export default Loader;
