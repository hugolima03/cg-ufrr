import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { Form } from "components/FillAlgorithmsForm/styles";

import * as S from "./styles";

import * as Shapes from "./shapes";

type Inputs = {
  shape: "defaultPolygon" | "polygon1" | "polygon2" | "polygon3" | "polygon4";
  showExternalPoints: true | false;
};

type SuthHodgClipOptions = {
  showExternalPoints: boolean;
};

const SutherlandHodgman = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasHeight = 500;

  function clip(polygon: number[][], polygonWindow: number[][]) {
    let cp1: any, cp2: any, s: any, e: any;

    function inside(p: any) {
      return (
        (cp2[0] - cp1[0]) * (p[1] - cp1[1]) >
        (cp2[1] - cp1[1]) * (p[0] - cp1[0])
      );
    }

    var intersection = function () {
      var dc = [cp1[0] - cp2[0], cp1[1] - cp2[1]],
        dp = [s[0] - e[0], s[1] - e[1]],
        n1 = cp1[0] * cp2[1] - cp1[1] * cp2[0],
        n2 = s[0] * e[1] - s[1] * e[0],
        n3 = 1.0 / (dc[0] * dp[1] - dc[1] * dp[0]);
      // retorna interseção p/ x e y
      return [(n1 * dp[0] - n2 * dc[0]) * n3, (n1 * dp[1] - n2 * dc[1]) * n3];
    };
    var outputList = polygon;
    cp1 = polygonWindow[polygonWindow.length - 1];
    for (var j in polygonWindow) {
      cp2 = polygonWindow[j];
      var inputList = outputList;
      outputList = [];
      s = inputList[inputList.length - 1]; //last on the input list
      for (var i in inputList) {
        e = inputList[i];
        if (inside(e)) {
          if (!inside(s)) {
            outputList.push(intersection());
          }
          outputList.push(e);
        } else if (inside(s)) {
          outputList.push(intersection());
        }
        s = e;
      }
      cp1 = cp2;
    }
    return outputList;
  }

  function drawPolygon(
    context: CanvasRenderingContext2D,
    polygon: number[][],
    strokeStyle: string,
    fillStyle: string
  ) {
    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle;
    context.beginPath();
    context.moveTo(polygon[0][0], canvasHeight - polygon[0][1]); //first vertex
    for (var i = 1; i < polygon.length; i++) {
      context.lineTo(polygon[i][0], canvasHeight - polygon[i][1]);
    }
    context.lineTo(polygon[0][0], canvasHeight - polygon[0][1]); //back to start
    context.fill();
    context.stroke();
    context.closePath();
  }

  function suthHodgClip(
    polygon: number[][],
    polygonWindow: number[][],
    { showExternalPoints }: SuthHodgClipOptions
  ) {
    const context = canvas.current?.getContext("2d");
    if (context) {
      var clippedPolygon = clip(polygon, polygonWindow);
      drawPolygon(context, polygonWindow, "#888", "#88f");
      if (showExternalPoints) {
        drawPolygon(context, polygon, "#888", "#8f8");
      }
      drawPolygon(context, clippedPolygon, "#000", "#0ff");
    }
  }

  function onSubmit({ shape, showExternalPoints }: Inputs) {
    if (canvas.current) {
      canvas.current.width = canvas.current?.width;
    }

    suthHodgClip(Shapes[shape], Shapes[`${shape}Window`], {
      showExternalPoints,
    });
  }

  // useEffect(() => {
  //   const context = canvas.current?.getContext("2d");
  //   if (context) {
  //     const clippedPolygon = clip(Shapes.polygon4, Shapes.polygon4Window);
  //     drawPolygon(context, Shapes.polygon4Window, "#888", "#88f");
  //     drawPolygon(context, Shapes.polygon4, "#888", "#8f8");
  //     drawPolygon(context, clippedPolygon, "#000", "#0ff");
  //   }
  // }, []);

  return (
    <S.Wrapper>
      <S.Column>
        <Form onSubmit={handleSubmit(onSubmit)}>
          SutherlandHodgman
          <select {...register("shape", { required: "obrigatório" })} autoFocus>
            <option value="defaultPolygon">Default</option>
            <option value="polygon1">Polígono 1</option>
            <option value="polygon2">Polígono 2</option>
            <option value="polygon3">Polígono 3</option>
            <option value="polygon4">Polígono 4</option>
          </select>
          <label>
            <input type="checkbox" {...register("showExternalPoints")} />
            Mostrar pontos externos
          </label>
          <button type="submit">Submit</button>
        </Form>
      </S.Column>
      <S.Column style={{ backgroundColor: "white" }}>
        <canvas ref={canvas} width={canvasHeight} height={canvasHeight} />
      </S.Column>
    </S.Wrapper>
  );
};

export default SutherlandHodgman;
