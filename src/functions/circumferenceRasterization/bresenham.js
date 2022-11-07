function drawCircle(xc, yc, x, y, path) {
  path.push({ x: xc + x, y: yc + y });
  path.push({ x: xc - x, y: yc + y });
  path.push({ x: xc + x, y: yc - y });
  path.push({ x: xc - x, y: yc - y });
  path.push({ x: xc + y, y: yc + x });
  path.push({ x: xc - y, y: yc + x });
  path.push({ x: xc + y, y: yc - x });
  path.push({ x: xc - y, y: yc - x });
}

export function bresenham(xc, yc, raio) {
  const path = [];

  let x = 0;
  let y = raio;
  let d = 3 - 2 * raio;
  drawCircle(xc, yc, x, y, path);

  while (y >= x) {
    x++;
    if (d > 0) {
      y--;
      d = d + 4 * (x - y) + 10;
    } else {
      d = d + 4 * x + 6;
    }
    drawCircle(xc, yc, x, y, path);
  }

  return path;
}
