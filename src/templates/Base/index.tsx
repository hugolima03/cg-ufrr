import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MapControls } from "@react-three/drei";

import PixelGrid from "components/PixelGrid";

import lineRasterization from "functions/lineRasterization";

import * as S from "./styles";

type BaseTemplateProps = {
  children: React.ReactNode;
};

const BaseTemplate = ({ children }: BaseTemplateProps) => {
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
    <S.Wrapper>
      <S.Column>{children}</S.Column>

      <S.Column>
        <Canvas
          orthographic
          camera={{
            position: [0, 0, 50],
            zoom: 50,
            up: [0, 0, 1],
            far: 50,
          }}
        >
          <color attach="background" args={["rgb(26, 26, 46)"]} />
          <MapControls enableRotate={false} />
          <PixelGrid
            pixelGridLength={fixedPixelGridLength || pixelGridLength}
            coloredPixels={coloredPixels}
          />
        </Canvas>
      </S.Column>
    </S.Wrapper>
  );
};

export default BaseTemplate;
