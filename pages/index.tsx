import { Canvas } from "@react-three/fiber";

import PixelGrid from "components/PixelGrid";

export default function Home() {
  const pixelGridLength = 36;
  const coloredPixels = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 4, y: 2 },
    { x: 5, y: 2 },
  ];

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
