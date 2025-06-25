'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setStatus('error');
      setMsg("Passwords don't match");
      return;
    }

    setStatus('loading');
    setMsg('');

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus('error');
      setMsg(data.message || 'Something went wrong');
    } else {
      setStatus('success');
      setMsg('Signup successful! Redirecting...');
      setTimeout(() => router.push('/login'), 1500);
    }
  }

  return (
    <div className="h-screen flex flex-col sm:flex-row bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white overflow-hidden">
      {/* Left Branding Panel */}
      <div className="sm:w-1/2 p-10 flex flex-col justify-center items-start bg-gradient-to-b from-purple-900/50 to-black border-r border-zinc-800">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold leading-tight mb-6"
        >
          Welcome to <span className="text-purple-400">Wordraft</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-zinc-400 text-lg"
        >
          Where your words turn into stories. Join the tribe of thinkers, writers & creators.
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
          <h2 className="text-3xl font-semibold mb-6 text-center">Create your account</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {['Name', 'Email', 'Password', 'Confirm Password'].map((label, idx) => (
              <div key={idx}>
                <label className="block text-sm text-zinc-300 mb-1">{label}</label>
                <input
                  type={
                    label.includes('Password') ? 'password' :
                    label === 'Email' ? 'email' : 'text'
                  }
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  value={
                    label === 'Name' ? form.name :
                    label === 'Email' ? form.email :
                    label === 'Password' ? form.password : form.confirm
                  }
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [label === 'Name' ? 'name' :
                      label === 'Email' ? 'email' :
                      label === 'Password' ? 'password' : 'confirm']: e.target.value
                    }))
                  }
                />
              </div>
            ))}

            {status === 'error' && <p className="text-red-400 text-sm text-center">{msg}</p>}
            {status === 'success' && <p className="text-green-400 text-sm text-center">{msg}</p>}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-full text-white font-semibold transition"
            >
              {status === 'loading' ? 'Signing you up...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-sm text-zinc-400 text-center mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-purple-400 hover:underline">Log in</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
