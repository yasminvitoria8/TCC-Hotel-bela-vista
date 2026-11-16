import { useState } from "react";
import type { FormEvent } from "react";
import type { Guest } from "../../types/reservation";
import { Button } from "../ui/Button";

export function GuestForm({ onSubmit }: { onSubmit: (guest: Guest) => void }) {
  const [form, setForm] = useState<Guest>({ fullName: "", email: "", phone: "", cpf: "" });
  const [error, setError] = useState("");

  function update(field: keyof Guest, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim() || !form.cpf.trim()) {
      setError("Preencha todos os campos para continuar.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Confira o e-mail informado.");
      return;
    }
    setError("");
    onSubmit(form);
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      {(["fullName", "email", "phone", "cpf"] as const).map((field) => (
        <label key={field} className="block">
          <span className="mb-1.5 block text-xs font-medium text-black/55">
            {field === "fullName" ? "Nome completo" : field === "email" ? "E-mail" : field === "phone" ? "Telefone" : "CPF"}
          </span>
          <input
            value={form[field]}
            onChange={(event) => update(field, event.target.value)}
            type={field === "email" ? "email" : "text"}
            placeholder={
              field === "fullName" ? "Seu nome completo" :
              field === "email" ? "voce@email.com" :
              field === "phone" ? "(11) 99999-9999" : "000.000.000-00"
            }
            className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 text-sm outline-none focus:border-pine focus:ring-4 focus:ring-pine/10"
          />
        </label>
      ))}
      {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
      <Button type="submit" className="w-full">Continuar</Button>
    </form>
  );
}