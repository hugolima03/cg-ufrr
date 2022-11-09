export function dda(p1, p2) {
  console.time("Método dda");
  const path = [];

  // Calcula as variações de X e Y
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  // Calcula a quantidade de passos
  const passos = dx > dy ? dx : dy;

  // Define a quantidade de incremento por iteração
  const Xinc = dx / passos;
  const Yinc = dy / passos;

  // Define x e y iniciais
  let x = p1.x;
  let y = p1.y;

  for (let i = 0; i <= passos; i++) {
    path.push({ x: Math.round(x), y: Math.round(y) });
    x = x + Xinc;
    y = y + Yinc;
  }
  console.timeEnd("Método dda");
  return path;
}
