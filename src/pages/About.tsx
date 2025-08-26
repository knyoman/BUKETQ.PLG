import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Users, Award, Flower } from 'lucide-react';

export default function About() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { icon: Heart, number: '100+', label: 'Pelanggan Bahagia' },
    { icon: Flower, number: '100+', label: 'Buket Tercipta' },
    { icon: Award, number: '2+', label: 'Tahun Pengalaman' },
    { icon: Users, number: '4+', label: 'Florist Ahli' }
  ];

  const team = [
    {
      name: 'Dwi Wulan Sari',
      role: 'CEO',
      image:'/Dwi.jpg',
      // description: 'lorem ipsum dolor sit amet aliqua.'
    },
    {
      name: 'Nyoman Kusuma',
      role: 'CTO',
      image: '/Nyoman.jpg',
    },    {
      name: 'Rustina Mesi Windari',
      role: 'CMO',
      image: '/Gustina.jpg',
    },    
    {
      name: 'Dewa Rizki Rahmat Julianto',
      role: 'CFO',
      image: '/Dewa.jpg',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 bg-gradient-to-r from-rose-100 to-peach-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-sage-800 mb-6">
              BUKETQ.PLG
            </h1>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
              Kami berdedikasi menciptakan momen indah melalui seni merangkai bunga. 
              Setiap buket menceritakan kisah, dan kami di sini untuk membantu Anda menceritakan kisah Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-display font-bold text-sage-800 mb-6">
                Tentang Kami
              </h2>
              <div className="space-y-4 text-sage-600 leading-relaxed">
                <p>
                BUKETQ.PLG adalah toko buket bunga terpercaya yang berada di Palembang, siap membantu Anda mengubah momen spesial menjadi kenangan yang tak terlupakan. Kami menyediakan berbagai pilihan buket bunga premium yang dirangkai dengan penuh cinta dan sentuhan artistik.
                </p>
                <p>
                Sejak berdiri pada tahun 2022, BUKETQ.PLG terus tumbuh menjadi pilihan utama pelanggan dalam memberikan hadiah bermakna. Dengan jaminan kualitas bunga segar dan pelayanan yang ramah.
                </p>
                <p>
                Kami percaya bahwa setiap momen layak dirayakan dengan keindahan. Komitmen kami adalah menghadirkan rangkaian bunga yang tak hanya indah dipandang, tetapi juga menyampaikan pesan emosional secara tulus. Hubungi kami sekarang untuk pemesanan, konsultasi desain, atau pertanyaan seputar pengiriman.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img 
                src="/HeroSection.png"
                alt="Toko bunga kami"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-rose-500 text-white p-6 rounded-xl">
                <p className="text-lg font-semibold">2+ Tahun</p>
                <p className="text-sm">Keunggulan</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-sage-100 to-floral-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl font-display font-bold text-sage-800 text-center mb-16"
          >
            Dampak Kami dalam Angka
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10 text-rose-500" />
                </div>
                <h3 className="text-3xl font-bold text-sage-800 mb-2">{stat.number}</h3>
                <p className="text-sage-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-sage-800 mb-4">
              Kenali Tim Ahli Kami
            </h2>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              Florist berbakat kami membawa pengalaman bertahun-tahun dan passion ke setiap rangkaian
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-48 h-48 rounded-full object-cover mx-auto shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-sage-800 mb-2">{member.name}</h3>
                <p className="text-rose-500 font-medium mb-3">{member.role}</p>
                <p className="text-sage-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-peach-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <h2 className="text-4xl font-display font-bold mb-6">
              Misi Kami
            </h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              Menyebarkan kegembiraan, cinta, dan keindahan melalui rangkaian bunga luar biasa yang menciptakan 
              kenangan abadi dan koneksi bermakna. Kami percaya setiap bunga memiliki cerita untuk diceritakan, 
              dan kami merasa terhormat menjadi bagian dari cerita Anda.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}