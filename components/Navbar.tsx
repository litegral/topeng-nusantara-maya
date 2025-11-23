"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: "Beranda", path: "/" },
        { name: "Katalog Topeng", path: "/katalog" },
        { name: "Arsip Cerita", path: "/arsip" },
        { name: "Dokumentasi Tari", path: "/dokumentasi" },
        { name: "Jelajah Budaya", path: "/peta" },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-linear-to-br from-terracotta to-gold rounded-lg flex items-center justify-center">
                            <span className="text-xl font-bold text-primary-foreground">M</span>
                        </div>
                        <span className="text-xl font-bold text-foreground">Maltopia</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`px-4 py-2 rounded-lg transition-colors ${isActive(item.path)
                                        ? "bg-primary text-primary-foreground"
                                        : "text-foreground hover:bg-muted"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 animate-fade-in">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                                        ? "bg-primary text-primary-foreground"
                                        : "text-foreground hover:bg-muted"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;