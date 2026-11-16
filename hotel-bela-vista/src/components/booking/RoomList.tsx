import type { Room } from "../../types/room";
import { RoomCard } from "./RoomCard";

export function RoomList({ rooms, nights, onChoose }: { rooms: Room[]; nights: number; onChoose: (room: Room) => void }) {
  if (!rooms.length) {
    return (
      <div className="rounded-3xl border border-black/10 bg-cream p-5 text-sm text-black/60">
        Não encontrei acomodações disponíveis para essas condições. Tente outras datas ou uma quantidade diferente de hóspedes.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} nights={nights} onChoose={onChoose} compact />
      ))}
    </div>
  );
}