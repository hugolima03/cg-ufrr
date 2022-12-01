import { useEffect, useRef } from "react";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import { useBox, Triplet, useRaycastVehicle } from "@react-three/cannon";
import { useWheels } from "./useWheels";
import { Wheel } from "./Wheel";
import useControls from "./useControls";
import { Quaternion, Vector3 } from "three";
import { useGLTF } from "@react-three/drei";
import type { Material, Mesh } from "three";
import type { GLTF } from "three-stdlib/loaders/GLTFLoader";
import * as THREE from "three";

type CarProps = {
  thirdPerson: boolean;
};

useGLTF.preload("/models/fusca.glb");

const beetleMaterials = [
  "Black paint",
  "Black plastic",
  "Chrom",
  "Glass",
  "Headlight",
  "Interior (dark)",
  "Interior (light)",
  "License Plate",
  "Orange plastic",
  "Paint",
  "Reflector",
  "Reverse lights",
  "Rubber",
  "Steel",
  "Tail lights",
  "Underbody",
] as const;
type BeetleMaterial = typeof beetleMaterials[number];

const beetleNodes = [
  "chassis_1",
  "chassis_2",
  "chassis_3",
  "chassis_4",
  "chassis_5",
  "chassis_6",
  "chassis_7",
  "chassis_8",
  "chassis_9",
  "chassis_10",
  "chassis_11",
  "chassis_12",
  "chassis_13",
  "chassis_14",
  "chassis_15",
  "chassis_16",
] as const;
type BeetleNode = typeof beetleNodes[number];

type BeetleGLTF = GLTF & {
  materials: Record<BeetleMaterial, Material>;
  nodes: Record<BeetleNode, Mesh>;
};

const Car = ({ thirdPerson }: CarProps) => {
  const position: Triplet = [-1.5, 0.5, 3];
  const width = 0.2;
  const height = 0.07;
  const front = 0.12;
  const wheelRadius = 0.05;

  const chassisBodyArgs: Triplet = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    useRef(null)
  );

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);
  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos: wheelInfos as any,
      wheels: wheels as any,
    }),
    useRef(null)
  );

  useControls(vehicleApi, chassisApi);

  useFrame((state) => {
    if (!thirdPerson) return;

    let position = new Vector3(0, 0, 0);
    position.setFromMatrixPosition((chassisBody as any).current.matrixWorld);

    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix((chassisBody as any).current.matrixWorld);

    let wDir = new Vector3(0, 0, 1);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();

    let cameraPosition = position
      .clone()
      .add(wDir.clone().multiplyScalar(1).add(new Vector3(0, 0.3, 0)));

    wDir.add(new Vector3(0, 0.2, 0));
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });

  const { nodes, materials } = useGLTF(
    "/models/fusca.glb"
  ) as unknown as BeetleGLTF;

  return (
    <group ref={vehicle as any} name="vehicle">
      <group
        ref={chassisBody as any}
        name="chassisBody"
        position={[0, -0.6, 0]}
        scale={0.1}
      >
        <mesh
          castShadow
          rotation-y={Math.PI}
          material={materials["Black paint"]}
          geometry={nodes.chassis_1.geometry}
        />
        <mesh
          castShadow
          rotation-y={Math.PI}
          material={materials.Rubber}
          geometry={nodes.chassis_2.geometry}
        />
        <mesh
          castShadow
          rotation-y={Math.PI}
          material={materials.Paint}
          geometry={nodes.chassis_3.geometry}
        />
        <mesh
          castShadow
          rotation-y={Math.PI}
          material={materials.Underbody}
          geometry={nodes.chassis_4.geometry}
        />
        <mesh
          castShadow
          rotation-y={Math.PI}
          material={materials.Chrom}
          geometry={nodes.chassis_5.geometry}
        />
        <mesh
          castShadow
          rotation-y={Math.PI}
          material={materials["Interior (dark)"]}
          geometry={nodes.chassis_6.geometry}
        />
        <mesh
          castShadow
          rotation-y={Math.PI}
          material={materials["Interior (light)"]}
          geometry={nodes.chassis_7.geometry}
        />
        <mesh
          castShadow
          rotation-y={Math.PI}
          material={materials.Reflector}
          geometry={nodes.chassis_8.geometry}
        />
        <mesh
          rotation-y={Math.PI}
          material={materials.Glass}
          geometry={nodes.chassis_9.geometry}
          material-transparent={false}
          material-color="black"
        />
        <mesh
          castShadow
          rotation-y={Math.PI}
          material={materials.Steel}
          geometry={nodes.chassis_10.geometry}
        />
        <mesh
          castShadow
          rotation-y={Math.PI}
          material={materials["Black plastic"]}
          geometry={nodes.chassis_11.geometry}
        />
        <mesh
          rotation-y={Math.PI}
          material={materials.Headlight}
          geometry={nodes.chassis_12.geometry}
        />
        <mesh
          castShadow
          rotation-y={Math.PI}
          material={materials["Reverse lights"]}
          geometry={nodes.chassis_13.geometry}
        />
        <mesh
          castShadow
          rotation-y={Math.PI}
          material={materials["Orange plastic"]}
          geometry={nodes.chassis_14.geometry}
        />
        <mesh
          castShadow
          rotation-y={Math.PI}
          material={materials["Tail lights"]}
          geometry={nodes.chassis_15.geometry}
        />
        <mesh
          castShadow
          rotation-y={Math.PI}
          material={materials["License Plate"]}
          geometry={nodes.chassis_16.geometry}
        />
      </group>

      <Wheel wheelRef={wheels[0]} radius={wheelRadius} leftSide />
      <Wheel wheelRef={wheels[1]} radius={wheelRadius} />
      <Wheel wheelRef={wheels[2]} radius={wheelRadius} leftSide />
      <Wheel wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
};

export default Car;
