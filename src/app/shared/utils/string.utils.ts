export function toArray(value: string): string[] {
  return value
    .split('\n')
    .map((v) => v.trim())
    .filter(Boolean);
}
