export function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getNights(checkIn: string, checkOut: string): number {
  const start = new Date(`${checkIn}T12:00:00`);
  const end = new Date(`${checkOut}T12:00:00`);
  const diff = end.getTime() - start.getTime();
  return Math.max(0, Math.round(diff / 86400000));
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(`${value}T12:00:00`));
}

export function isValidDateRange(checkIn: string, checkOut: string): boolean {
  return Boolean(checkIn && checkOut && new Date(checkOut) > new Date(checkIn));
}

export function datesOverlap(
  checkIn: string,
  checkOut: string,
  existingCheckIn: string,
  existingCheckOut: string
): boolean {
  return checkIn < existingCheckOut && checkOut > existingCheckIn;
}