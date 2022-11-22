import { Pixel } from "contexts/PixelGridContext";
import React, { useEffect, useState } from "react";

import { Column, Wrapper } from "templates/Base/styles";

const PLOT_HEIGHT = 500;

// class Graph {
//   constructor(id) {
//     this.el = document.getElementById(id);
//   }

//   drawLine(point1, point2, stroke = 2, color = "#000000") {
//     this.el.insertAdjacentHTML(
//       "beforeend",
//       `<line x1="${point1.x}" y1="${point1.y}" x2="${point2.x}" y2="${point2.y}" stroke="${color}" stroke-width="${stroke}" id="line"/>`
//     );
//   }

//   drawCurveFromPoints(points) {
//     for (let i = 0; i < points.length; i++) {
//       if (i + 1 < points.length) this.drawLine(points[i], points[i + 1]);
//     }
//   }
// }

const BezierCurves = () => {
  const numDrawingPoints = 100;
  const drawingPoints = [];

  const [lines, setLines] = useState<React.ReactNode[]>([]);

  function drawLine(p1: Pixel, p2: Pixel, stroke = 2, color = "#000000") {
    const newLine = (
      <line
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke={color}
        stroke-width={stroke}
      />
    );
    setLines((lines) => [...lines, newLine]);
  }

  function drawCurveFromPoints(points: Pixel[]) {
    for (let i = 0; i < points.length; i++) {
      if (i + 1 < points.length) drawLine(points[i], points[i + 1]);
    }
  }

  function calculateNewPoint(t) {
    // Coordinates calculated using the general formula are relative to
    // origin at bottom left.
    let x = 0;
    let y = 0;
    let n = points.length - 1;
    for (let i = 0; i <= n; i++) {
      let bin = C(n, i) * Math.pow(1 - t, n - i) * Math.pow(t, i);
      x += bin * points[i].x;
      y += bin * points[i].y;
    }

    return new Point(x, PLOT_HEIGHT - y);
  }

  function calculateDrawingPoints() {
    let interval = 1 / numDrawingPoints;
    let t = interval;

    drawingPoints.push(calculateNewPoint(0));

    for (let i = 0; i < numDrawingPoints; i++) {
      drawingPoints.push(calculateNewPoint(t));
      t += interval;
    }
  }

  useEffect(() => {
    drawCurveFromPoints([
      { x: 1, y: 1 },
      { x: 200, y: 50 },
    ]);
  }, []);

  return (
    <Wrapper>
      <Column style={{ backgroundColor: "gray" }}>
        bezierCurves
        <svg width="500px" height="500px" id="graph">
          {lines.map((line) => line)}
        </svg>
      </Column>
      <Column>bezierCurves</Column>
    </Wrapper>
  );
};

export default BezierCurves;
