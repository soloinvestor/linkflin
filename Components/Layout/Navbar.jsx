"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useScroll } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";

const NAV_ITEMS = ["Features", "Pricing", "FAQ"];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const actionsRef = useRef(null);
  const hamburgerRef = useRef(null);

  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const modalLinksRef = useRef(null);
  const modalActionsRef = useRef(null);
  const closeRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      gsap.set(
        [
          navRef.current,
          logoRef.current,
          ".nav-link",
          actionsRef.current,
          hamburgerRef.current,
        ],
        { opacity: 0, y: -20 },
      );

      tl.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
      })
        .to(
          logoRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .to(
          ".nav-link",
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .to(
          actionsRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .to(
          hamburgerRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.6",
        );
    });

    return () => ctx.revert();
  }, []);

  // Scroll handler
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);

    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      const tl = gsap.timeline();
      tlRef.current = tl;

      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(modalRef.current, { xPercent: 100 });
      gsap.set(".modal-link", { opacity: 0, x: 40 });
      gsap.set(modalActionsRef.current, { opacity: 0, y: 30 });
      gsap.set(closeRef.current, { opacity: 0, rotate: -90, scale: 0.5 });

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
        .to(
          modalRef.current,
          {
            xPercent: 0,
            duration: 0.5,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .to(
          closeRef.current,
          {
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(2)",
          },
          "-=0.2",
        )
        .to(
          ".modal-link",
          {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .to(
          modalActionsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3",
        );
    });
  }, []);

  const closeMenu = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsMenuOpen(false);
        document.body.style.overflow = "";
      },
    });

    tl.to(".modal-link", {
      opacity: 0,
      x: -30,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(
        modalActionsRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2",
      )
      .to(
        closeRef.current,
        {
          opacity: 0,
          rotate: 90,
          scale: 0.5,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2",
      )
      .to(
        modalRef.current,
        {
          xPercent: 100,
          duration: 0.4,
          ease: "power3.in",
        },
        "-=0.1",
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2",
      );
  }, []);

  const router = useRouter();

  const handleNav = useCallback(
    (e, href) => {
      if (href.startsWith("#")) {
        if (isMenuOpen) closeMenu();
        return;
      }

      e.preventDefault();

      if (isMenuOpen) {
        closeMenu();
        setTimeout(() => {
          router.push(href);
        }, 300);
      } else {
        router.push(href);
      }
    },
    [isMenuOpen, closeMenu, router],
  );

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${
          isScrolled
            ? "py-4 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white relative"
              >
                <path
                  d="M12 3V21M3 12H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M5 5L19 19M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                <rect
                  x="8"
                  y="8"
                  width="8"
                  height="8"
                  rx="2"
                  fill="#030303"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight text-white uppercase italic">
              linkflin
            </span>
          </Link>

          {/* Desktop Links */}
          <div
            ref={linksRef}
            className="hidden lg:flex items-center space-x-10"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link relative text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors py-2 group"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary rounded-full transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div
            ref={actionsRef}
            className="hidden lg:flex items-center space-x-8"
          >
            <Link
              href="/login"
              prefetch={false}
              onClick={(e) => handleNav(e, "/login")}
              className="text-xs font-bold cursor-pointer uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              prefetch={false}
              onClick={(e) => handleNav(e, "/signup")}
              className="relative overflow-hidden cursor-pointer group rounded-full bg-white px-8 py-3 text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 group-hover:text-white transition-colors">
                Start Free
              </span>
            </Link>
          </div>

          {/* Hamburger Button (mobile) */}
          <button
            ref={hamburgerRef}
            onClick={openMenu}
            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 space-y-1.5 cursor-pointer group"
            aria-label="Open menu"
          >
            <span className="block w-6 h-[2px] bg-zinc-400 group-hover:bg-white transition-colors rounded-full" />
            <span className="block w-4 h-[2px] bg-zinc-400 group-hover:bg-white transition-colors rounded-full ml-auto" />
            <span className="block w-6 h-[2px] bg-zinc-400 group-hover:bg-white transition-colors rounded-full" />
          </button>
        </div>
      </nav>

      {/* Mobile Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-100">
          {/* Overlay */}
          <div
            ref={overlayRef}
            onClick={closeMenu}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-in Panel */}
          <div
            ref={modalRef}
            className="absolute top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/5 shadow-2xl flex flex-col will-change-transform"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <span className="text-lg font-black tracking-tight text-white uppercase italic">
                linkflin
              </span>
              <button
                ref={closeRef}
                onClick={closeMenu}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                aria-label="Close menu"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              ref={modalLinksRef}
              className="flex-1 flex flex-col justify-center px-8 space-y-2"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={closeMenu}
                  className="modal-link block py-4 text-2xl font-black uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition-colors border-b border-white/5 group relative"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div
              ref={modalActionsRef}
              className="p-8 space-y-4 border-t border-white/5 bg-[#0a0a0a]"
            >
              <Link
                href="/login"
                prefetch={false}
                onClick={(e) => handleNav(e, "/login")}
                className="block w-full py-4 text-sm text-center font-bold uppercase tracking-widest text-zinc-400 border border-white/10 rounded-xl active:bg-white/5 active:text-white transition-all"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                prefetch={false}
                onClick={(e) => handleNav(e, "/signup")}
                className="block w-full relative overflow-hidden rounded-xl bg-white py-4 text-sm text-center font-bold uppercase tracking-widest text-black active:scale-[0.98] transition-all"
              >
                <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-active:opacity-100 transition-opacity" />
                <span className="relative z-10 group-active:text-white transition-colors">
                  Start Free
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
