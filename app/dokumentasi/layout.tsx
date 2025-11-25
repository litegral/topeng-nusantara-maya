import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dokumentasi Tari - Maltopia",
    description: "Galeri video pertunjukan dan dokumentasi tari Topeng Malangan. Saksikan keindahan gerak dan kostum tradisional.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
