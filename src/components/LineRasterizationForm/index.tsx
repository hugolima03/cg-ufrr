import { usePixelGrid } from "contexts/PixelGridContext";
import React from "react";

import { useForm } from "react-hook-form";

import lineRasterization from "functions/lineRasterization";

import * as S from "./styles";

type Inputs = {
  algorithm: "bresenham" | "analytical" | "dda";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

const LineRasterizationForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const { setColoredPixels, setPixelGridLength } = usePixelGrid();

  function onSubmit({ algorithm, x1, x2, y1, y2 }: Inputs) {
    const tempColoredPixels = lineRasterization[algorithm](
      { x: Number(x1), y: Number(y1) },
      { x: Number(x2), y: Number(y2) }
    );

    let max = 0;
    tempColoredPixels.forEach(({ x, y }) => {
      if (x > max) max = x;
      if (y > max) max = y;
    });
    console.log(tempColoredPixels)
    setPixelGridLength((max + 1) ** 2);
    setColoredPixels(tempColoredPixels);
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("algorithm", { required: "obrigatório" })} autoFocus>
        <option value="">Selecionar algoritmo de rasterização</option>
        <option value="bresenham">Bresenham</option>
        <option value="dda">DDA</option>
        <option value="analytical">Método analítico</option>
      </select>

      <S.Span>
        <input
          {...register("x1", { required: "obrigatório" })}
          type="number"
          name="x1"
          placeholder="x1"
        />
        <input
          {...register("y1", { required: "obrigatório" })}
          type="number"
          name="y1"
          placeholder="y1"
        />
      </S.Span>

      <S.Span>
        <input
          {...register("x2", { required: "obrigatório" })}
          type="number"
          name="x2"
          placeholder="x2"
        />
        <input
          {...register("y2", { required: "obrigatório" })}
          type="number"
          name="y2"
          placeholder="y2"
        />
      </S.Span>

      <input type="submit" />
    </S.Form>
  );
};

export default LineRasterizationForm;
