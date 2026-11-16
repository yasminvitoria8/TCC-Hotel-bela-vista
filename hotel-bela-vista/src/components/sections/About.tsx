import { hotel } from "../../data/hotel";

export function About() {
  return (
    <section id="hotel" className="bg-cream px-5 py-28 lg:px-8 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage">O Hotel</p>
          <h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.03em] text-ink sm:text-6xl">Um refúgio para desacelerar.</h2>
        </div>
        <div className="max-w-2xl text-base leading-8 text-black/55">
          <p>{hotel.description} Cada detalhe foi pensado para transformar uma pausa na rotina em uma experiência que permanece na memória.</p>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-black/10 pt-6 text-sm">
            <div><strong className="block text-ink">{hotel.checkIn}</strong><span>Check-in</span></div>
            <div><strong className="block text-ink">{hotel.checkOut}</strong><span>Check-out</span></div>
            <div><strong className="block text-ink">{hotel.breakfast}</strong><span>Café da manhã</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}