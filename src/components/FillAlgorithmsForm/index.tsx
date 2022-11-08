import { Pixel, usePixelGrid } from "contexts/PixelGridContext";
import React from "react";

import { floodFill, PixelWithColor } from "functions/fillAlgorithms/floodFill";

import * as S from "./styles";

import {
  square,
  circunference,
  triangle1,
  triangle2,
  retangle,
  form1,
  form2,
} from "./mocks";
import { useForm } from "react-hook-form";
import { geometricAnalysis } from "functions/fillAlgorithms/geometricAnalysis";

type Inputs = {
  geometryForm:
    | "square"
    | "circunference"
    | "triangle1"
    | "triangle2"
    | "retangle"
    | "form1"
    | "form2";
  algorithm: "floodFill" | "geometricAnalysis";
  x0: number;
  y0: number;
};

const FillAlgorithmsForm = () => {
  const { handleSubmit, register, watch } = useForm<Inputs>({
    defaultValues: {
      algorithm: "floodFill",
    },
  });

  const { setColoredPixels } = usePixelGrid();

  function onSubmit({ geometryForm, x0, y0, algorithm }: Inputs) {
    const geometryForms = {
      square,
      circunference,
      triangle1,
      triangle2,
      retangle,
      form1,
      form2,
    };

    let tempColoredPixels: Pixel[] = geometryForms[geometryForm];

    let max = 0;
    tempColoredPixels.forEach(({ x, y }) => {
      if (x > max) max = x;
      if (y > max) max = y;
    });

    let allPixels: PixelWithColor[] = [];

    for (let i = 0; i < max + 1; i++) {
      for (let j = 0; j < max + 1; j++) {
        const px = { x: i, y: j };
        if (tempColoredPixels.some((cur) => cur.x === i && cur.y === j)) {
          allPixels.push({ ...px, color: "red" });
        } else {
          allPixels.push({ ...px, color: "white" });
        }
      }
    }

    if (algorithm === "floodFill") {
      floodFill(Number(x0), Number(y0), allPixels);
    }

    if (algorithm === "geometricAnalysis") {
      geometricAnalysis(allPixels);
    }

    setColoredPixels(
      allPixels.filter((p) => p.color === "red").map(({ x, y }) => ({ x, y }))
    );
  }

  const forms = {
    floodFill: () => (
      <>
        <span style={{ display: "flex", gap: 16 }}>
          <input
            {...register("x0", { required: "obrigatório" })}
            type="number"
            name="x0"
            placeholder="x0"
            defaultValue={5}
          />

          <input
            {...register("y0", { required: "obrigatório" })}
            type="number"
            name="y0"
            placeholder="y0"
            defaultValue={5}
          />
        </span>
      </>
    ),
    geometricAnalysis: () => <></>,
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      {forms[watch("algorithm")]()}

      <select {...register("algorithm", { required: "obrigatório" })} autoFocus>
        <option value="floodFill">FloodFill</option>
        <option value="geometricAnalysis">
          Varreduta com análise geométrica
        </option>
      </select>

      <select
        {...register("geometryForm", { required: "obrigatório" })}
        autoFocus
      >
        <option value="square">Quadrado</option>
        <option value="circunference">Circunferência</option>
        <option value="triangle1">Triangulo 1</option>
        <option value="triangle2">Triangulo 2</option>
        <option value="retangle">Retangulo</option>
        <option value="form1">Forma 1</option>
        <option value="form2">Forma 2</option>
      </select>

      <input type="submit" />
    </S.Form>
  );
};

export default FillAlgorithmsForm;
