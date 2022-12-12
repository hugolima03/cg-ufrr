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
    // x1, x2, y1, y2 -> pontos que compõem a Window

    // CROSS PRODUCT
    // Os vértices do polígono de recorte devem estar listados no sentido horário, desta forma, estar fora significa estar à esquerda da linha
    // P < 0 , ponto está a esquerda da linha
    // P === 0, ponto está na linha
    // P > 0, ponto está a direita
    const P = (x2 - x1) * (ponto[1] - y1) - (y2 - y1) * (ponto[0] - x1);
    return P > 0 || P === 0;
  }

  function sutherlandHodgman(
    subjectPolygon: number[][],
    clipPolygon: number[][]
  ) {
    let outputList = subjectPolygon; // Lista final começa com os mesmos pontos do subjectPolygon
    let windowP1 = clipPolygon[clipPolygon.length - 1]; // Começa com o último ponto do clipPolygon

    for (let j in clipPolygon) {
      // Iterando os vértices da window
      let inputList = outputList;
      outputList = []; // Limpando array de output

      let windowP2 = clipPolygon[j];
      let prevPoint = inputList[inputList.length - 1];

      // clipEdge é a borda da Window analisada
      const clipEdge = [windowP1[0], windowP2[0], windowP1[1], windowP2[1]];

      for (let i in inputList) {
        // Iterando cada item da inputList
        let currentPoint = inputList[i];
        const intersectionPoint = intersection([
          windowP1[0],
          windowP1[1],
          windowP2[0],
          windowP2[1],
          prevPoint[1],
          prevPoint[0],
          currentPoint[1],
          currentPoint[0],
        ]); // Ponto de interseção entre currentPoint, prevPoint e a window

        if (isInside(currentPoint, clipEdge)) {
          if (!isInside(prevPoint, clipEdge)) {
            outputList.push(intersectionPoint); // Caso 4, salva p1' e p2
          }
          outputList.push(currentPoint); // Caso 1, salva apenas p2
        } else if (isInside(prevPoint, clipEdge)) {
          // Caso 2, salva apenas v2'
          outputList.push(intersectionPoint);
        } // else {
        // Salva nada
        //}
        prevPoint = currentPoint; // Atualizando o prevPoint para a próxima iteração
      }
      windowP1 = windowP2; // Atualizando para a próxima iteração
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
