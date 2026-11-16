import { useEffect, useState } from "react";
import { Bot, MessageCircle, RotateCcw } from "lucide-react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { QuickActions } from "./QuickActions";
import { BookingFlow } from "./BookingFlow";
import { useChat } from "../../hooks/useChat";
import { getChatReply } from "../../services/chatService";
import { getReservationByCode, cancelReservation } from "../../services/reservationService";
import type { Reservation } from "../../types/reservation";
import { formatCurrency } from "../../utils/currency";
import { formatDate } from "../../utils/dates";
import { Button } from "../ui/Button";
import { hotel } from "../../data/hotel";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [mode, setMode] = useState<"chat" | "booking" | "lookup" | "cancel" | "human">("chat");
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const { messages, addMessage, clearChat } = useChat();

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("open-hotel-chat", openHandler);
    return () => window.removeEventListener("open-hotel-chat", openHandler);
  }, []);

  useEffect(() => {
    if (!messages.length) {
      addMessage({
        role: "assistant",
        content: "Olá! Eu sou a Bela, assistente do Hotel Bela Vista."
      });
      window.setTimeout(() => {
        addMessage({
          role: "assistant",
          content: "Posso ajudar você a encontrar o quarto ideal, consultar disponibilidade ou cuidar da sua reserva."
        });
      }, 350);
    }
  }, []);

  function respond(text: string, action?: () => void) {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      addMessage({ role: "assistant", content: text });
      action?.();
    }, 550);
  }

  function handleAction(action: string) {
    if (action === "booking" || action === "availability") {
      addMessage({ role: "user", content: action === "booking" ? "Fazer uma reserva" : "Consultar disponibilidade" });
      respond("Claro! Vamos encontrar uma acomodação para você.", () => setMode("booking"));
    } else if (action === "reservation") {
      addMessage({ role: "user", content: "Consultar minha reserva" });
      respond("Claro. Qual é o código da sua reserva?", () => setMode("lookup"));
    } else if (action === "hotel") {
      addMessage({ role: "user", content: "Conhecer o hotel" });
      respond(`${hotel.description} Nosso check-in começa às ${hotel.checkIn}, o check-out é até ${hotel.checkOut}, e o café da manhã é servido das ${hotel.breakfast}.`);
    } else if (action === "human") {
      addMessage({ role: "user", content: "Falar com atendimento" });
      respond("Claro. Um de nossos especialistas entrará em contato com você.", () => setMode("human"));
    }
  }

  function handleSend(text: string) {
    addMessage({ role: "user", content: text });

    if (mode === "lookup") {
      const found = getReservationByCode(text);
      if (found) {
        setReservation(found);
        respond(`Encontrei sua reserva ${found.confirmationCode}.`, () => setMode("chat"));
      } else {
        respond("Não encontrei uma reserva com esse código. Confira se digitou corretamente.");
      }
      return;
    }

    if (mode === "cancel") {
      const found = getReservationByCode(text);
      if (found) {
        setReservation(found);
        respond(`Encontrei a reserva ${found.confirmationCode}. Ela está registrada para ${found.roomName}.`, () => setMode("chat"));
      } else {
        respond("Não encontrei uma reserva com esse código.");
      }
      return;
    }

    const { intent, reply } = getChatReply(text);
    if (intent === "BOOKING" || intent === "AVAILABILITY") {
      respond(reply, () => setMode("booking"));
    } else if (intent === "RESERVATION") {
      respond(reply, () => setMode("lookup"));
    } else if (intent === "CANCELLATION") {
      respond(reply, () => setMode("cancel"));
    } else if (intent === "HUMAN_SUPPORT") {
      respond(reply, () => setMode("human"));
    } else {
      respond(reply);
    }
  }

  function handleBookingDone(created: Reservation) {
    setReservation(created);
    setMode("chat");
    addMessage({ role: "assistant", content: `Pronto! Sua reserva ${created.confirmationCode} está confirmada. Estamos esperando por você.` });
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-ink/20 backdrop-blur-[2px] sm:pointer-events-none sm:bg-transparent sm:backdrop-blur-none">
          <div className="pointer-events-auto fixed inset-0 flex h-[100dvh] w-full flex-col bg-white shadow-2xl sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(700px,calc(100vh-40px))] sm:w-[400px] sm:rounded-[2rem] sm:border sm:border-black/[0.08]">
            <ChatHeader onClose={() => setOpen(false)} />

            {mode === "chat" ? (
              <>
                <div className="flex-1 overflow-hidden">
                  <ChatMessages messages={messages} typing={typing} />
                  {reservation && (
                    <div className="mx-4 mb-3 rounded-2xl border border-black/10 bg-cream p-4">
                      <div className="text-xs text-black/45">Sua reserva</div>
                      <div className="mt-1 font-semibold text-ink">{reservation.confirmationCode}</div>
                      <div className="mt-1 text-xs text-black/50">{reservation.roomName} · {formatDate(reservation.checkIn)} → {formatDate(reservation.checkOut)}</div>
                      <div className="mt-2 text-sm font-medium">{formatCurrency(reservation.totalPrice)}</div>
                      {reservation.status === "CONFIRMED" && (
                        <button
                          onClick={() => {
                            setReservation(cancelReservation(reservation.confirmationCode));
                          }}
                          className="mt-3 text-xs font-semibold text-red-700 hover:underline"
                        >
                          Cancelar reserva
                        </button>
                      )}
                    </div>
                  )}
                  {!messages.some((message) => message.role === "user") && !typing && (
                    <div className="px-4 pb-4">
                      <p className="mb-3 text-xs font-medium text-black/40">Como posso ajudar?</p>
                      <QuickActions onAction={handleAction} />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between border-t border-black/[0.04] bg-white px-4 py-1">
                  <button
                    onClick={() => { clearChat(); window.location.reload(); }}
                    className="flex items-center gap-1 text-[10px] text-black/25 hover:text-black/50"
                    title="Resetar demonstração"
                  >
                    <RotateCcw size={10} /> reset demo
                  </button>
                </div>
                <ChatInput onSend={handleSend} disabled={typing} />
              </>
            ) : mode === "booking" ? (
              <div className="flex-1 overflow-y-auto p-4">
                <BookingFlow onDone={handleBookingDone} onCancel={() => setMode("chat")} />
              </div>
            ) : mode === "human" ? (
              <HumanSupport onDone={() => setMode("chat")} />
            ) : (
              <div className="flex-1 overflow-y-auto p-5">
                <button onClick={() => setMode("chat")} className="mb-5 text-xs text-black/45 hover:text-ink">← Voltar</button>
                {mode === "lookup" ? (
                  <div>
                    <h3 className="font-serif text-2xl text-ink">Consultar reserva</h3>
                    <p className="mt-1 text-sm text-black/50">Digite o código no campo de mensagem abaixo.</p>
                    <div className="mt-6 rounded-2xl bg-cream p-4 text-sm">Exemplo: <strong>BV-DEMO01</strong></div>
                    <div className="mt-5"><ChatInput onSend={handleSend} disabled={typing} /></div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-serif text-2xl text-ink">Cancelar reserva</h3>
                    <p className="mt-1 text-sm text-black/50">Digite o código da reserva no campo abaixo.</p>
                    <div className="mt-6 rounded-2xl bg-cream p-4 text-sm">Exemplo: <strong>BV-DEMO01</strong></div>
                    <div className="mt-5"><ChatInput onSend={handleSend} disabled={typing} /></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir assistente Bela"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-pine px-4 py-3 text-white shadow-[0_18px_45px_rgba(36,72,61,0.28)] transition hover:-translate-y-1 hover:bg-ink"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white/10">
            <Bot size={19} />
            <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-pine bg-emerald-400" />
          </span>
          <span className="hidden text-sm font-semibold sm:block">Falar com a Bela</span>
        </button>
      )}
    </>
  );
}

function HumanSupport({ onDone }: { onDone: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-pine text-white"><Bot size={25} /></div>
        <h3 className="mt-4 font-serif text-2xl text-ink">Pedido recebido</h3>
        <p className="mt-2 text-sm leading-6 text-black/50">Em uma versão real, nossa equipe entraria em contato com você.</p>
        <Button onClick={onDone} className="mt-5">Voltar para a conversa</Button>
      </div>
    );
  }

  return (
    <form
      className="flex-1 overflow-y-auto p-5"
      onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}
    >
      <h3 className="font-serif text-2xl text-ink">Falar com atendimento</h3>
      <p className="mt-1 text-sm text-black/50">Deixe seus dados e simularemos o contato da equipe.</p>
      <div className="mt-5 space-y-3">
        <input required placeholder="Nome" className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 text-sm outline-none focus:border-pine" />
        <input required type="email" placeholder="E-mail" className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 text-sm outline-none focus:border-pine" />
        <input required placeholder="Telefone" className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 text-sm outline-none focus:border-pine" />
        <textarea placeholder="Como podemos ajudar?" rows={4} className="w-full resize-none rounded-2xl border border-black/10 bg-cream px-4 py-3 text-sm outline-none focus:border-pine" />
        <Button type="submit" className="w-full">Solicitar atendimento</Button>
      </div>
    </form>
  );
}