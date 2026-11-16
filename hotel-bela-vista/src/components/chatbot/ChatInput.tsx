import { ArrowUp, Mic } from "lucide-react";
import { useState } from "react";

export function ChatInput({ onSend, disabled = false }: { onSend: (text: string) => void; disabled?: boolean }) {
  const [value, setValue] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  }

  return (
    <form onSubmit={submit} className="border-t border-black/[0.07] bg-white p-3">
      <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-cream p-1.5">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Escreva uma mensagem..."
          disabled={disabled}
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-ink outline-none placeholder:text-black/35"
          aria-label="Mensagem"
        />
        <button type="button" aria-label="Mensagem de voz" className="hidden h-9 w-9 place-items-center rounded-xl text-black/35 hover:bg-white sm:grid">
          <Mic size={16} />
        </button>
        <button type="submit" disabled={!value.trim() || disabled} aria-label="Enviar mensagem" className="grid h-9 w-9 place-items-center rounded-xl bg-pine text-white disabled:opacity-40">
          <ArrowUp size={16} />
        </button>
      </div>
      <p className="pt-2 text-center text-[10px] text-black/30">Bela · demonstração interativa do Hotel Bela Vista</p>
    </form>
  );
}