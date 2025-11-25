// Sanggar (traditional art studio) data
export interface UpcomingEvent {
  title: string;
  date: string;
  type?: string;
}

export interface SanggarServices {
  tariCourse: boolean;
  topengWorkshop: boolean;
  performances: boolean;
  privateLesson: boolean;
}

export interface Sanggar {
  id: number;
  type: "sanggar";
  name: string;
  location: string;
  address: string;
  phone: string;
  website: string;
  social: string;
  specialty: string;
  openTime: string;
  description: string;
  services?: SanggarServices;
  fullDescription?: string;
  coordinates: [number, number];
  facilities?: string;
  upcomingEvents: UpcomingEvent[];
}

export const sanggarData: Sanggar[] = [
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
    services: {
      tariCourse: true,
      topengWorkshop: true,
      performances: true,
      privateLesson: true
    },
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
    services: {
      tariCourse: true,
      topengWorkshop: false,
      performances: true,
      privateLesson: true
    },
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
    coordinates: [-7.9866, 112.7145],
    upcomingEvents: [
      { title: "Persiapan Festival Topeng", date: "Setiap Minggu" }
    ]
  }
];
