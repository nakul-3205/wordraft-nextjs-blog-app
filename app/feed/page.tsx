'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

interface Blog {
  _id: string;
  title: string;
  content: string;
  slug: string;
  author: { name: string };
  createdAt: string;
}

export default function FeedPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        console.log('Fetch status:', res.status);
        const data = await res.json();
        console.log('Response data:', data);
         setBlogs(data || []);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background text-white px-4 py-8 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          🔥 Trending on <span className="text-purple-400">Wordraft</span>
        </h1>

        {loading ? (
          <p className="text-center text-zinc-400">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-zinc-400">No blogs found. Start writing now!</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, idx) => (
              <motion.a
                href={`/blog/${blog.slug}`}
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="block bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:shadow-md hover:border-purple-500 transition-all"
              >
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-sm text-zinc-400 line-clamp-3">{blog.content}</p>
                <p className="text-xs mt-4 text-zinc-500">
                  By <span className="text-purple-400">{blog.author?.name || 'Anonymous'}</span> •{' '}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </motion.a>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
