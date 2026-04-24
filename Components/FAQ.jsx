"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  const faqData = [
    {
      question: "Will this mess up my YouTube descriptions?",
      answer:
        "Not at all. Linkflin is designed to be non-destructive. Our YouTube bulk auto-convert tool identifies existing affiliate links and replaces them with smart links while preserving your original formatting and other text. You can even preview changes before they go live.",
    },
    {
      question: "What happens if I cancel?",
      answer:
        "Your smart links keep redirecting for 90 days. If you used YouTube auto-convert, we'll automatically revert your video descriptions back to the original links — no manual work. You'll also get a full report of every link mapping (original URL → smart link) so you have a complete record. Your audience is never affected.",
      link: "Start with the free plan — no commitment →",
    },
    {
      question: "Will editing descriptions affect my YouTube algorithm or SEO?",
      answer:
        "No. YouTube's algorithm focuses on viewer engagement and video content. Updating links in the description is a standard practice and does not negatively impact SEO. In fact, localized and app-opening links improve user experience, which can indirectly benefit your channel's performance.",
    },
    {
      question: "I only promote Amazon. Do I need this?",
      answer:
        "If even 20% of your audience is outside your home country, you're losing those commissions entirely. Smart links route every click to their local Amazon store automatically — no work on your end. It's the simplest way to get an instant 20-40% raise on your existing traffic.",
    },
    {
      question: "How is this different from Geniuslink?",
      answer:
        "While Geniuslink is a great tool, Linkflin is built specifically for modern creators. We offer a dedicated AI (MCP) integration, flatter pricing with unlimited clicks, and a more intuitive interface for bulk-managing YouTube descriptions. Plus, our free tier is more generous for starting creators.",
    },
    {
      question: "How does this compare to Bitly?",
      answer:
        "Bitly is a URL shortener — it makes links shorter, but it doesn't make them smarter. Bitly has no geo-routing (international viewers still land on the wrong storefront), no deep linking (mobile clicks open in a browser, not the app), and no link health monitoring. Youfiliate is a smart link platform: every link geo-targets clicks to local stores, opens merchant apps on mobile, gets monitored 24/7, and costs a flat monthly rate with unlimited clicks.",
    },
    {
      question: "How does this compare to URL Genius?",
      answer:
        "Url-genie provides the tools to localize links, but does not have an API to automate this process at scale. URL-Genie is also not well-suited for use in video descriptions, since it does not support automatic bulk-editing and URL-Genie is more expensive and less transparent with its pricing than Linkflin",
    },
    {
      question: "Does it only work with YouTube?",
      answer:
        "No. Smart links work anywhere you can paste a URL — YouTube descriptions, TikTok bios, Instagram link-in-bio, blog posts, emails, newsletters. The YouTube auto-convert feature is a bonus for creators with lots of existing videos.",
    },
    {
      question: "What if a destination link breaks?",
      answer:
        "We check every link destination 24/7 and notify you immediately. No other geo-targeting tool monitors link health. You fix it once, and every video that uses that smart link is updated.",
    },
    {
      question: "Can I use this with non-Amazon affiliate links?",
      answer:
        "Yes. Smart links work with any affiliate network — ShareASale, CJ, Impact, direct brand programs, any URL. Geo rules are fully customizable per destination.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Small delay to allow layout to settle after lazy mounting
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      gsap.from(".faq-heading", {
        scrollTrigger: {
          trigger: ".faq-section",
          start: "top 95%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: ".faq-list",
          start: "top 95%",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={containerRef}
      className="py-5 relative overflow-hidden faq-section"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 faq-heading">
          <h2 className="text-4xl font-black text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="faq-list space-y-4">
          {faqData.map((item, i) => (
            <div
              key={i}
              className={`faq-item glass-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 ${
                openIndex === i
                  ? "bg-white/[0.05] border-white/10"
                  : "hover:bg-white/[0.02]"
              }`}
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left group"
              >
                <span
                  className={`text-sm sm:text-base font-bold transition-colors ${
                    openIndex === i
                      ? "text-white"
                      : "text-zinc-400 group-hover:text-zinc-200"
                  }`}
                >
                  {item.question}
                </span>
                <div
                  className={`transition-transform duration-500 ${openIndex === i ? "rotate-180" : ""}`}
                >
                  <ChevronDown
                    className={`w-5 h-5 ${openIndex === i ? "text-primary" : "text-zinc-600"}`}
                  />
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === i
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 sm:p-8 pt-0 border-t border-white/5">
                  <p className="text-sm sm:text-base leading-relaxed text-zinc-400 mb-6">
                    {item.answer}
                  </p>
                  {item.link && (
                    <button className="cursor-pointer text-xs sm:text-sm font-bold text-primary uppercase tracking-widest hover:underline hover:underline-offset-5 transition-all">
                      {item.link}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
