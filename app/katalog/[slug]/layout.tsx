import { Metadata } from "next";
import { topengData } from "@/data";
import RecommendationCard from "@/components/RecommendationCard";
import { ContextExtractor } from "@/lib/context-extractor";

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const id = parseInt(slug);
    const topeng = topengData.find(t => t.id === id);

    if (!topeng) {
        return {
            title: "Topeng Tidak Ditemukan - Maltopia",
        };
    }

    return {
        title: `${topeng.nama} - Maltopia`,
        description: `${topeng.karakter}. ${topeng.filosofi}`,
    };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const id = parseInt(slug);
    const topeng = topengData.find(t => t.id === id);

    if (!topeng) {
        return children;
    }

    const pageContext = ContextExtractor.extractFromKatalog(topeng);

    return (
        <>
            {children}
            <RecommendationCard context={pageContext} />
        </>
    );
}
