import { topengData } from "@/data/topeng";
import { stories } from "@/data/stories";
import { sanggarData } from "@/data/sanggar";
import { eventData } from "@/data/events";
import { glossaryTerms } from "@/data/glossary";
import { PageContext } from "./context-extractor";

export class RecommendationEngine {
  buildKnowledgeBase(pageContext: PageContext): string {
    const { pageType, itemId } = pageContext;

    let knowledgeBase = "=== KNOWLEDGE BASE ===\n\n";

    knowledgeBase += this.getCurrentItemDetails(pageType, itemId);
    knowledgeBase += this.getRelatedContent(pageContext);
    knowledgeBase += this.getRelevantGlossary(pageContext.character || "");

    return knowledgeBase;
  }

  private getCurrentItemDetails(pageType: string, itemId: number): string {
    let details = "=== CURRENT ITEM ===\n";

    if (pageType === "katalog") {
      const topeng = topengData.find((t) => t.id === itemId);
      if (topeng) {
        details += `Topeng: ${topeng.nama}\n`;
        details += `Karakter: ${topeng.karakter}\n`;
        details += `Warna: ${topeng.warna}\n`;
        details += `Makna: ${topeng.makna}\n`;
        details += `Filosofi: ${topeng.filosofi}\n`;
      }
    } else if (pageType === "arsip") {
      const story = stories.find((s) => s.id === itemId);
      if (story) {
        details += `Cerita: ${story.title}\n`;
        details += `Karakter: ${story.character}\n`;
        details += `Sanggar: ${story.sanggar}\n`;
        details += `Deskripsi: ${story.description}\n`;
      }
    } else if (pageType === "lokasi") {
      const sanggar = sanggarData.find((s) => s.id === itemId);
      const event = eventData.find((e) => e.id === itemId);

      if (sanggar) {
        details += `Sanggar: ${sanggar.name}\n`;
        details += `Lokasi: ${sanggar.location}\n`;
        details += `Spesialisasi: ${sanggar.specialty}\n`;
        details += `Deskripsi: ${sanggar.description}\n`;
      } else if (event) {
        details += `Event: ${event.title}\n`;
        details += `Lokasi: ${event.location}\n`;
        details += `Tanggal: ${event.date}\n`;
        details += `Tipe: ${event.eventType}\n`;
      }
    }

    return details + "\n";
  }

  private getRelatedContent(pageContext: PageContext): string {
    const { pageType, character, itemName, specialty } = pageContext;
    let related = "=== RELATED CONTENT ===\n";

    if (pageType === "katalog") {
      const relatedStories = stories.filter((s) =>
        character
          ? s.character.toLowerCase().includes(character.toLowerCase()) ||
            character.toLowerCase().includes(s.character.toLowerCase())
          : false
      );

      if (relatedStories.length > 0) {
        related += "\nCerita terkait:\n";
        relatedStories.forEach((s) => {
          related += `- ID: ${s.id}, Judul: ${s.title}, Sanggar: ${s.sanggar}\n`;
        });
      }

      const characterName = character?.split(" ")[0] || "";
      const relatedSanggar = sanggarData.filter((s) =>
        s.specialty.toLowerCase().includes(characterName.toLowerCase())
      );

      if (relatedSanggar.length > 0) {
        related += "\nSanggar terkait:\n";
        relatedSanggar.forEach((s) => {
          related += `- ID: ${s.id}, Nama: ${s.name}, Spesialisasi: ${s.specialty}\n`;
        });
      }
    } else if (pageType === "arsip") {
      const relatedTopeng = topengData.filter(
        (t) =>
          (character &&
            (t.nama.toLowerCase().includes(character.toLowerCase()) ||
              character.toLowerCase().includes(t.nama.toLowerCase()) ||
              t.karakter.toLowerCase().includes(character.toLowerCase()))) ||
          false
      );

      if (relatedTopeng.length > 0) {
        related += "\nTopeng terkait:\n";
        relatedTopeng.forEach((t) => {
          related += `- ID: ${t.id}, Nama: ${t.nama}, Karakter: ${t.karakter}\n`;
        });
      }

      const story = stories.find((s) => s.character === character);
      if (story) {
        const sanggar = sanggarData.find((s) => s.name === story.sanggar);
        if (sanggar) {
          related += "\nSanggar (narator):\n";
          related += `- ID: ${sanggar.id}, Nama: ${sanggar.name}, Lokasi: ${sanggar.location}\n`;
        }
      }
    } else if (pageType === "lokasi") {
      const sanggar = sanggarData.find((s) => s.name === itemName);

      if (sanggar) {
        const relatedEvents = eventData.filter(
          (e) => e.location === sanggar.name
        );

        if (relatedEvents.length > 0) {
          related += "\nEvent di sanggar ini:\n";
          relatedEvents.forEach((e) => {
            related += `- ID: ${e.id}, Judul: ${e.title}, Tanggal: ${e.date}\n`;
          });
        }

        const specialtyChar = specialty?.split("&")[0].trim() || "";
        const relatedTopeng = topengData.filter((t) =>
          t.nama.toLowerCase().includes(specialtyChar.toLowerCase())
        );

        if (relatedTopeng.length > 0) {
          related += "\nTopeng (spesialisasi):\n";
          relatedTopeng.forEach((t) => {
            related += `- ID: ${t.id}, Nama: ${t.nama}\n`;
          });
        }
      }
    }

    return related + "\n";
  }

  private getRelevantGlossary(character: string): string {
    if (!character) return "";

    const relevantTerms = glossaryTerms.filter(
      (term) =>
        term.term.toLowerCase().includes(character.toLowerCase()) ||
        character.toLowerCase().includes(term.term.toLowerCase()) ||
        term.category === "Karakter"
    );

    if (relevantTerms.length === 0) return "";

    let glossary = "=== ISTILAH BUDAYA TERKAIT ===\n";
    relevantTerms.slice(0, 5).forEach((term) => {
      glossary += `- ${term.term} (${term.category}): ${term.definition}\n`;
    });

    return glossary + "\n";
  }

  createPrompt(pageContext: PageContext): string {
    const { pageType } = pageContext;

    let taskDescription = "";

    if (pageType === "katalog") {
      taskDescription = `Anda sedang melihat topeng Malangan. Berdasarkan konteks yang diberikan:
1. Rekomendasikan 2 cerita (arsip) yang menampilkan karakter ini
2. Rekomendasikan 1 istilah glosarium tentang karakter ini
3. Rekomendasikan 1 sanggar yang berspesialisasi dalam karakter ini
4. Jika ada event terkait karakter ini, rekomendasikan 1 event`;
    } else if (pageType === "arsip") {
      taskDescription = `Anda sedang melihat cerita tradisional (arsip). Berdasarkan konteks yang diberikan:
1. Rekomendasikan 1-2 topeng dari karakter dalam cerita ini
2. Rekomendasikan 1 sanggar yang menceritakan atau menampilkan cerita ini
3. Rekomendasikan 1-2 istilah glosarium tentang karakter atau elemen dalam cerita
4. Jika ada event terkait cerita ini, rekomendasikan 1 event`;
    } else if (pageType === "lokasi") {
      taskDescription = `Anda sedang melihat sanggar seni tradisional atau lokasi event. Berdasarkan konteks yang diberikan:
1. Jika melihat sanggar: rekomendasikan event di sanggar ini
2. Rekomendasikan topeng terkait spesialisasi sanggar ini
3. Rekomendasikan cerita terkait sanggar ini
4. Rekomendasikan sanggar terdekat (jika melihat lokasi event)`;
    }

    return `${taskDescription}

INSTRUKSI PENTING:
- Prioritaskan rekomendasi berdasarkan hubungan langsung dalam data
- Jaga agar deskripsi singkat (1-2 kalimat)
- Kembalikan HANYA JSON valid dalam format berikut
- JANGAN sertakan blok kode markdown atau teks lain
- Gunakan bahasa Indonesia untuk semua konten teks

{
  "recommendations": [
    {
      "type": "topeng" | "story" | "sanggar" | "event" | "glossary",
      "id": number | null,
      "title": "string",
      "description": "string (1-2 kalimat)",
      "link": "/katalog/1" atau "/arsip/2" atau "/lokasi/sanggar-1" atau "/agenda/event-1" atau "/glossarium",
      "icon": "🎭" | "📚" | "🏛️" | "📅" | "📖",
      "priority": 1-5 (1 = tertinggi)
    }
  ]
}

Berikan 3-5 rekomendasi total, prioritaskan koneksi yang paling relevan.`;
  }
}
