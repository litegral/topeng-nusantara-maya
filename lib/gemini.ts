import { GoogleGenAI } from "@google/genai";

export interface RecommendationResponse {
  recommendations: Recommendation[];
}

export interface Recommendation {
  type: "topeng" | "story" | "sanggar" | "event" | "glossary";
  id: number | null;
  title: string;
  description: string;
  link: string;
  icon: string;
  priority: number;
}

export class GeminiClient {
  private genAI: GoogleGenAI;
  private modelName: string;

  constructor(apiKey: string, modelName: string = "gemini-2.0-flash-exp") {
    this.genAI = new GoogleGenAI({ apiKey });
    this.modelName = modelName;
  }

  async generateRecommendations(
    prompt: string,
    context: string
  ): Promise<RecommendationResponse> {
    const fullPrompt = `${context}\n\n${prompt}`;

    const response = await this.genAI.models.generateContent({
      model: this.modelName,
      contents: fullPrompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error("No text response from Gemini");
    }

    let cleanedText = text.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/```\s*$/, "");
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "").replace(/```\s*$/, "");
    }

    return JSON.parse(cleanedText);
  }
}
