import React, { useEffect } from "react";

import { createContext, useContext, useState } from "react";

type Pixels = {
  x: number;
  y: number;
};

export type PixelGridContext = {
  pixelGridLength: number;
  setPixelGridLength: React.Dispatch<React.SetStateAction<number>>;
  coloredPixels: Pixels[];
  setColoredPixels: React.Dispatch<React.SetStateAction<Pixels[]>>;
};

const pixelGridContextDefaultValues: PixelGridContext = {
  pixelGridLength: 0,
  setPixelGridLength: () => ({}),
  coloredPixels: [],
  setColoredPixels: () => ({}),
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
  const [coloredPixels, setColoredPixels] = useState<Pixels[]>([]);
  const [pixelGridLengthSqrt, setPixelGridLengthSqrt] = useState();

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

  const value = {
    coloredPixels,
    setColoredPixels,
    pixelGridLength,
    setPixelGridLength,
  };

  return (
    <>
      <PixelGridContext.Provider value={value}>
        {children}
      </PixelGridContext.Provider>
    </>
  );
}
