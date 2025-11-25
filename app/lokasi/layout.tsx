import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Peta Budaya - Maltopia",
    description: "Peta interaktif lokasi sanggar seni dan acara budaya di Malang Raya. Temukan tempat belajar tari topeng terdekat.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
