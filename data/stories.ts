// Story archive data
export interface Story {
  id: number;
  title: string;
  character: string;
  sanggar: string;
  duration: string;
  description: string;
  image: string;
}

export const stories: Story[] = [
  {
    id: 1,
    title: "Cerita Rakyat Panji Asmarabangun",
    character: "Panji Asmorobangun",
    sanggar: "Sanggar Asmorobangun",
    duration: "12:30",
    description: "Kisah tentang Panji Asmarabangun yang mencari kekasihnya, Dewi Sekartaji.",
    image: "https://storage.litegral.com/maltopia/lakon.jpg"
  },
  {
    id: 2,
    title: "Legenda Klana Sewandana",
    character: "Prabu Klono",
    sanggar: "Sanggar Sido Mukti",
    duration: "15:45",
    description: "Cerita tentang raja yang terkenal dengan sifat congkak dan ambisius.",
    image: "https://storage.litegral.com/maltopia/klana.png"
  },
  {
    id: 3,
    title: "Kisah Gunungsari",
    character: "Gunungsari",
    sanggar: "Sanggar Tumpang Rejo",
    duration: "10:20",
    description: "Cerita seorang putri cantik yang menjadi rebutan banyak pangeran.",
    image: "https://storage.litegral.com/maltopia/gunungsari.png"
  }
];
