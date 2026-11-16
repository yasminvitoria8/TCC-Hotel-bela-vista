import { MapPin } from "lucide-react";
import { hotel } from "../../data/hotel";

export function LocationSection() {
  return (
    <section id="location" className="bg-cream px-5 py-28 lg:px-8 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="overflow-hidden rounded-[2rem] bg-sand">
          <div className="grid aspect-[4/3] place-items-center bg-[radial-gradient(circle_at_30%_30%,rgba(36,72,61,.18),transparent_35%),linear-gradient(135deg,#e9e0d1,#cfc4ae)]">
            <div className="text-center">
              <MapPin size={36} className="mx-auto text-pine" />
              <div className="mt-3 font-serif text-3xl text-ink">{hotel.location}</div>
              <div className="mt-1 text-xs text-black/40">Mapa ilustrativo do MVP</div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage">Localização</p>
          <h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.03em] text-ink">Perto do que importa.</h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-black/55">Em uma localização pensada para equilibrar acesso e tranquilidade. O endereço e o mapa podem ser substituídos pelos dados reais do hotel quando o MVP evoluir.</p>
        </div>
      </div>
    </section>
  );
}