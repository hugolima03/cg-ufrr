import { Form } from "components/FillAlgorithmsForm/styles";
import { Span } from "components/LineRasterizationForm/styles";
import { Pixel } from "contexts/PixelGridContext";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Column, Wrapper } from "templates/Base/styles";

const PLOT_HEIGHT = 500;

type Inputs = {
  algorithm: "parametric" | "casteljau";
  numDrawingPoints: number;
};

const BezierCurves = () => {
  let drawingPoints: Pixel[] = [];
  const [debugPoints, setDebugPoints] = useState<Pixel[]>([]);

  const [controlPoints, setControlPoints] = useState<Pixel[]>([
    { x: 10, y: 10 },
    { x: 10, y: 250 },
    { x: 210, y: 250 },
    { x: 210, y: 10 },
  ]);

  const [lines, setLines] = useState<React.ReactNode[]>([]);
  const [points, setPoints] = useState<Pixel[]>([]);

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

  function renderPoints(points: Pixel[]) {
    setPoints(
      points.map(({ x, y }) => ({
        x,
        y: PLOT_HEIGHT - y,
      }))
    );
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

  const { handleSubmit, register, watch } = useForm<Inputs>({
    defaultValues: {
      algorithm: "parametric",
      numDrawingPoints: 50,
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

  function casteljauRecursive(points: Pixel[], deep: number) {
    if (deep === 0) return;
    var m = [
      // ponto medio 0
      {
        x: (points[0].x + points[1].x) / 2,
        y: (points[0].y + points[1].y) / 2,
      },

      // ponto medio 1
      {
        x: (points[1].x + points[2].x) / 2,
        y: (points[1].y + points[2].y) / 2,
      },

      // ponto medio 2
      {
        x: (points[2].x + points[3].x) / 2,
        y: (points[2].y + points[3].y) / 2,
      },
    ];

    // ponto medio 3
    m.push({
      x: (m[0].x + m[1].x) / 2,
      y: (m[0].y + m[1].y) / 2,
    });

    // ponto medio 4
    m.push({
      x: (m[1].x + m[2].x) / 2,
      y: (m[1].y + m[2].y) / 2,
    });

    // ponto medio 5
    m.push({
      x: (m[3].x + m[4].x) / 2,
      y: (m[3].y + m[4].y) / 2,
    });

    //Pinta o pixel
    setPoints((points) => [...points, { x: m[5].x, y: m[5].y }]);
    //Chama recursivamente para cada metade da curva
    casteljauRecursive([points[0], m[0], m[3], m[5]], deep - 1);
    casteljauRecursive([m[5], m[4], m[2], points[3]], deep - 1);
  }

  function onSubmit(data: Inputs) {
    if (data.algorithm === "parametric") {
      console.time("parametric");
      setLines([]);
      setDebugPoints([]);

      drawingPoints = [];
      calculateDrawingPoints(Number(data.numDrawingPoints));
      drawHandles(); // Desenhar linhas dos pontos de controle
      setPoints(drawingPoints);
      // drawCurveFromPoints(drawingPoints);
      renderPoints(drawingPoints);
      console.timeEnd("parametric");
    }

    if (data.algorithm === "casteljau") {
      console.time("casteljau");
      setPoints([]);
      setLines([]);
      setDebugPoints([]);

      casteljauRecursive(controlPoints, data.numDrawingPoints);

      drawHandles(); // Desenhar linhas dos pontos de controle
      // drawCurveFromPoints(points);
      console.timeEnd("casteljau");
    }
  }

  function removeControlPoint(index: number) {
    setControlPoints((points) => {
      const temp = points;
      temp.splice(index, 1);
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
          <>
            <label>pontos</label>
            {controlPoints.map(({ x, y }, index) => (
              <Span key={x + y + index}>
                <input
                  type="number"
                  defaultValue={x}
                  onBlur={(e) =>
                    onInputChange(Number(e.target.value), index, "x")
                  }
                  step={100}
                />
                <input
                  type="number"
                  defaultValue={y}
                  onBlur={(e) =>
                    onInputChange(Number(e.target.value), index, "y")
                  }
                  step={100}
                />
                <button type="button" onClick={() => removeControlPoint(index)}>
                  Remover
                </button>
              </Span>
            ))}

            {watch("algorithm") === "parametric" && (
              <>
                {" "}
                <label>numDrawingPoints: {watch("numDrawingPoints")}</label>
                <input
                  type="range"
                  min={1}
                  max={101}
                  step={5}
                  {...register("numDrawingPoints")}
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

            {watch("algorithm") === "casteljau" && (
              <>
                <label>numDrawingPoints: {watch("numDrawingPoints")}</label>
                <input
                  type="range"
                  min={1}
                  max={13}
                  step={2}
                  {...register("numDrawingPoints")}
                />
              </>
            )}
          </>

          <input type="submit" onClick={handleSubmit(onSubmit)} />
        </Form>
      </Column>
      <Column style={{ backgroundColor: "white" }}>
        <svg
          width="500px"
          height="500px"
          id="graph"
          style={{ overflow: "visible" }}
        >
          {lines.map((line) => line)}
          {points.map(({ x, y }) => (
            <circle key={x + y} cx={x} cy={PLOT_HEIGHT - y} r="3" fill="#000" />
          ))}
          {debugPoints.map(({ x, y }) => (
            <circle key={x + y} cx={x} cy={PLOT_HEIGHT - y} r="5" fill="#000" />
          ))}
        </svg>
      </Column>
    </Wrapper>
  );
};

export default BezierCurves;
