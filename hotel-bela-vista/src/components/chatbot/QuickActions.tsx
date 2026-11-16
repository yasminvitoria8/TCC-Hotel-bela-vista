import { CalendarDays, HelpCircle, Hotel, Search, UserRound } from "lucide-react";

const actions = [
  { label: "Fazer uma reserva", icon: CalendarDays, action: "booking" },
  { label: "Consultar disponibilidade", icon: Search, action: "availability" },
  { label: "Consultar minha reserva", icon: UserRound, action: "reservation" },
  { label: "Conhecer o hotel", icon: Hotel, action: "hotel" },
  { label: "Falar com atendimento", icon: HelpCircle, action: "human" }
];

export function QuickActions({ onAction }: { onAction: (action: string) => void }) {
  return (
    <div className="grid gap-2">
      {actions.map(({ label, icon: Icon, action }) => (
        <button
          key={action}
          onClick={() => onAction(action)}
          className="flex items-center justify-between rounded-2xl border border-black/[0.08] bg-white px-4 py-3 text-left text-xs font-medium text-ink transition hover:border-pine/20 hover:bg-cream"
        >
          <span className="flex items-center gap-2.5"><Icon size={15} className="text-sage" />{label}</span>
          <span className="text-black/25">→</span>
        </button>
      ))}
    </div>
  );
}