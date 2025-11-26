import { topengData } from "@/data/topeng";
import { stories } from "@/data/stories";
import { sanggarData } from "@/data/sanggar";
import { eventData } from "@/data/events";
import { glossaryTerms } from "@/data/glossary";

export class RagEngine {
    search(query: string): string {
        const lowerQuery = query.toLowerCase();
        let context = "=== RELEVANT INFORMATION ===\n\n";
        let hasResults = false;

        // Search Topeng
        const relevantTopeng = topengData.filter(
            (t) =>
                t.nama.toLowerCase().includes(lowerQuery) ||
                t.karakter.toLowerCase().includes(lowerQuery) ||
                t.makna.toLowerCase().includes(lowerQuery) ||
                t.filosofi.toLowerCase().includes(lowerQuery)
        );

        if (relevantTopeng.length > 0) {
            hasResults = true;
            context += "--- TOPENG (MASKS) ---\n";
            relevantTopeng.forEach((t) => {
                context += `Name: ${t.nama}\nCharacter: ${t.karakter}\nMeaning: ${t.makna}\nPhilosophy: ${t.filosofi}\n\n`;
            });
        }

        // Search Stories
        const relevantStories = stories.filter(
            (s) =>
                s.title.toLowerCase().includes(lowerQuery) ||
                s.character.toLowerCase().includes(lowerQuery) ||
                s.description.toLowerCase().includes(lowerQuery)
        );

        if (relevantStories.length > 0) {
            hasResults = true;
            context += "--- STORIES ---\n";
            relevantStories.forEach((s) => {
                context += `Title: ${s.title}\nCharacter: ${s.character}\nSanggar: ${s.sanggar}\nDescription: ${s.description}\n\n`;
            });
        }

        // Search Sanggar
        const relevantSanggar = sanggarData.filter(
            (s) =>
                s.name.toLowerCase().includes(lowerQuery) ||
                s.location.toLowerCase().includes(lowerQuery) ||
                s.specialty.toLowerCase().includes(lowerQuery) ||
                s.description.toLowerCase().includes(lowerQuery)
        );

        if (relevantSanggar.length > 0) {
            hasResults = true;
            context += "--- SANGGAR (STUDIOS) ---\n";
            relevantSanggar.forEach((s) => {
                context += `Name: ${s.name}\nLocation: ${s.location}\nSpecialty: ${s.specialty}\nDescription: ${s.description}\nOpen: ${s.openTime}\n\n`;
            });
        }

        // Search Events
        const relevantEvents = eventData.filter(
            (e) =>
                e.title.toLowerCase().includes(lowerQuery) ||
                e.location.toLowerCase().includes(lowerQuery) ||
                e.description.toLowerCase().includes(lowerQuery) ||
                e.eventType.toLowerCase().includes(lowerQuery)
        );

        if (relevantEvents.length > 0) {
            hasResults = true;
            context += "--- EVENTS ---\n";
            relevantEvents.forEach((e) => {
                context += `Event: ${e.title}\nDate: ${e.date}\nLocation: ${e.location}\nType: ${e.eventType}\nDescription: ${e.description}\n\n`;
            });
        }

        // Search Glossary
        const relevantGlossary = glossaryTerms.filter(
            (g) =>
                g.term.toLowerCase().includes(lowerQuery) ||
                g.definition.toLowerCase().includes(lowerQuery)
        );

        if (relevantGlossary.length > 0) {
            hasResults = true;
            context += "--- GLOSSARY ---\n";
            relevantGlossary.forEach((g) => {
                context += `Term: ${g.term}\nCategory: ${g.category}\nDefinition: ${g.definition}\n\n`;
            });
        }

        if (!hasResults) {
            return "";
        }

        return context;
    }
}
