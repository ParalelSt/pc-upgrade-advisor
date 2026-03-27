"use client";

import { useState } from "react";
import Link from "next/link";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

interface NavLink {
  href: string;
  label: string;
  available: boolean;
}

const NAV_LINKS: NavLink[] = [
  { href: "/tools/bottleneck", label: "Bottleneck", available: true },
  { href: "/tools/fps-calculator", label: "FPS Check", available: true },
  { href: "/results", label: "My Results", available: true },
  { href: "/tools/psu-calculator", label: "PSU Calc", available: false },
];

/**
 * Top navigation bar. Responsive — collapses to a hamburger on mobile.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  const desktopLink = (link: NavLink) => {
    if (!link.available) {
      return (
        <span key={link.href} className="text-muted opacity-30 cursor-not-allowed select-none">
          {link.label}
        </span>
      );
    }
    return (
      <Link
        key={link.href}
        href={link.href}
        className="text-muted hover:text-foreground transition-colors"
      >
        {link.label}
      </Link>
    );
  };

  const mobileLink = (link: NavLink) => {
    if (!link.available) {
      return (
        <span key={link.href} className="flex items-center justify-between py-3 text-sm text-muted opacity-40 cursor-not-allowed select-none">
          {link.label}
          <span className="text-xs">Soon</span>
        </span>
      );
    }
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setIsOpen(false)}
        className="flex items-center py-3 text-sm text-muted hover:text-foreground transition-colors border-b border-border last:border-0"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="border-b border-border bg-surface relative z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="font-semibold text-sm">
          <span className="text-gradient">PC Upgrade Advisor</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          {NAV_LINKS.map(desktopLink)}
          {isLoaded && (
            isSignedIn
              ? <UserButton afterSignOutUrl="/" />
              : <SignInButton mode="redirect"><span className="text-muted hover:text-foreground transition-colors cursor-pointer">Sign in</span></SignInButton>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-1 text-muted hover:text-foreground transition-colors"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="sm:hidden border-t border-border bg-surface px-4 pb-2">
          {NAV_LINKS.map(mobileLink)}
        </div>
      )}
    </header>
  );
}
