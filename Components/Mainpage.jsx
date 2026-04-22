import React from "react";
import Navbar from "./Layout/Navbar";
import Hero from "./Hero";
import Features from "./Features";
import CTA from "./CTA";
import Footer from "./Layout/Footer";

const Mainpage = () => {
  return (
    <div className="relative w-full min-h-screen bg-background bg-mesh selection:bg-primary/30">
      <Navbar />
      <main className="relative">
        <Hero />
        <Features />
        <CTA />
      </main>

      <Footer />
    </div>
  );
};

export default Mainpage;
