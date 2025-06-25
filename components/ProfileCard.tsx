'use client';

import { motion } from 'framer-motion';

interface ProfileCardProps {
  name: string;
  email: string;
  totalBlogs: number;
}

export default function ProfileCard({ name, email, totalBlogs }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-800 flex flex-col sm:flex-row items-center sm:items-start gap-6"
    >
      <img
        src="/avatar.png"
        alt="Avatar"
        className="w-20 h-20 rounded-full border border-zinc-700"
      />
      <div className="text-center sm:text-left space-y-2">
        <h2 className="text-xl font-semibold text-white">{name}</h2>
        <p className="text-sm text-zinc-400">{email}</p>
        <p className="text-sm text-zinc-400">{totalBlogs} blog{totalBlogs !== 1 && 's'} written</p>
      </div>
    </motion.div>
  );
}
