import { usePixelGrid } from "contexts/PixelGridContext";
import { useLayoutEffect, useRef } from "react";

import { Matrix4, Color } from "three";
import { BufferGeometry, InstancedMesh, Material } from "three";

const PixelGrid = () => {
  const { pixelGridLength, coloredPixels } = usePixelGrid();

  const ref =
    useRef<InstancedMesh<BufferGeometry, Material | Material[]>>(null);

  function buildPixelGrid() {
    const transform = new Matrix4();
    const pixelGridLengthSqrt = Math.floor(Math.sqrt(pixelGridLength));
    for (let i = 0; i <= pixelGridLength; ++i) {
      const x = i % pixelGridLengthSqrt;
      const y = Math.floor(i / pixelGridLengthSqrt);

      transform.setPosition(x, y, 0);
      ref.current?.setMatrixAt(i, transform);
      ref.current?.setColorAt(i, new Color("white"));
    }
  }

  useLayoutEffect(() => {
    buildPixelGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pixelGridLength]);

  useLayoutEffect(() => {
    buildPixelGrid();

    const pixelGridLengthSqrt = Math.floor(Math.sqrt(pixelGridLength));
    const totalColumns = pixelGridLengthSqrt;

    for (let i = 0; i < pixelGridLength; ++i) {
      coloredPixels.forEach(({ x, y }) => {
        const index = x + y * totalColumns;

        if (index === i) {
          ref.current?.setColorAt(index, new Color("red"));
        }
      });
    }
  }, [coloredPixels]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, pixelGridLength]}>
      <boxGeometry args={[0.8, 0.8]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
};

export default PixelGrid;
