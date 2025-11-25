// Video documentation data
export interface Video {
  id: number;
  title: string;
  date: string;
  location: string;
  dancers: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  views: string;
  fullDescription: string;
  credits: string;
}

export const videos: Video[] = [
  {
    id: 1,
    title: "Pertunjukan Panji Asmarabangun",
    date: "19 Februari 2021",
    location: "Pendopo Kabupaten Malang",
    dancers: "Kelompok Tari Asmorobangun",
    duration: "7:02",
    thumbnail: "https://s3.us-east-1.wasabisys.com/agendaindonesia/2020/08/Topeng-Malang-shutterstock.jpg",
    videoUrl: "https://www.youtube.com/embed/sAxl9DdPy4A",
    description: "Pertunjukan lengkap lakon Panji dengan kostum tradisional dan tata panggung yang megah",
    views: "48K",
    fullDescription: `Pertunjukan spektakuler lakon Panji Asmarabangun yang menampilkan kisah pencarian cinta sejati. Dipersembahkan oleh Kelompok Tari Asmorobangun dengan kostum tradisional yang autentik dan tata panggung yang memukau.

Pertunjukan ini menampilkan berbagai karakter topeng klasik termasuk Panji, Sekartaji, dan Klana Sewandana. Setiap gerakan tari dirancang dengan teliti untuk menceritakan alur cerita yang emosional dan mendalam.

Musik gamelan tradisional mengiringi setiap adegan, menciptakan atmosfer yang magis dan membawa penonton kembali ke masa kejayaan kerajaan Jawa kuno.`,
    credits: "Koreografer: Bapak Tri Handoyo\nPenata Musik: I Wayan Sadra\nPenata Busana: Ibu Ratna Sari"
  },
  {
    id: 2,
    title: "Workshop Tari Topeng untuk Pemula",
    date: "22 Januari 2022",
    location: "Sanggar Sido Mukti, Malang",
    dancers: "Ibu Siti Aminah & Murid",
    duration: "11:51",
    thumbnail: "https://i.ytimg.com/vi/6t0QhyyB4vg/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/ZP3zK1vSdYw",
    description: "Dokumentasi workshop mengajarkan gerakan dasar tari topeng kepada generasi muda",
    views: "3.2K",
    fullDescription: `Workshop edukatif yang mengajarkan dasar-dasar tari topeng Malangan kepada generasi muda. Dipandu langsung oleh Ibu Siti Aminah, seorang penari senior dengan pengalaman lebih dari 30 tahun.

Dalam workshop ini, peserta belajar tentang filosofi setiap gerakan, cara memakai topeng dengan benar, dan teknik pernapasan yang tepat saat menari. Materi disajikan dengan cara yang menyenangkan dan mudah dipahami.

Video ini sangat bermanfaat bagi siapa saja yang ingin mempelajari seni tari topeng Malangan, baik untuk kepentingan pendidikan maupun pelestarian budaya.`,
    credits: "Instruktur: Ibu Siti Aminah\nDokumentasi: Tim Sanggar Sido Mukti\nEditor: Ahmad Fauzi"
  },
  {
    id: 3,
    title: "Festival Topeng Malangan 2024",
    date: "29 Juli 2020",
    location: "Alun-alun Kota Malang",
    dancers: "10+ Sanggar dari Malang Raya",
    duration: "3:41",
    thumbnail: "https://cdn.antaranews.com/cache/1200x800/2013/04/20130429topeng1.jpg",
    videoUrl: "https://youtube.com/embed/uRTLwq-EXJI",
    description: "Kompilasi penampilan dari berbagai sanggar dalam festival budaya tahunan",
    views: "12K",
    fullDescription: `Festival tahunan yang mempertemukan lebih dari 10 sanggar tari topeng dari seluruh Malang Raya. Acara ini merupakan ajang bergengsi untuk menunjukkan keberagaman interpretasi dan gaya tari topeng Malangan.

Setiap sanggar menampilkan lakon terbaik mereka dengan kostum dan properti yang memukau. Festival ini juga menjadi wadah untuk pertukaran pengetahuan dan pengalaman antar pelaku seni.

Acara ini dihadiri oleh ribuan penonton dari berbagai kalangan, mulai dari pelajar, mahasiswa, hingga wisatawan domestik dan mancanegara. Festival Topeng Malangan telah menjadi agenda budaya tahunan yang dinantikan oleh masyarakat Malang.`,
    credits: "Penyelenggara: Dinas Kebudayaan Kota Malang\nKoordinator Acara: Bapak Sugeng Raharjo\nDokumentasi: Malang TV"
  }
];
