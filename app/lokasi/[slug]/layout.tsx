import { Metadata } from "next";
import { sanggarData, eventData } from "@/data";
import RecommendationCard from "@/components/RecommendationCard";
import { ContextExtractor } from "@/lib/context-extractor";

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const [type, idStr] = slug.split('-');
    const id = parseInt(idStr);

    if (type === 'sanggar') {
        const sanggar = sanggarData.find(s => s.id === id);
        if (sanggar) {
            return {
                title: `${sanggar.name} - Maltopia`,
                description: sanggar.description,
            };
        }
    } else if (type === 'event') {
        const event = eventData.find(e => e.id === id);
        if (event) {
            return {
                title: `${event.title} - Maltopia`,
                description: event.description,
            };
        }
    }

    return {
        title: "Lokasi Tidak Ditemukan - Maltopia",
    };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [type, idStr] = slug.split('-');
    const id = parseInt(idStr);

    let pageContext = null;

    if (type === 'sanggar') {
        const sanggar = sanggarData.find(s => s.id === id);
        if (sanggar) {
            pageContext = ContextExtractor.extractFromLokasi('sanggar', sanggar);
        }
    } else if (type === 'event') {
        const event = eventData.find(e => e.id === id);
        if (event) {
            pageContext = ContextExtractor.extractFromLokasi('event', event);
        }
    }

    return (
        <>
            {children}
            {pageContext && <RecommendationCard context={pageContext} />}
        </>
    );
}
