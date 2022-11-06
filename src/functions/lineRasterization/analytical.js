export function analytical(p1, p2) {
  console.time("Método analítico");
  const path = []; // Lista com as coordenadas dos pixels

  if (p1.x === p2.x) {
    // Caso seja linha vertical
    for (let y = p1.y; y <= p2.y; y++) {
      path.push({ x: p1.x, y });
    }
  } else {
    const m = (p2.y - p1.y) / (p2.x - p1.x); // Coeficiente angular
    const b = p2.y - m * p2.x; // Coeficiente linear

    for (let x = 0; x <= p2.x; x++) {
      const y = Math.round(m * x + b); // Calculando Y pela equação da reta
      path.push({ x, y });
    }
  }
  console.timeEnd("Método analítico");
  return path;
}
