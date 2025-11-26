"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ShortStory from "@/components/ShortStory";
import BookStory from "@/components/BookStory";
import RecommendationCard from "@/components/RecommendationCard";
import { ContextExtractor } from "@/lib/context-extractor";

const stories = [
    {
        id: 1,
        title: "Lakon Panji Asmarabangun",
        character: "Panji",
        narrator: "Bapak Tri Handoyo",
        sanggar: "Sanggar Asmorobangun",
        duration: "12:30",
        description: "Kisah tentang Panji Asmarabangun yang mencari kekasihnya, Dewi Sekartaji. Cerita ini menggambarkan kesetiaan dan keberanian seorang ksatria dalam menghadapi berbagai cobaan untuk menemukan cinta sejatinya.",
        fullStory: `Pada zaman dahulu kala, di Kerajaan Jenggala, hiduplah seorang pangeran gagah bernama Panji Asmarabangun. Ia jatuh cinta pada Dewi Sekartaji dari Kerajaan Kediri.

Namun takdir memisahkan mereka. Dewi Sekartaji menghilang secara misterius, dan Panji harus mengembara mencarinya. Dalam pencariannya, ia menghadapi berbagai rintangan dan bertemu dengan banyak karakter yang mengajarkannya tentang kehidupan.

Panji menyamar sebagai rakyat biasa, menggunakan nama Inu Kertapati. Ia berkelana dari desa ke desa, dari kerajaan ke kerajaan, dengan harapan menemukan sang kekasih.

Di setiap tempat, Panji menunjukkan kebijaksanaannya. Ia membantu rakyat yang tertindas, mengalahkan musuh yang jahat, dan selalu berpegang pada nilai-nilai kebenaran.

Akhirnya, setelah melalui berbagai ujian dan petualangan yang panjang, Panji menemukan Sekartaji yang ternyata juga menyamar. Kesetiaan mereka diuji, namun cinta sejati tidak pernah pudar.

Cerita Panji mengajarkan kita tentang kesabaran, kesetiaan, dan keteguhan hati dalam menghadapi cobaan hidup.`,
        image: "https://storage.litegral.com/maltopia/lakon.jpg",
        audioUrl: "https://example.com/audio/panji-asmarabangun.mp3",
        chapters: [
            {
                id: 1,
                title: "Pertemuan di Taman Istana",
                content: "Di taman istana Jenggala yang indah, Panji Asmarabangun pertama kali bertemu dengan Dewi Sekartaji. Tatapan mereka bertemu di antara bunga-bunga lotus yang mekar. Panji terpesona oleh kecantikan dan kelemahlembutan Sekartaji, sementara Sekartaji terkesan dengan kebijaksanaan dan keberanian yang terpancar dari mata Panji.\n\nMereka berbincang hingga senja, membicarakan filosofi kehidupan, seni, dan keindahan alam. Tanpa mereka sadari, hati mereka telah terikat dalam benang merah takdir yang tak terlihat. Namun, kebahagiaan mereka tidak berlangsung lama.",
                imageUrl: "https://storage.litegral.com/maltopia/tmb%201.png"
            },
            {
                id: 2,
                title: "Hilangnya Sang Dewi",
                content: "Suatu malam yang gelap, Dewi Sekartaji menghilang tanpa jejak. Tidak ada yang tahu kemana ia pergi. Istana Kediri gempar, dan berita tersebut sampai ke telinga Panji di Jenggala. Hati Panji hancur berkeping-keping, namun ia tidak menyerah.\n\nDengan tekad yang bulat, Panji memutuskan untuk mencari Sekartaji. Ia meninggalkan istana, melepaskan identitasnya sebagai pangeran, dan menyamar sebagai rakyat biasa bernama Inu Kertapati. Perjalanan panjang dan berbahaya menantinya di depan.",
                imageUrl: "https://storage.litegral.com/maltopia/tmb%202.png"
            },
            {
                id: 3,
                title: "Pengembaraan Panji",
                content: "Panji berkelana dari satu kerajaan ke kerajaan lain. Di setiap tempat, ia membantu rakyat yang tertindas, mengajarkan kebijaksanaan, dan selalu mencari informasi tentang Sekartaji. Ia bertemu dengan berbagai karakter - ada yang baik hati, ada yang jahat, ada yang bijaksana, dan ada yang sombong.\n\nSetiap pertemuan mengajarkan Panji tentang kehidupan. Ia belajar bahwa kebahagiaan sejati tidak terletak pada kekayaan atau tahta, melainkan pada ketulusan hati dan kesetiaan. Pencariannya tidaklah sia-sia, karena setiap langkah membawanya lebih dekat pada pemahaman tentang cinta sejati.",
                imageUrl: "https://storage.litegral.com/maltopia/tmb%203.png"
            },
            {
                id: 4,
                title: "Reuni yang Mengharukan",
                content: "Setelah bertahun-tahun mencari, Panji akhirnya menemukan Sekartaji di sebuah desa terpencil. Ternyata Sekartaji juga telah menyamar sebagai rakyat biasa, menghindari perjodohan yang dipaksakan oleh keluarganya. Keduanya tidak langsung mengenali satu sama lain karena penyamaran mereka.\n\nNamun cinta sejati tidak bisa disembunyikan. Melalui percakapan dan interaksi mereka, perlahan-lahan identitas mereka terbuka. Air mata kebahagiaan mengalir ketika mereka akhirnya saling mengenali. Kesetiaan mereka telah teruji oleh waktu dan jarak, membuktikan bahwa cinta yang tulus akan selalu menemukan jalannya kembali.",
                imageUrl: "https://storage.litegral.com/maltopia/tmb%204.png"
            }
        ]
    },
    {
        id: 2,
        title: "Legenda Klana Sewandana",
        character: "Klana",
        narrator: "Ibu Siti Aminah",
        sanggar: "Sanggar Sido Mukti",
        duration: "15:45",
        description: "Cerita tentang raja yang terkenal dengan sifat congkak dan ambisius. Karakter Klana mengajarkan kita tentang bahaya kesombongan dan pentingnya kerendahan hati.",
        fullStory: `Klana Sewandana, raja dari negeri jauh, terkenal dengan keangkuhannya. Ia menginginkan semua keindahan dunia untuk dirinya sendiri.

Ketika mendengar tentang kecantikan Dewi Sekartaji, Klana bertekad untuk mempersuntingnya. Ia tidak peduli bahwa Sekartaji sudah bertunangan dengan Panji.

Dengan kekuatan dan kekayaannya, Klana mencoba memaksa Sekartaji menerima lamarannya. Namun hati Sekartaji sudah tertambat pada Panji yang bijaksana.

Kesombongan Klana membuatnya buta akan kebaikan. Ia hanya melihat apa yang ia inginkan, tanpa mempertimbangkan perasaan orang lain.

Akhirnya, dalam pertempuran melawan Panji, Klana kalah. Bukan karena kekuatan Panji lebih besar, tetapi karena keangkuhan Klana membuatnya meremehkan lawannya.

Dari cerita Klana, kita belajar bahwa kesombongan adalah musuh terbesar diri sendiri. Kerendahan hati adalah kunci kemenangan sejati.`,
        image: "https://storage.litegral.com/maltopia/klana.png",
        audioUrl: "https://example.com/audio/klana-sewandana.mp3",
        chapters: [
            {
                id: 1,
                title: "Keangkuhan Sang Raja",
                content: "Klana Sewandana adalah raja yang berkuasa di kerajaan yang kaya raya. Kekayaan dan kekuasaannya membuat ia merasa tidak ada yang bisa menandinginya. Istananya dipenuhi dengan emas dan permata, dan rakyatnya tunduk pada setiap perintahnya.\n\nNamun, kesombongan Klana membuatnya buta terhadap nilai-nilai kemanusiaan. Ia memperlakukan orang lain sebagai objek yang bisa dimiliki, bukan sebagai sesama manusia yang memiliki perasaan dan kehendak sendiri. Sifatnya yang angkuh ini akan membawanya pada kehancuran.",
                imageUrl: "https://storage.litegral.com/maltopia/tmb%201.png"
            },
            {
                id: 2,
                title: "Obsesi Terhadap Sekartaji",
                content: "Ketika Klana mendengar tentang kecantikan Dewi Sekartaji, obsesi memilikinya langsung menguasai pikirannya. Ia tidak peduli bahwa Sekartaji sudah bertunangan dengan Panji. Bagi Klana, semua yang ia inginkan harus menjadi miliknya.\n\nKlana mengirim utusan dengan hadiah-hadiah mewah ke Kerajaan Kediri, berharap bisa memikat hati Sekartaji dengan kekayaannya. Namun, Sekartaji menolak semua pemberian Klana karena hatinya hanya tertambat pada Panji yang bijaksana dan rendah hati.",
                imageUrl: "https://storage.litegral.com/maltopia/tmb%202.png"
            },
            {
                id: 3,
                title: "Ancaman dan Intimidasi",
                content: "Penolakan Sekartaji membuat Klana semakin murka. Kesombongannya tidak bisa menerima penolakan dari siapapun. Ia mengancam akan menyerang Kerajaan Kediri jika Sekartaji tidak menerima lamarannya.\n\nKerajaan Kediri menghadapi dilema besar. Di satu sisi, mereka tidak ingin memaksa Sekartaji menikah dengan orang yang tidak dicintainya. Di sisi lain, mereka harus melindungi rakyat dari ancaman perang. Situasi menjadi semakin tegang ketika Klana mulai menggerakkan pasukannya.",
                imageUrl: "https://litegral.com/maltopia/tmb%203.png"
            },
            {
                id: 4,
                title: "Pertempuran dan Kekalahan",
                content: "Panji, yang telah mendengar tentang ancaman Klana, kembali ke Kediri untuk melindungi Sekartaji. Pertempuran antara Panji dan Klana tidak bisa dihindari. Klana dengan kesombongannya meremehkan Panji, menganggapnya hanya sebagai pangeran kecil yang tidak berbahaya.\n\nNamun dalam pertempuran, keangkuhan Klana menjadi kelemahannya. Ia terlalu percaya diri dan tidak waspada. Panji, dengan kebijaksanaan dan kerendahan hatinya, berhasil mengalahkan Klana. Kekalahan ini mengajarkan Klana pelajaran berharga: bahwa kesombongan adalah musuh terbesar diri sendiri, dan kerendahan hati adalah kekuatan sejati.",
                imageUrl: "https://placehold.co/800x400/DC143C/FFF5E1?text=Pertempuran+dan+Kekalahan"
            }
        ]
    },
    {
        id: 3,
        title: "Kisah Gunungsari",
        character: "Gunungsari",
        narrator: "Bapak Sugiarto",
        sanggar: "Sanggar Tumpang Rejo",
        duration: "10:20",
        description: "Cerita seorang putri cantik yang menjadi rebutan banyak pangeran. Mengajarkan tentang kesetiaan, kebijaksanaan dalam memilih, dan nilai sejati seseorang.",
        fullStory: `Putri Gunungsari, terkenal akan kecantikan dan kebijaksanaannya. Banyak pangeran datang meminangnya, namun hatinya telah tertambat.

Sebagai putri dari kerajaan besar, Gunungsari memiliki tanggung jawab untuk memilih pendamping yang tepat, bukan hanya untuk dirinya, tetapi juga untuk rakyatnya.

Berbagai pangeran datang dengan hadiah mewah dan janji-janji indah. Ada yang menawarkan kekayaan, ada yang menjanjikan kekuasaan.

Namun Gunungsari tahu bahwa cinta sejati tidak didasarkan pada materi. Ia mencari seseorang yang memiliki hati yang baik dan kebijaksanaan yang mendalam.

Dalam pencariannya, Gunungsari belajar tentang karakter manusia. Ia melihat bahwa penampilan luar sering kali menyembunyikan sifat asli seseorang.

Akhirnya, Gunungsari menemukan cinta sejatinya pada seseorang yang sederhana namun memiliki hati yang tulus. Pilihannya mengajarkan kita bahwa nilai sejati seseorang terletak pada karakternya, bukan pada harta atau tahta.`,
        image: "https://storage.litegral.com/maltopia/gunungsari.png",
        audioUrl: "https://example.com/audio/gunungsari.mp3",
        chapters: [
            {
                id: 1,
                title: "Putri yang Bijaksana",
                content: "Putri Gunungsari dikenal bukan hanya karena kecantikannya, tetapi juga karena kebijaksanaan dan kelembutannya. Ia tumbuh di istana yang megah, namun tidak pernah kehilangan kerendahan hati. Ia sering turun ke desa untuk membantu rakyatnya dan memahami kehidupan mereka.\n\nOrang tua Gunungsari, raja dan ratu kerajaan tersebut, sangat bangga dengan putri mereka. Mereka tahu bahwa Gunungsari tidak hanya akan menjadi permaisuri yang cantik, tetapi juga pemimpin yang bijaksana yang akan membawa kemakmuran bagi rakyat.",
                imageUrl: "https://storage.litegral.com/maltopia/tmb%201.png"
            },
            {
                id: 2,
                title: "Para Pelamar",
                content: "Ketika Gunungsari menginjak usia dewasa, para pangeran dari berbagai kerajaan datang untuk melamarnya. Mereka membawa hadiah-hadiah mewah - emas, permata, kain sutra, dan berbagai benda berharga lainnya. Setiap pelamar berusaha menampilkan kekayaan dan kekuasaan mereka.\n\nNamun Gunungsari tidak terkesan dengan kemewahan tersebut. Ia mengamati karakter setiap pelamar - bagaimana mereka memperlakukan pelayan, bagaimana mereka berbicara tentang rakyat mereka, dan apakah mereka lebih peduli pada kekuasaan atau pada kebaikan. Kebanyakan dari mereka gagal dalam ujian tersembunyi ini.",
                imageUrl: "https://storage.litegral.com/maltopia/tmb%202.png"
            },
            {
                id: 3,
                title: "Ujian Tersembunyi",
                content: "Gunungsari, dengan persetujuan orang tuanya, membuat serangkaian ujian untuk para pelamar. Ujian-ujian ini tidak diumumkan, namun dirancang untuk mengungkap karakter sejati setiap pelamar. Ia menyamar sebagai pelayan untuk melihat bagaimana mereka memperlakukan orang yang mereka anggap rendah.\n\nBanyak pelamar yang gagal. Ada yang kasar kepada pelayan, ada yang hanya memikirkan kekayaan istana, dan ada yang menunjukkan kesombongan. Gunungsari melihat bahwa penampilan luar yang megah sering kali menyembunyikan karakter yang buruk di dalamnya.",
                imageUrl: "https://storage.litegral.com/maltopia/tmb%203.png"
            },
            {
                id: 4,
                title: "Cinta Sejati",
                content: "Suatu hari, datang seorang pemuda sederhana yang tidak membawa hadiah mewah. Ia adalah seorang ksatria dari kerajaan kecil yang datang dengan tulus. Dalam penyamaran sebagai pelayan, Gunungsari melihat bagaimana pemuda ini memperlakukan semua orang dengan hormat dan kebaikan.\n\nPemuda itu tidak tahu bahwa pelayan yang ia ajak berbicara adalah Putri Gunungsari. Mereka berdiskusi tentang kehidupan, keadilan, dan cara memimpin yang baik. Gunungsari terkesan dengan kebijaksanaan dan ketulusan hatinya. Akhirnya, Gunungsari menemukan cinta sejatinya - seseorang yang menghargai karakter di atas segalanya, sama seperti dirinya. Pilihan Gunungsari mengajarkan semua orang bahwa nilai sejati seseorang terletak pada karakter dan kebaikan hatinya, bukan pada kekayaan atau tahta.",
                imageUrl: "https://placehold.co/800x400/FF69B4/FFF5E1?text=Cinta+Sejati"
            }
        ]
    }
];

export default function CeritaDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params.slug;
    const [viewMode, setViewMode] = useState<'short' | 'book'>('short');

    const story = stories.find(s => s.id === Number(id));

    if (!story) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p>Cerita tidak ditemukan</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-brown/5 via-background to-terracotta/5">
            <Navbar />
            <ChatbotWidget />
            <RecommendationCard context={ContextExtractor.extractFromArsip(story)} />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/arsip")}
                        className="mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Arsip
                    </Button>

                    <div className="animate-fade-in">
                        {viewMode === 'short' ? (
                            <ShortStory
                                story={story}
                                onReadFullStory={() => setViewMode('book')}
                            />
                        ) : (
                            <BookStory
                                story={story}
                                onBackToShort={() => setViewMode('short')}
                            />
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
