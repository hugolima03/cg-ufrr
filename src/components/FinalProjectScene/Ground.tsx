import { useEffect, useRef } from "react";

import { BufferAttribute } from "three";
import { useLoader } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { usePlane } from "@react-three/cannon";

const Ground = () => {
  const [ref] = usePlane(
    () => ({
      type: "Static",
      rotation: [-Math.PI / 2, 0, 0],
      position: [-1.5, -0.38, 3],
    }),
    useRef(null)
  );

  const gridMap = useLoader(TextureLoader, "/textures/grid.png");
  const aoMap = useLoader(TextureLoader, "/textures/ground-ao.png");
  const alphaMap = useLoader(TextureLoader, "/textures/alpha-map.png");

  useEffect(() => {
    gridMap.anisotropy = 16;
  }, [gridMap]);

  const meshRef = useRef<any>(null);
  const meshRef2 = useRef<any>(null);

  useEffect(() => {
    let uvs = meshRef?.current?.geometry.attributes.uv.array;
    meshRef.current?.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));
    let uvs2 = meshRef2?.current?.geometry.attributes.uv.array;
    meshRef2.current?.geometry.setAttribute(
      "uv2",
      new BufferAttribute(uvs2, 2)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meshRef.current]);

  return (
    <>
      <mesh
        ref={meshRef2}
        position={[-2.285, -0.01, -1.325]}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial
          opacity={0.325}
          alphaMap={gridMap}
          transparent
          color={"white"}
        />
      </mesh>

      <mesh
        ref={meshRef}
        position={[-2.285, -0.015, -1.325]}
        rotation-x={-Math.PI * 0.5}
        rotation-z={-0.079}
      >
        <circleGeometry args={[6.12, 50]} />
        <MeshReflectorMaterial
          mirror={0}
          aoMap={aoMap}
          alphaMap={alphaMap}
          transparent={true}
          color={[0.5, 0.5, 0.5]}
          envMapIntensity={0.35}
          metalness={0.05}
          roughness={0.4}
          dithering={true}
          blur={[1024, 512]} // Blur ground reflections (width, heigt), 0 skips blur
          mixBlur={3} // How much blur mixes with surface roughness (default = 1)
          mixStrength={30} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [bl
          reflectorOffset={0.02} // Offsets the virtual camera that projects the reflection. Useful when the reflective
        />
      </mesh>
    </>
  );
};

export default Ground;
