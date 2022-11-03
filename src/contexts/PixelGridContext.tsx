import React, { useEffect, useRef } from "react";

import { createContext, useContext, useState } from "react";
import { BufferGeometry, InstancedMesh, Material } from "three";

export type Pixel = {
  x: number;
  y: number;
};

export type PixelGridContext = {
  pixelGridLength: number;
  setPixelGridLength: React.Dispatch<React.SetStateAction<number>>;
  coloredPixels: Pixel[];
  setColoredPixels: React.Dispatch<React.SetStateAction<Pixel[]>>;
  pixelGridRef: React.RefObject<
    InstancedMesh<BufferGeometry, Material | Material[]>
  >;
};

const pixelGridContextDefaultValues: PixelGridContext = {
  pixelGridLength: 0,
  setPixelGridLength: () => ({}),
  coloredPixels: [],
  setColoredPixels: () => ({}),
  pixelGridRef: { current: null },
};

export const PixelGridContext = createContext<PixelGridContext>(
  pixelGridContextDefaultValues
);

export function usePixelGrid() {
  return useContext(PixelGridContext);
}

type Props = {
  children: React.ReactNode;
};

export function PixelGridProvider({ children }: Props) {
  const [pixelGridLength, setPixelGridLength] = useState(0);
  const [coloredPixels, setColoredPixels] = useState<Pixel[]>([]);

  const pixelGridRef =
    useRef<InstancedMesh<BufferGeometry, Material | Material[]>>(null);

  function findMaxCoordinateValue() {
    let max = 0;
    coloredPixels.forEach(({ x, y }) => {
      if (x > max) max = x;
      if (y > max) max = y;
    });
    setPixelGridLength((max + 2) ** 2);
    return max;
  }

  useEffect(() => {
    findMaxCoordinateValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coloredPixels]);

  const value = {
    coloredPixels,
    setColoredPixels,
    pixelGridLength,
    setPixelGridLength,
    pixelGridRef,
  };

  return (
    <>
      <PixelGridContext.Provider value={value}>
        {children}
      </PixelGridContext.Provider>
    </>
  );
}
