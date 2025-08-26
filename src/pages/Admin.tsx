import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Users, MessageSquare, BarChart3, Eye, Download, Trash2 } from 'lucide-react';

// Mock data - dalam aplikasi nyata, ini akan datang dari database
const mockProducts = [
  { id: 1, name: 'Buket Mawar Romantis', price: 299000, stock: 15, sales: 45 },
  { id: 2, name: 'Koleksi Peony Premium', price: 459000, stock: 8, sales: 23 },
  { id: 3, name: 'Bunga Matahari Kebahagiaan', price: 199000, stock: 20, sales: 67 }
];

const mockTestimonials = [
  { id: 1, name: 'Sarah Putri', rating: 5, text: 'Buket yang sangat cantik!', status: 'approved' },
  { id: 2, name: 'Michael Wijaya', rating: 5, text: 'BUKETQ.PLG melebihi ekspektasi saya.', status: 'pending' },
  { id: 3, name: 'Emily Sari', rating: 5, text: 'Pelayanan luar biasa!', status: 'approved' }
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState(mockProducts);
  const [testimonials, setTestimonials] = useState(mockTestimonials);

  useEffect(() => {
    // Muat pesanan dari localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id:  'orders', name: 'Pesanan', icon: Package },
    { id: 'products', name: 'Produk', icon: Package },
    { id: 'testimonials', name: 'Testimoni', icon: MessageSquare },
  ];

  const totalRevenue = orders.reduce((sum, order) => {
    const price = order.product?.price || order.product?.total || 0;
    return sum + price;
  }, 0);

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Pesanan</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Pendapatan</p>
              <p className="text-2xl font-bold">{formatPrice(totalRevenue)}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Produk</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
            <Package className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-rose-100">Testimoni</p>
              <p className="text-2xl font-bold">{testimonials.length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-rose-200" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-sage-800 mb-4">Pesanan Terbaru</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-sage-50 rounded-lg">
                <div>
                  <p className="font-medium text-sage-800">{order.id}</p>
                  <p className="text-sm text-sage-600">{order.customer.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sage-800">
                    {formatPrice(order.product?.price || order.product?.total || 0)}
                  </p>
                  <p className="text-sm text-sage-600">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-sage-800 mb-4">Produk Terlaris</h3>
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-sage-50 rounded-lg">
                <div>
                  <p className="font-medium text-sage-800">{product.name}</p>
                  <p className="text-sm text-sage-600">Stok: {product.stock}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sage-800">{product.sales} terjual</p>
                  <p className="text-sm text-sage-600">{formatPrice(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-sage-200">
        <h3 className="text-lg font-semibold text-sage-800">Semua Pesanan</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-sage-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">ID Pesanan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Pelanggan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Produk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Jumlah</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-sage-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sage-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-sage-900">{order.customer.name}</div>
                    <div className="text-sm text-sage-500">{order.customer.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-900">
                  {order.product?.type === 'custom' ? 'Buket Custom' : order.product?.name || 'Tidak Diketahui'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-900">
                  {formatPrice(order.product?.price || order.product?.total || 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-500">
                  {formatDate(order.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-rose-600 hover:text-rose-900 mr-3">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-sage-600 hover:text-sage-900">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-sage-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-sage-800">Manajemen Produk</h3>
        <button className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors">
          Tambah Produk
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-sage-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Produk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Harga</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Stok</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Penjualan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-sage-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-sage-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-900">
                  {formatPrice(product.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-900">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-900">
                  {product.sales}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTestimonials = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-sage-200">
        <h3 className="text-lg font-semibold text-sage-800">Manajemen Testimoni</h3>
      </div>
      <div className="p-6 space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border border-sage-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-sage-800">{testimonial.name}</h4>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  testimonial.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {testimonial.status}
                </span>
                <button className="text-blue-600 hover:text-blue-900 text-sm">
                  {testimonial.status === 'approved' ? 'Sembunyikan' : 'Setujui'}
                </button>
                <button className="text-red-600 hover:text-red-900 text-sm">Hapus</button>
              </div>
            </div>
            <p className="text-sage-600 text-sm">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-floral-50 to-peach-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-display font-bold text-sage-800 mb-8"
        >
          Dashboard Admin
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-rose-500 text-white'
                        : 'text-sage-700 hover:bg-sage-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'orders' && renderOrders()}
              {activeTab === 'products' && renderProducts()}
              {activeTab === 'testimonials' && renderTestimonials()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}