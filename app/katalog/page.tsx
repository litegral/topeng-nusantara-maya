"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { topengData } from "@/data";

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

            <main className="pt-30 pb-16">
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
                                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer animate-fade-in bg-background border border-border"
                                style={{ animationDelay: `${index * 0.05}s` }}
                                onClick={() => router.push(`/katalog/${topeng.id}`)}
                            >
                                {/* Image */}
                                <Image
                                    src={topeng.imageUrl}
                                    alt={topeng.nama}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-xl font-bold text-white">
                                            {topeng.nama}
                                        </h3>
                                        <p className="text-sm text-white/80 mt-1">
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