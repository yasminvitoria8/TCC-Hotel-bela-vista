import type { Room } from "../types/room";

export const rooms: Room[] = [
  {
    id: "jardim",
    name: "Suíte Vista Jardim",
    description: "Um ambiente tranquilo e confortável, perfeito para uma estadia relaxante.",
    pricePerNight: 680,
    capacity: 2,
    beds: "1 cama king",
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Frigobar", "Café da manhã"],
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "mar",
    name: "Suíte Vista Mar",
    description: "Uma suíte luminosa com atmosfera sofisticada e uma vista aberta inesquecível.",
    pricePerNight: 890,
    capacity: 2,
    beds: "1 cama king",
    amenities: ["Wi-Fi", "Varanda", "Ar-condicionado", "TV", "Café da manhã"],
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "deluxe",
    name: "Quarto Deluxe",
    description: "Conforto inteligente para viagens a dois ou em família.",
    pricePerNight: 540,
    capacity: 3,
    beds: "1 cama queen + 1 cama de solteiro",
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Frigobar"],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    featured: false
  },
  {
    id: "bela-vista",
    name: "Suíte Bela Vista",
    description: "Nossa acomodação mais espaçosa, criada para momentos especiais.",
    pricePerNight: 1150,
    capacity: 4,
    beds: "1 cama king + sofá-cama",
    amenities: ["Wi-Fi", "Sala de estar", "Varanda", "TV", "Café da manhã"],
    image:
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=80",
    featured: true
  }
];