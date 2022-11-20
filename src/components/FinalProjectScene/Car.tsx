import { useEffect, useRef } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Car = () => {
  let mesh = useLoader(GLTFLoader, "/models/car.glb").scene;

  useEffect(() => {
    mesh.scale.set(0.0012, 0.0012, 0.0012);
    mesh.children[0].position.set(-365, -18, -67);
  }, [mesh]);

  return <primitive object={mesh} rotation-y={Math.PI} />;
};

export default Car;
