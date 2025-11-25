import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Agenda Budaya - Maltopia",
    description: "Jadwal acara dan kegiatan budaya di Malang. Temukan pertunjukan tari, pameran seni, dan workshop budaya.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
