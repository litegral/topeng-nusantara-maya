import { NextRequest, NextResponse } from "next/server";
import { GeminiClient, Recommendation } from "@/lib/gemini";
import { RecommendationEngine } from "@/lib/recommendation-engine";
import { RecommendationCache } from "@/lib/recommendation-cache";
import { PageContext } from "@/lib/context-extractor";
import { topengData } from "@/data/topeng";
import { stories } from "@/data/stories";
import { sanggarData } from "@/data/sanggar";
import { eventData } from "@/data/events";

const cache = new RecommendationCache(600000);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageContext } = body as { pageContext: PageContext };

    if (!pageContext || !pageContext.pageType || !pageContext.itemId) {
      return NextResponse.json(
        { error: "Missing required context fields" },
        { status: 400 }
      );
    }

    const cacheKey = `${pageContext.pageType}-${pageContext.itemId}`;

    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      return NextResponse.json({
        success: true,
        data: cachedResult,
        cached: true,
      });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const gemini = new GeminiClient(geminiApiKey);
    const engine = new RecommendationEngine();

    const knowledgeBase = engine.buildKnowledgeBase(pageContext);
    const prompt = engine.createPrompt(pageContext);

    const recommendations = await gemini.generateRecommendations(
      prompt,
      knowledgeBase
    );

    cache.set(cacheKey, recommendations);

    return NextResponse.json({
      success: true,
      data: recommendations,
      cached: false,
    });
  } catch (error: any) {
    console.error("Recommendation generation error:", error);

    const fallback = generateFallbackRecommendations(
      (await request.json()).pageContext
    );

    return NextResponse.json({
      success: true,
      data: fallback,
      fallback: true,
    });
  }
}

function generateFallbackRecommendations(pageContext: PageContext) {
  const { pageType, itemId, character } = pageContext;
  const recommendations: Recommendation[] = [];

  if (pageType === "katalog") {
    const relatedStories = stories.filter((s) =>
      character
        ? s.character.toLowerCase().includes(character.toLowerCase())
        : false
    );

    if (relatedStories.length > 0) {
      recommendations.push({
        type: "story",
        id: relatedStories[0].id,
        title: relatedStories[0].title,
        description: relatedStories[0].description,
        link: `/arsip/${relatedStories[0].id}`,
        icon: "📚",
        priority: 1,
      });
    }

    const characterName = character?.split(" ")[0] || "";
    const relatedSanggar = sanggarData.filter((s) =>
      s.specialty.toLowerCase().includes(characterName.toLowerCase())
    );

    if (relatedSanggar.length > 0) {
      recommendations.push({
        type: "sanggar",
        id: relatedSanggar[0].id,
        title: relatedSanggar[0].name,
        description: `Sanggar yang berspesialisasi dalam ${relatedSanggar[0].specialty}`,
        link: `/lokasi/sanggar-${relatedSanggar[0].id}`,
        icon: "🏛️",
        priority: 2,
      });
    }
  } else if (pageType === "arsip") {
    const relatedTopeng = topengData.filter((t) =>
      character
        ? t.nama.toLowerCase().includes(character.toLowerCase()) ||
          character.toLowerCase().includes(t.nama.toLowerCase())
        : false
    );

    if (relatedTopeng.length > 0) {
      recommendations.push({
        type: "topeng",
        id: relatedTopeng[0].id,
        title: relatedTopeng[0].nama,
        description: relatedTopeng[0].makna,
        link: `/katalog/${relatedTopeng[0].id}`,
        icon: "🎭",
        priority: 1,
      });
    }
  } else if (pageType === "lokasi") {
    const sanggar = sanggarData.find((s) => s.id === itemId);
    if (sanggar) {
      const relatedEvents = eventData.filter((e) => e.location === sanggar.name);

      if (relatedEvents.length > 0) {
        recommendations.push({
          type: "event",
          id: relatedEvents[0].id,
          title: relatedEvents[0].title,
          description: relatedEvents[0].description,
          link: `/agenda/event-${relatedEvents[0].id}`,
          icon: "📅",
          priority: 1,
        });
      }
    }
  }

  if (recommendations.length === 0) {
    recommendations.push({
      type: "glossary",
      id: null,
      title: "Jelajahi Glosarium",
      description: "Pelajari istilah-istilah budaya Topeng Malangan",
      link: "/glossarium",
      icon: "📖",
      priority: 3,
    });
  }

  return { recommendations };
}
