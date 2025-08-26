import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, Phone, User, MessageSquare, Plus, ShoppingCart } from 'lucide-react';

export default function Checkout() {
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: '',
    notes: ''
  });

  useEffect(() => {
    // Debug: Lihat apa yang ada di localStorage
    console.log('localStorage selectedProduct:', localStorage.getItem('selectedProduct'));
    console.log('localStorage selectedProducts:', localStorage.getItem('selectedProducts'));
    
    let products = [];
    
    // Prioritas 1: Cek selectedProducts (untuk multiple products)
    const existingProducts = localStorage.getItem('selectedProducts');
    if (existingProducts) {
      try {
        products = JSON.parse(existingProducts);
      } catch (e) {
        console.error('Error parsing selectedProducts:', e);
      }
    }
    
    // Prioritas 2: Cek selectedProduct (untuk single product atau produk baru)
    const newProduct = localStorage.getItem('selectedProduct');
    if (newProduct) {
      try {
        const productData = JSON.parse(newProduct);
        
        // Jika belum ada products, buat array baru
        if (products.length === 0) {
          products = [productData];
        } else {
          // Tambahkan ke products yang sudah ada (jika belum ada)
          const existingIndex = products.findIndex(p => 
            p.id === productData.id || JSON.stringify(p) === JSON.stringify(productData)
          );
          
          if (existingIndex === -1) {
            products.push(productData);
          }
        }
      } catch (e) {
        console.error('Error parsing selectedProduct:', e);
      }
    }
    
    console.log('Final products:', products);
    setSelectedProducts(products);
    
    // Simpan ke selectedProducts untuk persistence
    if (products.length > 0) {
      localStorage.setItem('selectedProducts', JSON.stringify(products));
    }
    
    // Restore form data jika ada
    const tempFormData = localStorage.getItem('tempFormData');
    if (tempFormData) {
      try {
        setFormData(JSON.parse(tempFormData));
        localStorage.removeItem('tempFormData');
      } catch (e) {
        console.error('Error parsing tempFormData:', e);
      }
    }
  }, []);

  const paymentMethods = [
    { id: 'cod', name: 'Bayar di Tempat (COD)', icon: '💵' },
    { id: 'bank', name: 'Transfer Bank', icon: '🏦' },
    { id: 'ewallet', name: 'E-Wallet (GoPay, OVO, DANA)', icon: '📱' }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTotalPrice = () => {
    return selectedProducts.reduce((total, product) => {
      return total + (product.price || product.total || 0);
    }, 0);
  };

  const generateOrderId = () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${dateStr}-${randomNum}`;
  };

  const handleAddProduct = () => {
    // Simpan data form sementara
    localStorage.setItem('tempFormData', JSON.stringify(formData));
    // Simpan produk yang sudah dipilih
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    // Beri flag bahwa kita sedang dalam proses tambah produk
    localStorage.setItem('addingProduct', 'true');
    // Arahkan ke halaman produk
    window.location.href = '/products';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedProducts.length === 0 || !formData.name || !formData.address || !formData.phone || !formData.paymentMethod) {
      alert('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    const orderId = generateOrderId();
    
    const order = {
      id: orderId,
      products: selectedProducts,
      customer: formData,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Buat pesan WhatsApp
    let productList = '';
    selectedProducts.forEach((product, index) => {
      const productName = product.type === 'custom' ? 'Buket Custom' : product.name;
      const price = product.price || product.total;
      
      productList += `\n${index + 1}. ${productName} - ${formatPrice(price)}`;
      
      if (product.type === 'custom' && product.flowers) {
        const flowerList = Object.entries(product.flowers)
          .filter(([_, quantity]) => quantity > 0)
          .map(([type, quantity]) => `${type}: ${quantity}`)
          .join(', ');
        if (flowerList) productList += `\n   Bunga: ${flowerList}`;
        if (product.color) productList += `\n   Warna: ${product.color}`;
        if (product.wrapper) productList += `\n   Pembungkus: ${product.wrapper}`;
        if (product.message) productList += `\n   Pesan: "${product.message}"`;
      }
    });

    const totalPrice = getTotalPrice();
    const message = `Halo "BUKETQ.PLG", saya ingin memesan buket bunga 🌸

ID Pesanan: ${orderId}
Jumlah Item: ${selectedProducts.length} produk

=== DETAIL PESANAN ===${productList}

TOTAL: ${formatPrice(totalPrice)}

=== DATA PELANGGAN ===
Nama: ${formData.name}
Alamat: ${formData.address}
No HP: ${formData.phone}
Metode Pembayaran: ${paymentMethods.find(p => p.id === formData.paymentMethod)?.name}${formData.notes ? `\nCatatan: ${formData.notes}` : ''}

Terima kasih! 🙏`;

    const phoneNumber = '+6289625451850'; 
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    localStorage.removeItem('selectedProduct');
    localStorage.removeItem('selectedProducts');
    localStorage.removeItem('tempFormData');
    localStorage.removeItem('addingProduct');
    window.open(whatsappURL, '_blank');
    alert(`Pesanan ${orderId} telah dibuat! Mengarahkan ke WhatsApp...`);
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const removeProduct = (index: number) => {
    const updatedProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedProducts);
    localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
  };

  if (selectedProducts.length === 0) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-sage-800 mb-4">Tidak Ada Produk yang Dipilih</h2>
          <p className="text-sage-600 mb-8">Silakan pilih produk terlebih dahulu</p>
          <a
            href="/products"
            className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition-colors"
          >
            Jelajahi Produk
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-floral-50 to-peach-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-display font-bold text-sage-800 text-center mb-12"
        >
          Selesaikan Pesanan Anda
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-lg space-y-6"
            >
              {/* Customer Information */}
              <div>
                <h2 className="text-2xl font-semibold text-sage-800 mb-6 flex items-center">
                  <User className="w-6 h-6 text-rose-500 mr-3" />
                  Informasi Pelanggan
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-sage-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">
                      Nomor Telepon *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-sage-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="contoh: +62812345678"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    Alamat Pengiriman *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full p-3 border border-sage-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                    placeholder="Masukkan alamat pengiriman lengkap"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-2xl font-semibold text-sage-800 mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 text-rose-500 mr-3" />
                  Metode Pembayaran
                </h2>

                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-sage-200 hover:border-sage-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <span className="font-medium text-sage-800">{method.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <h2 className="text-2xl font-semibold text-sage-800 mb-6 flex items-center">
                  <MessageSquare className="w-6 h-6 text-rose-500 mr-3" />
                  Request Produk
                </h2>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border border-sage-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                  placeholder="Contohnya: 'Buat buket custom dengan bunga mawar merah, warna pink, dan pembungkus kertas kraft.'"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-rose-600 transition-colors"
              >
                Pesan via WhatsApp
              </button>
            </motion.form>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg h-fit sticky top-24"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-sage-800">Ringkasan Pesanan</h2>
              <div className="flex items-center text-sm text-sage-600">
                <ShoppingCart className="w-4 h-4 mr-1" />
                {selectedProducts.length} item
              </div>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto">
              {selectedProducts.map((product, index) => (
                <div key={index} className="border-b border-sage-100 pb-4 last:border-b-0">
                  {product.type === 'custom' ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-sage-800">Buket Custom</span>
                        <button
                          onClick={() => removeProduct(index)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                      
                      {product.flowers && (
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-sage-700">Bunga:</p>
                          {Object.entries(product.flowers).map(([type, quantity]) => {
                            if (quantity === 0) return null;
                            return (
                              <div key={type} className="flex justify-between text-xs text-sage-600">
                                <span>{type} x{quantity as number}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {product.color && (
                        <div className="text-xs text-sage-600">
                          <span className="font-medium">Warna:</span> {product.color}
                        </div>
                      )}

                      {product.wrapper && (
                        <div className="text-xs text-sage-600">
                          <span className="font-medium">Pembungkus:</span> {product.wrapper}
                        </div>
                      )}

                      {product.message && (
                        <div className="text-xs text-sage-600">
                          <span className="font-medium">Pesan:</span>
                          <p className="italic mt-1">"{product.message}"</p>
                        </div>
                      )}
                      
                      <div className="text-right font-semibold text-rose-500">
                        {formatPrice(product.price || product.total)}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-sage-800 text-sm">{product.name}</h3>
                            <p className="text-xs text-sage-600">{product.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeProduct(index)}
                          className="text-red-500 hover:text-red-700 text-xs ml-2"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="text-right font-semibold text-rose-500">
                        {formatPrice(product.price || product.total)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Product Button */}
            <button
              onClick={handleAddProduct}
              className="w-full mt-4 bg-sage-100 text-sage-700 py-3 rounded-lg text-sm font-medium hover:bg-sage-200 transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Pesanan
            </button>

            <div className="border-t border-sage-200 mt-6 pt-6">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Total:</span>
                <span className="text-rose-500">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700 text-center">
                📱 Setelah submit, Anda akan diarahkan ke WhatsApp untuk konfirmasi pesanan dengan admin kami
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}