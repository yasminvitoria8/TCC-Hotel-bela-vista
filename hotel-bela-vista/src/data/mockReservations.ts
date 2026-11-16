import type { Reservation } from "../types/reservation";

export const mockReservations: Reservation[] = [
  {
    id: "demo-reservation",
    confirmationCode: "BV-DEMO01",
    roomId: "mar",
    roomName: "Suíte Vista Mar",
    checkIn: "2026-10-15",
    checkOut: "2026-10-18",
    adults: 2,
    children: 0,
    guest: {
      fullName: "Reserva de demonstração",
      email: "demo@hotelbelavista.local",
      phone: "(11) 99999-0000",
      cpf: "000.000.000-00"
    },
    totalPrice: 2670,
    status: "CONFIRMED",
    createdAt: "2026-09-28T10:00:00.000Z"
  }
];