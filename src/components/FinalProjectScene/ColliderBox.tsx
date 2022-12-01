import { useBox } from "@react-three/cannon";

const debug = false;

const ColliderBox = ({ position, scale }: any) => {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));

  if (debug) {
    return (
      <mesh position={position}>
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={true} opacity={0.25} />
      </mesh>
    );
  }
  return null;
};

export default ColliderBox;
