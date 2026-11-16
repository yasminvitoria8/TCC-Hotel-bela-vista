import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-black/[0.07] bg-white shadow-[0_18px_60px_rgba(24,33,29,0.06)] ${className}`}>
      {children}
    </div>
  );
}