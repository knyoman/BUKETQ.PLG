import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Wand2, Gift, Sparkles, QrCode } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import TypedHeadline from '../components/TypedHeadline';

export default function Home() {
  const location = useLocation();

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [productsRef, productsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Scroll to section
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  const featuredProducts = [
    {
      id: 2,
      name: 'Buket Uang Rp 5.000 (L)',
      price: 150000,
      image: '/BuketUang01.jpg',
      label: 'Terlaris',
      description: 'Buket uang unik yang menggabungkan keindahan bunga dengan uang kertas. Hadiah spesial.',
      rating: 25
    },
    {
      id: 3,
      name: 'Buket Bunga (XL)',
      price: 130000,
      image: '/BuketUang02.jpg',
      label: 'Baru',
      description: 'Buket bunga cantik yang disusun artistik. Cocok untuk hadiah.',
      rating: 15
    },
    {
      id: 4,
      name: 'Buket Engagement (L)',
      price: 80000,
      image: '/BuketEngagement01.jpg',
      label: 'Populer',
      description: 'Buket bunga cantik untuk acara pertunangan, dihias dengan bunga segar dan elegan.',
      rating: 30
    },
  ];

  const features = [
    {
      icon: QrCode,
      title: 'Kartu Ucapan Digital QR',
      description: '"Kartu ucapan digital dengan QR code untuk pesan spesial Anda."'
    },
    {
      icon: Wand2,
      title: 'Request Custom',
      description: '"Buket bisa dicustom sesuai tema, warna, dan bentuk pilihan Anda."'
    },
    {
      icon: Gift,
      title: 'Sempurna untuk Segala Acara',
      description: '"Ulang tahun, anniversary, pernikahan, dan momen spesial lainnya"'
    },
    {
      icon: Sparkles,
      title: 'Kualitas Premium',
      description: '"Buket premium dengan sentuhan elegan dan kualitas terbaik."'
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src='/HeroSection.png'
            alt="Latar belakang bunga cantik"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sage-900/70 to-rose-900/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              <TypedHeadline />
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
          >
            "Ciptakan momen tak terlupakan dengan buket bunga penuh keindahan dan makna."
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/products"
              className="group bg-rose-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <span>Belanja Sekarang</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-sage-800 mb-4">
              Mengapa Memilih BUKETQ.PLG?
            </h2>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              Kami berdedikasi menciptakan momen indah melalui seni merangkai bunga
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-rose-100 to-peach-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold text-sage-800 mb-3">{feature.title}</h3>
                <p className="text-sage-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={productsRef} className="py-20 bg-gradient-to-br from-floral-50 to-peach-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-sage-800 mb-4">
              Buket Unggulan
            </h2>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              Temukan rangkaian bunga paling populer dan indah kami
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={productsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={productsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-sage-700 text-white px-8 py-3 rounded-full hover:bg-sage-800 transition-colors"
            >
              <span>Lihat Semua Produk</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimoni" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-sage-800 mb-4">
              Kata Pelanggan Kami
            </h2>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-peach-500">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-display font-bold text-white mb-6">
            Siap Menciptakan Momen Indah?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Biarkan kami membantu Anda mengungkapkan perasaan dengan buket yang sempurna
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-rose-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Jelajahi Koleksi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
