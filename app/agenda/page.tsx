"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar as CalendarIcon, Search, Ticket, Plus, Minus, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { id } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { eventData as culturalEvents } from "@/data";

const locales = {
  'id': id,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AgendaPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<View>("month");

  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof culturalEvents[0] | null>(null);
  const [selectedTicketType, setSelectedTicketType] = useState(0);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);

  const calendarEvents = useMemo(() => {
    return culturalEvents.map(event => ({
      id: event.id,
      title: event.title,
      start: event.dateObj,
      end: event.dateObj,
      resource: event,
    }));
  }, []);

  const filteredEvents = culturalEvents.filter(event => {
    if (!searchQuery) return true;
    return (
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const eventStyleGetter = (event: any) => {
    const eventData = event.resource;
    let backgroundColor = '#8B5CF6';

    if (eventData.type === 'Festival') {
      backgroundColor = '#8B5CF6';
    } else if (eventData.type === 'Workshop') {
      backgroundColor = '#3B82F6';
    } else if (eventData.type === 'Pertunjukan') {
      backgroundColor = '#10B981';
    } else if (eventData.type === 'Pameran') {
      backgroundColor = '#F59E0B';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
      }
    };
  };

  const handleBuyTicket = (event: typeof culturalEvents[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setSelectedTicketType(0);
    setTicketQuantity(1);
    setIsPurchaseComplete(false);
    setIsTicketDialogOpen(true);
  };

  const handleCloseTicketDialog = () => {
    setIsTicketDialogOpen(false);
    setSelectedEvent(null);
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setTicketQuantity(1);
    setIsPurchaseComplete(false);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = ticketQuantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setTicketQuantity(newQuantity);
    }
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPurchaseComplete(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateTotal = () => {
    if (!selectedEvent) return 0;
    return selectedEvent.ticketTypes[selectedTicketType].price * ticketQuantity;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ChatbotWidget />

      <main className="pt-30 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Agenda Budaya
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Lihat jadwal acara dan kegiatan budaya Topeng Malangan
            </p>
          </div>

          <div className="mb-8 animate-fade-in">
            <Card className="p-0 overflow-hidden">
              <div className="calendar-wrapper p-6" style={{ height: '500px' }}>
                <Calendar
                  localizer={localizer}
                  events={calendarEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100%' }}
                  view={view}
                  onView={setView}
                  eventPropGetter={eventStyleGetter}
                  onSelectEvent={(event) => {
                    window.location.href = `/agenda/event-${event.resource.id}`;
                  }}
                  culture="id"
                  messages={{
                    next: "Berikutnya",
                    previous: "Sebelumnya",
                    today: "Hari Ini",
                    month: "Bulan",
                    week: "Minggu",
                    day: "Hari",
                    agenda: "Agenda",
                    date: "Tanggal",
                    time: "Waktu",
                    event: "Acara",
                    noEventsInRange: "Tidak ada acara dalam rentang ini",
                    showMore: (total) => `+${total} lagi`,
                  }}
                />
              </div>
            </Card>

            <Card className="mt-4 p-6">
              <h3 className="text-sm font-semibold mb-3">Jenis Acara</h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#8B5CF6' }} />
                  <span className="text-xs text-muted-foreground">Festival</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3B82F6' }} />
                  <span className="text-xs text-muted-foreground">Workshop</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10B981' }} />
                  <span className="text-xs text-muted-foreground">Pertunjukan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F59E0B' }} />
                  <span className="text-xs text-muted-foreground">Pameran</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Daftar Acara</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari acara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <Link
                key={event.id}
                href={`/agenda/event-${event.id}`}
              >
                <Card
                  className="overflow-hidden hover:shadow-elevated transition-all cursor-pointer group animate-fade-in p-0"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="aspect-video bg-linear-to-br from-gold to-cream relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CalendarIcon className="h-16 w-16 text-brown/80" />
                    </div>
                    <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">
                      {event.eventType}
                    </Badge>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleBuyTicket(event, e);
                      }}
                      className="w-full bg-linear-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
                      size="sm"
                    >
                      <Ticket className="h-4 w-4 mr-2" />
                      Daftar
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tidak ada acara ditemukan</p>
            </div>
          )}
        </div>
      </main>

      <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          {!isPurchaseComplete ? (
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

              {selectedEvent && (
                <form onSubmit={handlePurchase} className="space-y-6">
                  <div className="bg-gradient-to-br from-terracotta/10 to-brown/5 rounded-lg p-4 border border-terracotta/20">
                    <h3 className="font-semibold text-foreground mb-2">{selectedEvent.title}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{selectedEvent.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{selectedEvent.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Jenis Tiket</Label>
                    <div className="space-y-2">
                      {selectedEvent.ticketTypes.map((ticketType, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedTicketType(index)}
                          className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedTicketType === index
                              ? 'border-terracotta bg-terracotta/5'
                              : 'border-border hover:border-terracotta/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              selectedTicketType === index ? 'border-terracotta' : 'border-muted-foreground'
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

                  <div className="bg-gradient-to-r from-terracotta/20 to-brown/10 rounded-lg p-4 border-2 border-terracotta/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        {selectedEvent.ticketTypes[selectedTicketType].name} x {ticketQuantity}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(selectedEvent.ticketTypes[selectedTicketType].price * ticketQuantity)}
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
                      className="flex-1 bg-gradient-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
                    >
                      Lanjutkan Pembayaran
                    </Button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <>
              <div className="text-center py-8">
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-12 w-12 text-white" />
                  </div>
                </div>

                <DialogTitle className="text-2xl mb-2">Pembelian Berhasil!</DialogTitle>
                <DialogDescription className="text-base mb-6">
                  Tiket Anda telah berhasil dipesan
                </DialogDescription>

                {selectedEvent && (
                  <div className="bg-gradient-to-br from-terracotta/10 to-brown/5 rounded-lg p-6 mb-6 text-left border border-terracotta/20">
                    <h4 className="font-semibold mb-4 text-center">Detail Pemesanan</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Acara</span>
                        <span className="font-medium text-right">{selectedEvent.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Jenis Tiket</span>
                        <span className="font-medium">{selectedEvent.ticketTypes[selectedTicketType].name}</span>
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
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-blue-900">
                  <p className="font-medium mb-1">E-Tiket Dikirim ke Email</p>
                  <p className="text-blue-700">
                    Silakan cek email Anda untuk mendapatkan e-tiket dan instruksi lebih lanjut.
                  </p>
                </div>

                <Button
                  onClick={handleCloseTicketDialog}
                  className="w-full bg-gradient-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
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

export default AgendaPage;
