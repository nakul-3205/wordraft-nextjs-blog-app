'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditBlogForm({ blog }: { blog: any }) {
  const router = useRouter();
  const [title, setTitle] = useState(blog.title || "");
  const [content, setContent] = useState(blog.content || "");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch(`/api/blogs/${blog.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update blog");

      setMsg("✅ Blog updated successfully!");
      setTimeout(() => router.push(`/feed`), 1000);
    } catch (err: any) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label className="block text-zinc-300 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
        />
      </div>

      <div>
        <label className="block text-zinc-300 mb-1">Content</label>
        <textarea
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
        ></textarea>
      </div>

      {msg && <p className="text-center text-sm text-purple-400">{msg}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-full transition"
      >
        {loading ? "Updating..." : "Update Blog"}
      </button>
    </form>
  );
}
