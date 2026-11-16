export type ChatRole = "user" | "assistant" | "system";
export type ChatMessageType = "text" | "quick-actions" | "rooms" | "summary" | "confirmation";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
  type?: ChatMessageType;
  data?: unknown;
}

export type ChatIntent =
  | "BOOKING"
  | "AVAILABILITY"
  | "ROOMS"
  | "RESERVATION"
  | "CANCELLATION"
  | "HOTEL"
  | "FAQ"
  | "HUMAN_SUPPORT"
  | "UNKNOWN";

export interface BookingState {
  step: "idle" | "check-in" | "check-out" | "guests" | "rooms" | "guest-data" | "summary" | "confirmed";
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  children: number;
  roomId: string | null;
}