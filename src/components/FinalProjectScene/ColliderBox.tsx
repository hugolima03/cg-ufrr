import { useBox } from "@react-three/cannon";

const ColliderBox = ({ position, scale, debug = false }: any) => {
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
