function drawLine(p1, p2) {
  const path = [];

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  const m = dy / dx; // coefficient of the line.
  const b = p1.y - m * p1.x; // linear coefficient of the line.

  for (let i = 0; i <= dx; i++) {
    path.push({ x: i, y: Math.round(m * (p1.x + i) + b) });
  }

  return path;
}

console.time("dda algorithm");
console.log(drawLine({ x: 0, y: 5 }, { x: 5, y: 2 }));
console.timeEnd("dda algorithm");
