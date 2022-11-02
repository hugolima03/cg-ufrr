export function incrementalWithSymmetry() {
  const path = [];
  const raio = 5;
  const xc = 5;
  const yc = 5;

  let x = xc + raio;
  let y = yc;
  const tetha = 1 / raio;

  while (x > 0) {
    // drawCircle(xc, yc, x, y, path);
    path.push({ x, y });
    let xn = x;
    let yn = y;
    console.log(xn, yn);
    x = Math.round(xn * Math.cos(tetha) - yn * Math.sin(tetha));
    y = Math.round(yn * Math.cos(tetha) + xn * Math.sin(tetha));
  }
  console.log(path);
  return path;
}
