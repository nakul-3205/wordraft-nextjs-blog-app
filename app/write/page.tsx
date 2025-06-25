'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function WritePage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', content: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMsg('');

    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus('error');
      setMsg(data.message || 'Something went wrong.');
    } else {
      setStatus('success');
      setMsg('Blog published!');
      setTimeout(() => router.push('/feed'), 1500);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 py-10 md:px-12 bg-background text-white">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl shadow-xl"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-purple-400">Write a Blog</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter your blog title..."
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 block mb-1">Content</label>
              <textarea
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full h-48 p-3 rounded-lg bg-zinc-800 border border-zinc-700 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Write your blog content here..."
              ></textarea>
            </div>

            {status === 'error' && <p className="text-red-400 text-sm">{msg}</p>}
            {status === 'success' && <p className="text-green-400 text-sm">{msg}</p>}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-full text-white font-semibold transition"
            >
              {status === 'loading' ? 'Publishing...' : 'Publish Blog'}
            </button>
          </form>
        </motion.div>
      </main>
    </>
  );
}
