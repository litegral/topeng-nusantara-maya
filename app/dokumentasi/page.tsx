"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Calendar, MapPin, Eye } from "lucide-react";
import Image from "next/image";

const videos = [
  { id: 1, title: "Pertunjukan Panji Asmarabangun", date: "15 Agustus 2024", location: "Pendopo Kabupaten Malang", duration: "18:30", thumbnail: "https://s3.us-east-1.wasabisys.com/agendaindonesia/2020/08/Topeng-Malang-shutterstock.jpg", description: "Pertunjukan lengkap lakon Panji dengan kostum tradisional", views: "2.4K" },
  { id: 2, title: "Workshop Tari Topeng untuk Pemula", date: "20 Juli 2024", location: "Sanggar Sido Mukti", duration: "25:15", thumbnail: "https://i.ytimg.com/vi/6t0QhyyB4vg/maxresdefault.jpg", description: "Dokumentasi workshop mengajarkan gerakan dasar tari topeng", views: "1.8K" },
  { id: 3, title: "Festival Topeng Malangan 2024", date: "10 Juni 2024", location: "Alun-alun Kota Malang", duration: "45:00", thumbnail: "https://cdn.antaranews.com/cache/1200x800/2013/04/20130429topeng1.jpg", description: "Kompilasi penampilan dari berbagai sanggar", views: "5.2K" }
];

const photos = [
  { id: 1, title: "Keanggunan Topeng Panji di Atas Panggung", photographer: "Muhammad Dzaka Aufa Fadhillah", image: "https://storage.litegral.com/maltopia/DSC_2369-min.JPG" },
  { id: 2, title: "Detil Ukiran dan Warna Topeng Tradisional", photographer: "Muhammad Dzaka Aufa Fadhillah", image: "https://storage.litegral.com/maltopia/DSC_2416-min.JPG" },
  { id: 3, title: "Momen Sakral Pertunjukan Topeng Malangan", photographer: "Muhammad Dzaka Aufa Fadhillah", image: "https://storage.litegral.com/maltopia/DSC_2553-min.JPG" },
  { id: 4, title: "Gerakan Klasik Tari Topeng Gunungsari", photographer: "Muhammad Dzaka Aufa Fadhillah", image: "https://storage.litegral.com/maltopia/DSC_2681-min.JPG" },
  { id: 5, title: "Koleksi Topeng Warisan Budaya Malang", photographer: "Muhammad Dzaka Aufa Fadhillah", image: "https://storage.litegral.com/maltopia/DSC_2958-min.JPG" }
];

export default function DokumentasiPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ChatbotWidget />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Dokumentasi Tari Topeng Malangan</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Koleksi video pertunjukan dan galeri foto</p>
          </div>
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="videos">Video Pertunjukan</TabsTrigger>
              <TabsTrigger value="photos">Galeri Foto</TabsTrigger>
            </TabsList>
            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-elevated transition-all cursor-pointer group p-0 gap-0" onClick={() => router.push(`/dokumentasi/${video.id}`)}>
                    <div className="relative aspect-video bg-muted">
                      <Image src={video.thumbnail} alt={video.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center"><Play className="h-8 w-8 text-primary-foreground" /></div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">{video.duration}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground"><Eye className="h-3 w-3" /><span>{video.views} tayangan</span></div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="h-3 w-3" /><span>{video.date}</span></div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /><span className="line-clamp-1">{video.location}</span></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="photos">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden hover:shadow-elevated transition-all cursor-pointer group p-0 gap-0">
                    <div className="aspect-square bg-muted relative">
                      <Image src={photo.image} alt={photo.title} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h4 className="text-sm font-bold text-white line-clamp-2">{photo.title}</h4>
                          <p className="text-xs text-white/80">{photo.photographer}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}