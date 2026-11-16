import { Bot, ChevronDown, Sparkles, X } from "lucide-react";

export function ChatHeader({ onClose }: { onClose: () => void }) {
  return (
    <header className="flex items-center justify-between border-b border-black/[0.07] bg-white px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="relative grid h-10 w-10 place-items-center rounded-full bg-pine text-white">
          <Bot size={19} />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-ink">Bela <Sparkles size={12} className="text-sage" /></div>
          <div className="text-[11px] text-black/45">Assistente do Hotel Bela Vista · Online</div>
        </div>
      </div>
      <button aria-label="Fechar chat" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5">
        <X size={17} />
      </button>
    </header>
  );
}