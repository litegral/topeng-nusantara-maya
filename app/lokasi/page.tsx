"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Clock } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { sanggarData } from "@/data";

// Dynamically import map components to avoid SSR issues with Leaflet
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

const LokasiPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Filter sanggar based on search
  const filteredSanggar = sanggarData.filter(sanggar => {
    if (!searchQuery) return true;
    return (
      sanggar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sanggar.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sanggar.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Setup Leaflet icons (only on client)
  useEffect(() => {
    if (typeof window !== "undefined" && !leafletLoaded) {
      import("leaflet").then((L) => {
        // Fix Leaflet default marker icon issue
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ChatbotWidget />

      <main className="pt-30 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Lokasi Budaya
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Temukan sanggar Topeng Malangan terdekat di sekitar Anda
            </p>
          </div>

          {/* Map Section */}
          <Card className="overflow-hidden mb-8 animate-fade-in p-0">
            <div className="h-[400px] relative">
              {leafletLoaded && (
                <MapContainer
                  center={[-7.9666, 112.6326]}
                  zoom={12}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {/* Sanggar markers */}
                  {filteredSanggar.map((sanggar) => (
                    <Marker
                      key={`sanggar-${sanggar.id}`}
                      position={sanggar.coordinates}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-sm mb-1">{sanggar.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{sanggar.specialty}</p>
                          <p className="text-xs">{sanggar.location}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}

              {/* Legend overlay */}
              <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-3 rounded-lg border shadow-lg z-40">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500" />
                  <span className="text-xs text-foreground">Sanggar</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari sanggar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Sanggar List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSanggar.map((sanggar, index) => (
              <Link
                key={sanggar.id}
                href={`/lokasi/sanggar-${sanggar.id}`}
              >
                <Card
                  className="overflow-hidden hover:shadow-elevated transition-all cursor-pointer group animate-fade-in p-0"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="aspect-video bg-linear-to-br from-terracotta to-gold relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="h-16 w-16 text-cream/80" />
                    </div>
                    <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">
                      Sanggar
                    </Badge>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
                      {sanggar.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {sanggar.description}
                    </p>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="line-clamp-1">{sanggar.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="line-clamp-1">{sanggar.openTime}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {sanggar.specialty}
                    </Badge>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredSanggar.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tidak ada sanggar ditemukan</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LokasiPage;
