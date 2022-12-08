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

  function intersection([x1, y1, x2, y2, x3, y3, x4, y4]: number[]) {
    var dc = [x1 - x2, y1 - y2],
      dp = [y3 - y4, x3 - x4],
      n1 = x1 * y2 - y1 * x2,
      n2 = y3 * x4 - x3 * y4,
      denominador = dc[0] * dp[1] - dc[1] * dp[0];
    return [
      (n1 * dp[0] - n2 * dc[0]) / denominador,
      (n1 * dp[1] - n2 * dc[1]) / denominador,
    ];
  }

  function isInside(ponto: number[], [x1, x2, y1, y2]: number[]) {
    // ponto -> ponto a ser verificado
    // ponto[0] = X
    // ponto[1] = Y
    // x1, x2, y1, y2 -> pontos que compõem a Window
    return (x2 - x1) * (ponto[1] - y1) > (y2 - y1) * (ponto[0] - x1);
  }

  function sutherlandHodgman(polygon: number[][], polygonWindow: number[][]) {
    let windowP1: any, windowP2: any, polyP1: any, polyP2: any;
    var outputList = polygon;

    windowP1 = polygonWindow[polygonWindow.length - 1];

    for (var j in polygonWindow) {
      windowP2 = polygonWindow[j];
      var inputList = outputList;
      outputList = [];
      polyP1 = inputList[inputList.length - 1];

      for (var i in inputList) {
        polyP2 = inputList[i];
        if (
          isInside(polyP2, [windowP1[0], windowP2[0], windowP1[1], windowP2[1]])
        ) {
          if (
            !isInside(polyP1, [
              windowP1[0],
              windowP2[0],
              windowP1[1],
              windowP2[1],
            ])
          ) {
            outputList.push(
              intersection([
                windowP1[0],
                windowP1[1],
                windowP2[0],
                windowP2[1],
                polyP1[1],
                polyP1[0],
                polyP2[1],
                polyP2[0],
              ])
            ); // Caso 4, salva p1' e p2
          }
          outputList.push(polyP2); // Caso 1, salva apenas p2
        } else if (
          isInside(polyP1, [windowP1[0], windowP2[0], windowP1[1], windowP2[1]])
        ) {
          // Caso 2, salva apenas v2'
          outputList.push(
            intersection([
              windowP1[0],
              windowP1[1],
              windowP2[0],
              windowP2[1],
              polyP1[1],
              polyP1[0],
              polyP2[1],
              polyP2[0],
            ])
          );
        }
        polyP1 = polyP2;
      }
      windowP1 = windowP2;
    }
    return outputList;
  }

  function onSubmit({ shape, showExternalPoints }: Inputs) {
    if (canvas.current) {
      canvas.current.width = canvas.current?.width;
    }

    const polygon = Shapes[shape];
    const polygonWindow = Shapes[`${shape}Window`];

    const context = canvas.current?.getContext("2d");
    if (context) {
      var clippedPolygon = sutherlandHodgman(polygon, polygonWindow);
      drawPolygon(context, polygonWindow, "#888", "#88f");
      if (showExternalPoints) {
        drawPolygon(context, polygon, "#888", "#8f8");
      }
      drawPolygon(context, clippedPolygon, "#000", "#0ff");
    }
  }

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
