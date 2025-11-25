import { Metadata } from "next";
import { topengData } from "@/data";

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

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
