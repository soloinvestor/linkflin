"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X, Info } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Comparison = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".comparison-heading", {
        scrollTrigger: {
          trigger: ".comparison-section",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.from(".comparison-table", {
        scrollTrigger: {
          trigger: ".comparison-table",
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      name: "Geo-targeted links",
      linkflin: true,
      geniuslink: true,
      bitly: false,
      urlgenius: "Language-based",
    },
    {
      name: "Deep linking (app-opening)",
      linkflin: true,
      geniuslink: true,
      bitly: false,
      urlgenius: true,
    },
    {
      name: "Click analytics",
      linkflin: true,
      geniuslink: true,
      bitly: "Basic",
      urlgenius: "Basic",
    },
    {
      name: "Link health monitoring",
      linkflin: true,
      geniuslink: true,
      bitly: false,
      urlgenius: false,
    },
    {
      name: "YouTube bulk auto-convert",
      linkflin: true,
      geniuslink: "By request",
      bitly: false,
      urlgenius: false,
    },
    {
      name: "AI Integration (MCP)",
      linkflin: true,
      geniuslink: false,
      bitly: false,
      urlgenius: false,
    },
    {
      name: "Free tier",
      linkflin: "10 links, full features",
      geniuslink: "No free tier",
      bitly: "10 links/mo",
      urlgenius: "500 clicks",
    },
    {
      name: "Pricing model",
      linkflin: "Flat monthly",
      geniuslink: "Per-click",
      bitly: "Flat monthly",
      urlgenius: "Per-click",
    },
  ];

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden comparison-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 comparison-heading">
          <h2 className="text-4xl font-black text-white mb-6">How Linkflin Compares</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            See how Linkflin stacks up against <span className="text-zinc-300 font-medium">Geniuslink</span>, <span className="text-zinc-300 font-medium">Bitly</span>, and <span className="text-zinc-300 font-medium">URL Genius</span> — the leading link tools for affiliate marketers.
          </p>
        </div>

        <div className="comparison-table glass-card overflow-hidden border border-white/5 rounded-[2rem] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="p-8 text-xs font-black text-zinc-500 uppercase tracking-widest">Feature</th>
                  <th className="p-8 text-sm font-black text-primary uppercase tracking-widest text-center bg-primary/5">Linkflin</th>
                  <th className="p-8 text-xs font-black text-zinc-400 uppercase tracking-widest text-center">Geniuslink</th>
                  <th className="p-8 text-xs font-black text-zinc-400 uppercase tracking-widest text-center">Bitly</th>
                  <th className="p-8 text-xs font-black text-zinc-400 uppercase tracking-widest text-center">URL Genius</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr key={i} className="group border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="p-8 text-sm font-bold text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      {feature.name}
                    </td>
                    
                    {/* Linkflin Column */}
                    <td className="p-8 text-center bg-primary/5">
                      {typeof feature.linkflin === "boolean" ? (
                        <div className="flex justify-center">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs font-black text-white uppercase">{feature.linkflin}</span>
                      )}
                    </td>

                    {/* Geniuslink Column */}
                    <td className="p-8 text-center">
                      {typeof feature.geniuslink === "boolean" ? (
                        <div className="flex justify-center">
                          {feature.geniuslink ? (
                            <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">
                              <Check className="w-3 h-3 text-zinc-400" strokeWidth={3} />
                            </div>
                          ) : (
                            <X className="w-4 h-4 text-zinc-700 mx-auto" />
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] font-bold text-zinc-500 uppercase">{feature.geniuslink}</span>
                      )}
                    </td>

                    {/* Bitly Column */}
                    <td className="p-8 text-center">
                      {typeof feature.bitly === "boolean" ? (
                        <div className="flex justify-center">
                          {feature.bitly ? (
                            <Check className="w-4 h-4 text-zinc-400 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-zinc-700 mx-auto" />
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] font-bold text-zinc-500 uppercase">{feature.bitly}</span>
                      )}
                    </td>

                    {/* URL Genius Column */}
                    <td className="p-8 text-center">
                      {typeof feature.urlgenius === "boolean" ? (
                        <div className="flex justify-center">
                          {feature.urlgenius ? (
                            <Check className="w-4 h-4 text-zinc-400 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-zinc-700 mx-auto" />
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] font-bold text-zinc-500 uppercase">{feature.urlgenius}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-500 text-lg mb-10">
            <span className="text-white font-black">Unlimited clicks on every plan.</span> You'll never pay more because your content is successful.
          </p>
          <button className="relative overflow-hidden group px-10 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]">
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 group-hover:text-white transition-colors">Try It Free — No Per-Click Fees</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
