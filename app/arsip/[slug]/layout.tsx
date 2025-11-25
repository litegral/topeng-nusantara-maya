import { Metadata } from "next";
import { stories } from "@/data";

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

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
