import React from "react";
import { Canvas } from "@react-three/fiber";

import FinalProjectScene from "components/FinalProjectScene";

const finalProject = () => {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <FinalProjectScene />
    </Canvas>
  );
};

export default finalProject;
