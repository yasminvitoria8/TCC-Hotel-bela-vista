import { CheckCircle2 } from "lucide-react";

export function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm text-white shadow-xl">
      <CheckCircle2 size={16} />
      {message}
    </div>
  );
}