import { Topeng } from "@/data/topeng";
import { Story } from "@/data/stories";
import { Sanggar } from "@/data/sanggar";
import { Event } from "@/data/events";

export interface PageContext {
  pageType: "katalog" | "arsip" | "lokasi";
  itemId: number;
  itemName: string;
  character?: string;
  specialty?: string;
  sanggar?: string;
  location?: string;
}

export class ContextExtractor {
  static extractFromKatalog(topeng: Topeng): PageContext {
    return {
      pageType: "katalog",
      itemId: topeng.id,
      itemName: topeng.nama,
      character: topeng.karakter,
    };
  }

  static extractFromArsip(story: Story): PageContext {
    return {
      pageType: "arsip",
      itemId: story.id,
      itemName: story.title,
      character: story.character,
      sanggar: story.sanggar,
    };
  }

  static extractFromLokasi(
    type: "sanggar" | "event",
    item: Sanggar | Event
  ): PageContext {
    if (type === "sanggar") {
      const sanggar = item as Sanggar;
      return {
        pageType: "lokasi",
        itemId: sanggar.id,
        itemName: sanggar.name,
        specialty: sanggar.specialty,
        location: sanggar.location,
      };
    } else {
      const event = item as Event;
      return {
        pageType: "lokasi",
        itemId: event.id,
        itemName: event.title,
        location: event.location,
      };
    }
  }
}
