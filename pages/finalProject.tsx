import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import FinalProjectScene from "components/FinalProjectScene";
import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  z-index: 1;
  top: 8px;
  left: 8px;
`;

const FinalProject = () => {
  const [debug, setDebug] = useState(false);
  return (
    <>
      <Button onClick={() => setDebug((v) => !v)}>Debug</Button>
      <Canvas style={{ height: "100vh", width: "100vw" }}>
        <Physics broadphase="SAP" gravity={[0, -2.6, 0]} allowSleep>
          <FinalProjectScene debug={debug} />
        </Physics>
      </Canvas>
    </>
  );
};

export default FinalProject;
