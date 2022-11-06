import { usePixelGrid } from "contexts/PixelGridContext";
import { useLayoutEffect } from "react";

import { Matrix4, Color } from "three";

const PixelGrid = () => {
  const { pixelGridLength, coloredPixels, pixelGridRef } = usePixelGrid();

  function buildPixelGrid() {
    const pixelGridLengthSqrt = Math.floor(Math.sqrt(pixelGridLength));
    const totalColumns = pixelGridLengthSqrt;

    for (let i = 0; i < pixelGridLength; ++i) {
      const x = i % pixelGridLengthSqrt;
      const y = Math.floor(i / pixelGridLengthSqrt);
      const transform = new Matrix4();

      transform.setPosition(x, y, 0);
      pixelGridRef.current?.setMatrixAt(i, transform);
      pixelGridRef.current?.setColorAt(i, new Color("white")); // Pinta de branco

      coloredPixels.forEach(({ x, y }) => {
        const index = x + y * totalColumns;
        if (index === i) {
          pixelGridRef.current?.setColorAt(index, new Color("red")); // Pinta de vermelho
        }
      });
    }
  }

  useLayoutEffect(() => {
    buildPixelGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pixelGridLength, coloredPixels]);

  return (
    <instancedMesh
      ref={pixelGridRef}
      args={[undefined, undefined, pixelGridLength]}
    >
      <boxGeometry args={[0.8, 0.8]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
};

export default PixelGrid;
