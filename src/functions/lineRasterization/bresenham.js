export function bresenham(p1, p2) {
  console.time("Método de Bresenham");
  let path = []; // Lista com as coordenadas dos pixels

  let x1 = p1.x;
  let y1 = p1.y;
  let x2 = p2.x;
  let y2 = p2.y;

  let dx = x2 - x1;
  let dy = y2 - y1;

  const secondoOctante = dy > dx;

  if (secondoOctante) {
    [x1, y1] = [y1, x1];
    [x2, y2] = [y2, x2];
  }
  dx = x2 - x1;
  dy = y2 - y1;

  let d = 2 * dy - dx; // Valor inicial de d

  const incE = 2 * dy; // incremento para mover E
  const incNE = 2 * (dy - dx); // incremento para mover NE
  let x = p1.x;
  let y = p1.y;

  path.push({ x, y });

  while (x < x2) {
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

  if (secondoOctante) {
    path = path.map(({ x, y }) => ({ x: y, y: x }));
  }

  console.timeEnd("Método de Bresenham");
  return path;
}
