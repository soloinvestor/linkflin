import React from "react";
import Navbar from "./Navbar";

const Mainpage = () => {
  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Page content goes here */}
        <h2 className="text-4xl font-bold text-zinc-900 dark:text-white">Welcome to LinkFlin</h2>
      </main>
    </div>
  );
};

export default Mainpage;
