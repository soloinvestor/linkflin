import React from "react";
import Navbar from "./Layout/Navbar";
import Hero from "./Hero";
import Features from "./Features";
import CTA from "./CTA";
import Footer from "./Layout/Footer";

const Mainpage = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#030303] bg-mesh selection:bg-[#9499e8]/30">
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
