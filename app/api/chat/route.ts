import { NextRequest, NextResponse } from "next/server";
import { GeminiClient } from "@/lib/gemini";
import { RagEngine } from "@/lib/rag-engine";

const geminiClient = new GeminiClient(process.env.GEMINI_API_KEY || "");
const ragEngine = new RagEngine();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message, history } = body;

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not set" },
                { status: 500 }
            );
        }

        // 1. Get Context from RAG
        const context = ragEngine.search(message);

        // 2. Generate Response
        const response = await geminiClient.generateChatResponse(
            message,
            context,
            history || []
        );

        return NextResponse.json({ response });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
