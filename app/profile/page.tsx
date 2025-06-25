'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/user/profile');
        const data = await res.json();
        setUser({ name: data.name, email: data.email });
        setBlogs(data.blogs);
      } catch (err) {
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background text-white px-4 py-10 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">👤 Your Profile</h1>
          <p className="text-zinc-400 mb-6">All your info & written blogs.</p>

          {loading ? (
            <p className="text-zinc-500">Loading profile...</p>
          ) : (
            <>
              <div className="mb-8 bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow">
                <p className="text-xl font-semibold text-purple-400">{user?.name}</p>
                <p className="text-zinc-400">{user?.email}</p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">📝 Your Blogs</h2>
                <a
                  href="/write"
                  className="text-sm bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-full font-medium transition"
                >
                  + Write New
                </a>
              </div>

              {blogs.length === 0 ? (
                <p className="text-zinc-400">You haven't written any blogs yet.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-5">
                  {blogs.map((blog, i) => (
                    <motion.a
                      key={blog._id}
                      href={`/blog/${blog.slug}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="block bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-purple-500 hover:shadow-md transition"
                    >
                      <h3 className="text-lg font-medium">{blog.title}</h3>
                      <p className="text-sm text-zinc-500 mt-1">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </motion.a>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </main>
    </>
  );
}
