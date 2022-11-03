import { Pixel, usePixelGrid } from "contexts/PixelGridContext";
import React, { useEffect } from "react";

import { floodFill, PixelWithColor } from "functions/fillAlgorithms/floodFill";

import * as S from "./styles";

import { square, circunference, triangle1, triangle2, retangle } from "./mocks";
import { useForm } from "react-hook-form";

type Inputs = {
  geometryForm:
    | "square"
    | "circunference"
    | "triangle1"
    | "triangle2"
    | "retangle";
};

const FillAlgorithmsForm = () => {
  const { handleSubmit, register } = useForm<Inputs>();

  const { setColoredPixels } = usePixelGrid();

  function onSubmit({ geometryForm }: Inputs) {
    const geometryForms = {
      square,
      circunference,
      triangle1,
      triangle2,
      retangle,
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

    floodFill(5, 5, allPixels);

    setColoredPixels(
      allPixels.filter((p) => p.color === "red").map(({ x, y }) => ({ x, y }))
    );
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <select
        {...register("geometryForm", { required: "obrigatório" })}
        autoFocus
      >
        <option value="square">Quadrado</option>
        <option value="circunference">Circunferência</option>
        <option value="triangle1">Triangulo 1</option>
        <option value="triangle2">Triangulo 2</option>
        <option value="retangle">Retangulo</option>
      </select>

      <input type="submit" />
    </S.Form>
  );
};

export default FillAlgorithmsForm;
