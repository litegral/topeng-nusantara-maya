"use client";

import { ArrowRight, Book, Map, Music, ChevronRight, Star, Users, Building2, Landmark, Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import localFont from 'next/font/local';
import { motion } from "framer-motion";
import { topengData } from "@/data/topeng";
import { stories } from "@/data/stories";
import { eventData } from "@/data/events";

// Font configuration
const cinzelDecorative = localFont({
  src: [
    {
      path: './fonts/CinzelDecorative-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/CinzelDecorative-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/CinzelDecorative-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-cinzel-decorative'
})

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Index = () => {
  const features = [
    {
      icon: Book,
      title: "Katalog Topeng",
      description: "Jelajahi koleksi digital topeng dengan visualisasi 3D",
      link: "/katalog",
    },
    {
      icon: Music,
      title: "Dokumentasi Tari",
      description: "Saksikan rekaman dan potret pertunjukan Tari Topeng Malangan",
      link: "/dokumentasi",
    },
    {
      icon: Book,
      title: "Arsip Cerita",
      description: "Dengarkan narasi kisah-kisah tradisional Malang",
      link: "/arsip",
    },
    {
      icon: Map,
      title: "Peta Lokasi Budaya",
      description: "Temukan lokasi sanggar dan tempat budaya terdekat",
      link: "/lokasi",
    },
  ];

  const contributors = [
    {
      title: "Instansi Pendidikan",
      items: ["Universitas Brawijaya", "Universitas Negeri Malang"],
      icon: Building2
    },
    {
      title: "Instansi Pemerintah",
      items: ["Kementerian Kebudayaan RI"],
      icon: Landmark
    },
    {
      title: "Komunitas Budaya",
      items: ["Seniman Malang", "Peneliti Budaya"],
      icon: Users
    },
    {
      title: "Museum Partner",
      items: ["Museum Malang Tempo Doeloe", "Museum Mpu Purwa"],
      icon: Star
    }
  ];

  // Get featured content
  const featuredStory = stories[0]; // Panji
  const upcomingEvents = eventData.slice(0, 3); // Top 3 events

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <ChatbotWidget />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://storage.litegral.com/maltopia/header.JPG"
            alt="Topeng Malangan Hero Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-brown/80 via-brown/60 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold text-cream mb-6 drop-shadow-2xl ${cinzelDecorative.className}`}>
              Maltopia
            </h1>
            <p className="text-xl md:text-2xl text-cream/90 mb-8 max-w-3xl mx-auto font-light tracking-wide">
              Arsip Digital Topeng Malangan <br />
              <span className="text-gold font-medium">Melestarikan Warisan Seni Tradisional</span>
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gold hover:bg-gold/90 text-brown font-bold text-lg px-8 py-6 rounded-full shadow-lg transition-all"
              >
                <Link href="/katalog">
                  Mulai Jelajahi <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream/60"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-current rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Featured Story Section (Moved Up) */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-linear-to-r from-brown to-terracotta-dark rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-cream">
                <div className="inline-block px-4 py-1 bg-gold/20 text-gold rounded-full text-sm font-bold mb-6 border border-gold/30">
                  FEATURED STORY
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-6">
                  {featuredStory.title}
                </h3>
                <p className="text-cream/80 text-lg mb-8 leading-relaxed">
                  {featuredStory.description}
                </p>
                <Button asChild className="bg-gold text-brown hover:bg-gold/90 font-bold rounded-full px-8">
                  <Link href={`/arsip/${featuredStory.id}`}>
                    Baca Selengkapnya
                  </Link>
                </Button>
              </div>
              <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl transform md:rotate-3 hover:rotate-0 transition-all duration-500">
                <Image
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section (Revised) */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Jelajahi Warisan Budaya
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Temukan kekayaan seni Topeng Malangan melalui berbagai media interaktif
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 bg-card border border-border"
              >
                <Link href={feature.link} className="block h-full p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-terracotta/10 text-terracotta rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                  <div className="flex items-center text-sm font-medium mt-6 text-terracotta opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Kunjungi Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Masks Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Koleksi Topeng
            </h2>
            <p className="text-muted-foreground">
              Kenali karakter-karakter ikonik dalam seni Topeng Malangan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topengData.slice(0, 3).map((topeng, index) => (
              <motion.div
                key={topeng.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={topeng.imageUrl}
                    alt={topeng.nama}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{topeng.nama}</h3>
                  <p className="text-sm text-terracotta font-medium mb-3">{topeng.karakter}</p>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {topeng.filosofi}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/katalog/${topeng.id}`}>
                      Lihat Detail
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="ghost" className="text-terracotta hover:text-terracotta-dark">
              <Link href="/katalog">
                Lihat Semua Koleksi <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Agenda Budaya
              </h2>
              <p className="text-muted-foreground">
                Jangan lewatkan pertunjukan dan acara budaya mendatang
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/agenda">
                Lihat Kalender Penuh
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-terracotta">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-terracotta font-bold mb-3">
                    <Calendar className="h-4 w-4" />
                    {event.date}
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-1">{event.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  </div>
                  <Button asChild size="sm" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <Link href="/agenda">
                      Info Tiket
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Kolaborasi & Kontribusi
            </h2>
            <p className="text-muted-foreground">
              Terima kasih kepada para pihak yang telah mendukung pelestarian budaya ini
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contributors.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border/50 text-center"
              >
                <div className="w-12 h-12 mx-auto bg-terracotta/10 text-terracotta rounded-full flex items-center justify-center mb-6">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((subItem, sIdx) => (
                    <li key={sIdx} className="text-sm text-muted-foreground">
                      {subItem}
                    </li>
                  ))}
                </ul>
              </motion.div>

            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-linear-to-br from-brown to-terracotta-dark rounded-[3rem] p-8 md:p-16 text-center text-cream shadow-2xl relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/batik-rambutan.png')] opacity-10" />
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-terracotta/30 rounded-full blur-[80px]" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10 max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Jadilah Bagian dari Sejarah
              </h2>
              <p className="text-lg md:text-xl text-cream/90 mb-12 leading-relaxed">
                Pelestarian budaya bukan hanya tugas satu pihak.
                Mari berkontribusi untuk menjaga nyala api Topeng Malangan tetap hidup.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {/* Contribution Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors"
                >
                  <div className="w-12 h-12 bg-gold/20 text-gold rounded-xl flex items-center justify-center mb-6">
                    <Book className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Punya Cerita?</h3>
                  <p className="text-cream/80 text-sm mb-6">
                    Anda memiliki referensi cerita rakyat, foto lama, atau dokumentasi sejarah?
                    Bantu kami melengkapi arsip digital ini.
                  </p>
                  <Button variant="secondary" className="w-full font-semibold">
                    Kirim Kontribusi
                  </Button>
                </motion.div>

                {/* Investment Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors"
                >
                  <div className="w-12 h-12 bg-terracotta/30 text-terracotta-light rounded-xl flex items-center justify-center mb-6">
                    <Star className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Dukung & Investasi</h3>
                  <p className="text-cream/80 text-sm mb-6">
                    Dukung pengembangan teknologi dan pemberdayaan sanggar.
                    Investasi Anda adalah nafas bagi pelestarian budaya.
                  </p>
                  <Button className="w-full bg-gold text-brown hover:bg-gold/90 font-bold">
                    Mulai Berinvestasi
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;