import { BedDouble, Check, Users } from "lucide-react";
import type { Room } from "../../types/room";
import { formatCurrency } from "../../utils/currency";

export function RoomCard({
  room,
  nights,
  onChoose,
  compact = false
}: {
  room: Room;
  nights: number;
  onChoose: (room: Room) => void;
  compact?: boolean;
}) {
  const total = room.pricePerNight * nights;

  return (
    <article className={`overflow-hidden rounded-3xl border border-black/[0.08] bg-white ${compact ? "" : "shadow-[0_16px_50px_rgba(24,33,29,0.07)]"}`}>
      <img src={room.image} alt={room.name} className={`w-full object-cover ${compact ? "h-36" : "h-48"}`} />
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl text-ink">{room.name}</h3>
            <p className="mt-1 text-xs leading-5 text-black/50">{room.description}</p>
          </div>
        </div>
        <div className="my-4 flex flex-wrap gap-2 text-xs text-black/55">
          <span className="flex items-center gap-1 rounded-full bg-cream px-2.5 py-1"><Users size={13} /> Até {room.capacity}</span>
          <span className="flex items-center gap-1 rounded-full bg-cream px-2.5 py-1"><BedDouble size={13} /> {room.beds}</span>
        </div>
        <div className="mb-4 flex flex-wrap gap-x-3 gap-y-1">
          {room.amenities.slice(0, 4).map((amenity) => (
            <span key={amenity} className="flex items-center gap-1 text-[11px] text-black/50">
              <Check size={12} className="text-sage" /> {amenity}
            </span>
          ))}
        </div>
        <div className="flex items-end justify-between gap-3 border-t border-black/[0.07] pt-4">
          <div>
            <div className="font-serif text-xl text-ink">{formatCurrency(room.pricePerNight)}</div>
            <div className="text-[11px] text-black/40">por noite · {formatCurrency(total)} no total</div>
          </div>
          <button onClick={() => onChoose(room)} className="rounded-full bg-pine px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-ink">
            Escolher
          </button>
        </div>
      </div>
    </article>
  );
}