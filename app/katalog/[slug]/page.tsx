"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, Palette, Lightbulb, Book } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import ModelViewer from "@/components/ModelViewer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Data Definition
const topengData = [
    {
        id: 1,
        nama: "Panji Asmorobangun",
        karakter: "Ksatria muda yang bijaksana",
        warna: "Putih dan Emas",
        makna: "Kesucian dan kebijaksanaan",
        filosofi: "Melambangkan pemuda yang berbudi luhur dan penuh kasih sayang",
        imageUrl: "https://asset.museum-digital.org//media/800/id-jatim/images/201411/08083356075.jpg",
        modelPath: "/3D/panji_asmorobangun.glb",
        deskripsi: "Panji Asmorobangun adalah tokoh legenda dalam budaya Jawa yang melambangkan kesempurnaan karakter seorang pemuda. Ia digambarkan sebagai sosok yang tampan, berbudi luhur, dan memiliki kebijaksanaan yang tinggi.",
    },
    {
        id: 2,
        nama: "Prabu Klana",
        karakter: "Raja yang gagah berani",
        warna: "Merah dan Emas",
        makna: "Keberanian dan kekuatan",
        filosofi: "Simbol kepemimpinan yang tegas namun adil",
        imageUrl: "https://asset.museum-digital.org//media/800/id-jatim/images/201411/08091122046.jpg",
        modelPath: "/3D/klana.glb",
        deskripsi: "Prabu Klana adalah sosok raja yang gagah berani dan memiliki kekuatan luar biasa. Karakternya melambangkan kepemimpinan yang tegas namun tetap bijaksana dan adil dalam mengambil keputusan.",
    },
    {
        id: 3,
        nama: "Sekartaji",
        karakter: "Putri cantik yang anggun",
        warna: "Putih dan Pink",
        makna: "Kelembutan dan keanggunan",
        filosofi: "Melambangkan kesempurnaan feminin dalam budaya Jawa",
        imageUrl: "https://asset.museum-digital.org//media/800/id-jatim/images/201411/08081603159.jpg",
        modelPath: "/3D/sekartaji.glb",
        deskripsi: "Sekartaji atau Dewi Sekartaji adalah putri cantik jelita yang terkenal dalam cerita rakyat Jawa. Ia melambangkan kesempurnaan kecantikan dan keanggunan seorang wanita Jawa yang lembut namun tegar.",
    },
];

export default function TopengDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const topeng = topengData.find((t) => t.id === parseInt(slug));

    if (!topeng) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <ChatbotWidget />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Back Button */}
                    <Link href="/katalog">
                        <Button variant="ghost" className="mb-6">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Katalog
                        </Button>
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* 3D Viewer Section */}
                        <div className="animate-fade-in">
                            <div className="aspect-square w-full rounded-lg border border-border bg-background overflow-hidden">
                                <ModelViewer
                                    modelPath={topeng.modelPath}
                                    autoRotateSpeed={0.5}
                                    cameraPosition={[0, 0, 2.2]}
                                />
                            </div>
                            <p className="text-sm text-muted-foreground text-center mt-4">
                                💡 Geser untuk memutar, scroll untuk zoom
                            </p>
                        </div>

                        {/* Info Section */}
                        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                            <div className="space-y-6">
                                {/* Header */}
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                                        {topeng.nama}
                                    </h1>
                                    <p className="text-xl text-muted-foreground">
                                        {topeng.karakter}
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="prose prose-neutral dark:prose-invert">
                                    <p className="text-foreground leading-relaxed">
                                        {topeng.deskripsi}
                                    </p>
                                </div>

                                {/* Info Cards */}
                                <div className="space-y-4">
                                    {/* Warna */}
                                    <div className="p-4 rounded-lg border border-border bg-card">
                                        <div className="flex items-start gap-3">
                                            <Palette className="h-5 w-5 text-primary mt-1" />
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-1">
                                                    Warna Dominan
                                                </h3>
                                                <p className="text-muted-foreground">{topeng.warna}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Makna */}
                                    <div className="p-4 rounded-lg border border-border bg-card">
                                        <div className="flex items-start gap-3">
                                            <Lightbulb className="h-5 w-5 text-primary mt-1" />
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-1">
                                                    Makna Simbolis
                                                </h3>
                                                <p className="text-muted-foreground">{topeng.makna}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Filosofi */}
                                    <div className="p-4 rounded-lg border border-border bg-card">
                                        <div className="flex items-start gap-3">
                                            <Book className="h-5 w-5 text-primary mt-1" />
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-1">
                                                    Filosofi
                                                </h3>
                                                <p className="text-muted-foreground">{topeng.filosofi}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Badge */}
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">Topeng Malangan</Badge>
                                    <Badge variant="secondary">Budaya Jawa</Badge>
                                    <Badge variant="secondary">Tradisional</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
