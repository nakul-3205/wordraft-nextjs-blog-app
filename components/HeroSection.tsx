'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mt-32 px-6"
    >
      <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4">
        Welcome to <span className="text-purple-500">Wordraft</span>
      </h1>
      <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
        A full-stack blogging platform where ideas meet impact. Built with 💻 by Nakul.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/signup"
          className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full font-semibold transition-all"
        >
         Click Here To Start Writing
        </Link>
        <Link
          href="/login"
          className="border border-zinc-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-zinc-800 transition-all"
        >
          Login
        </Link>
      </div>
    </motion.section>
  );
}
