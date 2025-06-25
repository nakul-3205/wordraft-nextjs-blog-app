'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

interface BlogProps {
  blog: {
    _id: string;
    title: string;
    content: string;
    slug: string;
    createdAt: string;
    author?: { name?: string; email?: string };
  };
  isAuthor: boolean;
}

export default function BlogPageClient({ blog, isAuthor }: BlogProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/blogs/${blog.slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      router.push('/feed');
    } catch (err) {
      console.error(err);
      alert('Failed to delete blog');
    }
  };

  if (!blog) {
    return <p className="text-center text-red-500">Blog not found.</p>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 py-8 text-white bg-background md:px-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-4 text-purple-400">{blog.title}</h1>

          <p className="text-sm text-zinc-500 mb-2">
            By <span className="text-purple-300">{blog.author?.name || 'Anonymous'}</span> •{' '}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>

          {isAuthor && (
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => router.push(`/edit/${blog.slug}`)}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 transition"
              >
                🗑️ Delete
              </button>
            </div>
          )}

          <div className="text-lg leading-relaxed text-zinc-200 whitespace-pre-wrap">
            {blog.content}
          </div>
        </motion.article>
      </main>
    </>
  );
}
