import { RefObject, useLayoutEffect, useRef, useState } from "react";

import { Matrix4, Color } from "three";
import { BufferGeometry, InstancedMesh, Material } from "three";

type Pixels = {
  x: number;
  y: number;
};

type PixelGridProps = {
  pixelGridLength: number;
  coloredPixels: Pixels[];
};

const PixelGrid = ({ pixelGridLength, coloredPixels }: PixelGridProps) => {
  const pixelGridLengthSqrt = Math.floor(Math.sqrt(pixelGridLength));

  const ref =
    useRef<InstancedMesh<BufferGeometry, Material | Material[]>>(null);

  useLayoutEffect(() => {
    const transform = new Matrix4();

    for (let i = 0; i < pixelGridLength; ++i) {
      const x = i % pixelGridLengthSqrt;
      const y = Math.floor(i / pixelGridLengthSqrt);

      transform.setPosition(x, y, 0);
      ref.current?.setMatrixAt(i, transform);

      ref.current?.setColorAt(i, new Color("white"));
    }
  }, [coloredPixels, pixelGridLength, pixelGridLengthSqrt]);

  useLayoutEffect(() => {
    const totalColumns = pixelGridLengthSqrt;

    for (let i = 0; i < pixelGridLength; ++i) {
      coloredPixels.forEach(({ x, y }) => {
        const index = x + y * totalColumns;
        if (index === i) {
          ref.current?.setColorAt(index, new Color("red"));
        }
      });
    }
  }, [coloredPixels, pixelGridLength, pixelGridLengthSqrt]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, pixelGridLength]}>
      <boxGeometry args={[0.8, 0.8]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
};

export default PixelGrid;
