import { faq } from "../data/faq";
import { rooms } from "../data/rooms";
import type { ChatIntent } from "../types/chat";

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function detectIntent(message: string): ChatIntent {
  const text = normalize(message);

  if (/cancel|cancele|cancelar/.test(text)) return "CANCELLATION";
  if (/reserva|reservar|booking|hosped/.test(text)) return "BOOKING";
  if (/disponivel|disponibilidade|tem quarto|vaga/.test(text)) return "AVAILABILITY";
  if (/quarto|suite|suíte|acomodacao|acomodacao|vista/.test(text)) return "ROOMS";
  if (/codigo|código|consultar minha|minha reserva|bv-/.test(text)) return "RESERVATION";
  if (/hotel|localizacao|localização|piscina|estacionamento|cafe|café/.test(text)) return "HOTEL";
  if (/check-in|checkin|check-out|checkout|wifi|wi-fi|cafe da manha|café da manhã/.test(text)) return "FAQ";
  if (/humano|atendente|pessoa|especialista|atendimento/.test(text)) return "HUMAN_SUPPORT";

  return "UNKNOWN";
}

export function getChatReply(message: string): { intent: ChatIntent; reply: string } {
  const intent = detectIntent(message);
  const text = normalize(message);

  switch (intent) {
    case "BOOKING":
      return {
        intent,
        reply: "Claro! Vou ajudar você com sua estadia. Para quando você gostaria de se hospedar?"
      };
    case "AVAILABILITY":
      return {
        intent,
        reply: "Claro. Posso verificar as acomodações disponíveis para as suas datas. Vamos começar pela data de chegada?"
      };
    case "ROOMS": {
      const names = rooms.map((room) => room.name).join(", ");
      return {
        intent,
        reply: `Temos quatro acomodações: ${names}. Se quiser, posso verificar qual delas está disponível para as suas datas.`
      };
    }
    case "RESERVATION":
      return {
        intent,
        reply: "Claro. Me informe o código da sua reserva, por exemplo BV-8F42K1."
      };
    case "CANCELLATION":
      return {
        intent,
        reply: "Posso ajudar com o cancelamento. Me informe o código da reserva que você deseja cancelar."
      };
    case "HOTEL":
      return {
        intent,
        reply: "O Hotel Bela Vista combina conforto e tranquilidade. Temos piscina, estacionamento e uma experiência pensada para uma estadia especial."
      };
    case "FAQ": {
      const match = faq.find((item) => {
        const q = normalize(item.question);
        return q.split(" ").some((word) => word.length > 4 && text.includes(word));
      });
      return {
        intent,
        reply: match?.answer ?? "Nosso check-in começa às 15h e o check-out é até 12h. Também temos Wi-Fi, estacionamento, piscina e café da manhã."
      };
    }
    case "HUMAN_SUPPORT":
      return {
        intent,
        reply: "Claro. Posso solicitar o contato de um de nossos especialistas. Vou abrir o formulário de atendimento para você."
      };
    default:
      return {
        intent,
        reply: "Posso ajudar com reservas, disponibilidade, acomodações, informações do hotel ou sua reserva. O que você gostaria de fazer?"
      };
  }
}