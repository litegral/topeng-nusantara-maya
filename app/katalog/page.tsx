"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Input } from "@/components/ui/input";

// Data Definition
const topengData = [
    {
        id: 1,
        nama: "Panji",
        karakter: "Ksatria muda yang bijaksana",
        warna: "Putih dan Emas",
        makna: "Kesucian dan kebijaksanaan",
        filosofi: "Melambangkan pemuda yang berbudi luhur dan penuh kasih sayang",
        imageUrl: "https://asset.museum-digital.org//media/800/id-jatim/images/201411/08083356075.jpg",
    },
    {
        id: 2,
        nama: "Prabu Klana",
        karakter: "Raja yang gagah berani",
        warna: "Merah dan Emas",
        makna: "Keberanian dan kekuatan",
        filosofi: "Simbol kepemimpinan yang tegas namun adil",
        imageUrl: "https://asset.museum-digital.org//media/800/id-jatim/images/201411/08091122046.jpg",
    },
    {
        id: 3,
        nama: "Gunungsari",
        karakter: "Raksasa yang kuat",
        warna: "Merah dan Hitam",
        makna: "Kekuatan dan ketegasan",
        filosofi: "Menggambarkan kekuatan yang harus dikendalikan dengan bijak",
        imageUrl: "https://asset.museum-digital.org//media/800/id-jatim/images/201411/08100328999.jpg",
    },
    {
        id: 5,
        nama: "Sekartaji",
        karakter: "Putri cantik yang anggun",
        warna: "Putih dan Pink",
        makna: "Kelembutan dan keanggunan",
        filosofi: "Melambangkan kesempurnaan feminin dalam budaya Jawa",
        imageUrl: "https://asset.museum-digital.org//media/800/id-jatim/images/201411/08081603159.jpg",
    },
    {
        id: 6,
        nama: "Panji Lembu Amiluhur",
        karakter: "Panglima yang setia",
        warna: "Hijau dan Emas",
        makna: "Kesetiaan dan dedikasi",
        filosofi: "Simbol pengabdian tanpa pamrih kepada kerajaan",
        imageUrl: "https://asset.museum-digital.org//media/800/id-jatim/images/201411/08085041826.jpg",
    },
];

export default function KatalogPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTopeng = topengData.filter(
        (topeng) =>
            topeng.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            topeng.karakter.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <ChatbotWidget />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Header Section */}
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Katalog Topeng Malangan
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Jelajahi koleksi digital topeng tradisional dengan cerita dan
                            filosofi di baliknya
                        </p>
                    </div>

                    {/* Search Section */}
                    <div className="max-w-xl mx-auto mb-12">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <Input
                                type="text"
                                placeholder="Cari berdasarkan nama atau karakter..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Grid Section */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredTopeng.map((topeng, index) => (
                            <div
                                key={topeng.id}
                                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer animate-fade-in"
                                style={{ animationDelay: `${index * 0.05}s` }}
                                onClick={() => router.push(`/katalog/${topeng.id}`)}
                            >
                                {/* Note: Using Next.js Image with `fill` — domain added in next.config.ts */}
                                <Image
                                    src={topeng.imageUrl}
                                    alt={topeng.nama}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-brown/90 via-brown/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-xl font-bold text-cream">
                                            {topeng.nama}
                                        </h3>
                                        <p className="text-sm text-cream/80 mt-1">
                                            {topeng.karakter}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}