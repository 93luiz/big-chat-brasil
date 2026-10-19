export function formatChatDate(value) {
  const date = new Date(value);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  if (isToday) return "Hoje";

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Ontem";

  return date.toLocaleDateString("pt-BR");
}