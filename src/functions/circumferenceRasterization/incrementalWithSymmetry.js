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

export function incrementalWithSymmetry(xcentro, ycentro, raio) {
  console.time("Algoritmo incremental com simetria");
  let path = [];
  const xc = 0;
  const yc = 0;

  let x = xc + raio;
  let y = yc;

  const tetha = 1 / raio;
  const sinTetha = Math.sin(tetha);
  const cosTetha = Math.cos(tetha);

  while (x >= y) {
    drawCircle(xc, yc, Math.round(x), Math.round(y), path);
    let xn = x;
    let yn = y;
    x = xn * cosTetha - yn * sinTetha;
    y = yn * cosTetha + xn * sinTetha;
  }

  path = path.map(({ x, y }) => ({ x: x + xcentro, y: y + ycentro }));

  console.timeEnd("Algoritmo incremental com simetria");
  return path;
}
