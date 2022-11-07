// export function incrementalWithSymmetry(xc, yc, raio) {
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

export function incrementalWithSymmetry() {
  const path = [];
  const raio = 5;
  const xc = 0;
  const yc = 0;

  let x = xc + raio;
  let y = yc;

  const tetha = 1 / raio;
  const sinTetha = Math.round(Math.sin(tetha));
  const cosTetha = Math.round(Math.cos(tetha));

  while (y <= x) {
    path.push({ x, y });
    // drawCircle(xc, yc, x, y, path);
    let xn = x;
    let yn = y;
    x = xn * cosTetha - yn * sinTetha;
    y = yn * cosTetha + xn * sinTetha;
  }

  return path;
}
