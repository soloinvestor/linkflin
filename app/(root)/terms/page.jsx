"use client";

import React from "react";
import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />

      {/* Background Mesh */}
      <div className="bg-mesh" aria-hidden="true" />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto glass-card border-white/5 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          <div className="p-8 sm:p-16">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-12">
              Last updated: March 21, 2026
            </p>

            <div className="space-y-16">
              {/* Introduction */}
              <section>
                <h2 className="text-xl font-black text-white mb-6 tracking-tight uppercase italic flex items-center space-x-3">
                  <span className="w-8 h-px bg-primary/30" />
                  <span>1. Introduction</span>
                </h2>
                <div className="space-y-4 text-zinc-400 font-medium leading-relaxed">
                  <p>
                    These Terms of Service (“Terms”) govern your use of LinkFlin
                    (“the Service”), operated by LinkFlin (“we,” “us,” or
                    “our”), located in Lisbon, Portugal.
                  </p>
                  <p>
                    By creating an account or using the Service, you agree to be
                    bound by these Terms. If you do not agree, do not use the
                    Service.
                  </p>
                </div>
              </section>

              {/* Description of Service */}
              <section>
                <h2 className="text-xl font-black text-white mb-6 tracking-tight uppercase italic flex items-center space-x-3">
                  <span className="w-8 h-px bg-primary/30" />
                  <span>2. Description of Service</span>
                </h2>
                <div className="p-8 rounded-2xl bg-white/2 border border-white/5 space-y-6">
                  <p className="text-zinc-400 font-medium leading-relaxed">
                    LinkFlin is a smart links platform for content creators and
                    affiliate marketers. The Service provides:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    {[
                      {
                        t: "Smart Links",
                        d: "Geo-targeted, app-opening affiliate links with linkflin.to domain.",
                      },
                      {
                        t: "Geo-Routing",
                        d: "Automatic redirection based on geographic location.",
                      },
                      {
                        t: "Deep Linking",
                        d: "Opening merchant apps on mobile instead of browsers.",
                      },
                      {
                        t: "Auto-Migration",
                        d: "Bulk conversion of affiliate links in YouTube descriptions.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <h4 className="text-white font-bold uppercase tracking-tight text-xs">
                          {item.t}
                        </h4>
                        <p className="text-zinc-500 font-medium leading-relaxed">
                          {item.d}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Account Registration */}
              <section>
                <h2 className="text-xl font-black text-white mb-6 tracking-tight uppercase italic flex items-center space-x-3">
                  <span className="w-8 h-px bg-primary/30" />
                  <span>4. Account Registration</span>
                </h2>
                <div className="space-y-6 text-zinc-400 font-medium leading-relaxed">
                  <p>
                    To use the Service, you must create an account with a valid
                    email address. You are responsible for:
                  </p>
                  <div className="p-6 rounded-2xl bg-white/2 border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                      <span className="block text-primary font-black mb-2 italic uppercase">
                        Securing
                      </span>
                      <span className="text-[10px] uppercase font-bold text-zinc-500">
                        Your Credentials
                      </span>
                    </div>
                    <div>
                      <span className="block text-primary font-black mb-2 italic uppercase">
                        Monitoring
                      </span>
                      <span className="text-[10px] uppercase font-bold text-zinc-500">
                        Account Activity
                      </span>
                    </div>
                    <div>
                      <span className="block text-primary font-black mb-2 italic uppercase">
                        Notifying
                      </span>
                      <span className="text-[10px] uppercase font-bold text-zinc-500">
                        Unauthorized Access
                      </span>
                    </div>
                  </div>
                  <p className="text-center text-xs">
                    Contact us immediately at{" "}
                    <a
                      href="mailto:soloinvestorbusiness@gmail.com"
                      className="text-primary hover:text-white font-bold transition-colors underline decoration-primary/30"
                    >
                      soloinvestorbusiness@gmail.com
                    </a>{" "}
                    for security concerns.
                  </p>
                </div>
              </section>

              {/* Subscriptions */}
              <section>
                <h2 className="text-xl font-black text-white mb-6 tracking-tight uppercase italic flex items-center space-x-3">
                  <span className="w-8 h-px bg-primary/30" />
                  <span>7. Subscriptions</span>
                </h2>
                <div className="p-8 rounded-2xl bg-white/2 border border-white/5 space-y-6 text-zinc-400 font-medium leading-relaxed">
                  <p>
                    The Service offers free and paid subscription plans. Paid
                    subscriptions are billed in advance and processed securely
                    by Stripe, Inc.
                  </p>
                  <p>
                    You may cancel your subscription at any time through your
                    account settings. Upon cancellation, you will retain access
                    to paid features until the end of your current billing
                    period.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-xl font-black text-white mb-6 tracking-tight uppercase italic flex items-center space-x-3">
                  <span className="w-8 h-px bg-primary/30" />
                  <span>14. Liability</span>
                </h2>
                <div className="p-8 rounded-2xl bg-primary/5 border border-primary/10">
                  <p className="text-zinc-300 font-medium leading-relaxed text-sm italic">
                    "To the maximum extent permitted by law, LinkFlin shall not
                    be liable for any indirect, incidental, or consequential
                    damages arising from your use of the Service. Our total
                    cumulative liability shall not exceed the amount you paid us
                    in the preceding 12 months."
                  </p>
                </div>
              </section>

              {/* Contact Us */}
              <section className="pt-12 border-t border-white/5 text-center sm:text-left">
                <h2 className="text-xl font-black text-white mb-6 tracking-tight uppercase italic flex items-center justify-center sm:justify-start space-x-3">
                  <span className="w-8 h-px bg-primary/30" />
                  <span>21. Contact Us</span>
                </h2>
                <p className="text-zinc-400 font-medium leading-relaxed mb-8">
                  If you have questions about these Terms, contact us at:
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

export default TermsPage;
