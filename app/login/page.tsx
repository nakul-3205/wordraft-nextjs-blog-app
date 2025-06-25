'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMsg('');

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.error) {
      setStatus('error');
      setMsg(res.error);
    } else {
      setStatus('idle');
      setMsg('Login successful! Redirecting...');
      setTimeout(() => router.push('/feed'), 1500);
    }
  }

  return (
    <div className="h-screen flex flex-col sm:flex-row bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white overflow-hidden">
      {/* Left Panel */}
      <div className="sm:w-1/2 p-10 flex flex-col justify-center items-start bg-gradient-to-b from-purple-900/50 to-black border-r border-zinc-800">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold leading-tight mb-6"
        >
          Welcome back to <span className="text-purple-400">Wordraft</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-zinc-400 text-lg"
        >
          Sign in to continue your journey in writing and discovery.
        </motion.p>
      </div>

      {/* Right Form Panel */}
      <div className="sm:w-1/2 p-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-zinc-900/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-zinc-800"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">Log in to your account</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {status === 'error' && <p className="text-red-400 text-sm text-center">{msg}</p>}
            {status === 'idle' && msg && <p className="text-green-400 text-sm text-center">{msg}</p>}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-full text-white font-semibold transition"
            >
              {status === 'loading' ? 'Logging you in...' : 'Log In'}
            </button>
          </form>

          <p className="text-sm text-zinc-400 text-center mt-6">
            Don't have an account?{' '}
            <a href="/signup" className="text-purple-400 hover:underline">Sign up</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
