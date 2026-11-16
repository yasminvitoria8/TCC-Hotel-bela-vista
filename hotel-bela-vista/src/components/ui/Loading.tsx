export function Loading({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-black/50">
      <span className="h-2 w-2 animate-pulse rounded-full bg-sage" />
      <span>{label}</span>
    </div>
  );
}