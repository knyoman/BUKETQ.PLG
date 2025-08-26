import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+6289625451850';
    const message = encodeURIComponent('Halo BUKETQ.PLG! Saya ingin request custom buket bunga. Bisa bantu saya? 😊');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2">
      {/* Teks Notifikasi */}
      <motion.div
        className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md text-sm"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-medium">Request Custom! </p>
        <p><span className="font-bold text-black">Chat kami</span></p>
      </motion.div>

      {/* Tombol WhatsApp */}
      <motion.button
        onClick={handleWhatsAppClick}
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
