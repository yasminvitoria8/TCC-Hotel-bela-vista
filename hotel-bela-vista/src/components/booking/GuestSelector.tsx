import { Minus, Plus } from "lucide-react";

function Counter({
  label,
  value,
  min,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3">
      <span className="text-sm font-medium text-ink">{label}</span>
      <div className="flex items-center gap-3">
        <button
          aria-label={`Diminuir ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="grid h-8 w-8 place-items-center rounded-full border border-black/10 hover:bg-cream"
        >
          <Minus size={14} />
        </button>
        <span className="w-5 text-center text-sm">{value}</span>
        <button
          aria-label={`Aumentar ${label}`}
          onClick={() => onChange(value + 1)}
          className="grid h-8 w-8 place-items-center rounded-full border border-black/10 hover:bg-cream"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

export function GuestSelector({
  adults,
  children,
  setAdults,
  setChildren
}: {
  adults: number;
  children: number;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <Counter label="Adultos" value={adults} min={1} onChange={setAdults} />
      <Counter label="Crianças" value={children} min={0} onChange={setChildren} />
    </div>
  );
}