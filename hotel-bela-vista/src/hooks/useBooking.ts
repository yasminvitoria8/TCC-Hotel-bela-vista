import { useMemo, useState } from "react";
import { getNights } from "../utils/dates";
import { getAvailableRooms } from "../services/availabilityService";
import type { Guest, Reservation } from "../types/reservation";
import type { Room } from "../types/room";
import { createReservation } from "../services/reservationService";
import { generateReservationCode } from "../utils/reservationCode";

export function useBooking() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);

  const nights = useMemo(
    () => (checkIn && checkOut ? getNights(checkIn, checkOut) : 0),
    [checkIn, checkOut]
  );

  const availableRooms = useMemo(
    () => getAvailableRooms(checkIn, checkOut, adults, children),
    [checkIn, checkOut, adults, children]
  );

  const totalPrice = selectedRoom ? selectedRoom.pricePerNight * nights : 0;

  function confirmBooking(guestData: Guest): Reservation | null {
    if (!selectedRoom || !checkIn || !checkOut || nights <= 0) return null;

    const reservation: Reservation = {
      id: crypto.randomUUID(),
      confirmationCode: generateReservationCode(),
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      adults,
      children,
      guest: guestData,
      totalPrice,
      status: "CONFIRMED",
      createdAt: new Date().toISOString()
    };

    createReservation(reservation);
    setGuest(guestData);
    return reservation;
  }

  return {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    adults,
    setAdults,
    children,
    setChildren,
    selectedRoom,
    setSelectedRoom,
    guest,
    setGuest,
    nights,
    availableRooms,
    totalPrice,
    confirmBooking
  };
}