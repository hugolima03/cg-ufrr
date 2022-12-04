import React, { Suspense, useEffect, useState } from "react";

import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

import Track from "./Track";
import Ground from "./Ground";
import Car from "./Car";

type FinalProjectSceneProps = {
  debug: boolean;
};

const FinalProjectScene = ({ debug }: FinalProjectSceneProps) => {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  useEffect(() => {
    function keydownHandler(e: KeyboardEvent) {
      if (e.key == "k") {
        // random is necessary to trigger a state change
        if (thirdPerson)
          setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        setThirdPerson(!thirdPerson);
      }
    }

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [thirdPerson]);

  return (
    <Suspense fallback={null}>
      <Environment files={"/textures/envmap.hdr"} background />
      <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
      {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}

      <Ground />
      <Track debug={debug} />
      <Car thirdPerson={thirdPerson} debug={debug} />
    </Suspense>
  );
};

export default FinalProjectScene;
