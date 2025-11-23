import { ArrowRight, Book, Map, Music } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import localFont from 'next/font/local';

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

const Index = () => {
  const features = [
    {
      icon: Book,
      title: "Katalog Topeng",
      description: "Jelajahi koleksi digital topeng dengan cerita di baliknya",
      link: "/katalog",
    },
    {
      icon: Book,
      title: "Arsip Cerita",
      description: "Dengarkan narasi kisah-kisah tradisional Malang",
      link: "/arsip",
    },
    {
      icon: Music,
      title: "Dokumentasi Tari",
      description: "Saksikan rekaman pertunjukan Tari Topeng Malangan",
      link: "/dokumentasi",
    },
    {
      icon: Map,
      title: "Peta Sanggar",
      description: "Temukan lokasi sanggar dan acara budaya terdekat",
      link: "/peta",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
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

        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <h1 className={`text-5xl md:text-7xl font-bold text-cream mb-6 drop-shadow-lg ${cinzelDecorative.className}`}>
            Maltopia
          </h1>
          <p className="text-xl md:text-2xl text-cream/90 mb-8 max-w-3xl mx-auto">
            Arsip Digital Topeng Malangan <br />
            Melestarikan Warisan Seni Tradisional Malang
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gold hover:bg-gold/90 text-brown font-semibold shadow-lg"
          >
            <Link href="/katalog">
              Mulai Jelajahi <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Tentang Topeng Malangan
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Topeng Malangan adalah seni topeng khas dari Malang, Jawa Timur, yang merupakan
              bagian penting dari warisan budaya Indonesia. Setiap topeng memiliki karakter,
              warna, dan filosofi yang menceritakan nilai-nilai luhur masyarakat Jawa.
              Maltopia hadir sebagai platform digital untuk mendokumentasikan dan melestarikan
              keindahan seni ini untuk generasi mendatang.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Jelajahi Koleksi Kami
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-elevated transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-terracotta to-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8 text-cream" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={feature.link}>
                      Lihat Detail
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Narasumber & Kontributor
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Maltopia diperkaya oleh pengetahuan dan dedikasi dari para maestro dan
              akademisi budaya lokal
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Instansi Pendidikan
                  </h3>
                  <p className="text-muted-foreground">
                    Universitas Brawijaya, Universitas Negeri Malang
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Instansi Pemerintah
                  </h3>
                  <p className="text-muted-foreground">
                    Kementerian Kebudayaan Republik Indonesia
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Komunitas Budaya Lokal
                  </h3>
                  <p className="text-muted-foreground">
                    Para seniman dan peneliti budaya Malang
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Museum
                  </h3>
                  <p className="text-muted-foreground">
                    Museum Malang Tempo Doeloe, Museum Mpu Purwa, Museum Bentoel
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;