import React from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import FinalProjectScene from "components/FinalProjectScene";

const finalProject = () => {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <Physics broadphase="SAP" gravity={[0, -2.6, 0]} allowSleep>
        <FinalProjectScene />
      </Physics>
    </Canvas>
  );
};

export default finalProject;
