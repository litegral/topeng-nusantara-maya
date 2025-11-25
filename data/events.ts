// Cultural events data
export interface TicketType {
  name: string;
  price: number;
}

export interface Event {
  id: number;
  type: "event";
  title: string;
  date: string;
  dateObj: Date;
  time: string;
  location: string;
  address: string;
  organizer: string;
  eventType: string;
  description: string;
  fullDescription: string;
  facilities: string;
  ticketPrice: number;
  ticketInfo: string;
  contact: string;
  registrationUrl: string | null;
  availableTickets: number;
  ticketTypes: TicketType[];
}

export const eventData: Event[] = [
  {
    id: 1,
    type: "event",
    title: "Festival Topeng Malangan 2025",
    date: "15 November 2025",
    dateObj: new Date(2025, 10, 15),
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
    registrationUrl: "https://example.com/register/festival-topeng-2025",
    availableTickets: 500,
    ticketTypes: [
      { name: "Reguler", price: 50000 },
      { name: "VIP", price: 100000 },
    ]
  },
  {
    id: 2,
    type: "event",
    title: "Workshop Pembuatan Topeng",
    date: "20 November 2025",
    dateObj: new Date(2025, 10, 20),
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
    registrationUrl: "https://example.com/register/workshop-topeng",
    availableTickets: 30,
    ticketTypes: [
      { name: "Workshop + Material", price: 150000 },
    ]
  },
  {
    id: 3,
    type: "event",
    title: "Pentas Seni Bulanan",
    date: "25 November 2025",
    dateObj: new Date(2025, 10, 25),
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
    registrationUrl: "https://example.com/register/pentas-seni",
    availableTickets: 200,
    ticketTypes: [
      { name: "Umum", price: 25000 },
      { name: "Pelajar", price: 15000 },
    ]
  },
  {
    id: 4,
    type: "event",
    title: "Pelatihan Tari Topeng Pemula",
    date: "5 Desember 2025",
    dateObj: new Date(2025, 11, 5),
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
    registrationUrl: "https://example.com/register/pelatihan-pemula",
    availableTickets: 25,
    ticketTypes: [
      { name: "Pemula", price: 100000 },
    ]
  },
  {
    id: 5,
    type: "event",
    title: "Pameran Topeng Nusantara",
    date: "12 Desember 2025",
    dateObj: new Date(2025, 11, 12),
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
    registrationUrl: "https://example.com/register/pameran-topeng",
    availableTickets: 1000,
    ticketTypes: [
      { name: "Umum", price: 20000 },
      { name: "Pelajar", price: 10000 },
    ]
  },
  {
    id: 6,
    type: "event",
    title: "Latihan Terbuka Tari Topeng",
    date: "18 November 2025",
    dateObj: new Date(2025, 10, 18),
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
    registrationUrl: null,
    availableTickets: 100,
    ticketTypes: [
      { name: "Gratis", price: 0 },
    ]
  },
  {
    id: 7,
    type: "event",
    title: "Pertunjukan Wayang Topeng",
    date: "28 November 2025",
    dateObj: new Date(2025, 10, 28),
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
    registrationUrl: "https://example.com/register/wayang-topeng",
    availableTickets: 300,
    ticketTypes: [
      { name: "Reguler", price: 35000 },
      { name: "VIP", price: 75000 },
    ]
  }
];
