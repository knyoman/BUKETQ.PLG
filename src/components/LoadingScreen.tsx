import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-rose-100 to-peach-100 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="mb-4"
        >
          <img 
            src="/LogoBUKETQPLG.jpg" 
            alt="BUKETQ.PLG Logo" 
            className="w-24 h-24 mx-auto rounded-full shadow-lg"
          />
        </motion.div>
        <motion.h2 
          className="text-2xl font-display text-sage-800 mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          BUKETQ.PLG
        </motion.h2>
        <motion.p 
          className="text-sage-600"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Memuat momen indah...
        </motion.p>
      </div>
    </motion.div>
  );
}