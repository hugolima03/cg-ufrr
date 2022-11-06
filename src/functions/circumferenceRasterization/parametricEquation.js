export function parametricEquation(xc, yc, raio) {
  const path = [];
  let x = xc + raio;
  let y = yc;

  for (let t = 1; t < 360; t++) {
    path.push({ x, y });
    x = Math.round(xc + raio * Math.cos((Math.PI * t) / 180));
    y = Math.round(yc + raio * Math.sin((Math.PI * t) / 180));
  }
  return path;
}
