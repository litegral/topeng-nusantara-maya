import { Metadata } from "next";
import { eventData } from "@/data";

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const id = parseInt(slug.split('-')[1]);
    const event = eventData.find(e => e.id === id);

    if (!event) {
        return {
            title: "Acara Tidak Ditemukan - Maltopia",
        };
    }

    return {
        title: `${event.title} - Maltopia`,
        description: event.description,
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
