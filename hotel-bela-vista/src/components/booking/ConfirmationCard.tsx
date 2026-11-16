import { CheckCircle2, Copy, ArrowRight } from "lucide-react";
import type { Reservation } from "../../types/reservation";
import { formatCurrency } from "../../utils/currency";
import { formatDate } from "../../utils/dates";
import { Button } from "../ui/Button";
import { useState } from "react";

export function ConfirmationCard({ reservation, onView }: { reservation: Reservation; onView: () => void }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard?.writeText(reservation.confirmationCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-[2rem] border border-pine/10 bg-[#f5f8f4] p-6 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pine text-white">
        <CheckCircle2 size={28} />
      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-sage">Tudo certo</p>
      <h3 className="mt-1 font-serif text-3xl text-ink">Reserva confirmada!</h3>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-black/50">Estamos esperando por você no Hotel Bela Vista.</p>
      <button onClick={copyCode} className="mx-auto mt-5 flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm">
        {reservation.confirmationCode}
        {copied ? <span className="text-xs text-sage">Copiado</span> : <Copy size={14} />}
      </button>
      <div className="mt-5 grid grid-cols-2 gap-3 text-left text-sm">
        <div><span className="block text-xs text-black/40">Acomodação</span>{reservation.roomName}</div>
        <div><span className="block text-xs text-black/40">Hóspedes</span>{reservation.adults} adultos</div>
        <div><span className="block text-xs text-black/40">Check-in</span>{formatDate(reservation.checkIn)}</div>
        <div><span className="block text-xs text-black/40">Check-out</span>{formatDate(reservation.checkOut)}</div>
      </div>
      <div className="mt-5 text-left">
        <span className="text-xs text-black/40">Total</span>
        <div className="font-serif text-2xl text-ink">{formatCurrency(reservation.totalPrice)}</div>
      </div>
      <Button onClick={onView} className="mt-5 w-full">
        Ver minha reserva <ArrowRight size={15} className="ml-1 inline" />
      </Button>
    </div>
  );
}