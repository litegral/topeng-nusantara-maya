import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface Chapter {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
}

interface ShortStoryProps {
    story: {
        id: number;
        title: string;
        character: string;
        narrator: string;
        sanggar: string;
        description: string;
        chapters: Chapter[];
    };
    onReadFullStory: () => void;
}

export default function ShortStory({ story, onReadFullStory }: ShortStoryProps) {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Story Header */}
            <div className="mb-12 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    {story.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    {story.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary" className="text-sm">
                        {story.character}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                        {story.narrator}
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{story.sanggar}</p>
            </div>

            {/* Chapters */}
            <div className="space-y-16">
                {story.chapters.map((chapter, index) => (
                    <article key={chapter.id} className="space-y-6">
                        {/* Chapter Header */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-terracotta">
                                    Bab {index + 1}
                                </span>
                                <div className="h-px flex-1 bg-linear-to-r from-terracotta/50 to-transparent" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                {chapter.title}
                            </h2>
                        </div>

                        {/* Chapter Image */}
                        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
                            <Image
                                src={chapter.imageUrl}
                                alt={chapter.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 896px"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                        </div>

                        {/* Chapter Content */}
                        <div className="prose prose-lg max-w-none">
                            <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                                {chapter.content}
                            </p>
                        </div>
                    </article>
                ))}
            </div>

            {/* Call to Action - Read Full Story */}
            <div className="mt-16 p-8 rounded-lg bg-linear-to-br from-terracotta/10 to-brown/5 border border-terracotta/20 text-center space-y-4">
                <div className="text-4xl">📖</div>
                <h3 className="text-2xl font-bold text-foreground">
                    Ingin Pengalaman Membaca yang Lebih Menarik?
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Baca cerita lengkap dalam format buku interaktif dengan halaman yang dapat dibalik,
                    dilengkapi dengan narasi audio dari {story.narrator}.
                </p>
                <Button
                    onClick={onReadFullStory}
                    size="lg"
                    className="bg-linear-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
                >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Baca Versi Buku Lengkap
                </Button>
            </div>
        </div>
    );
}
