export function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-1 rounded-2xl rounded-bl-md bg-cream px-4 py-3">
      {[0, 1, 2].map((item) => (
        <span key={item} className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage" style={{ animationDelay: `${item * 120}ms` }} />
      ))}
    </div>
  );
}