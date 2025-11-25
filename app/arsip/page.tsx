"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen } from "lucide-react";
import Image from "next/image";
import { stories } from "@/data";

export default function ArsipPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const filteredStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()) || story.character.toLowerCase().includes(searchTerm.toLowerCase()) || story.sanggar.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <ChatbotWidget />
            <main className="pt-30 pb-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Arsip Cerita Topeng Malangan</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Dengarkan kisah-kisah legenda yang tersimpan dalam setiap topeng</p>
                        <div className="mt-6">
                            <Link href="/glossarium">
                                <Button variant="outline" className="gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    Buka Glossarium
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="max-w-xl mx-auto mb-12">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <Input type="text" placeholder="Cari berdasarkan judul, karakter, atau sanggar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStories.map((story) => (
                            <Card key={story.id} className="overflow-hidden hover:shadow-elevated transition-all cursor-pointer group p-0" onClick={() => router.push(`/arsip/${story.id}`)}>
                                <div className="relative w-full h-48 overflow-hidden">
                                    <Image src={story.image} alt={story.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover object-center group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">{story.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{story.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <Badge variant="secondary" className="text-xs">{story.character}</Badge>
                                        <Badge variant="outline" className="text-xs">{story.sanggar}</Badge>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}