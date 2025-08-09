export function parseDate(str?: string) {
  return str ? new Date(str) : undefined;
}
export function formatDate(str?: string) {
  if (!str) return '';
  return new Date(str).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
}
