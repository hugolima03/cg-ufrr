import { Canvas } from "@react-three/fiber";

import PixelGrid from "components/PixelGrid";

import lineRasterization from "functions/lineRasterization";
import { useEffect, useState } from "react";

export default function Home() {
  const [pixelGridLength, setPixelGridLength] = useState(0);

  const coloredPixels = lineRasterization.analytical(
    { x: 0, y: 0 },
    { x: 6, y: 5 }
  );

  function findMaxCoordinateValue() {
    let max = 0;
    coloredPixels.forEach(({ x, y }) => {
      if (x > max) max = x;
      if (y > max) max = y;
    });
    setPixelGridLength(max * max);
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
          pixelGridLength={pixelGridLength}
          coloredPixels={coloredPixels}
        />
      </Canvas>
    </div>
  );
}
