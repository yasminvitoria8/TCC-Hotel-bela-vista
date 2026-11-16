import { ArrowDown, ArrowRight } from "lucide-react";
import { hotel } from "../../data/hotel";

export function Hero({ onReserve }: { onReserve: () => void }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ink text-white">
      <img src={hotel.heroImage} alt="Hotel Bela Vista" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/30 to-ink" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-end px-5 pb-20 pt-32 lg:px-8 lg:pb-24">
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">Hotel boutique · {hotel.location}</p>
          <h1 className="font-serif text-6xl leading-[0.94] tracking-[-0.04em] sm:text-7xl lg:text-9xl">Uma estadia<br />para lembrar.</h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg">{hotel.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onReserve} className="group rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink">
              Reservar minha estadia <ArrowRight size={15} className="ml-1 inline transition group-hover:translate-x-1" />
            </button>
            <a href="#hotel" className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium backdrop-blur hover:bg-white/10">Conhecer o hotel</a>
          </div>
        </div>
      </div>
      <a href="#hotel" className="absolute bottom-8 right-6 hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 sm:flex">Explorar <ArrowDown size={13} /></a>
    </section>
  );
}