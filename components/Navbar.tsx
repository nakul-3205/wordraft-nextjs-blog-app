'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ children, href }: { children: string; href: string }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="relative group">
    <Link
      href={href}
      className="px-4 py-1.5 text-white rounded-full bg-zinc-900 border border-zinc-700 hover:bg-purple-600 transition-all overflow-hidden relative z-10"
    >
      {children}
    </Link>
    {/* Border pulse animation */}
    <span className="absolute inset-0 rounded-full border border-purple-400 opacity-0 group-hover:opacity-100 animate-pulse z-0"></span>
  </motion.div>
);

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false); // Close on mount
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full px-6 py-4 bg-black/70 backdrop-blur-lg fixed top-0 left-0 z-50 shadow-md"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold text-white tracking-wide">
          Wordraft
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <AnimatedButton href="/feed">Feed</AnimatedButton>
          <AnimatedButton href="/write">Write Blog</AnimatedButton>
          <AnimatedButton href="/profile">Profile</AnimatedButton>

          {session ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white transition-all"
            >
              Logout
            </motion.button>
          ) : (
            <AnimatedButton href="/login">Login</AnimatedButton>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-2 px-4">
          <Link href="/feed" className="text-white hover:text-purple-300">Feed</Link>
          <Link href="/write" className="text-white hover:text-purple-300">Write Blog</Link>
          <Link href="/profile" className="text-white hover:text-purple-300">Profile</Link>
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-red-400 hover:text-red-200 text-left"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="text-green-400 hover:text-green-200">Login</Link>
          )}
        </div>
      )}
    </motion.nav>
  );
}
