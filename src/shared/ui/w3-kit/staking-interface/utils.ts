/* AUTO-GENERATED — mirrored from ui/registry/w3-kit/. Edit the source there. */
export function formatNumber(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
}
