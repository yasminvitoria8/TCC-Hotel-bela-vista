import { mockReservations } from "../data/mockReservations";
import type { Reservation } from "../types/reservation";

const STORAGE_KEY = "hotel-bela-vista-reservations";

function read(): Reservation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Reservation[];
  } catch {
    // Fallback silencioso para o modo demonstração.
  }
  return [...mockReservations];
}

function write(reservations: Reservation[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
}

export function initializeReservations(): void {
  if (!localStorage.getItem(STORAGE_KEY)) {
    write(mockReservations);
  }
}

export function getReservations(): Reservation[] {
  return read();
}

export function getReservationByCode(code: string): Reservation | null {
  const normalized = code.trim().toUpperCase();
  return read().find((reservation) => reservation.confirmationCode.toUpperCase() === normalized) ?? null;
}

export function createReservation(reservation: Reservation): Reservation {
  const reservations = read();
  reservations.push(reservation);
  write(reservations);
  return reservation;
}

export function cancelReservation(code: string): Reservation | null {
  const reservations = read();
  const index = reservations.findIndex(
    (reservation) => reservation.confirmationCode.toUpperCase() === code.trim().toUpperCase()
  );
  if (index === -1) return null;
  reservations[index] = { ...reservations[index], status: "CANCELLED" };
  write(reservations);
  return reservations[index];
}

export function clearReservations(): void {
  localStorage.removeItem(STORAGE_KEY);
}