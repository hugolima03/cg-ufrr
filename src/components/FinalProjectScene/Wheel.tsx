import { CylinderProps } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib/loaders/GLTFLoader";
import type { Group, Material, Mesh } from "three";

type WheelProps = {
  radius: number;
  wheelRef: any;
  leftSide?: boolean;
};

type WheelGLTF = GLTF & {
  materials: Record<"Chrom" | "Rubber" | "Steel", Material>;
  nodes: Record<"wheel_1" | "wheel_2" | "wheel_3", Mesh>;
};

export const Wheel = ({ radius, wheelRef, leftSide }: WheelProps) => {
  const {
    materials: { Chrom, Rubber, Steel },
    nodes,
  } = useGLTF("/models/wheel.glb") as unknown as WheelGLTF;

  return (
    <group ref={wheelRef}>
      <group rotation={[0, 0, ((leftSide ? 1 : -1) * Math.PI) / 2]} scale={0.2}>
        <mesh material={Rubber} geometry={nodes.wheel_1.geometry} />
        <mesh material={Steel} geometry={nodes.wheel_2.geometry} />
        <mesh material={Chrom} geometry={nodes.wheel_3.geometry} />
      </group>
    </group>
  );
};
