import { ArrowUpRight } from "lucide-react";
import { rooms } from "../../data/rooms";
import { formatCurrency } from "../../utils/currency";

export function RoomsSection({ onReserve }: { onReserve: () => void }) {
  return (
    <section id="rooms" className="bg-white px-5 py-28 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage">Acomodações</p>
            <h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.03em] text-ink sm:text-6xl">Seu espaço para ficar.</h2>
          </div>
          <button onClick={onReserve} className="self-start rounded-full border border-black/10 px-5 py-3 text-xs font-semibold hover:bg-cream">Ver disponibilidade</button>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {rooms.map((room, index) => (
            <article key={room.id} className={`group overflow-hidden rounded-[2rem] bg-cream ${index === 0 ? "md:row-span-2" : ""}`}>
              <div className="relative overflow-hidden">
                <img src={room.image} alt={room.name} className={`w-full object-cover transition duration-700 group-hover:scale-105 ${index === 0 ? "h-[520px]" : "h-72"}`} />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur">A partir de {formatCurrency(room.pricePerNight)}</span>
              </div>
              <div className="flex items-end justify-between gap-5 p-6">
                <div>
                  <h3 className="font-serif text-2xl text-ink">{room.name}</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-black/45">{room.description}</p>
                </div>
                <button onClick={onReserve} aria-label={`Reservar ${room.name}`} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-pine text-white hover:bg-ink">
                  <ArrowUpRight size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}