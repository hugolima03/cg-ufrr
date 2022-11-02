export function incrementalWithSymmetry() {
  const path = [];

  const raio = 5
  const xc = 0;
  const yc = 0;

  const steps = 10;

  let x = xc + raio;
  let y = yc;

  for (let i = 0; i <= steps; i++) {
    path.push({ x: Math.round(x), y: Math.round(y) });
    x = x + Xinc;
    y = y + Yinc;
  }
  console.log(path);
  return path;
}
