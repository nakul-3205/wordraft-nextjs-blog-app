'use client';

import { motion } from 'framer-motion';

export default function Loader({ fullScreen = false }: { fullScreen?: boolean }) {
  return (
    <div
      className={`${
        fullScreen ? 'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm' : ''
      } flex items-center justify-center`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full"
      />
    </div>
  );
}

