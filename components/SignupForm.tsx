'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirm) {
      setError("Passwords don't match");
      return;
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || 'Something went wrong');
    } else {
      setSuccess('Signup successful! Redirecting...');
      setTimeout(() => router.push('/login'), 1500);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto mt-24 p-8 bg-black/60 backdrop-blur-md rounded-2xl shadow-xl"
    >
      <h1 className="text-3xl font-bold text-center mb-6">Create an Account 🚀</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            placeholder="••••••••"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Confirm Password</label>
          <input
            type="password"
            required
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        {success && <p className="text-green-400 text-sm text-center">{success}</p>}
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-full text-white font-semibold transition-all"
        >
          Sign Up
        </button>
      </form>
    </motion.div>
  );
}
