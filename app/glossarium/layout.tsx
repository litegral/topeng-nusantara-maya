import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Glossarium - Maltopia",
    description: "Kamus istilah budaya Topeng Malangan. Pelajari arti kata-kata unik dalam seni tari dan pewayangan Malang.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
