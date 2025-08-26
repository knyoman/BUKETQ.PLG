import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  video?: string;
  image: string;
  label?: string;
  description: string;
  rating?: number;
  link?: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleOrderClick = () => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    navigate('/checkout');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
      >
        <div className="relative">
          {product.video ? (
            <video
              controls
              onClick={() => setShowModal(true)}
              className="w-full h-64 object-cover rounded-t-2xl cursor-pointer"
            >
              <source src={product.video} type="video/mp4" />
              Browser Anda tidak mendukung video.
            </video>
          ) : (
            <img 
              onClick={() => setShowModal(true)}
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 cursor-zoom-in"
            />
          )}

          {product.label && (
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                product.label === 'Terlaris' ? 'bg-rose-500 text-white' :
                product.label === 'Desain Premium' ? 'bg-purple-500 text-white' :
                'bg-green-500 text-white'
              }`}>
                {product.label}
              </span>
            </div>
          )}
          <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
            <Heart className="w-5 h-5 text-sage-600 hover:text-rose-500" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-sage-800 mb-2 group-hover:text-rose-500 transition-colors">
            {product.name}
          </h3>
          <p className="text-sage-600 text-sm mb-3 line-clamp-2">{product.description}</p>

          {product.rating && (
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-sage-600 ml-2">({product.rating})</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-sage-800">
              {formatPrice(product.price)}
            </span>

            <div className="flex space-x-2">
              {/* Tombol Preview khusus untuk kategori 'card' */}
              {product.category === 'card' && product.link && (
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sage-200 text-sage-800 px-3 py-2 rounded-full text-sm hover:bg-sage-300 transition-colors"
                >
                  Preview
                </a>
              )}

              <motion.button
                onClick={handleOrderClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition-colors flex items-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Pesan</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-white hover:text-rose-500 text-3xl z-10"
            >
              &times;
            </button>

            {product.video ? (
              <video
                src={product.video}
                controls
                autoPlay
                className="w-full max-h-[90vh] rounded-2xl"
              />
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-h-[90vh] object-contain rounded-2xl"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
