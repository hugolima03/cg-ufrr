import { Pixel } from "contexts/PixelGridContext";

export type PixelWithColor = { color: "white" | "red" } & Pixel;

export function floodFill(x: number, y: number, allPixels: PixelWithColor[]) {
  let pixel = allPixels.find((cur) => cur.x === x && cur.y === y);
  let pixelIndex = allPixels.findIndex((cur) => cur.x === x && cur.y === y);

  if (pixel?.color === "white") {
    allPixels[pixelIndex].color = "red";

    floodFill(x + 1, y, allPixels);
    floodFill(x, y + 1, allPixels);
    floodFill(x - 1, y, allPixels);
    floodFill(x, y - 1, allPixels);
  }
}
