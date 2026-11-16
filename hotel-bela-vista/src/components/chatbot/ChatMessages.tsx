import { useEffect, useRef } from "react";
import type { ChatMessage } from "../../types/chat";
import { ChatMessage as Message } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

export function ChatMessages({ messages, typing }: { messages: ChatMessage[]; typing: boolean }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="flex-1 space-y-3 overflow-y-auto bg-white px-4 py-5">
      {messages.map((message) => <Message key={message.id} message={message} />)}
      {typing && <div><TypingIndicator /></div>}
      <div ref={bottomRef} />
    </div>
  );
}