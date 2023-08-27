export function generateRandomColors(length: number): string[] {
  const colors: string[] = [];

  for (let i = 0; i < length; i++) {
    const r = Math.floor(Math.random() * 256); // Random red component (0-255)
    const g = Math.floor(Math.random() * 256); // Random green component (0-255)
    const b = Math.floor(Math.random() * 256); // Random blue component (0-255)
    const a = Math.random().toFixed(2); // Random alpha component (0.00-1.00)

    const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
    colors.push(rgba);
  }

  return colors;
}