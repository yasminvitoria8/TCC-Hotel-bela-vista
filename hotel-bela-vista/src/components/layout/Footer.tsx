import { Instagram, MapPin } from "lucide-react";
import { hotel } from "../../data/hotel";

export function Footer() {
  return (
    <footer className="bg-ink px-5 py-12 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row">
        <div>
          <div className="font-serif text-xl tracking-[0.14em]">{hotel.name}</div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/45">{hotel.tagline}</p>
        </div>
        <div className="text-sm text-white/55">
          <div className="flex items-center gap-2"><MapPin size={15} /> {hotel.location}</div>
          <div className="mt-3 flex items-center gap-2"><Instagram size={15} /> @hotelbelavista</div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-5 text-xs text-white/30">
        © {new Date().getFullYear()} Hotel Bela Vista · MVP demonstrativo
      </div>
    </footer>
  );
}