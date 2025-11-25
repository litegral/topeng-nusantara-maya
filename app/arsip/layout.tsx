import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Arsip Cerita - Maltopia",
    description: "Kumpulan cerita rakyat dan legenda Topeng Malangan. Baca kisah Panji Asmorobangun, Dewi Sekartaji, dan tokoh lainnya.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
