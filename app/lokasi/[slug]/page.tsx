"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Phone, Globe, Calendar, Clock, Ticket, Navigation, BookOpen, Scissors } from "lucide-react";
import { eventData as allEvents, eventData, sanggarData } from "@/data";
import "leaflet/dist/leaflet.css";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const LokasiDetail = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Parse slug to get type and id (format: sanggar-1 or event-1)
  const [type, idStr] = slug.split('-');
  const id = parseInt(idStr);

  const item = type === "sanggar"
    ? sanggarData.find(s => s.id === id)
    : eventData.find(e => e.id === id);

  // Setup Leaflet icons (only on client)
  useEffect(() => {
    if (typeof window !== "undefined" && !leafletLoaded) {
      import("leaflet").then((L) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        });
        setLeafletLoaded(true);
      });
    }
  }, [leafletLoaded]);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Data tidak ditemukan</p>
      </div>
    );
  }

  const isSanggar = type === "sanggar";
  const sanggar = isSanggar ? item : null;

  // Get events related to this sanggar location
  const relatedEvents = isSanggar
    ? allEvents.filter(event => event.location === (item as any).name)
    : [];

  // Get coordinates for map
  const coordinates = isSanggar && sanggar
    ? (sanggar as any).coordinates
    : null;

  // Function to open Google Maps directions
  const openDirections = () => {
    if (coordinates) {
      const [lat, lng] = coordinates;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ChatbotWidget />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => router.push("/lokasi")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Peta
          </Button>

          <div className="animate-fade-in space-y-6">
            {/* Map Section (for sanggar only) */}
            {isSanggar && coordinates && (
              <Card className="overflow-hidden p-0">
                <div className="h-[300px] relative">
                  {leafletLoaded && (
                    <MapContainer
                      center={coordinates as [number, number]}
                      zoom={15}
                      style={{ height: "100%", width: "100%" }}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={coordinates as [number, number]}>
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-bold text-sm mb-1">{(item as any).name}</h3>
                            <p className="text-xs text-muted-foreground">{(item as any).address}</p>
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  )}

                  {/* Directions Button Overlay */}
                  <div className="absolute bottom-4 right-4 z-1000">
                    <Button
                      onClick={openDirections}
                      className="shadow-lg"
                      size="sm"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Petunjuk Arah
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <Card>
              <CardContent className="p-8">
                <div className="mb-6">
                  <Badge variant="secondary" className="mb-3">
                    {isSanggar ? "Sanggar" : (item as any).eventType}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {isSanggar ? (item as any).name : (item as any).title}
                  </h1>
                  {isSanggar && (
                    <>
                      <p className="text-lg text-muted-foreground mb-4">
                        {(item as any).description}
                      </p>

                      {/* Service Status Badges */}
                      {(item as any).services && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          <h3 className="w-full text-sm font-semibold text-foreground mb-1">
                            Layanan Tersedia:
                          </h3>
                          {(item as any).services.tariCourse && (
                            <Badge variant="secondary" className="bg-terracotta/10 text-terracotta-dark border-terracotta/20 hover:bg-terracotta/20">
                              <BookOpen className="h-3 w-3 mr-1" />
                              Kursus Tari Topeng
                            </Badge>
                          )}
                          {(item as any).services.topengWorkshop && (
                            <Badge variant="secondary" className="bg-brown/10 text-brown border-brown/20 hover:bg-brown/20">
                              <Scissors className="h-3 w-3 mr-1" />
                              Workshop Membuat Topeng
                            </Badge>
                          )}
                          {(item as any).services.performances && (
                            <Badge variant="secondary" className="bg-gold/10 text-brown border-gold/20 hover:bg-gold/20">
                              <Calendar className="h-3 w-3 mr-1" />
                              Pertunjukan Reguler
                            </Badge>
                          )}
                          {(item as any).services.privateLesson && (
                            <Badge variant="secondary" className="bg-terracotta-dark/10 text-terracotta-dark border-terracotta-dark/20 hover:bg-terracotta-dark/20">
                              <BookOpen className="h-3 w-3 mr-1" />
                              Les Privat
                            </Badge>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Contact Info Grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Alamat</p>
                      <p className="font-semibold text-foreground">{(item as any).address}</p>
                      {!isSanggar && (
                        <p className="text-sm text-muted-foreground">{(item as any).location}</p>
                      )}
                    </div>
                  </div>

                  {isSanggar ? (
                    <>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Telepon</p>
                          <p className="font-semibold text-foreground">{(item as any).phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Jam Operasional</p>
                          <p className="font-semibold text-foreground">{(item as any).openTime}</p>
                        </div>
                      </div>
                      {/* <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-1">{(item as any).specialty}</Badge>
                      </div> */}
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Tanggal & Waktu</p>
                          <p className="font-semibold text-foreground">{(item as any).date}</p>
                          <p className="text-sm text-muted-foreground">{(item as any).time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Kontak</p>
                          <p className="font-semibold text-foreground">{(item as any).contact}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {isSanggar ? "Tentang Sanggar" : "Tentang Acara"}
                    </h3>
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                      {(item as any).fullDescription}
                    </p>
                  </div>

                  {(item as any).facilities && (
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        Fasilitas
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(item as any).facilities.split(',').map((facility: string, index: number) => {
                          const trimmedFacility = facility.trim();
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-4 rounded-lg bg-linear-to-br from-terracotta/5 to-gold/5 border border-terracotta/10 hover:border-terracotta/30 hover:from-terracotta/10 hover:to-gold/10 transition-all duration-300 hover:shadow-soft group"
                            >
                              <div className="shrink-0 w-2 h-2 rounded-full bg-terracotta group-hover:scale-150 transition-transform duration-300" />
                              <span className="text-foreground/90 text-sm font-medium leading-relaxed">
                                {trimmedFacility}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {!isSanggar && (
                    <>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-4">
                          Informasi Tiket
                        </h3>

                        {/* Ticket Types Display */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                          {(item as any).ticketTypes.map((ticketType: any, index: number) => (
                            <div
                              key={index}
                              className="p-4 rounded-lg bg-linear-to-br from-terracotta/5 to-gold/5 border border-terracotta/20 hover:border-terracotta/40 transition-all duration-300 hover:shadow-soft"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold text-foreground mb-1">{ticketType.name}</h4>
                                  <p className="text-xs text-muted-foreground">Per orang</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-terracotta">
                                    {ticketType.price === 0 ? 'GRATIS' : new Intl.NumberFormat('id-ID', {
                                      style: 'currency',
                                      currency: 'IDR',
                                      minimumFractionDigits: 0,
                                    }).format(ticketType.price)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Registration Section */}
                      <div className="mt-6 p-6 bg-gradient-to-r from-terracotta/10 to-brown/10 rounded-lg border border-terracotta/20">
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          Pendaftaran
                        </h3>
                        {(item as any).ticketPrice === 0 ? (
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary" className="text-lg py-1 px-4 bg-gold/20 text-brown border-gold/30">
                                GRATIS
                              </Badge>
                              <p className="text-muted-foreground">Acara ini gratis dan terbuka untuk umum</p>
                            </div>
                            {(item as any).registrationUrl ? (
                              <Button
                                onClick={() => window.open((item as any).registrationUrl, '_blank')}
                                className="w-full md:w-auto bg-gradient-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
                                size="lg"
                              >
                                <Ticket className="h-5 w-5 mr-2" />
                                Daftar Sekarang
                              </Button>
                            ) : (
                              <p className="text-sm text-muted-foreground italic">
                                Tidak memerlukan pendaftaran - Datang langsung ke lokasi
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary" className="text-lg py-1 px-4 bg-terracotta/20 text-terracotta border-terracotta/30">
                                Berbayar
                              </Badge>
                              <p className="text-muted-foreground">Lihat detail harga di atas</p>
                            </div>
                            {(item as any).registrationUrl && (
                              <Button
                                onClick={() => window.open((item as any).registrationUrl, '_blank')}
                                className="w-full md:w-auto bg-gradient-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
                                size="lg"
                              >
                                <Ticket className="h-5 w-5 mr-2" />
                                Daftar Sekarang
                              </Button>
                            )}
                            <p className="text-sm text-muted-foreground">
                              Klik tombol di atas untuk melakukan pendaftaran dan pembayaran tiket
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Social Media & Website */}
                {isSanggar && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex flex-wrap gap-3">
                      {(item as any).website !== "-" && (
                        <Button variant="outline" className="gap-2">
                          <Globe className="h-4 w-4" />
                          {(item as any).website}
                        </Button>
                      )}
                      <Button variant="outline" className="gap-2">
                        <Globe className="h-4 w-4" />
                        {(item as any).social}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Related Events (for sanggar) */}
            {isSanggar && relatedEvents.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Acara di Lokasi Ini
                  </h3>
                  <div className="grid gap-4">
                    {relatedEvents.map((event) => (
                      <Link key={event.id} href={`/agenda/event-${event.id}`}>
                        <Card className="hover:shadow-lg transition-all cursor-pointer border-terracotta/20">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {event.eventType}
                                  </Badge>
                                  {event.ticketPrice === 0 && (
                                    <Badge className="text-xs bg-green-500/20 text-green-700 border-green-500/30">
                                      GRATIS
                                    </Badge>
                                  )}
                                </div>
                                <h4 className="font-semibold text-foreground mb-2 line-clamp-1">
                                  {event.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                  {event.description}
                                </p>
                                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-3 w-3" />
                                    <span>{event.date}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3" />
                                    <span>{event.time}</span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                className="bg-linear-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream shrink-0"
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.location.href = `/agenda/event-${event.id}`;
                                }}
                              >
                                <Ticket className="h-4 w-4 mr-1" />
                                Detail
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LokasiDetail;
