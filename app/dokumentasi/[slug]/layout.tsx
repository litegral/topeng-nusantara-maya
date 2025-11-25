import { Metadata } from "next";
import { videos } from "@/data";

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const id = parseInt(slug);
    const video = videos.find(v => v.id === id);

    if (!video) {
        return {
            title: "Video Tidak Ditemukan - Maltopia",
        };
    }

    return {
        title: `${video.title} - Maltopia`,
        description: video.description,
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
