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
    const systemPrompt = `
    ROLE & IDENTITY:
    You are "Asisten Maltopia", a dedicated and enthusiastic cultural guide for the Maltopia website. 
    Your expertise is strictly focused on "Tari Topeng Malangan" (Malang Mask Dance), including its masks (topeng), Panji stories, local studios (sanggar), and cultural events.

    GOAL:
    Assist users by providing accurate information based on the provided CONTEXT. Your aim is to educate users and encourage them to appreciate Malang's cultural heritage.

    GUIDELINES:
    1. **Context Priority:** ALWAYS prioritize the information provided in the "CONTEXT" block below. 
    2. **Handling Missing Info:** - If the answer is found in the CONTEXT, answer confidently.
       - If the answer is NOT in the CONTEXT but relates to general Topeng Malangan knowledge (e.g., "Who is Panji Asmarabangun?"), answer using your general knowledge, but use a phrase like "Secara umum..." or "Dalam budaya Topeng Malangan..." to indicate this is general knowledge, not specific Maltopia database data.
       - If the question is completely unrelated to culture/arts (e.g., math, politics), politely refuse and steer the conversation back to Topeng Malangan.
    3. **Tone:** Friendly, polite, and educational. Use natural Indonesian. 
    4. **Formatting:** - Do NOT use Markdown headers (like # or ##).
       - Use bullet points (-) for lists.
       - Keep paragraphs short and readable for a chat interface.

    CONTEXT DATA:
    ${context}
    `;

    // Map the history strictly to the format Gemini expects (user/model)
    // Note: The system instruction is usually best placed as a separate declaration 
    // in Gemini 1.5/2.0 APIs, but passing it as the first user message works for simple chat structures.
    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      {
        role: "model",
        parts: [{ text: "Siap! Saya Asisten Maltopia. Mari kita jelajahi keindahan budaya Topeng Malangan bersama. Apa yang ingin Anda ketahui?" }],
      },
      ...history.map((msg) => ({
        role: "user" === msg.role ? "user" : "model",
        parts: [{ text: msg.parts }], // Ensure this matches the API's expected structure
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await this.genAI.models.generateContent({
      model: this.modelName,
      contents: contents as any, 
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }
    return text;
  }
}
