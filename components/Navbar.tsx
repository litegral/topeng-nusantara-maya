"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState("id"); // Default to Indonesian
    const pathname = usePathname();
    const langMenuRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { name: "Beranda", path: "/" },
        { name: "Katalog Topeng", path: "/katalog" },
        { name: "Arsip Cerita", path: "/arsip" },
        { name: "Dokumentasi Tari", path: "/dokumentasi" },
        { name: "Lokasi Budaya", path: "/lokasi" },
        { name: "Agenda Budaya", path: "/agenda" },
    ];

    const languages = [
        { code: "id", label: "Indonesia", flag: "🇮🇩" },
        { code: "en", label: "English", flag: "🇬🇧" },
    ];

    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === path;
        }
        return pathname === path || pathname.startsWith(path + "/");
    };

    // Close language menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLangSelect = (code: string) => {
        setCurrentLang(code);
        setIsLangOpen(false);
        // Add your actual language switching logic here (e.g., i18n router push)
    };

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

                        {/* Divider */}
                        <div className="h-6 w-px bg-border mx-2" />

                        {/* Desktop Language Selector */}
                        <div className="relative" ref={langMenuRef}>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-2 px-3"
                            >
                                <Globe className="h-4 w-4" />
                                <span className="uppercase">{currentLang}</span>
                                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} />
                            </Button>

                            {/* Dropdown Menu */}
                            {isLangOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-popover border border-border rounded-md shadow-md animate-in fade-in zoom-in-95 duration-200">
                                    <div className="p-1">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLangSelect(lang.code)}
                                                className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-sm hover:bg-muted transition-colors ${
                                                    currentLang === lang.code ? "bg-muted font-medium" : ""
                                                }`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span>{lang.flag}</span>
                                                    {lang.label}
                                                </span>
                                                {currentLang === lang.code && (
                                                    <Check className="h-3 w-3 text-primary" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
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
                    <div className="md:hidden py-4 animate-fade-in border-t border-border">
                        <div className="flex flex-col space-y-1">
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

                        {/* Mobile Language Selector */}
                        <div className="mt-4 pt-4 border-t border-border px-4">
                            <p className="text-sm text-muted-foreground mb-3 font-medium">Pilih Bahasa</p>
                            <div className="grid grid-cols-2 gap-3">
                                {languages.map((lang) => (
                                    <Button
                                        key={lang.code}
                                        variant={currentLang === lang.code ? "default" : "outline"}
                                        className="w-full justify-start"
                                        onClick={() => handleLangSelect(lang.code)}
                                    >
                                        <span className="mr-2">{lang.flag}</span>
                                        {lang.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;