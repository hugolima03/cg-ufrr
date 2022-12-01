const debug = true;

type WheelDebugProps = {
  radius: number;
  wheelRef: any;
};

export const WheelDebug = ({ radius, wheelRef }: WheelDebugProps) => {
  if (debug)
    return (
      <group ref={wheelRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[radius, radius, 0.015, 16]} />
          <meshNormalMaterial transparent={true} opacity={0.25} />
        </mesh>
      </group>
    );

  return null;
};
