'use client';

import { motion } from 'framer-motion';

interface BlogDetailsProps {
  blog: {
    title: string;
    content: string;
    author: {
      name: string;
    };
    createdAt: string;
  };
}

export function BlogDetails({ blog }: BlogDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg"
    >
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-zinc-400 mb-6">
        By {blog.author.name} •{' '}
        {new Date(blog.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
      </p>
      <article className="text-zinc-100 leading-relaxed whitespace-pre-wrap">
        {blog.content}
      </article>
    </motion.div>
  );
}
