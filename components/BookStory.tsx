"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, ArrowLeft } from "lucide-react";
import HTMLFlipBook from "react-pageflip";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";

interface BookStoryProps {
    story: {
        id: number;
        title: string;
        character: string;
        narrator: string;
        sanggar: string;
        duration: string;
        description: string;
        fullStory: string;
        image: string;
        audioUrl?: string;
    };
    onBackToShort: () => void;
}

export default function BookStory({ story, onBackToShort }: BookStoryProps) {
    const bookRef = useRef<any>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (value: number[]) => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = value[0];
        setCurrentTime(value[0]);
    };

    const handleVolumeChange = (value: number[]) => {
        const audio = audioRef.current;
        if (!audio) return;

        const newVolume = value[0];
        audio.volume = newVolume;
        setVolume(newVolume);
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Split story into paragraphs for pages
    const paragraphs = story.fullStory.split('\n\n').filter(p => p.trim());
    const pages: Array<{ type: string; content: any }> = [];

    // Cover page
    pages.push({
        type: 'cover',
        content: story
    });

    // Info page
    pages.push({
        type: 'info',
        content: story
    });

    // Story pages (2-3 paragraphs per page)
    for (let i = 0; i < paragraphs.length; i += 2) {
        pages.push({
            type: 'story',
            content: paragraphs.slice(i, i + 2).join('\n\n')
        });
    }

    // End page
    pages.push({
        type: 'end',
        content: story
    });

    const nextPage = () => {
        if (bookRef.current) {
            bookRef.current.pageFlip().flipNext();
        }
    };

    const prevPage = () => {
        if (bookRef.current) {
            bookRef.current.pageFlip().flipPrev();
        }
    };

    const onFlip = (e: any) => {
        if (bookRef.current) {
            const pageFlip = bookRef.current.pageFlip();
            const currentPageIndex = pageFlip.getCurrentPageIndex();
            setCurrentPage(currentPageIndex);
        } else {
            setCurrentPage(e.data);
        }
    };

    return (
        <div className="space-y-8">
            {/* Back Button */}
            <Button
                variant="ghost"
                onClick={onBackToShort}
                className="mb-4"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Versi Singkat
            </Button>

            {/* Book Container */}
            <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
                <div
                    className="relative w-full max-w-6xl transition-transform duration-500 ease-out"
                    style={{
                        perspective: '2500px',
                        transform: isDesktop
                            ? currentPage === 0
                                ? 'translateX(-25%)'
                                : currentPage === pages.length - 1
                                    ? 'translateX(25%)'
                                    : 'translateX(0)'
                            : 'translateX(0)'
                    }}
                >
                    <div className="relative">
                        {currentPage !== 0 && currentPage !== pages.length - 1 && (
                            <>
                                <div className="absolute inset-0 bg-black/20 blur-3xl scale-95 rounded-lg" />
                                <div className="absolute inset-0 bg-black/10 blur-2xl scale-98 rounded-lg" />
                            </>
                        )}

                        {/* @ts-ignore */}
                        <HTMLFlipBook
                            ref={bookRef}
                            width={450}
                            height={550}
                            size="stretch"
                            minWidth={280}
                            maxWidth={500}
                            minHeight={400}
                            maxHeight={550}
                            showCover={true}
                            mobileScrollSupport={true}
                            onFlip={onFlip}
                            className="relative mx-auto drop-shadow-2xl"
                            useMouseEvents={true}
                            swipeDistance={50}
                            clickEventForward={true}
                            drawShadow={true}
                        >
                            {pages.map((page, index) => (
                                <div key={index} className="page bg-cream border-r border-brown/20">
                                    {page.type === 'cover' && (
                                        <div className="h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-linear-to-br from-terracotta to-brown text-cream">
                                            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 mb-4 md:mb-6 rounded-lg overflow-hidden shadow-xl relative">
                                                <Image
                                                    src={page.content.image}
                                                    alt={page.content.title}
                                                    fill
                                                    sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 224px"
                                                    className="object-contain bg-cream/10"
                                                />
                                            </div>
                                            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-3 md:mb-4 px-2">
                                                {page.content.title}
                                            </h1>
                                            <div className="flex gap-2 mb-2 md:mb-3">
                                                <Badge variant="secondary" className="bg-cream/20 text-cream border-cream/30 text-xs md:text-sm">
                                                    {page.content.character}
                                                </Badge>
                                            </div>
                                            <p className="text-xs sm:text-sm md:text-base text-center text-cream/80 px-2">
                                                {page.content.sanggar}
                                            </p>
                                            <div className="mt-4 md:mt-8 text-xs text-cream/60">
                                                Klik atau geser untuk membuka
                                            </div>
                                        </div>
                                    )}

                                    {page.type === 'info' && (
                                        <div className="h-full flex flex-col p-4 sm:p-6 md:p-10">
                                            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">Tentang Cerita</h2>
                                            <p className="text-xs sm:text-sm md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                                                {page.content.description}
                                            </p>

                                            <div className="space-y-2 md:space-y-4 mb-4 md:mb-6">
                                                <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
                                                    <span className="text-muted-foreground">Karakter:</span>
                                                    <Badge variant="secondary" className="text-xs md:text-sm">{page.content.character}</Badge>
                                                </div>
                                                <div className="flex items-start gap-2 text-xs sm:text-sm md:text-base">
                                                    <span className="text-muted-foreground">Sanggar:</span>
                                                    <span className="font-medium text-foreground">{page.content.sanggar}</span>
                                                </div>
                                                <div className="flex items-start gap-2 text-xs sm:text-sm md:text-base">
                                                    <span className="text-muted-foreground">Narator:</span>
                                                    <span className="font-medium text-foreground">{page.content.narrator}</span>
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-3 md:pt-4 border-t">
                                                <p className="text-xs md:text-sm italic text-muted-foreground leading-relaxed">
                                                    "Cerita ini merupakan warisan budaya yang telah diturunkan dari generasi ke generasi. Setiap topeng membawa filosofi dan makna yang mendalam tentang kehidupan manusia."
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {page.type === 'story' && (
                                        <div className="h-full flex flex-col p-4 sm:p-6 md:p-10">
                                            <div className="flex-1 overflow-hidden">
                                                <div className="text-foreground/90 leading-relaxed whitespace-pre-line text-xs sm:text-sm md:text-lg">
                                                    {page.content}
                                                </div>
                                            </div>
                                            <div className="mt-3 md:mt-4 text-center text-xs md:text-sm text-muted-foreground">
                                                {index}
                                            </div>
                                        </div>
                                    )}

                                    {page.type === 'end' && (
                                        <div className="h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-linear-to-br from-gold/20 to-terracotta/20">
                                            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 md:mb-6">🎭</div>
                                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4 text-center">
                                                Tamat
                                            </h2>
                                            <div className="max-w-xs sm:max-w-sm space-y-2 md:space-y-3 px-4">
                                                <p className="text-xs sm:text-sm text-center text-muted-foreground italic leading-relaxed">
                                                    "Setiap topeng membawa filosofi dan makna yang mendalam tentang kehidupan manusia."
                                                </p>
                                                <p className="text-xs sm:text-sm text-center font-semibold text-foreground">
                                                    — {page.content.narrator}
                                                </p>
                                                <p className="text-xs text-center text-muted-foreground">
                                                    {page.content.sanggar}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </HTMLFlipBook>
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-3 md:gap-4 px-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className="h-9 w-9 md:h-10 md:w-10"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                        Halaman {isDesktop && currentPage !== 0 && currentPage !== pages.length - 1
                            ? `${currentPage + 1} & ${currentPage + 2}`
                            : `${currentPage + 1}`} dari {pages.length}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={nextPage}
                        disabled={currentPage >= pages.length - 1}
                        className="h-9 w-9 md:h-10 md:w-10"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground text-center max-w-md px-4 leading-relaxed">
                    Klik pada ujung halaman atau gunakan tombol navigasi untuk membalik halaman.
                    Anda juga bisa menggeser halaman pada perangkat sentuh.
                </p>

                {/* Audio Player */}
                {story.audioUrl && (
                    <div className="w-full max-w-4xl mt-8 px-4">
                        <div className="bg-linear-to-br from-terracotta/10 to-brown/5 rounded-lg border border-terracotta/20 p-6 shadow-lg backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-linear-to-br from-terracotta to-brown rounded-full flex items-center justify-center text-cream">
                                    <Volume2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Narasi Audio</h3>
                                    <p className="text-xs text-muted-foreground">
                                        Narator: {story.narrator}
                                    </p>
                                </div>
                            </div>

                            <audio ref={audioRef} src={story.audioUrl} preload="metadata" />

                            <div className="space-y-2 mb-4">
                                <Slider
                                    value={[currentTime]}
                                    max={duration || 100}
                                    step={0.1}
                                    onValueChange={handleSeek}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    onClick={togglePlayPause}
                                    size="lg"
                                    className="bg-linear-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
                                >
                                    {isPlaying ? (
                                        <>
                                            <Pause className="h-5 w-5 mr-2" />
                                            Jeda
                                        </>
                                    ) : (
                                        <>
                                            <Play className="h-5 w-5 mr-2" />
                                            Putar
                                        </>
                                    )}
                                </Button>

                                <div className="flex items-center gap-2 flex-1 max-w-xs">
                                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                                    <Slider
                                        value={[volume]}
                                        max={1}
                                        step={0.01}
                                        onValueChange={handleVolumeChange}
                                        className="flex-1"
                                    />
                                </div>

                                <Badge variant="secondary" className="hidden sm:inline-flex">
                                    {story.duration}
                                </Badge>
                            </div>

                            <p className="text-xs text-muted-foreground mt-4 italic text-center">
                                Dengarkan narasi cerita lengkap sambil membaca buku di atas
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
