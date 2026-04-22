"use client";

import React, { useState, useEffect, Suspense, lazy } from "react";
import Loader from "./Layout/Loader";
import Navbar from "./Layout/Navbar";
import Hero from "./Hero";

// Lazy load non-critical sections to prevent initial hydration freeze
const Features = lazy(() => import("./Features"));
const CTA = lazy(() => import("./CTA"));
const Footer = lazy(() => import("./Layout/Footer"));

const Mainpage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [renderBelowFold, setRenderBelowFold] = useState(false);

  useEffect(() => {
    // Lock scroll during loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    }

    if (!isLoading) {
      // Step 1: Show main container and Navbar/Hero
      const contentTimer = setTimeout(() => {
        setShowContent(true);
        // Re-enable scroll when hero starts showing
        document.body.style.overflow = "auto";
      }, 100);

      // Step 2: Render below-the-fold content after a short delay to keep initial entrance smooth
      const belowFoldTimer = setTimeout(() => {
        setRenderBelowFold(true);
      }, 800);

      return () => {
        clearTimeout(contentTimer);
        clearTimeout(belowFoldTimer);
        document.body.style.overflow = "auto"; // Cleanup
      };
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      <div 
        className={`relative w-full min-h-screen bg-background bg-mesh selection:bg-primary/30 transition-opacity duration-700 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        {showContent && (
          <>
            <Navbar />
            <main className="relative">
              <Hero />
              
              <Suspense fallback={<div className="h-96" />}>
                {renderBelowFold && (
                  <>
                    <Features />
                    <CTA />
                  </>
                )}
              </Suspense>
            </main>

            <Suspense fallback={<div className="h-40" />}>
              {renderBelowFold && <Footer />}
            </Suspense>
          </>
        )}
      </div>
    </>
  );
};

export default Mainpage;
