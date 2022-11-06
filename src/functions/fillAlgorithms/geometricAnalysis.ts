import { Pixel } from "contexts/PixelGridContext";

export type PixelWithColor = { color: "white" | "red" } & Pixel;

export function geometricAnalysis(allPixels: PixelWithColor[]) {
  let vertexCounter = 0;

  allPixels.forEach(({ x, y, color }, index) => {
    let isOdd = vertexCounter % 2 !== 0; // Se for ímpar, então o pixel está dentro da figura

    if (isOdd) {
      allPixels[index] = { ...allPixels[index], color: "red" };
    }

    if (color === "red") {
      vertexCounter++;
    }
  });
}
