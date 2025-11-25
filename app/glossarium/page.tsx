"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen } from "lucide-react";
import { glossaryTerms } from "@/data";

export default function GlossariumPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

    const categories = Array.from(new Set(glossaryTerms.map(term => term.category)));

    // Get all unique first letters from terms
    const availableLetters = Array.from(new Set(
        glossaryTerms.map(term => term.term.charAt(0).toUpperCase())
    )).sort();

    const filteredTerms = glossaryTerms.filter((term) => {
        const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            term.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || term.category === selectedCategory;
        const matchesLetter = !selectedLetter || term.term.charAt(0).toUpperCase() === selectedLetter;
        return matchesSearch && matchesCategory && matchesLetter;
    });

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <ChatbotWidget />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12 animate-fade-in">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <BookOpen className="h-10 w-10 text-primary" />
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Glossarium</h1>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Kamus istilah dan penjelasan lengkap tentang Topeng Malangan
                        </p>
                    </div>

                    <div className="mb-8 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <Input
                                type="text"
                                placeholder="Cari istilah atau definisi..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Filter berdasarkan kategori:</p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge
                                        variant={selectedCategory === null ? "default" : "outline"}
                                        className="cursor-pointer hover:bg-primary/90 transition-colors"
                                        onClick={() => setSelectedCategory(null)}
                                    >
                                        Semua
                                    </Badge>
                                    {categories.map((category) => (
                                        <Badge
                                            key={category}
                                            variant={selectedCategory === category ? "default" : "outline"}
                                            className="cursor-pointer hover:bg-primary/90 transition-colors"
                                            onClick={() => setSelectedCategory(category)}
                                        >
                                            {category}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Filter berdasarkan huruf:</p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge
                                        variant={selectedLetter === null ? "default" : "outline"}
                                        className="cursor-pointer hover:bg-primary/90 transition-colors"
                                        onClick={() => setSelectedLetter(null)}
                                    >
                                        Semua
                                    </Badge>
                                    {availableLetters.map((letter) => (
                                        <Badge
                                            key={letter}
                                            variant={selectedLetter === letter ? "default" : "outline"}
                                            className="cursor-pointer hover:bg-primary/90 transition-colors min-w-8 justify-center"
                                            onClick={() => setSelectedLetter(letter)}
                                        >
                                            {letter}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredTerms.length > 0 ? (
                            filteredTerms.map((term, index) => (
                                <Card key={index} className="hover:shadow-elevated transition-all">
                                    <CardHeader>
                                        <div className="flex items-start justify-between gap-4">
                                            <CardTitle className="text-2xl">{term.term}</CardTitle>
                                            <Badge variant="secondary">{term.category}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <p className="text-foreground leading-relaxed">
                                            {term.definition}
                                        </p>
                                        <div className="pt-2 border-t border-border">
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-semibold">Contoh penggunaan:</span> {term.usage}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Card className="text-center py-12">
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Tidak ada istilah yang ditemukan untuk pencarian "{searchTerm}"
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <div className="mt-12 text-center text-sm text-muted-foreground">
                        <p>Menampilkan {filteredTerms.length} dari {glossaryTerms.length} istilah</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
