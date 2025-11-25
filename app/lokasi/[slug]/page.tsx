"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Phone, Globe, Calendar, Clock, Ticket } from "lucide-react";
import { eventData as allEvents } from "@/lib/events-data";

const sanggarData = [
  {
    id: 1,
    type: "sanggar",
    name: "Sanggar Asmorobangun",
    location: "Malang Kota",
    address: "Jl. Veteran No. 12, Malang",
    phone: "+62 341 123456",
    website: "asmorobangun.id",
    social: "@asmorobangun",
    specialty: "Panji & Klana",
    openTime: "Senin - Sabtu, 15:00 - 18:00",
    description: "Sanggar tertua di Malang dengan spesialisasi lakon Panji dan pengembangan topeng klasik",
    fullDescription: `Sanggar Asmorobangun didirikan pada tahun 1965 oleh almarhum Ki Soleh Adi Pramono, seorang maestro tari topeng Malangan. Sanggar ini telah menjadi pusat pembelajaran dan pelestarian seni tari topeng selama lebih dari 50 tahun.

Dengan fokus pada lakon Panji dan karakter Klana, sanggar ini telah melahirkan banyak penari berbakat yang kini tersebar di berbagai daerah. Metode pengajaran yang digunakan menggabungkan teknik tradisional dengan pendekatan modern yang lebih mudah dipahami oleh generasi muda.

Sanggar ini juga aktif dalam kegiatan penelitian dan dokumentasi tari topeng Malangan, bekerja sama dengan berbagai universitas dan lembaga budaya baik nasional maupun internasional.`,
    coordinates: [-7.9666, 112.6326],
    facilities: "Ruang latihan ber-AC, Gamelan lengkap, Perpustakaan topeng, Ruang kostum",
    upcomingEvents: [
      { title: "Latihan Rutin Tari Panji", date: "Setiap Rabu, 16:00", type: "Latihan" },
      { title: "Workshop Topeng untuk Umum", date: "25 November 2024", type: "Workshop" }
    ]
  },
  {
    id: 2,
    type: "sanggar",
    name: "Sanggar Sido Mukti",
    location: "Malang Selatan",
    address: "Jl. Sulfat No. 45, Malang",
    phone: "+62 341 234567",
    website: "sidomukti.org",
    social: "@sidomukti_mlg",
    specialty: "Gunungsari & Ragil Kuning",
    openTime: "Selasa - Minggu, 14:00 - 17:00",
    description: "Fokus pada karakter putri dan pengajaran tari untuk anak-anak serta remaja",
    fullDescription: `Sanggar Sido Mukti berdiri pada tahun 1980 dengan visi khusus untuk mengembangkan karakter putri dalam tari topeng Malangan. Dipimpin oleh Ibu Siti Aminah, sanggar ini dikenal dengan program pendidikan tari untuk anak-anak dan remaja.

Metode pengajaran yang ramah anak membuat Sido Mukti menjadi pilihan favorit orang tua yang ingin mengenalkan seni tradisional kepada anak-anak mereka. Program khusus untuk anak usia 7-12 tahun dirancang dengan pendekatan yang menyenangkan tanpa mengurangi nilai-nilai tradisi.

Sanggar ini juga rutin mengadakan pertunjukan bulanan sebagai ajang latihan untuk para murid, memberikan mereka pengalaman tampil di depan publik sejak dini.`,
    coordinates: [-7.9797, 112.6304],
    facilities: "Studio tari, Area bermain anak, Perpustakaan, Kantin",
    upcomingEvents: [
      { title: "Kelas Tari Anak", date: "Setiap Sabtu, 09:00", type: "Kelas" },
      { title: "Pentas Bulanan", date: "30 November 2024", type: "Pertunjukan" }
    ]
  },
  {
    id: 3,
    type: "sanggar",
    name: "Sanggar Tumpang Rejo",
    location: "Tumpang, Malang",
    address: "Desa Tumpang, Kec. Tumpang, Malang",
    phone: "+62 341 345678",
    website: "-",
    social: "@tumpangrejo",
    specialty: "Ensemble & Festival",
    openTime: "Minggu, 10:00 - 15:00",
    description: "Sanggar komunitas yang aktif di festival dan kompetisi regional",
    fullDescription: `Sanggar Tumpang Rejo adalah sanggar komunitas yang tumbuh dari kecintaan masyarakat Tumpang terhadap seni tradisional. Berbeda dengan sanggar lain, Tumpang Rejo lebih fokus pada pertunjukan ensemble dan partisipasi dalam festival-festival budaya.

Sanggar ini terkenal dengan formasi grupnya yang kompak dan energik. Mereka sering menjuarai berbagai kompetisi tari topeng tingkat regional dan nasional. Semangat kebersamaan dan gotong royong menjadi kekuatan utama sanggar ini.

Meskipun hanya berlatih pada hari Minggu, dedikasi anggota sanggar sangat tinggi. Mereka rela mengorbankan waktu istirahat untuk berlatih dan mempersiapkan pertunjukan terbaik.`,
    coordinates: [-7.9866, 112.7145],
    facilities: "Pendopo terbuka, Area parkir luas, Mushola",
    upcomingEvents: [
      { title: "Persiapan Festival Topeng", date: "Setiap Minggu", type: "Latihan" }
    ]
  }
];

const eventData = [
  {
    id: 1,
    type: "event",
    title: "Festival Topeng Malangan 2025",
    date: "15 November 2025",
    time: "09:00 - 17:00 WIB",
    location: "Alun-alun Kota Malang",
    address: "Jl. Tugu No. 1, Malang",
    organizer: "Dinas Kebudayaan Kota Malang",
    eventType: "Festival",
    description: "Festival tahunan menampilkan 20+ sanggar dari Malang Raya",
    fullDescription: `Festival Topeng Malangan adalah acara budaya tahunan terbesar di Malang yang mempertemukan lebih dari 20 sanggar dari seluruh Malang Raya. Festival ini telah menjadi agenda wajib bagi pecinta seni tradisional di Jawa Timur.

Acara ini menampilkan berbagai pertunjukan tari topeng dari berbagai sanggar, workshop, pameran topeng dan kostum, serta bazaar kuliner dan kerajinan tradisional. Pengunjung dapat menikmati pertunjukan sambil belajar tentang sejarah dan filosofi tari topeng Malangan.

Festival ini juga menjadi ajang kompetisi bergengsi bagi sanggar-sanggar untuk menunjukkan karya terbaik mereka. Pemenang akan mendapatkan penghargaan dan kesempatan untuk tampil di acara-acara nasional.`,
    facilities: "Panggung utama, Area workshop, Booth pameran, Food court",
    ticketPrice: 50000,
    ticketInfo: "Reguler: Rp 50.000 | VIP: Rp 100.000",
    contact: "+62 341 363636",
    registrationUrl: "https://example.com/register/festival-topeng-2025"
  },
  {
    id: 2,
    type: "event",
    title: "Workshop Pembuatan Topeng",
    date: "20 November 2025",
    time: "13:00 - 17:00 WIB",
    location: "Sanggar Asmorobangun",
    address: "Jl. Veteran No. 12, Malang",
    organizer: "Sanggar Asmorobangun",
    eventType: "Workshop",
    description: "Belajar membuat topeng dari pengrajin berpengalaman",
    fullDescription: `Workshop khusus yang mengajarkan teknik pembuatan topeng Malangan secara tradisional. Dipandu langsung oleh Ki Sarno, pengrajin topeng dengan pengalaman lebih dari 40 tahun.

Peserta akan belajar mulai dari pemilihan bahan, pembentukan dasar topeng, penghalusan, hingga teknik pengecatan tradisional. Workshop ini cocok untuk siapa saja yang tertarik dengan kerajinan tangan dan ingin mempelajari seni membuat topeng.

Setiap peserta akan membawa pulang satu topeng hasil karya sendiri. Workshop ini dibatasi untuk 30 peserta saja untuk memastikan setiap peserta mendapat bimbingan yang maksimal.`,
    facilities: "Ruang workshop, Peralatan lengkap, Bahan-bahan, Snack & minuman",
    ticketPrice: 150000,
    ticketInfo: "Rp 150.000/peserta (termasuk bahan dan topeng)",
    contact: "+62 341 123456",
    registrationUrl: "https://example.com/register/workshop-topeng"
  },
  {
    id: 3,
    type: "event",
    title: "Pentas Seni Bulanan",
    date: "25 November 2025",
    time: "19:00 - 21:00 WIB",
    location: "Pendopo Kabupaten Malang",
    address: "Jl. Panji No. 1, Kepanjen, Malang",
    organizer: "Komunitas Seni Malang",
    eventType: "Pertunjukan",
    description: "Pertunjukan rutin menampilkan berbagai sanggar lokal",
    fullDescription: `Pentas Seni Bulanan adalah acara rutin yang diselenggarakan setiap akhir bulan sebagai wadah untuk sanggar-sanggar kecil dan menengah untuk menampilkan karya mereka. Acara ini gratis dan terbuka untuk umum.

Setiap edisi menampilkan 3-5 sanggar dengan lakon dan karakter yang berbeda-beda. Acara ini memberikan kesempatan bagi penari pemula untuk tampil dan mendapat pengalaman panggung yang berharga.

Suasana yang informal dan ramah membuat acara ini cocok untuk seluruh keluarga. Penonton dapat berinteraksi langsung dengan para penari setelah pertunjukan untuk bertanya dan berdiskusi tentang tari topeng.`,
    facilities: "Panggung indoor, Tempat duduk 200 orang, Parkir gratis",
    ticketPrice: 25000,
    ticketInfo: "Umum: Rp 25.000 | Pelajar: Rp 15.000",
    contact: "+62 341 456789",
    registrationUrl: "https://example.com/register/pentas-seni"
  },
  {
    id: 4,
    type: "event",
    title: "Pelatihan Tari Topeng Pemula",
    date: "5 Desember 2025",
    time: "14:00 - 17:00 WIB",
    location: "Sanggar Sido Mukti",
    address: "Jl. Sulfat No. 45, Malang",
    organizer: "Sanggar Sido Mukti",
    eventType: "Workshop",
    description: "Workshop khusus untuk pemula yang ingin belajar tari topeng",
    fullDescription: `Program pelatihan intensif untuk pemula yang ingin mempelajari tari topeng Malangan dari dasar. Dipandu oleh instruktur berpengalaman dari Sanggar Sido Mukti yang telah mengajar puluhan siswa.

Pelatihan ini mencakup dasar-dasar gerak tari, filosofi setiap karakter topeng, dan latihan praktis menggunakan topeng. Peserta tidak perlu memiliki latar belakang tari sebelumnya.

Setiap peserta akan mendapatkan modul pembelajaran dan kesempatan untuk terus berlatih di sanggar setelah workshop selesai. Kapasitas terbatas hanya 25 orang.`,
    facilities: "Studio tari ber-AC, Topeng latihan, Gamelan, Dokumentasi video",
    ticketPrice: 100000,
    ticketInfo: "Rp 100.000/peserta",
    contact: "+62 341 234567",
    registrationUrl: "https://example.com/register/pelatihan-pemula"
  },
  {
    id: 5,
    type: "event",
    title: "Pameran Topeng Nusantara",
    date: "12 Desember 2025",
    time: "10:00 - 18:00 WIB",
    location: "Museum Malang",
    address: "Jl. Ijen No. 25A, Malang",
    organizer: "Dinas Pariwisata Malang",
    eventType: "Pameran",
    description: "Pameran koleksi topeng dari berbagai daerah di Indonesia",
    fullDescription: `Pameran spesial yang menampilkan lebih dari 200 koleksi topeng dari berbagai daerah di Indonesia. Mulai dari topeng Malangan, Cirebon, Bali, Papua, hingga topeng kontemporer karya seniman muda.

Pameran ini memberikan insight mendalam tentang keragaman budaya Indonesia melalui seni topeng. Setiap topeng memiliki cerita dan filosofi yang unik. Dilengkapi dengan audio guide dan pemandu ahli.

Cocok untuk pelajar, peneliti, dan siapa saja yang ingin mengenal kekayaan budaya Indonesia. Pameran ini juga menjual replika topeng dan merchandise khusus.`,
    facilities: "Ruang pameran ber-AC, Audio guide, Cafe, Souvenir shop, Parkir luas",
    ticketPrice: 20000,
    ticketInfo: "Umum: Rp 20.000 | Pelajar: Rp 10.000",
    contact: "+62 341 567890",
    registrationUrl: "https://example.com/register/pameran-topeng"
  },
  {
    id: 6,
    type: "event",
    title: "Latihan Terbuka Tari Topeng",
    date: "18 November 2025",
    time: "16:00 - 18:00 WIB",
    location: "Sanggar Asmorobangun",
    address: "Jl. Veteran No. 12, Malang",
    organizer: "Sanggar Asmorobangun",
    eventType: "Workshop",
    description: "Sesi latihan terbuka untuk umum, gratis untuk menonton",
    fullDescription: `Sesi latihan terbuka yang mempersilakan masyarakat umum untuk datang dan menonton proses latihan tari topeng secara langsung. Ini adalah kesempatan langka untuk melihat bagaimana para penari berlatih dan berinteraksi dengan instruktur.

Pengunjung dapat melihat teknik-teknik latihan, koreksi gerakan, dan proses pembelajaran yang biasanya hanya bisa dilihat oleh anggota sanggar. Setelah sesi latihan, pengunjung dapat bertanya dan berdiskusi dengan para penari.

Acara ini gratis dan tidak memerlukan pendaftaran sebelumnya. Cocok untuk siapa saja yang penasaran dengan dunia tari topeng atau sedang mempertimbangkan untuk belajar tari.`,
    facilities: "Ruang latihan terbuka, Tempat duduk penonton, Toilet, Area parkir",
    ticketPrice: 0,
    ticketInfo: "GRATIS - Tidak perlu pendaftaran",
    contact: "+62 341 123456",
    registrationUrl: null
  },
  {
    id: 7,
    type: "event",
    title: "Pertunjukan Wayang Topeng",
    date: "28 November 2025",
    time: "19:30 - 22:00 WIB",
    location: "Gedung Kesenian Malang",
    address: "Jl. Kawi No. 1, Malang",
    organizer: "Dinas Kebudayaan",
    eventType: "Pertunjukan",
    description: "Pertunjukan wayang topeng oleh dalang terkenal",
    fullDescription: `Pertunjukan spesial wayang topeng yang mengangkat lakon Panji Asmarabangun. Dipentaskan oleh dalang terkenal Ki Warseno yang telah malang melintang di dunia pewayangan selama 35 tahun.

Wayang topeng menggabungkan unsur tari, musik gamelan, dan narasi yang kuat. Pertunjukan ini menghadirkan pengalaman teatrikal yang memukau dengan kostum dan topeng yang indah.

Acara ini dilengkapi dengan terjemahan bahasa Indonesia untuk memudahkan pemahaman cerita. Sangat direkomendasikan untuk keluarga dan pencinta seni pertunjukan tradisional.`,
    facilities: "Teater ber-AC, Tempat duduk 500 orang, Sound system profesional, Lighting modern",
    ticketPrice: 35000,
    ticketInfo: "Reguler: Rp 35.000 | VIP: Rp 75.000",
    contact: "+62 341 678901",
    registrationUrl: "https://example.com/register/wayang-topeng"
  }
];

const LokasiDetail = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  // Parse slug to get type and id (format: sanggar-1 or event-1)
  const [type, idStr] = slug.split('-');
  const id = parseInt(idStr);

  const item = type === "sanggar"
    ? sanggarData.find(s => s.id === id)
    : eventData.find(e => e.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Data tidak ditemukan</p>
      </div>
    );
  }

  const isSanggar = type === "sanggar";

  // Get events related to this sanggar location
  const relatedEvents = isSanggar
    ? allEvents.filter(event => event.location === (item as any).name)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ChatbotWidget />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => router.push("/lokasi")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Peta
          </Button>

          <div className="animate-fade-in space-y-6">
            <Card>
              <CardContent className="p-8">
                <div className="mb-6">
                  <Badge variant="secondary" className="mb-3">
                    {isSanggar ? "Sanggar" : (item as any).eventType}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {isSanggar ? (item as any).name : (item as any).title}
                  </h1>
                  {isSanggar && (
                    <p className="text-lg text-muted-foreground mb-4">
                      {(item as any).description}
                    </p>
                  )}
                </div>

                {/* Contact Info Grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Alamat</p>
                      <p className="font-semibold text-foreground">{(item as any).address}</p>
                      {!isSanggar && (
                        <p className="text-sm text-muted-foreground">{(item as any).location}</p>
                      )}
                    </div>
                  </div>

                  {isSanggar ? (
                    <>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Telepon</p>
                          <p className="font-semibold text-foreground">{(item as any).phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Jam Operasional</p>
                          <p className="font-semibold text-foreground">{(item as any).openTime}</p>
                        </div>
                      </div>
                      {/* <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-1">{(item as any).specialty}</Badge>
                      </div> */}
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Tanggal & Waktu</p>
                          <p className="font-semibold text-foreground">{(item as any).date}</p>
                          <p className="text-sm text-muted-foreground">{(item as any).time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Kontak</p>
                          <p className="font-semibold text-foreground">{(item as any).contact}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {isSanggar ? "Tentang Sanggar" : "Tentang Acara"}
                    </h3>
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                      {(item as any).fullDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Fasilitas
                    </h3>
                    <p className="text-foreground/80">
                      {(item as any).facilities}
                    </p>
                  </div>

                  {!isSanggar && (
                    <>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          Informasi Tiket
                        </h3>
                        <p className="text-foreground/80">
                          {(item as any).ticketInfo}
                        </p>
                      </div>

                      {/* Registration Section */}
                      <div className="mt-6 p-6 bg-gradient-to-r from-terracotta/10 to-brown/10 rounded-lg border border-terracotta/20">
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          Pendaftaran
                        </h3>
                        {(item as any).ticketPrice === 0 ? (
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary" className="text-lg py-1 px-4 bg-green-500/20 text-green-700 border-green-500/30">
                                GRATIS
                              </Badge>
                              <p className="text-muted-foreground">Acara ini gratis dan terbuka untuk umum</p>
                            </div>
                            {(item as any).registrationUrl ? (
                              <Button
                                onClick={() => window.open((item as any).registrationUrl, '_blank')}
                                className="w-full md:w-auto bg-gradient-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
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
                            {(item as any).registrationUrl && (
                              <Button
                                onClick={() => window.open((item as any).registrationUrl, '_blank')}
                                className="w-full md:w-auto bg-gradient-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream"
                                size="lg"
                              >
                                <Ticket className="h-5 w-5 mr-2" />
                                Daftar Sekarang
                              </Button>
                            )}
                            <p className="text-sm text-muted-foreground">
                              Klik tombol di atas untuk melakukan pendaftaran dan pembayaran tiket
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Social Media & Website */}
                {isSanggar && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex flex-wrap gap-3">
                      {(item as any).website !== "-" && (
                        <Button variant="outline" className="gap-2">
                          <Globe className="h-4 w-4" />
                          {(item as any).website}
                        </Button>
                      )}
                      <Button variant="outline" className="gap-2">
                        <Globe className="h-4 w-4" />
                        {(item as any).social}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Related Events (for sanggar) */}
            {isSanggar && relatedEvents.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Acara di Lokasi Ini
                  </h3>
                  <div className="grid gap-4">
                    {relatedEvents.map((event) => (
                      <Link key={event.id} href={`/agenda/event-${event.id}`}>
                        <Card className="hover:shadow-lg transition-all cursor-pointer border-terracotta/20">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {event.eventType}
                                  </Badge>
                                  {event.ticketPrice === 0 && (
                                    <Badge className="text-xs bg-green-500/20 text-green-700 border-green-500/30">
                                      GRATIS
                                    </Badge>
                                  )}
                                </div>
                                <h4 className="font-semibold text-foreground mb-2 line-clamp-1">
                                  {event.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                  {event.description}
                                </p>
                                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-3 w-3" />
                                    <span>{event.date}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3" />
                                    <span>{event.time}</span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                className="bg-linear-to-r from-terracotta to-brown hover:from-terracotta/90 hover:to-brown/90 text-cream shrink-0"
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.location.href = `/agenda/event-${event.id}`;
                                }}
                              >
                                <Ticket className="h-4 w-4 mr-1" />
                                Detail
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LokasiDetail;
