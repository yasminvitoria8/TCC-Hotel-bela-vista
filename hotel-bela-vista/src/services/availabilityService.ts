import { rooms } from "../data/rooms";
import { datesOverlap, isValidDateRange } from "../utils/dates";
import { getReservations } from "./reservationService";
import type { Room } from "../types/room";

export function getAvailableRooms(
  checkIn: string,
  checkOut: string,
  adults: number,
  children: number
): Room[] {
  if (!isValidDateRange(checkIn, checkOut)) return [];

  const guests = adults + children;
  const reservations = getReservations();

  return rooms.filter((room) => {
    if (room.capacity < guests) return false;

    const occupied = reservations.some(
      (reservation) =>
        reservation.roomId === room.id &&
        reservation.status !== "CANCELLED" &&
        datesOverlap(checkIn, checkOut, reservation.checkIn, reservation.checkOut)
    );

    return !occupied;
  });
}