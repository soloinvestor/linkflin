"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./Layout/Navbar";
import Hero from "./Hero";
import Features from "./Features";
import CTA from "./CTA";
import Footer from "./Layout/Footer";
import Loader from "./Layout/Loader";

const Mainpage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent flash of content before loader
  useEffect(() => {
    // This state can be managed by the Loader component's onComplete callback
  }, []);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      <div 
        className={`relative w-full min-h-screen bg-background bg-mesh selection:bg-primary/30 transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {!isLoading && (
          <>
            <Navbar />
            <main className="relative">
              <Hero />
              <Features />
              <CTA />
            </main>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default Mainpage;
