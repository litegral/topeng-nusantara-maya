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

  async generateChatResponse(
    message: string,
    context: string,
    history: { role: "user" | "model"; parts: string }[]
  ): Promise<string> {
    const systemPrompt = `You are "Asisten Maltopia", a helpful and knowledgeable cultural assistant for Maltopia, a website dedicated to Malang Mask Dance (Tari Topeng Malangan).
    
    Your goal is to help users learn about masks, stories, studios (sanggar), and events.
    
    Use the provided CONTEXT to answer the user's question.
    If the answer is not in the context, use your general knowledge but mention that it might not be specific to the Maltopia database. Don't act like you don't know it!
    
    Keep your answers concise, friendly, and in Indonesian language.
    Do not use markdown formatting like bold or headers unless necessary for lists.
    
    CONTEXT:
    ${context}
    `;

    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      {
        role: "model",
        parts: [{ text: "Mengerti. Saya siap membantu Anda menjelajahi budaya Topeng Malangan." }],
      },
      ...history.map((msg) => ({
        role: "user" === msg.role ? "user" : "model",
        parts: [{ text: msg.parts }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await this.genAI.models.generateContent({
      model: this.modelName,
      contents: contents,
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }
    return text;
  }
}
