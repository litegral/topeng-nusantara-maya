"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Recommendation } from "@/lib/gemini";

interface RecommendationItemProps {
  recommendation: Recommendation;
}

export default function RecommendationItem({
  recommendation,
}: RecommendationItemProps) {
  const typeLabels: Record<string, string> = {
    topeng: "Topeng",
    story: "Cerita",
    sanggar: "Sanggar",
    event: "Event",
    glossary: "Glosarium",
  };

  const typeColors: Record<string, string> = {
    topeng: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    story: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    sanggar: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    event: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    glossary: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  };

  return (
    <Link href={recommendation.link} className="block group">
      <Card className="border-border/50 hover:border-terracotta/50 transition-all duration-300 hover:shadow-md bg-card/50 hover:bg-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="text-3xl shrink-0 bg-background p-2 rounded-lg border border-border/50 group-hover:scale-105 transition-transform duration-300 shadow-sm">
              {recommendation.icon}
            </div>

            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className={`text-[10px] px-2 py-0.5 h-5 font-medium border-0 ${typeColors[recommendation.type] || 'bg-secondary'}`}
                >
                  {typeLabels[recommendation.type]}
                </Badge>
                <ArrowRight className="h-4 w-4 text-terracotta -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
              </div>

              <div>
                <h4 className="font-semibold text-foreground leading-tight mb-1 group-hover:text-terracotta transition-colors">
                  {recommendation.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {recommendation.description}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
