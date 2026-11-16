export type ReservationStatus = "CONFIRMED" | "CANCELLED";

export interface Guest {
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
}

export interface Reservation {
  id: string;
  confirmationCode: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  guest: Guest;
  totalPrice: number;
  status: ReservationStatus;
  createdAt: string;
}