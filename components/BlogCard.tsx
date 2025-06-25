
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogCardProps {
  title: string;
  description: string;
  author: string;
  slug: string;
  createdAt: string;
}

export default function BlogCard({
  title,
  description,
  author,
  slug,
  createdAt,
}: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg transition-all cursor-pointer hover:shadow-xl"
    >
      <Link href={`/blog/${slug}`} className="space-y-2 block">
        <h2 className="text-2xl font-semibold text-white line-clamp-2">{title}</h2>
        <p className="text-zinc-400 text-sm line-clamp-3">{description}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
          <span>By {author}</span>
          <span>{new Date(createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
        </div>
      </Link>
    </motion.div>
  );
}
