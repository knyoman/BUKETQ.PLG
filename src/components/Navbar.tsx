import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Produk', path: '/products' },
    { name: 'Testimoni', path: '/#testimoni' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Kontak', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/#testimoni') {
      return location.pathname === '/' && location.hash === '#testimoni';
    }
    return location.pathname === path;
  };
  

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="/LogoBUKETQPLG.jpg"
                alt="BUKETQ.PLG Logo"
                className="w-10 h-10 rounded-full shadow-md"
              />
            </motion.div>
            <span className="text-xl font-display font-semibold text-sage-800 group-hover:text-rose-500 transition-colors">
              BUKETQ.PLG
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-rose-500'
                    : 'text-sage-700 hover:text-rose-500'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rose-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link
              to="/checkout"
              className="flex items-center space-x-1 bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pesan</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-sage-700 hover:text-rose-500 hover:bg-sage-50 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-sage-100"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-rose-500 bg-rose-50'
                      : 'text-sage-700 hover:text-rose-500 hover:bg-sage-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/checkout"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-1 bg-rose-500 text-white px-3 py-2 rounded-md hover:bg-rose-600 transition-colors w-fit"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pesan Sekarang</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
