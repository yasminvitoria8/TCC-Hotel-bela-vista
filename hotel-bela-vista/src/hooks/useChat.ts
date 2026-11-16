import { useEffect, useState } from "react";
import type { ChatMessage } from "../types/chat";

const STORAGE_KEY = "hotel-bela-vista-chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  function addMessage(message: Omit<ChatMessage, "id" | "timestamp">) {
    const next: ChatMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    };
    setMessages((current) => [...current, next]);
    return next;
  }

  function clearChat() {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
  }

  return { messages, addMessage, clearChat };
}