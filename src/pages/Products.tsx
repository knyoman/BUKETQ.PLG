import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { video } from 'framer-motion/client';
import { link } from 'framer-motion/m';

const products = [
  {
    id: 1,
    name: 'Buket Bunga + Boneka Wisuda (L)',
    price: 75000,
    image: '/BuketBonekaWisuda01.jpg',
    category: 'bouquet',
    label: 'Terlaris',
    description: 'Buket bunga cantik untuk wisuda dengan boneka teddy bear yang lucu.',
    rating: 20
  },
  {
    id: 2,
    name: 'Buket Uang Rp 5.000 (L)',
    price: 150000,
    image: '/BuketUang01.jpg',
    category: 'bouquet',
    label: 'Terlaris',
    description: 'Buket uang unik yang menggabungkan keindahan bunga dengan uang kertas.',
    rating: 25
  },
  {
    id: 3,
    name: 'Buket Bunga (XL)',
    price: 130000,
    image: '/BuketUang02.jpg',
    category: 'bouquet',
    label: 'Terlaris',
    description: 'Buket bunga cantik yang disusun artistik. Cocok untuk hadiah.',
    rating: 15
  },
  {
    id: 4,
    name: 'Buket Engagement (L)',
    price: 80000,
    image: '/BuketEngagement01.jpg',
    category: 'bouquet',
    label: 'Populer',
    description: 'Buket bunga cantik untuk acara pertunangan, dihias dengan bunga segar dan elegan.',
    rating: 30
  },
  {
    id: 5,
    name: 'Buket Bunga Lily (L)',
    price: 75000,
    image: '/BuketBungaLily.jpg',
    category: 'bouquet',
    label: 'Unik',
    description: 'Buket bunga lily yang elegan, cocok untuk acara formal atau hadiah istimewa.',
    rating: 10
  },
  {
    id: 6,
    name: 'Buket Mini Bunga',
    price: 25000,
    image: '/BuketMini01.jpg',
    category: 'bouquet',
    label: 'Unik',
    description: 'Buket mini yang cantik, sempurna untuk meja atau hadiah kecil.',
    rating: 18
  },
  {
    id: 7,
    name: 'Buket Snack Nabati (M)',
    price: 35000,
    image: '/BuketSnack01.jpg',
    category: 'bouquet',
    label: 'Unik',
    description: 'Buket snack nabati yang lezat, berisi berbagai camilan sehat dan enak.',
    rating: 22
  },
  {
    id: 8,
    name: 'Buket Uang (XL)',
    price: 175000,
    image: '/BuketUang03.jpg',
    category: 'bouquet',
    label: 'Terlaris',
    description: 'Buket uang dengan desain yang menarik, menggabungkan bunga dan uang kertas.',
    rating: 21
  },
  {
    id: 9,
    name: 'Buket Wisuda Uang + Boneka (L)',
    price: 130000,
    image: '/BuketWisuda01.jpg',
    category: 'bouquet',
    label: 'Populer',
    description: 'Buket bunga mawar merah yang klasik, simbol cinta dan keindahan.',
    rating: 35
  },
  {
    id: 10,
    name: 'Buket Chocolate (M)',
    price: 35000,
    image: '/BuketSnack02.jpg',
    category: 'bouquet',
    label: 'Baru',
    description: 'Buket chocolate yang manis, berisi berbagai jenis cokelat premium.',
    rating: 7
  },
  {
    id: 11,
    name: 'Buket Bunga Mawar (XL)',
    price: 130000,
    image: '/BuketBunfaMawar.jpg',
    category: 'bouquet',
    label: 'Terlaris',
    description: 'Buket bunga mawar merah yang klasik, simbol cinta dan keindahan.',
    rating: 10
  },
  {
    id: 12,
    name: 'Buket Snack Top (L)',
    price: 40000,
    image: '/BuketSnackTop.jpg',
    category: 'bouquet',
    label: 'Baru',
    description: 'Buket snack top yang berisi camilan populer dan lezat.',
    rating: 18
  },
  {
    id: 13,
    name: 'Buket Bunga Campur (L)',
    price: 70000,
    image: '/BuketBunga01.jpg',
    category: 'bouquet',
    label: 'Populer',
    description: 'Buket bunga campur yang indah, berisi berbagai jenis bunga segar.',
    rating: 16
  },
  {
    id: 14,
    name: 'Buket Bunga Mawat (M)',
    price: 35000,
    image:'/BuketBunga02.jpg',
    category: 'bouquet',
    label: 'Populer',
    description: 'Buket bunga mawar merah yang klasik, simbol cinta dan keindahan.',
    rating: 32
  },
  {
    id: 15,
    name: 'Buket Bunga Mawar Pink (L)',
    price: 80000,
    image:'/BuketBunga03.jpg',
    category: 'bouquet',
    label: 'Baru',
    description: 'Buket bunga mawar pink yang manis, simbol kasih sayang dan keindahan.',
    rating: 28
  },
  {
    id: 16,
    name: 'Buket Kopi Good Day(L)',
    price: 95000,
    image:'/BuketGooday.jpg',
    category: 'bouquet',
    label: 'Baru',
    description: 'Buket kopi Good Day yang unik, berisi berbagai jenis kopi premium.',
    rating: 6
  },
  {
    id: 17,
    name: 'Kartu Ucapan Wisuda',
    price: 5000,
    video: '/VideoUcapanWisuda01.mp4',
    label: 'Baru',
    category: 'card',
    description: 'Kartu ucapan wisuda yang indah, berisi pesan spesial untuk penerima.',
    rating: 5,
    link: 'https://buketqplg.my.canva.site/desain01',
  },
  {
    id: 18,
    name: 'Kartu Ucapan Wisuda Amplop',
    price: 5000,
    video: '/VideoUcapanWisuda02.mp4',
    label: 'Baru',
    category: 'card',
    description: 'Kartu ucapan wisuda dalam bentuk amplop yang elegan, berisi pesan spesial untuk penerima.',
    rating: 8,
    link: 'https://buketqplg.my.canva.site/desain02',
  },
  {
    id: 19,
    name: 'Kartu Ucapan Ulang Tahun',
    price: 5000,
    video: '/VideoUcapanULTA01.mp4',
    label: 'Baru',
    category: 'card',
    description: 'Kartu ucapan ulang tahun yang ceria, berisi pesan spesial untuk merayakan hari istimewa.',
    rating: 11,
    link: 'https://buketqplg.my.canva.site/desain03',
  },
  {
    id: 21,
    name: 'Miniatur Ikan',
    price: 2000,
    image: '/Ikan01.jpg',
    category: 'miniature',
    label: 'Baru',
    description: 'Miniatur ikan yang lucu, cocok untuk hiasan meja atau koleksi.',
    rating: 5
  },
  {
    id: 22,
    name: 'Miniatur Ubur-Ubur',
    price: 4000,
    image: '/Ubur01.jpg',
    category: 'miniature',
    label: 'Terlaris',
    description: 'Miniatur ubur-ubur yang unik, terbuat dari bahan ramah lingkungan.',
    rating: 12
  },
  {
    id: 23,
    name: 'Miniatur Kepiting',
    price: 4000,
    image: '/Kepiting01.jpg',
    category: 'miniature',
    label: 'Terlaris',
    description: 'Miniatur kepiting yang detail, cocok untuk hiasan atau koleksi.',
    rating: 15
  },
  {
    id: 24,
    name: 'Miniatur Kerang',
    price: 5000,
    image: '/Kerang01.jpg',
    category: 'miniature',
    label: 'Baru',
    description: 'Miniatur kerang yang cantik, cocok untuk dekorasi dan gantungan kunci.',
    rating: 8
  },
  {
    id: 25,
    name: 'Buket Skripsi',
    price: 80000,
    image: '/BuketSkripsi01.jpg',
    category: 'bouquet',
    label: 'Baru',
    description: 'Buket unik yang terbuat dari kertas revisi skripsi, simbol kreativitas dan dedikasi.',
    rating: 14
  },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'bouquet' | 'card' | 'miniature'>('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-16 min-h-screen">
      <section className="bg-gradient-to-r from-rose-100 to-peach-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-sage-800 mb-4"
          >
            Koleksi Buket Cantik Kami
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-sage-600 max-w-2xl mx-auto"
          >
            Temukan buket bunga buatan tangan kami, sempurna untuk setiap acara dan perayaan
          </motion.p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari buket..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center mt-4 flex-wrap gap-3">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-4 py-2 rounded-full border ${categoryFilter === 'all' ? 'bg-rose-500 text-white' : 'text-sage-700 border-sage-300'}`}
            >
              Semua
            </button>
            <button
              onClick={() => setCategoryFilter('bouquet')}
              className={`px-4 py-2 rounded-full border ${categoryFilter === 'bouquet' ? 'bg-rose-500 text-white' : 'text-sage-700 border-sage-300'}`}
            >
              Buket
            </button>
            <button
              onClick={() => setCategoryFilter('card')}
              className={`px-4 py-2 rounded-full border ${categoryFilter === 'card' ? 'bg-rose-500 text-white' : 'text-sage-700 border-sage-300'}`}
            >
              Kartu Ucapan
            </button>
            <button
              onClick={() => setCategoryFilter('miniature')}
              className={`px-4 py-2 rounded-full border ${categoryFilter === 'miniature' ? 'bg-rose-500 text-white' : 'text-sage-700 border-sage-300'}`}
            >
              Miniatur Boneka
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <p className="text-sage-600">
              Menampilkan {filteredProducts.length} dari {products.length} produk
            </p>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-sage-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-sage-700 mb-2">Produk tidak ditemukan</h3>
              <p className="text-sage-500">Coba sesuaikan kata kunci pencarian Anda</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}