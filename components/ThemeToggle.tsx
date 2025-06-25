//TODO Under Devlopment

'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="ml-4 px-3 py-1 rounded-full border border-zinc-700 text-sm text-white hover:bg-purple-600 transition-all"
    >
      {theme === 'light' ? '🌙 Dark' : '🌞 Light'}
    </button>
  );
}
