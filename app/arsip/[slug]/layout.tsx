import { Metadata } from "next";
import { stories } from "@/data";
import RecommendationCard from "@/components/RecommendationCard";
import { ContextExtractor } from "@/lib/context-extractor";

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const id = parseInt(slug);
    const story = stories.find(s => s.id === id);

    if (!story) {
        return {
            title: "Cerita Tidak Ditemukan - Maltopia",
        };
    }

    return {
        title: `${story.title} - Maltopia`,
        description: story.description,
    };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const id = parseInt(slug);
    const story = stories.find(s => s.id === id);

    if (!story) {
        return children;
    }

    const pageContext = ContextExtractor.extractFromArsip(story);

    return (
        <>
            {children}
            <RecommendationCard context={pageContext} />
        </>
    );
}
