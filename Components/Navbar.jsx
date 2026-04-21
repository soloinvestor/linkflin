"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Blogs", href: "#blogs" },
    { name: "Docs", href: "#docs" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                LinkFlin
              </span>
            </Link>
          </div>

          {/* Desktop Links (Middle) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-indigo-600 focus:outline-none dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-indigo-400"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-100 hover:text-indigo-600 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-indigo-400"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-zinc-200 pt-4 pb-3 dark:border-zinc-800">
            <div className="flex items-center px-5 gap-4">
              <Link
                href="/login"
                className="text-base font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                onClick={() => setIsOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="flex flex-1 items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
