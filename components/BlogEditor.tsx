'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface BlogEditorProps {
  initialData?: {
    title: string;
    content: string;
    slug?: string;
  };
  isEditing?: boolean;
}

export default function BlogEditor({ initialData, isEditing = false }: BlogEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(
        isEditing ? `/api/blog/${initialData?.slug}` : '/api/blog',
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      router.push('/blogs');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto mt-20 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-6">
        {isEditing ? 'Edit Your Blog' : 'Write a New Blog'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Your awesome blog title..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-60 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Write your story here..."
          />
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-semibold transition-all disabled:opacity-50"
        >
          {loading ? 'Submitting...' : isEditing ? 'Update Blog' : 'Publish Blog'}
        </button>
      </form>
    </motion.div>
  );
}
