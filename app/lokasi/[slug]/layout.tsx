import { Metadata } from "next";
import { sanggarData, eventData } from "@/data";

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

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
