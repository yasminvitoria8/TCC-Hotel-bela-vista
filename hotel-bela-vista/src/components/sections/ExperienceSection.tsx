export function ExperienceSection() {
  return (
    <section id="experience" className="bg-pine px-5 py-28 text-white lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Experiências</p>
          <h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.03em] sm:text-7xl">O luxo de não ter pressa.</h2>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:grid-cols-3">
          {[
            ["Café da manhã", "Comece o dia com uma seleção delicada de sabores, servida das 6h30 às 10h."],
            ["Piscina", "Um espaço tranquilo para desacelerar, respirar e aproveitar o tempo."],
            ["Hospitalidade", "Uma equipe atenta aos detalhes para tornar cada momento mais simples."]
          ].map(([title, text]) => (
            <div key={title} className="bg-pine p-7 sm:p-9">
              <div className="mb-12 h-px w-10 bg-white/30" />
              <h3 className="font-serif text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/50">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}