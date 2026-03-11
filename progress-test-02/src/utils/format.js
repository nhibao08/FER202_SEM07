export function formatCurrency(amount) {
  return Number(amount).toLocaleString("vi-VN") + " ₫";
}

export function formatDate(dateStr) {
  if (!dateStr) return "";
  const [yyyy, mm, dd] = dateStr.split("-");
  return `${dd}-${mm}-${yyyy}`;
}