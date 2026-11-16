export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  beds: string;
  amenities: string[];
  image: string;
  featured: boolean;
}