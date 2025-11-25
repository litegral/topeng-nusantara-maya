import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Katalog Topeng - Maltopia",
    description: "Koleksi digital Topeng Malangan 3D. Jelajahi karakter Panji, Klana, Gunungsari, dan lainnya secara interaktif.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
