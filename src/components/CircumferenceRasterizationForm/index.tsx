import { Pixel, usePixelGrid } from "contexts/PixelGridContext";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import circumferenceRasterization from "functions/circumferenceRasterization";

import * as S from "./styles";

type Inputs = {
  algorithm: "parametricEquation" | "incrementalWithSymmetry" | "bresenham";
  xc: number;
  yc: number;
  raio: number;
};

const CircumferenceRasterizationForm = () => {
  const { register, watch, handleSubmit } = useForm<Inputs>({
    defaultValues: { algorithm: "parametricEquation" },
  });

  const { setColoredPixels } = usePixelGrid();

  function onSubmit({ algorithm, raio, xc, yc }: Inputs) {
    let tempColoredPixels: Pixel[] = [];

    tempColoredPixels = circumferenceRasterization[algorithm](
      Number(xc),
      Number(yc),
      Number(raio)
    );

    let max = 0;
    tempColoredPixels.forEach(({ x, y }) => {
      if (x > max) max = x;
      if (y > max) max = y;
    });

    setColoredPixels(tempColoredPixels);
  }

  const forms = {
    parametricEquation: () => (
      <>
        <S.Span>
          <input
            {...register("xc", { required: "obrigatório" })}
            type="number"
            name="xc"
            placeholder="x inicial"
          />
          <input
            {...register("yc", { required: "obrigatório" })}
            type="number"
            name="yc"
            placeholder="y inicial"
          />
        </S.Span>

        <input
          {...register("raio", { required: "obrigatório" })}
          type="number"
          name="raio"
          placeholder="raio"
        />
      </>
    ),
    bresenham: () => (
      <>
        <S.Span>
          <input
            {...register("xc", { required: "obrigatório" })}
            type="number"
            name="xc"
            placeholder="x inicial"
          />
          <input
            {...register("yc", { required: "obrigatório" })}
            type="number"
            name="yc"
            placeholder="y inicial"
          />
        </S.Span>

        <input
          {...register("raio", { required: "obrigatório" })}
          type="number"
          name="raio"
          placeholder="raio"
        />
      </>
    ),
    incrementalWithSymmetry: () => (
      <>
        <S.Span>
          <input
            {...register("xc", { required: "obrigatório" })}
            type="number"
            name="xc"
            placeholder="x inicial"
          />
          <input
            {...register("yc", { required: "obrigatório" })}
            type="number"
            name="yc"
            placeholder="y inicial"
          />
        </S.Span>

        <input
          {...register("raio", { required: "obrigatório" })}
          type="number"
          name="raio"
          placeholder="raio"
        />
      </>
    ),
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("algorithm", { required: "obrigatório" })} autoFocus>
        <option value="parametricEquation">Equação paramétrica</option>
        <option value="incrementalWithSymmetry">
          Incremental com Simetria
        </option>
        <option value="bresenham">Bresenham</option>
      </select>

      {forms[watch("algorithm")]()}

      <input type="submit" />
    </S.Form>
  );
};

export default CircumferenceRasterizationForm;
