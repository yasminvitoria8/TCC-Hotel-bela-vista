import { Menu, X } from "lucide-react";
import { useState } from "react";
import { hotel } from "../../data/hotel";

export function Header({ onReserve }: { onReserve: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-ink/80 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#" className="font-serif text-lg tracking-[0.18em]">{hotel.name}</a>
        <nav className="hidden items-center gap-8 text-xs text-white/70 md:flex">
          <a href="#hotel" className="hover:text-white">O Hotel</a>
          <a href="#rooms" className="hover:text-white">Acomodações</a>
          <a href="#experience" className="hover:text-white">Experiências</a>
          <a href="#location" className="hover:text-white">Localização</a>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={onReserve} className="rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-ink hover:bg-cream">Reservar</button>
          <button aria-label="Abrir menu" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 md:hidden">
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-ink px-5 py-5 md:hidden">
          {["#hotel", "#rooms", "#experience", "#location"].map((href, index) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-3 text-sm text-white/75">
              {["O Hotel", "Acomodações", "Experiências", "Localização"][index]}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}