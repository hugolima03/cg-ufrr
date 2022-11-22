import { Form } from "components/FillAlgorithmsForm/styles";
import { Span } from "components/LineRasterizationForm/styles";
import { Pixel } from "contexts/PixelGridContext";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Column, Wrapper } from "templates/Base/styles";

const PLOT_HEIGHT = 500;

const BezierCurves = () => {
  let drawingPoints: Pixel[] = [];
  const [debugPoints, setDebugPoints] = useState<Pixel[]>([]);

  const [controlPoints, setControlPoints] = useState<Pixel[]>([
    { x: 10, y: 10 },
  ]);

  const [lines, setLines] = useState<React.ReactNode[]>([]);

  function drawLine(p1: Pixel, p2: Pixel, stroke = 2, color = "#000000") {
    const newLine = (
      <line
        key={(p1.x, p1.y, p2.x, p2.y, Math.random())}
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke={color}
        strokeWidth={stroke}
      />
    );
    setLines((lines) => [...lines, newLine]);
  }

  function drawCurveFromPoints(points: Pixel[]) {
    for (let i = 0; i < points.length; i++) {
      if (i + 1 < points.length) {
        drawLine(points[i], points[i + 1]);
      }
    }
  }

  function calculateNewPoint(t: number) {
    // Coordinates calculated using the general formula are relative to
    // origin at bottom left.
    let x = 0;
    let y = 0;
    let n = controlPoints.length - 1;
    for (let i = 0; i <= n; i++) {
      let bin = C(n, i) * Math.pow(1 - t, n - i) * Math.pow(t, i);
      x += bin * controlPoints[i].x;
      y += bin * controlPoints[i].y;
    }

    return { x: x, y: PLOT_HEIGHT - y };
  }

  function calculateDrawingPoints(numDrawingPoints: number) {
    let interval = 1 / numDrawingPoints;
    let t = interval;

    drawingPoints.push(calculateNewPoint(0));

    for (let i = 0; i < numDrawingPoints; i++) {
      drawingPoints.push(calculateNewPoint(t));
      t += interval;
    }
  }

  function drawHandles() {
    if (controlPoints.length === 1) {
      setDebugPoints([controlPoints[0]]);
      return;
    }
    for (let i = 1; i < controlPoints.length; i++) {
      if (i == 1 || i == controlPoints.length - 1) {
        setDebugPoints((points) => [
          ...points,
          controlPoints[i - 1],
          controlPoints[i],
        ]);
      }

      const temp = controlPoints.map(({ x, y }) => ({ x, y: PLOT_HEIGHT - y }));

      drawLine(
        temp[i - 1],
        temp[i],
        1,
        i == 1 || i == temp.length - 1 ? "#00FF00" : "#AA4444"
      );
    }

    if (controlPoints.length === 1) {
      setDebugPoints([controlPoints[0]]);
      return;
    }
  }

  function C(n: number, k: number) {
    var coeff = 1;
    for (var x = n - k + 1; x <= n; x++) coeff *= x;
    for (x = 1; x <= k; x++) coeff /= x;
    return coeff;
  }

  function onSubmit(data: any) {
    setLines([]);
    setDebugPoints([]);

    drawingPoints = [];
    calculateDrawingPoints(Number(data.numDrawingPoints));
    drawHandles();
    drawCurveFromPoints(drawingPoints);
  }

  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      algorithm: "parametric",
    },
  });

  function onInputChange(newValue: number, index: number, axis: "x" | "y") {
    setControlPoints((points) => {
      const temp = [...points];

      if (axis === "x") {
        temp[index] = { ...temp[index], x: newValue };
      } else {
        temp[index] = { ...temp[index], y: newValue };
      }

      return [...temp];
    });
  }

  return (
    <Wrapper>
      <Column>
        <Form>
          <select
            {...register("algorithm", { required: "obrigatório" })}
            autoFocus
          >
            <option value="parametric">Equação paramétrica</option>
            <option value="casteljau">Casteljau</option>
          </select>
          {watch("algorithm") === "parametric" && (
            <>
              <label>pontos</label>
              {controlPoints.map(({ x, y }, index) => (
                <Span key={x + y + index}>
                  <input
                    type="number"
                    defaultValue={x}
                    onChange={(e) =>
                      onInputChange(Number(e.target.value), index, "x")
                    }
                    step={100}
                  />
                  <input
                    type="number"
                    defaultValue={y}
                    onChange={(e) =>
                      onInputChange(Number(e.target.value), index, "y")
                    }
                    step={100}
                  />
                </Span>
              ))}

              <label>numDrawingPoints</label>

              <input
                type="range"
                min={1}
                max={101}
                {...register("numDrawingPoints" as any)}
                defaultValue={50}
                step={5}
              />

              <button
                type="button"
                onClick={() =>
                  setControlPoints((points) => [...points, { x: 0, y: 0 }])
                }
              >
                Adicionar ponto de controle
              </button>
            </>
          )}

          <input type="submit" onClick={handleSubmit(onSubmit)} />
        </Form>
      </Column>
      <Column style={{ backgroundColor: "white" }}>
        <svg width="500px" height="500px" id="graph">
          {lines.map((line) => line)}
          {debugPoints.map(({ x, y }) => (
            <circle key={x + y} cx={x} cy={PLOT_HEIGHT - y} r="5" fill="#000" />
          ))}
        </svg>
      </Column>
    </Wrapper>
  );
};

export default BezierCurves;