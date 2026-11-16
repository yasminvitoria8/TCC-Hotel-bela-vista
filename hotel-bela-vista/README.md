# Hotel Bela Vista — MVP

MVP frontend-only de uma experiência premium de reservas com assistente virtual demonstrativo.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Lucide React
- localStorage

Não há backend, banco de dados, Prisma, Firebase, Supabase ou API de IA.

## Rodar localmente

Requer Node.js 18+.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente:

```text
http://localhost:5173
```

## Build

```bash
npm run build
npm run preview
```

## Como funciona

Os quartos, FAQs, informações do hotel e reservas iniciais ficam em `src/data/`.

As reservas criadas durante a apresentação ficam no navegador usando:

`hotel-bela-vista-reservations`

O histórico do chat fica em:

`hotel-bela-vista-chat`

Existe uma reserva demonstrativa:

`BV-DEMO01`

Ela pode ser consultada pelo chatbot.

## Disponibilidade

A disponibilidade é simulada no frontend. O serviço compara as datas escolhidas com as reservas existentes no localStorage.

Reservas canceladas não bloqueiam a acomodação.

## Reset da demonstração

Dentro do chat existe um pequeno botão `reset demo`. Ele limpa o histórico do chat e recarrega a aplicação.

Para limpar manualmente:

```js
localStorage.removeItem("hotel-bela-vista-reservations");
localStorage.removeItem("hotel-bela-vista-chat");
```

## Personalização

Quartos:

`src/data/rooms.ts`

Informações do hotel:

`src/data/hotel.ts`

FAQ:

`src/data/faq.ts`

Reserva demonstrativa:

`src/data/mockReservations.ts`

Cores e tipografia:

`src/index.css`

## Vercel

1. Crie um repositório no GitHub.
2. Suba este projeto.
3. Entre na Vercel.
4. Importe o repositório.
5. Use Vite como framework.
6. Build Command:

```bash
npm run build
```

7. Output Directory:

```text
dist
```

Não são necessárias variáveis secretas para o MVP.

## Observação

Este projeto é um protótipo de apresentação. `localStorage` é apropriado para demonstração, mas não deve ser utilizado como mecanismo de persistência para reservas reais de clientes em produção.
