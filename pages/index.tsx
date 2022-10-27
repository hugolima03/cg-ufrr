import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

import PixelGrid from "components/PixelGrid";

import lineRasterization from "functions/lineRasterization";

export default function Home() {
  const [pixelGridLength, setPixelGridLength] = useState(0);
  const [fixedPixelGridLength] = useState(null);

  const coloredPixels = lineRasterization.bresenham(
    { x: 0, y: 1 },
    { x: 8, y: 4 }
  );

  function findMaxCoordinateValue() {
    let max = 0;
    coloredPixels.forEach(({ x, y }) => {
      if (x > max) max = x;
      if (y > max) max = y;
    });
    setPixelGridLength((max + 1) ** 2);
    return max;
  }

  useEffect(() => {
    findMaxCoordinateValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coloredPixels]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <p style={{ position: "absolute", visibility: "hidden" }}>main</p>

      <Canvas orthographic camera={{ zoom: 50, fov: 75 }}>
        <color attach="background" args={["black"]} />

        <PixelGrid
          pixelGridLength={fixedPixelGridLength || pixelGridLength}
          coloredPixels={coloredPixels}
        />
      </Canvas>
    </div>
  );
}
