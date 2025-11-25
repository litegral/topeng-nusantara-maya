// Topeng (Mask) catalog data
export interface Topeng {
  id: number;
  nama: string;
  karakter: string;
  warna: string;
  makna: string;
  filosofi: string;
  imageUrl: string;
  modelPath: string;
}

export const topengData: Topeng[] = [
  {
    id: 1,
    nama: "Panji Asmorobangun",
    karakter: "Ksatria muda yang bijaksana",
    warna: "Putih dan Emas",
    makna: "Kesucian dan kebijaksanaan",
    filosofi: "Melambangkan pemuda yang berbudi luhur dan penuh kasih sayang",
    imageUrl: "https://asset.museum-digital.org//media/800/id-jatim/images/201411/08083356075.jpg",
    modelPath: "/3D/panji_asmorobangun.glb",
  },
  {
    id: 2,
    nama: "Prabu Klana",
    karakter: "Raja yang gagah berani",
    warna: "Merah dan Emas",
    makna: "Keberanian dan kekuatan",
    filosofi: "Simbol kepemimpinan yang tegas namun adil",
    imageUrl: "https://asset.museum-digital.org//media/800/id-jatim/images/201411/08091122046.jpg",
    modelPath: "/3D/klana.glb",
  },
  {
    id: 3,
    nama: "Sekartaji",
    karakter: "Putri cantik yang anggun",
    warna: "Putih dan Pink",
    makna: "Kelembutan dan keanggunan",
    filosofi: "Melambangkan kesempurnaan feminin dalam budaya Jawa",
    imageUrl: "https://asset.museum-digital.org//media/800/id-jatim/images/201411/08081603159.jpg",
    modelPath: "/3D/sekartaji.glb",
  },
];
