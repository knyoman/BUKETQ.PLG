import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Send } from 'lucide-react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Buat pesan WhatsApp
    const message = `Halo BUKETQ.PLG! 

Nama: ${formData.name}
Email: ${formData.email}
Subjek: ${formData.subject}

Pesan: ${formData.message}

Saya menunggu balasan dari Anda!`;

    const phoneNumber = '+6289625451850';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Terima kasih! Pesan Anda telah dikirim melalui WhatsApp.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Lokasi Kami',
      details: ['Jl. Perumdam BLOK AA no03 km14', 'palembang', 'Indonesia']
    },
    {
      icon: Phone,
      title: 'Telepon & WhatsApp',
      details: ['+62 896-2545-1850']
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      details: ['Sen - Jum: 08:00 - 20:00', 'Sab - Min: 09:00 - 18:00']
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-floral-50 to-peach-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-rose-100 to-peach-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-sage-800 mb-4"
          >
            Hubungi Kami
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-sage-600 max-w-2xl mx-auto"
          >
            Kami senang membantu Anda! Hubungi kami untuk pesanan khusus, pertanyaan, atau sekedar menyapa
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-sage-800 mb-6">Kirim Pesan</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    Nama Anda *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-sage-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    Alamat Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-sage-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Masukkan email Anda"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">
                  Subjek *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-sage-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Tentang apa ini?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">
                  Pesan *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full p-3 border border-sage-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                  placeholder="Ceritakan bagaimana kami bisa membantu Anda..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Kirim Pesan via WhatsApp</span>
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-sage-800 mb-6">Informasi Kontak</h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-rose-100 p-3 rounded-lg">
                      <item.icon className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sage-800 mb-1">{item.title}</h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-sage-600 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-sage-800 mb-6">Sosial Media</h2>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/buketq.plg/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-rose-100 hover:bg-rose-200 text-rose-500 p-3 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-8 h-8" />
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=61559885135168"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-rose-100 hover:bg-rose-200 text-rose-500 p-3 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-8 h-8" />
              </a>
              <a
                href="https://www.tiktok.com/@buketq.plg"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-rose-100 hover:bg-rose-200 text-rose-500 p-3 rounded-full transition-colors"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path d="M224,80.002a47.999,47.999,0,0,1-48-48,8,8,0,0,0-8-8H136a8,8,0,0,0-8,8V160a32,32,0,1,1-32-32,8,8,0,0,0,8-8V96.002a8,8,0,0,0-8-8A64,64,0,1,0,160,152.562V106.133A95.344,95.344,0,0,0,224,120a8,8,0,0,0,8-8V88.002A8,8,0,0,0,224,80.002Z"/>
                </svg>
              </a>
            </div>
          </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-rose-500 to-peach-500 rounded-2xl p-8 text-white">
              <h2 className="text-xl font-semibold mb-4">Butuh Bantuan Segera?</h2>
              <p className="mb-4">
                Untuk pesanan mendesak atau pertanyaan, hubungi kami langsung via WhatsApp
              </p>
              <a
                href="https://wa.me/6289625451850?text=Halo%20BUKETQ.PLG!%20Saya%20butuh%20bantuan%20segera."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white text-rose-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>WhatsApp Kami Sekarang</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}