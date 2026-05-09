"use client";

import React from "react";
import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />

      {/* Background Mesh */}
      <div className="bg-mesh" aria-hidden="true" />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto glass-card border-white/5 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          <div className="p-8 sm:p-16">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-12">
              Last updated: March 21, 2026
            </p>

            <div className="space-y-16">
              {/* Introduction */}
              <section>
                <h2 className="text-xl font-black text-white mb-6 tracking-tight uppercase italic flex items-center space-x-3">
                  <span className="w-8 h-px bg-primary/30" />
                  <span>Introduction</span>
                </h2>
                <div className="space-y-4 text-zinc-400 font-medium leading-relaxed">
                  <p>
                    LinkFlin (“we,” “us,” or “our”) operates the website
                    linkflin.com, the smart link redirect service at
                    linkflin.to, and the LinkFlin application (collectively, the
                    “Service”). This Privacy Policy explains how we collect,
                    use, disclose, and protect your personal data when you use
                    our Service.
                  </p>
                  <p>
                    LinkFlin is operated from Portugal, within the European
                    Union. We are committed to protecting your privacy in
                    accordance with the General Data Protection Regulation
                    (GDPR) and applicable data protection laws.
                  </p>
                  <p>
                    By using our Service, you acknowledge that you have read and
                    understood this Privacy Policy.
                  </p>
                </div>
              </section>

              {/* Data Controller */}
              <section>
                <h2 className="text-xl font-black text-white mb-6 tracking-tight uppercase italic flex items-center space-x-3">
                  <span className="w-8 h-px bg-primary/30" />
                  <span>Data Controller</span>
                </h2>
                <div className="p-8 rounded-2xl bg-white/2 border border-white/5 text-zinc-400 font-medium">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="font-black text-zinc-500 uppercase tracking-widest text-[10px] mb-2">
                        Office Address
                      </p>
                      <p className="text-zinc-300">
                        LinkFlin, Lisbon, Portugal
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-zinc-500 uppercase tracking-widest text-[10px] mb-2">
                        Contact Email
                      </p>
                      <a
                        href="mailto:soloinvestorbusiness@gmail.com"
                        className="text-primary hover:text-white transition-all font-bold"
                      >
                        soloinvestorbusiness@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Sections */}
              <section className="space-y-12">
                <h2 className="text-xl font-black text-white mb-6 tracking-tight uppercase italic flex items-center space-x-3">
                  <span className="w-8 h-px bg-primary/30" />
                  <span>What Data We Collect</span>
                </h2>

                <div className="grid gap-10">
                  <div className="p-8 rounded-2xl bg-white/2 border border-white/5">
                    <h3 className="text-sm font-black mb-4 uppercase tracking-widest text-primary/80">
                      Account Data
                    </h3>
                    <div className="space-y-4 text-zinc-400 font-medium leading-relaxed">
                      <p>When you create an account, we collect:</p>
                      <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                        <li>Email address</li>
                        <li>Password (stored in hashed form)</li>
                        <li>Name (if provided)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-8 rounded-2xl bg-white/2 border border-white/5">
                    <h3 className="text-sm font-black mb-4 uppercase tracking-widest text-primary/80">
                      Smart Link Click Data
                    </h3>
                    <div className="space-y-4 text-zinc-400 font-medium leading-relaxed text-sm">
                      <ul className="space-y-4">
                        <li className="flex gap-4">
                          <span className="text-primary font-black">01</span>
                          <span>
                            <strong>Country</strong> — determined from
                            Cloudflare CF-IPCountry header. Used for
                            geo-routing.
                          </span>
                        </li>
                        <li className="flex gap-4">
                          <span className="text-primary font-black">02</span>
                          <span>
                            <strong>Device & Browser</strong> — parsed from
                            User-Agent. Used for deep linking.
                          </span>
                        </li>
                        <li className="flex gap-4">
                          <span className="text-primary font-black">03</span>
                          <span>
                            <strong>Referrer</strong> — the domain the click
                            originated from. Used for analytics.
                          </span>
                        </li>
                        <li className="flex gap-4">
                          <span className="text-primary font-black">04</span>
                          <span>
                            <strong>IP Hash</strong> — hashed with a daily
                            rotating salt. We never store raw IP addresses.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Share Data Table */}
              <section>
                <h2 className="text-xl font-black text-white mb-6 tracking-tight uppercase italic flex items-center space-x-3">
                  <span className="w-8 h-px bg-primary/30" />
                  <span>Data Processors</span>
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-white/5 bg-white/1">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/3 border-b border-white/5">
                      <tr>
                        <th className="px-6 py-4 font-black text-zinc-500 uppercase tracking-widest">
                          Provider
                        </th>
                        <th className="px-6 py-4 font-black text-zinc-500 uppercase tracking-widest">
                          Purpose
                        </th>
                        <th className="px-6 py-4 font-black text-zinc-500 uppercase tracking-widest">
                          Data Shared
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-medium text-zinc-400">
                      {[
                        {
                          n: "Stripe",
                          p: "Payment processing",
                          d: "Email, payment details",
                        },
                        {
                          n: "SendGrid",
                          p: "Email delivery",
                          d: "Email, name",
                        },
                        {
                          n: "Cloudflare",
                          p: "Security & GeoIP",
                          d: "IP address (routing only)",
                        },
                        {
                          n: "Google",
                          p: "YouTube Data API",
                          d: "OAuth tokens, video data",
                        },
                      ].map((row, i) => (
                        <tr
                          key={i}
                          className="hover:bg-white/2 transition-colors"
                        >
                          <td className="px-6 py-4 text-white font-bold">
                            {row.n}
                          </td>
                          <td className="px-6 py-4">{row.p}</td>
                          <td className="px-6 py-4">{row.d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Contact Us */}
              <section className="pt-12 border-t border-white/5">
                <h2 className="text-xl font-black text-white mb-6 tracking-tight uppercase italic flex items-center space-x-3">
                  <span className="w-8 h-px bg-primary/30" />
                  <span>Contact Us</span>
                </h2>
                <p className="text-zinc-400 font-medium leading-relaxed mb-8">
                  If you have questions about this Privacy Policy or our data
                  practices, contact us at:
                </p>
                <a
                  href="mailto:soloinvestorbusiness@gmail.com"
                  className="inline-flex items-center justify-center px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20"
                >
                  soloinvestorbusiness@gmail.com
                </a>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
