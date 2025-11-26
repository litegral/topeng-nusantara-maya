"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Sparkles, RefreshCw, ChevronRight, Minimize2, Maximize2 } from "lucide-react";
import { PageContext } from "@/lib/context-extractor";
import { Recommendation } from "@/lib/gemini";
import RecommendationItem from "./RecommendationItem";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  context: PageContext;
}

export default function RecommendationCard({
  context,
}: RecommendationCardProps) {
  const [isOpen, setIsOpen] = useState(false); // Full sidebar state
  const [isCompact, setIsCompact] = useState(false); // Compact toast state
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-trigger logic
  useEffect(() => {
    if (hasTriggered || isOpen) return; // Don't auto-trigger if already open or triggered

    const timer = setTimeout(() => {
      setHasTriggered(true);
      fetchRecommendations(true); // true = auto-triggered (opens compact)
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasTriggered, isOpen]);

  const fetchRecommendations = async (isAutoTrigger = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pageContext: context }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();

      if (data.success && data.data.recommendations) {
        const sortedRecs = data.data.recommendations.sort(
          (a: Recommendation, b: Recommendation) => a.priority - b.priority
        );
        setRecommendations(sortedRecs);

        // Only open compact mode if auto-triggered AND sidebar is NOT open
        if (isAutoTrigger && sortedRecs.length > 0 && !isOpen) {
          setIsCompact(true);
        }
      }
    } catch (err) {
      setError("Gagal memuat rekomendasi");
      console.error("Error fetching recommendations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenFull = () => {
    setIsCompact(false);
    setIsOpen(true);
    if (recommendations.length === 0 && !isLoading) {
      fetchRecommendations();
    }
  };

  const handleCloseFull = () => {
    setIsOpen(false);
  };

  const handleCloseCompact = () => {
    setIsCompact(false);
  };

  const handleRetry = () => {
    fetchRecommendations();
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Trigger Button (Always visible when sidebar is closed) */}
      {!isOpen && (
        <button
          onClick={handleOpenFull}
          className={cn(
            "fixed bottom-24 right-6 z-[1200]",
            "bg-linear-to-r from-terracotta to-brown text-cream",
            "p-3 md:px-4 md:py-3 rounded-full shadow-lg",
            "flex items-center gap-2",
            "hover:shadow-xl hover:scale-105",
            "transition-all duration-300",
            "group"
          )}
        >
          <Sparkles className="h-5 w-5 group-hover:animate-pulse" />
          <span className="font-medium hidden md:inline">Rekomendasi</span>
        </button>
      )}

      {/* Compact Mode (Toast) */}
      <div
        className={cn(
          "fixed bottom-40 right-6 z-[1200] w-80",
          "bg-background/80 backdrop-blur-md border border-terracotta/20",
          "rounded-xl shadow-2xl overflow-hidden",
          "transition-all duration-500 ease-out transform",
          isCompact && !isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
        )}
      >
        <div className="p-4 relative">
          <button
            onClick={handleCloseCompact}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground p-1"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-3">
            <div className="bg-terracotta/10 p-2 rounded-full">
              <Sparkles className="h-5 w-5 text-terracotta" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-1">
                Rekomendasi Ditemukan!
              </h4>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {recommendations[0]?.title || "Menemukan konten terkait untuk Anda..."}
                {recommendations.length > 1 && ` (+${recommendations.length - 1} lainnya)`}
              </p>
              <Button
                size="sm"
                variant="default"
                className="h-8 text-xs bg-terracotta hover:bg-terracotta-dark text-white w-full"
                onClick={handleOpenFull}
              >
                Lihat Semua
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Sidebar Mode */}
      <>
        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[1190]"
            onClick={handleCloseFull}
          />
        )}

        <div
          className={cn(
            "fixed bg-background/95 backdrop-blur-xl shadow-2xl z-[1200] transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1)",
            "md:right-0 md:top-0 md:h-full md:w-[400px] md:border-l border-border md:left-auto md:bottom-auto",
            isOpen ? "md:translate-x-0" : "md:translate-x-full",
            "bottom-0 left-0 right-0 h-[85vh] rounded-t-3xl border-t md:rounded-none",
            isOpen ? "translate-y-0" : "translate-y-full md:translate-y-0",
            "flex flex-col"
          )}
        >
          <CardHeader className="border-b border-border/50 pb-4 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                <Sparkles className="h-5 w-5 text-terracotta" />
                Rekomendasi AI
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseFull}
                className="h-8 w-8 rounded-full hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 overflow-y-auto flex-1 scrollbar-hide">
            <div className="p-6 space-y-6">
              {isLoading && (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-32 bg-muted/50 animate-pulse rounded-xl"
                    />
                  ))}
                </div>
              )}

              {error && (
                <div className="p-6 bg-destructive/5 text-destructive rounded-xl text-center">
                  <p className="text-sm mb-4 font-medium">{error}</p>
                  <Button onClick={handleRetry} size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Coba Lagi
                  </Button>
                </div>
              )}

              {!isLoading && !error && recommendations.length > 0 && (
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <RecommendationItem recommendation={rec} />
                    </div>
                  ))}
                </div>
              )}

              {!isLoading && !error && recommendations.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 opacity-50" />
                  </div>
                  <p>Tidak ada rekomendasi tersedia saat ini</p>
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </>
    </>,
    document.body
  );
}
