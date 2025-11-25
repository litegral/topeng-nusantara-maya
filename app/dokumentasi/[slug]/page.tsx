"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Calendar, MapPin, Users, Eye, Play, Check } from "lucide-react";
import { videos } from "../page";

export default function DokumentasiDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.slug as string;
  const [copied, setCopied] = useState(false);

  const video = videos.find(v => v.id === Number(id));

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!video) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Video tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ChatbotWidget />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Button
            variant="ghost"
            onClick={() => router.push("/dokumentasi")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dokumentasi
          </Button>

          <div className="animate-fade-in space-y-6">
            {/* Video Player */}
            <Card className="overflow-hidden p-0">
              <div className="relative aspect-video">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </Card>

            {/* Video Info */}
            <Card>
              <CardContent className="p-8">
                <div className="mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {video.title}
                  </h1>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{video.views} tayangan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{video.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="default" className="gap-2" onClick={handleShare}>
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Tersalin!
                        </>
                      ) : (
                        <>
                          <Share2 className="h-4 w-4" />
                          Bagikan
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Lokasi</p>
                      <p className="font-semibold text-foreground">{video.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Penari</p>
                      <p className="font-semibold text-foreground">{video.dancers}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Play className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Durasi</p>
                      <p className="font-semibold text-foreground">{video.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Tentang Video Ini
                    </h3>
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                      {video.fullDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Kredit Produksi
                    </h3>
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                      {video.credits}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Videos */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Video Terkait
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {videos.filter(v => v.id !== video.id).map((relatedVideo) => (
                    <Card
                      key={relatedVideo.id}
                      className="cursor-pointer hover:shadow-elevated transition-all"
                      onClick={() => router.push(`/dokumentasi/${relatedVideo.id}`)}
                    >
                      <div className="flex gap-3 p-3">
                        <img
                          src={relatedVideo.thumbnail}
                          alt={relatedVideo.title}
                          className="w-32 h-20 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm line-clamp-2 mb-1">
                            {relatedVideo.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {relatedVideo.views} tayangan
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
