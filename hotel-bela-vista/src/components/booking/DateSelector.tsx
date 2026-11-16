interface DateSelectorProps {
  label: string;
  value: string;
  min?: string;
  onChange: (value: string) => void;
}

export function DateSelector({ label, value, min, onChange }: DateSelectorProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-black/45">{label}</span>
      <input
        type="date"
        value={value}
        min={min}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 text-sm text-ink outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/10"
      />
    </label>
  );
}