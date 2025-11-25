"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Clock,
    Ticket,
    Plus,
    Minus,
    CheckCircle2,
    Users,
    Copy,
    Check,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { eventData } from "@/data";

const AgendaDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    // Parse slug to get event id (format: event-1)
    const eventId = parseInt(slug.split('-')[1]);
    const event = eventData.find(e => e.id === eventId);

    const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
    const [selectedTicketType, setSelectedTicketType] = useState(0);
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);
    const [paymentStep, setPaymentStep] = useState<'form' | 'method' | 'processing' | 'instructions' | 'success'>('form');
    const [paymentType, setPaymentType] = useState<'bank_transfer' | 'gopay' | 'shopeepay' | ''>('');
    const [selectedBank, setSelectedBank] = useState<'bca' | 'bni' | 'bri' | 'permata' | 'cimb'>('bca');
    const [paymentData, setPaymentData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentError, setPaymentError] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    if (!event) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p>Acara tidak ditemukan</p>
            </div>
        );
    }

    const handleBuyTicket = () => {
        setSelectedTicketType(0);
        setTicketQuantity(1);
        setIsPurchaseComplete(false);
        setPaymentStep('form');
        setPaymentType('');
        setPaymentError('');
        setIsTicketDialogOpen(true);
    };

    const handleCloseTicketDialog = () => {
        setIsTicketDialogOpen(false);
        setCustomerName("");
        setCustomerEmail("");
        setCustomerPhone("");
        setTicketQuantity(1);
        setIsPurchaseComplete(false);
        setPaymentStep('form');
        setPaymentType('');
        setPaymentData(null);
        setPaymentError('');
    };

    const handleQuantityChange = (delta: number) => {
        const newQuantity = ticketQuantity + delta;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setTicketQuantity(newQuantity);
        }
    };

    const handlePurchase = (e: React.FormEvent) => {
        e.preventDefault();
        setPaymentStep('method');
    };

    const handlePaymentMethodSelect = async () => {
        if (!paymentType) {
            setPaymentError('Pilih metode pembayaran terlebih dahulu');
            return;
        }

        setIsLoading(true);
        setPaymentError('');
        setPaymentStep('processing');

        try {
            // Generate unique order ID
            const orderId = `ORDER-${event.id}-${Date.now()}`;
            const amount = calculateTotal();

            const response = await fetch('/api/payment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId,
                    amount,
                    paymentType,
                    paymentMethod: paymentType === 'bank_transfer' ? selectedBank : undefined,
                    customerDetails: {
                        name: customerName,
                        email: customerEmail,
                        phone: customerPhone,
                    },
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Gagal membuat pembayaran');
            }

            setPaymentData(result.data);

            // For e-money, check if it's mobile and redirect
            if ((paymentType === 'gopay' || paymentType === 'shopeepay') && result.data.actions) {
                const deeplinkAction = result.data.actions.find((action: any) =>
                    action.name === 'deeplink-redirect'
                );

                // Check if mobile device
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

                if (isMobile && deeplinkAction) {
                    // Redirect to payment app
                    window.location.href = deeplinkAction.url;
                    return;
                }
            }

            setPaymentStep('instructions');
        } catch (error: any) {
            console.error('Payment error:', error);
            setPaymentError(error.message || 'Terjadi kesalahan saat membuat pembayaran');
            setPaymentStep('method');
        } finally {
            setIsLoading(false);
        }
    };

    const checkPaymentStatus = async () => {
        if (!paymentData?.order_id) return;

        try {
            const response = await fetch(`/api/payment/status/${paymentData.order_id}`);
            const result = await response.json();

            if (result.success && result.data.transaction_status === 'settlement') {
                setPaymentStep('success');
                setIsPurchaseComplete(true);
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
        }
    };

    const handleCopyVA = (vaNumber: string) => {
        navigator.clipboard.writeText(vaNumber);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const calculateTotal = () => {
        return event.ticketTypes[selectedTicketType].price * ticketQuantity;
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <ChatbotWidget />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/agenda")}
                        className="mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Agenda
                    </Button>

                    <div className="animate-fade-in space-y-6">
                        <Card>
                            <CardContent className="p-8">
                                <div className="mb-6">
                                    <Badge variant="secondary" className="mb-3">
                                        {event.eventType}
                                    </Badge>
                                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                        {event.title}
                                    </h1>
                                    <p className="text-lg text-muted-foreground mb-4">
                                        {event.description}
                                    </p>
                                </div>

                                {/* Event Info Grid */}
                                <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Tanggal & Waktu</p>
                                            <p className="font-semibold text-foreground">{event.date}</p>
                                            <p className="text-sm text-muted-foreground">{event.time}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Lokasi</p>
                                            <p className="font-semibold text-foreground">{event.location}</p>
                                            <p className="text-sm text-muted-foreground">{event.address}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Penyelenggara</p>
                                            <p className="font-semibold text-foreground">{event.organizer}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Ticket className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Ketersediaan Tiket</p>
                                            <p className="font-semibold text-foreground">
                                                {event.availableTickets} tiket tersedia
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-3">
                                            Tentang Acara
                                        </h3>
                                        <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                                            {event.fullDescription}
                                        </p>
                                    </div>

                                    {event.facilities && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-foreground mb-4">
                                                Fasilitas
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {event.facilities.split(',').map((facility: string, index: number) => {
                                                    const trimmedFacility = facility.trim();
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-3 p-4 rounded-lg bg-linear-to-br from-terracotta/5 to-gold/5 border border-terracotta/10 hover:border-terracotta/30 hover:from-terracotta/10 hover:to-gold/10 transition-all duration-300 hover:shadow-soft group"
                                                        >
                                                            <div className="shrink-0 w-2 h-2 rounded-full bg-terracotta group-hover:scale-150 transition-transform duration-300" />
                                                            <span className="text-foreground/90 text-sm font-medium leading-relaxed">
                                                                {trimmedFacility}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-4">
                                            Informasi Tiket
                                        </h3>

                                        {/* Ticket Types Display */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                                            {event.ticketTypes.map((ticketType, index) => (
                                                <div
                                                    key={index}
                                                    className="p-4 rounded-lg bg-linear-to-br from-terracotta/5 to-gold/5 border border-terracotta/20 hover:border-terracotta/40 transition-all duration-300 hover:shadow-soft"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="font-semibold text-foreground mb-1">{ticketType.name}</h4>
                                                            <p className="text-xs text-muted-foreground">Per orang</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold text-terracotta">
                                                                {ticketType.price === 0 ? 'GRATIS' : new Intl.NumberFormat('id-ID', {
                                                                    style: 'currency',
                                                                    currency: 'IDR',
                                                                    minimumFractionDigits: 0,
                                                                }).format(ticketType.price)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Ticket Purchase Section */}
                                        <div className="mt-6 p-6 bg-linear-to-r from-terracotta/10 to-brown/10 rounded-lg border border-terracotta/20">
                                            <h3 className="text-xl font-semibold text-foreground mb-3">
                                                Dapatkan Tiket
                                            </h3>
                                            {event.ticketPrice === 0 ? (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <Badge variant="secondary" className="text-lg py-1 px-4 bg-gold/20 text-brown border-gold/30">
                                                            GRATIS
                                                        </Badge>
                                                        <p className="text-muted-foreground">Acara ini gratis dan terbuka untuk umum</p>
                                                    </div>
                                                    {event.registrationUrl ? (
                                                        <Button
                                                            onClick={() => window.open(event.registrationUrl as string, '_blank')}
                                                            className="w-full md:w-auto bg-linear-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
                                                            size="lg"
                                                        >
                                                            <Ticket className="h-5 w-5 mr-2" />
                                                            Daftar Sekarang
                                                        </Button>
                                                    ) : (
                                                        <p className="text-sm text-muted-foreground italic">
                                                            Tidak memerlukan pendaftaran - Datang langsung ke lokasi
                                                        </p>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <Badge variant="secondary" className="text-lg py-1 px-4 bg-terracotta/20 text-terracotta border-terracotta/30">
                                                            Berbayar
                                                        </Badge>
                                                        <p className="text-muted-foreground">Lihat detail harga di atas</p>
                                                    </div>
                                                    <Button
                                                        onClick={handleBuyTicket}
                                                        className="w-full md:w-auto bg-linear-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
                                                        size="lg"
                                                    >
                                                        <Ticket className="h-5 w-5 mr-2" />
                                                        Beli Tiket Sekarang
                                                    </Button>
                                                    <p className="text-sm text-muted-foreground">
                                                        Klik tombol di atas untuk melakukan pembelian tiket
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            {/* Ticket Purchase Dialog */}
            <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
                <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                    {paymentStep === 'form' && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <Ticket className="h-5 w-5 text-terracotta" />
                                    Pembelian Tiket
                                </DialogTitle>
                                <DialogDescription>
                                    Lengkapi formulir di bawah untuk membeli tiket acara
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handlePurchase} className="space-y-6">
                                <div className="bg-linear-to-br from-terracotta/10 to-brown/5 rounded-lg p-4 border border-terracotta/20">
                                    <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                                    <div className="space-y-1 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-3 w-3" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Jenis Tiket</Label>
                                    <div className="space-y-2">
                                        {event.ticketTypes.map((ticketType, index) => (
                                            <div
                                                key={index}
                                                onClick={() => setSelectedTicketType(index)}
                                                className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedTicketType === index
                                                    ? 'border-terracotta bg-terracotta/5'
                                                    : 'border-border hover:border-terracotta/50'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedTicketType === index ? 'border-terracotta' : 'border-muted-foreground'
                                                        }`}>
                                                        {selectedTicketType === index && (
                                                            <div className="w-2 h-2 rounded-full bg-terracotta" />
                                                        )}
                                                    </div>
                                                    <span className="font-medium">{ticketType.name}</span>
                                                </div>
                                                <span className="text-terracotta font-semibold">
                                                    {formatCurrency(ticketType.price)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Jumlah Tiket</Label>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={ticketQuantity <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="text-2xl font-bold min-w-[3rem] text-center">
                                            {ticketQuantity}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleQuantityChange(1)}
                                            disabled={ticketQuantity >= 10}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                        <span className="text-sm text-muted-foreground ml-auto">
                                            Maks. 10 tiket
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold text-sm">Informasi Pembeli</h4>

                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nama Lengkap *</Label>
                                        <Input
                                            id="name"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            placeholder="Masukkan nama lengkap"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            placeholder="email@contoh.com"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Nomor Telepon *</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={customerPhone}
                                            onChange={(e) => setCustomerPhone(e.target.value)}
                                            placeholder="08xxxxxxxxxx"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="bg-linear-to-r from-terracotta/20 to-brown/10 rounded-lg p-4 border-2 border-terracotta/30">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-muted-foreground">
                                            {event.ticketTypes[selectedTicketType].name} x {ticketQuantity}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {formatCurrency(event.ticketTypes[selectedTicketType].price * ticketQuantity)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-terracotta/20">
                                        <span className="font-bold text-lg">Total</span>
                                        <span className="font-bold text-2xl text-terracotta">
                                            {formatCurrency(calculateTotal())}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCloseTicketDialog}
                                        className="flex-1"
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-linear-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
                                    >
                                        Lanjutkan Pembayaran
                                    </Button>
                                </div>
                            </form>
                        </>
                    )}

                    {/* Payment Method Selection */}
                    {paymentStep === 'method' && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <Ticket className="h-5 w-5 text-terracotta" />
                                    Pilih Metode Pembayaran
                                </DialogTitle>
                                <DialogDescription>
                                    Pilih metode pembayaran yang Anda inginkan
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                                {/* Order Summary */}
                                <div className="bg-linear-to-br from-terracotta/10 to-brown/5 rounded-lg p-4 border border-terracotta/20">
                                    <h4 className="font-semibold mb-2 text-sm">Ringkasan Pesanan</h4>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">{event.ticketTypes[selectedTicketType].name}</span>
                                            <span className="font-medium">{ticketQuantity}x</span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t border-terracotta/20">
                                            <span className="font-semibold">Total</span>
                                            <span className="font-bold text-terracotta">{formatCurrency(calculateTotal())}</span>
                                        </div>
                                    </div>
                                </div>

                                {paymentError && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-900">
                                        {paymentError}
                                    </div>
                                )}

                                {/* Bank Transfer */}
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-sm">Transfer Bank</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['bca', 'bni', 'bri', 'cimb'].map((bank) => (
                                            <button
                                                key={bank}
                                                type="button"
                                                onClick={() => {
                                                    setPaymentType('bank_transfer');
                                                    setSelectedBank(bank as any);
                                                }}
                                                className={`p-3 rounded-lg border-2 text-center font-medium uppercase transition-all ${paymentType === 'bank_transfer' && selectedBank === bank
                                                    ? 'border-terracotta bg-terracotta/5'
                                                    : 'border-border hover:border-terracotta/50'
                                                    }`}
                                            >
                                                {bank}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* E-Wallet */}
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-sm">E-Wallet</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentType('gopay')}
                                            className={`p-3 rounded-lg border-2 text-center font-medium transition-all ${paymentType === 'gopay'
                                                ? 'border-terracotta bg-terracotta/5'
                                                : 'border-border hover:border-terracotta/50'
                                                }`}
                                        >
                                            GoPay / QRIS
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPaymentType('shopeepay')}
                                            className={`p-3 rounded-lg border-2 text-center font-medium transition-all ${paymentType === 'shopeepay'
                                                ? 'border-terracotta bg-terracotta/5'
                                                : 'border-border hover:border-terracotta/50'
                                                }`}
                                        >
                                            ShopeePay
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setPaymentStep('form')}
                                        className="flex-1"
                                    >
                                        Kembali
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={handlePaymentMethodSelect}
                                        disabled={!paymentType || isLoading}
                                        className="flex-1 bg-linear-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
                                    >
                                        {isLoading ? 'Memproses...' : 'Lanjutkan'}
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Processing */}
                    {paymentStep === 'processing' && (
                        <div className="text-center py-12">
                            <div className="mb-4 flex justify-center">
                                <div className="w-16 h-16 border-4 border-terracotta/30 border-t-terracotta rounded-full animate-spin" />
                            </div>
                            <p className="text-lg font-medium">Membuat pembayaran...</p>
                            <p className="text-sm text-muted-foreground mt-2">Mohon tunggu sebentar</p>
                        </div>
                    )}

                    {/* Payment Instructions */}
                    {paymentStep === 'instructions' && paymentData && (
                        <>
                            <DialogHeader>
                                <DialogTitle>Instruksi Pembayaran</DialogTitle>
                                <DialogDescription>
                                    Selesaikan pembayaran untuk mengaktifkan tiket Anda
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                {/* Bank Transfer Instructions */}
                                {paymentType === 'bank_transfer' && paymentData.va_numbers && (
                                    <>
                                        <div className="bg-linear-to-br from-terracotta/10 to-brown/5 rounded-lg p-6 border border-terracotta/20">
                                            <h4 className="font-semibold mb-4 text-center">Nomor Virtual Account</h4>
                                            <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-border/50">
                                                <p className="text-xs text-muted-foreground text-center mb-2">
                                                    {paymentData.va_numbers[0].bank.toUpperCase()}
                                                </p>
                                                <div className="flex items-center justify-center gap-2">
                                                    <p className="text-2xl font-bold text-center tracking-wider">
                                                        {paymentData.va_numbers[0].va_number}
                                                    </p>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => handleCopyVA(paymentData.va_numbers[0].va_number)}
                                                    >
                                                        {isCopied ? (
                                                            <Check className="h-4 w-4 text-green-600" />
                                                        ) : (
                                                            <Copy className="h-4 w-4 text-muted-foreground" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-muted-foreground">Total Pembayaran</span>
                                                <span className="text-xl font-bold text-terracotta">
                                                    {formatCurrency(parseInt(paymentData.gross_amount))}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                                            <p className="font-semibold mb-2">Cara Pembayaran:</p>
                                            <ol className="list-decimal list-inside space-y-1 text-blue-900">
                                                <li>Buka aplikasi mobile banking atau ATM</li>
                                                <li>Pilih menu transfer ke Virtual Account</li>
                                                <li>Masukkan nomor VA di atas</li>
                                                <li>Masukkan jumlah yang harus dibayar</li>
                                                <li>Konfirmasi pembayaran</li>
                                            </ol>
                                        </div>
                                    </>
                                )}

                                {/* E-Money Instructions (QR Code) */}
                                {(paymentType === 'gopay' || paymentType === 'shopeepay') && paymentData.actions && (
                                    <>
                                        {paymentData.actions.find((a: any) => a.name === 'generate-qr-code') && (
                                            <div className="bg-linear-to-br from-terracotta/10 to-brown/5 rounded-lg p-6 border border-terracotta/20">
                                                <h4 className="font-semibold mb-4 text-center">Scan QR Code</h4>
                                                <div className="flex justify-center mb-4">
                                                    <img
                                                        src={paymentData.actions.find((a: any) => a.name === 'generate-qr-code').url}
                                                        alt="QR Code"
                                                        className="w-48 h-48 border-4 border-white rounded-lg"
                                                    />
                                                </div>
                                                <p className="text-sm text-center text-muted-foreground">
                                                    Scan dengan aplikasi {paymentType === 'gopay' ? 'GoPay/Gojek atau aplikasi QRIS lainnya' : 'ShopeePay'}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex justify-between items-center bg-muted/30 rounded-lg p-4 border border-border/50">
                                            <span className="text-sm text-muted-foreground">Total Pembayaran</span>
                                            <span className="text-xl font-bold text-terracotta">
                                                {formatCurrency(parseInt(paymentData.gross_amount))}
                                            </span>
                                        </div>
                                    </>
                                )}

                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
                                    <p className="font-medium mb-1">⏱️ Selesaikan pembayaran sebelum:</p>
                                    <p className="font-bold">
                                        {paymentData.expiry_time && new Date(paymentData.expiry_time).toLocaleString('id-ID')}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={checkPaymentStatus}
                                        className="flex-1"
                                    >
                                        Cek Status Pembayaran
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={handleCloseTicketDialog}
                                        className="flex-1 bg-linear-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
                                    >
                                        Tutup
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Payment Success */}
                    {paymentStep === 'success' && (
                        <>
                            <div className="text-center py-8">
                                <div className="mb-6 flex justify-center">
                                    <div className="w-20 h-20 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="h-12 w-12 text-white" />
                                    </div>
                                </div>

                                <DialogTitle className="text-2xl mb-2">Pembayaran Berhasil!</DialogTitle>
                                <DialogDescription className="text-base mb-6">
                                    Tiket Anda telah berhasil dibeli
                                </DialogDescription>

                                <div className="bg-linear-to-br from-terracotta/10 to-brown/5 rounded-lg p-6 mb-6 text-left border border-terracotta/20">
                                    <h4 className="font-semibold mb-4 text-center">Detail Pemesanan</h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Acara</span>
                                            <span className="font-medium text-right">{event.title}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Jenis Tiket</span>
                                            <span className="font-medium">{event.ticketTypes[selectedTicketType].name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Jumlah</span>
                                            <span className="font-medium">{ticketQuantity} tiket</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Nama</span>
                                            <span className="font-medium">{customerName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Email</span>
                                            <span className="font-medium">{customerEmail}</span>
                                        </div>
                                        <div className="flex justify-between pt-3 border-t border-terracotta/20">
                                            <span className="font-semibold">Total Bayar</span>
                                            <span className="font-bold text-terracotta text-lg">
                                                {formatCurrency(calculateTotal())}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-blue-900">
                                    <p className="font-medium mb-1">📧 E-Tiket Dikirim ke Email</p>
                                    <p className="text-blue-700">
                                        Silakan cek email Anda untuk mendapatkan e-tiket dan instruksi lebih lanjut.
                                    </p>
                                </div>

                                <Button
                                    onClick={handleCloseTicketDialog}
                                    className="w-full bg-linear-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
                                >
                                    Tutup
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
};

export default AgendaDetailPage;
