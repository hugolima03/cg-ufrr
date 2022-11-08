import { Pixel } from "contexts/PixelGridContext";

export type PixelWithColor = { color: "white" | "red" } & Pixel;

export function geometricAnalysis(allPixels: PixelWithColor[]) {
  console.time("Análise Geométrica");
  let vertexCounter = 0;

  allPixels.forEach(({ color }, index) => {
    let isOdd = vertexCounter % 2 !== 0; // Se for ímpar, então o pixel está dentro da figura

    if (isOdd) {
      allPixels[index] = { ...allPixels[index], color: "red" };
    }

    if (color === "red") {
      vertexCounter++;
    }
  });
  console.timeEnd("Análise Geométrica");
}
