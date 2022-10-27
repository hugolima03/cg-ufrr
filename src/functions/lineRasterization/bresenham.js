export function bresenham(p1, p2) {
  const path = []; // Lista com as coordenadas dos pixels

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  let d = 2 * dy - dx; // Valor inicial de d

  const incE = 2 * dy; // incremento para mover E
  const incNE = 2 * (dy - dx); // incremento para mover NE
  let x = p1.x;
  let y = p1.y;

  path.push({ x, y });

  while (x < p2.x) {
    if (d <= 0) {
      d += incE; // Escolhe E
      x++;
    } else {
      d += incNE; // Escolhe NE
      x++;
      y++;
    }
    path.push({ x, y });
  }

  return path;
}
