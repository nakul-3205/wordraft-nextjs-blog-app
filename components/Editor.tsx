"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Editor({ existingBlog }: { existingBlog?: any }) {
  const [title, setTitle] = useState(existingBlog?.title || "");
  const [content, setContent] = useState(existingBlog?.content || "");
  const router = useRouter();

  const handleSubmit = async () => {
    const method = existingBlog ? "PUT" : "POST";
    const endpoint = existingBlog ? `/api/blog/${existingBlog.slug}` : `/api/blog`

    await fetch(endpoint, {
      method,
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <input
        type="text"
        placeholder="Blog Title"
        className="w-full p-4 text-xl font-semibold bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Start writing your blog..."
        className="w-full min-h-[300px] p-4 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
      >
        {existingBlog ? "Update Blog" : "Publish Blog"}
      </button>
    </div>
  );
}
