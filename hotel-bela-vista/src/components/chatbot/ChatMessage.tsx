import type { ChatMessage as ChatMessageType } from "../../types/chat";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${isUser ? "rounded-br-md bg-pine text-white" : "rounded-bl-md bg-cream text-ink"}`}>
        {message.content}
      </div>
    </div>
  );
}