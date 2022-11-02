// export function bresenham(p1, p2) {
//   const path = []; // Array com as coordenadas dos pixels

//   // Definição dos pontos iniciais e finais
//   let x1 = p1.x;
//   let y1 = p1.y;
//   let x2 = p2.x;
//   let y2 = p2.y;

//   // Definição da variação de x e y
//   let dx = x2 - x1;
//   let dy = y2 - y1;

//   const is_steep = Math.abs(dy) > Math.abs(dx);

//   if (is_steep) {
//     [x1, y1] = [y1, x1];
//     [x2, y2] = [y2, x2];
//   }

//   let swapped = false;

//   if (x1 > x2) {
//     [x1, x2] = [x2, x1];
//     [y1, y2] = [y2, y1];
//     swapped = true;
//   }

//   dx = x2 - x1;
//   dy = y2 - y1;

//   let error = Number(dx / 2);
//   let ystep = undefined;
//   if (y1 < y2) {
//     ystep = 1;
//   } else {
//     ystep = -1;
//   }

//   let y = y1;

//   for (let x = x1; x <= x2; x++) {
//     let coord = undefined;
//     if (is_steep) {
//       coord = { y, x };
//     } else {
//       coord = { x, y };
//     }
//     path.push(coord);
//     error -= Math.abs(dy);

//     if (error < 0) {
//       y += ystep;
//       error += dx;
//     }
//   }

//   if (swapped) {
//     path.reverse();
//   }
//   return path;
// }

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
