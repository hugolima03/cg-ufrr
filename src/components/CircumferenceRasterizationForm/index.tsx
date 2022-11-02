import { Pixels, usePixelGrid } from "contexts/PixelGridContext";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import circumferenceRasterization from "functions/circumferenceRasterization";

import * as S from "./styles";

type Inputs = {
  algorithm: "parametricEquation";
  xc: number;
  yc: number;
  raio: number;
};

const CircumferenceRasterizationForm = () => {
  const { register, watch, handleSubmit } = useForm<Inputs>();

  const { setColoredPixels, setPixelGridLength } = usePixelGrid();

  function onSubmit({ algorithm, raio, xc, yc }: Inputs) {
    let tempColoredPixels: Pixels[] = [];

    if (algorithm === "parametricEquation") {
      tempColoredPixels = circumferenceRasterization[algorithm](
        Number(xc),
        Number(yc),
        Number(raio)
      );
    }

    let max = 0;
    tempColoredPixels.forEach(({ x, y }) => {
      if (x > max) max = x;
      if (y > max) max = y;
    });

    setPixelGridLength((max + 1) ** 2);
    setColoredPixels(tempColoredPixels);
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("algorithm", { required: "obrigatório" })} autoFocus>
        <option value="parametricEquation">Equação paramétrica</option>
        {/* <option value="incrementalWithSymmetry">
          Incremental com Simetria
        </option> */}
      </select>

      {watch("algorithm") === "parametricEquation" && (
        <>
          <S.Span>
            <input
              {...register("xc", { required: "obrigatório" })}
              type="number"
              name="xc"
              placeholder="xc"
            />
            <input
              {...register("yc", { required: "obrigatório" })}
              type="number"
              name="yc"
              placeholder="yc"
            />
          </S.Span>

          <input
            {...register("raio", { required: "obrigatório" })}
            type="number"
            name="raio"
            placeholder="raio"
          />
        </>
      )}

      <input type="submit" />
    </S.Form>
  );
};

export default CircumferenceRasterizationForm;
