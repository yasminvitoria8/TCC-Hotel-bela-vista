import { useState } from "react";
import { ArrowLeft, CalendarDays, UsersRound } from "lucide-react";
import type { Room } from "../../types/room";
import { Button } from "../ui/Button";
import { DateSelector } from "../booking/DateSelector";
import { GuestSelector } from "../booking/GuestSelector";
import { RoomList } from "../booking/RoomList";
import { GuestForm } from "../booking/GuestForm";
import { ReservationSummary } from "../booking/ReservationSummary";
import { ConfirmationCard } from "../booking/ConfirmationCard";
import { useBooking } from "../../hooks/useBooking";
import type { Guest, Reservation } from "../../types/reservation";

export function BookingFlow({ onDone, onCancel }: { onDone: (reservation: Reservation) => void; onCancel: () => void }) {
  const booking = useBooking();
  const [step, setStep] = useState<"dates" | "guests" | "rooms" | "guest" | "summary" | "confirmed">("dates");
  const [reservation, setReservation] = useState<Reservation | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  if (step === "confirmed" && reservation) {
    return <ConfirmationCard reservation={reservation} onView={() => onDone(reservation)} />;
  }

  return (
    <div className="space-y-4">
      <button onClick={onCancel} className="flex items-center gap-1 text-xs text-black/45 hover:text-ink">
        <ArrowLeft size={13} /> Voltar para a conversa
      </button>

      {step === "dates" && (
        <div className="rounded-3xl bg-cream p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-pine"><CalendarDays size={18} /></div>
          <h3 className="font-serif text-2xl text-ink">Quando você vem?</h3>
          <p className="mt-1 text-sm text-black/50">Escolha as datas da sua estadia.</p>
          <div className="mt-5 space-y-3">
            <DateSelector label="Check-in" value={booking.checkIn} min={today} onChange={booking.setCheckIn} />
            <DateSelector label="Check-out" value={booking.checkOut} min={booking.checkIn || today} onChange={booking.setCheckOut} />
            {booking.checkIn && booking.checkOut && new Date(booking.checkOut) <= new Date(booking.checkIn) && (
              <p className="text-xs text-red-600">A saída precisa acontecer depois da chegada.</p>
            )}
            <Button
              className="w-full"
              disabled={!booking.checkIn || !booking.checkOut || new Date(booking.checkOut) <= new Date(booking.checkIn)}
              onClick={() => setStep("guests")}
            >
              Continuar
            </Button>
          </div>
        </div>
      )}

      {step === "guests" && (
        <div className="rounded-3xl bg-cream p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-pine"><UsersRound size={18} /></div>
          <h3 className="font-serif text-2xl text-ink">Quem vai ficar?</h3>
          <p className="mt-1 text-sm text-black/50">Conte quantas pessoas estarão na estadia.</p>
          <div className="mt-5"><GuestSelector adults={booking.adults} children={booking.children} setAdults={booking.setAdults} setChildren={booking.setChildren} /></div>
          <Button className="mt-4 w-full" onClick={() => setStep("rooms")}>Ver acomodações</Button>
        </div>
      )}

      {step === "rooms" && (
        <div>
          <div className="mb-4">
            <h3 className="font-serif text-2xl text-ink">Opções para você</h3>
            <p className="mt-1 text-sm text-black/50">Encontrei estas acomodações para sua estadia.</p>
          </div>
          <RoomList rooms={booking.availableRooms} nights={booking.nights} onChoose={(room: Room) => { booking.setSelectedRoom(room); setStep("guest"); }} />
        </div>
      )}

      {step === "guest" && booking.selectedRoom && (
        <div>
          <h3 className="mb-1 font-serif text-2xl text-ink">Seus dados</h3>
          <p className="mb-4 text-sm text-black/50">Só precisamos de alguns dados para finalizar sua reserva.</p>
          <GuestForm onSubmit={(guest: Guest) => { booking.setGuest(guest); setStep("summary"); }} />
        </div>
      )}

      {step === "summary" && booking.selectedRoom && booking.guest && (
        <ReservationSummary
          room={booking.selectedRoom}
          guest={booking.guest}
          reservation={{
            roomId: booking.selectedRoom.id,
            roomName: booking.selectedRoom.name,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            adults: booking.adults,
            children: booking.children,
            totalPrice: booking.totalPrice
          }}
          onBack={() => setStep("guest")}
          onConfirm={() => {
            const created = booking.confirmBooking(booking.guest!);
            if (created) {
              setReservation(created);
              setStep("confirmed");
            }
          }}
        />
      )}
    </div>
  );
}