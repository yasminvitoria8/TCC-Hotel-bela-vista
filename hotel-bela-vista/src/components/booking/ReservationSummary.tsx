import type { Guest, Reservation } from "../../types/reservation";
import type { Room } from "../../types/room";
import { formatCurrency } from "../../utils/currency";
import { formatDate } from "../../utils/dates";
import { Button } from "../ui/Button";

export function ReservationSummary({
  room,
  reservation,
  guest,
  onConfirm,
  onBack
}: {
  room: Room;
  reservation: Omit<Reservation, "id" | "confirmationCode" | "createdAt" | "status" | "guest">;
  guest: Guest;
  onConfirm: () => void;
  onBack: () => void;
}) {
  return (
    <div className="rounded-3xl border border-black/[0.08] bg-white p-5 shadow-sm">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sage">Confira sua estadia</p>
      <h3 className="font-serif text-2xl text-ink">{room.name}</h3>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div><span className="block text-xs text-black/40">Check-in</span>{formatDate(reservation.checkIn)}</div>
        <div><span className="block text-xs text-black/40">Check-out</span>{formatDate(reservation.checkOut)}</div>
        <div><span className="block text-xs text-black/40">Hóspedes</span>{reservation.adults} adultos{reservation.children ? ` · ${reservation.children} crianças` : ""}</div>
        <div><span className="block text-xs text-black/40">Hóspede</span>{guest.fullName}</div>
      </div>
      <div className="mt-5 border-t border-black/[0.07] pt-4">
        <span className="text-xs text-black/40">Total</span>
        <div className="font-serif text-3xl text-ink">{formatCurrency(reservation.totalPrice)}</div>
      </div>
      <div className="mt-5 flex gap-2">
        <Button variant="secondary" onClick={onBack} className="flex-1">Voltar</Button>
        <Button onClick={onConfirm} className="flex-1">Confirmar reserva</Button>
      </div>
    </div>
  );
}