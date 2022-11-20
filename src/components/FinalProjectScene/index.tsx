import React, { Suspense } from "react";

import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

import Track from "./Track";
import Ground from "./Ground";
import Car from "./Car";

const FinalProjectScene = () => {
  console.log(process.env.NEXT_PUBLIC_PUBLIC_URL + "/textures/envmap.hdr");
  return (
    <Suspense fallback={null}>
      <Environment files={"/textures/envmap.hdr"} background />
      <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
      <OrbitControls target={[-2.64, -0.71, 0.03]} />

      <Track />
      <Ground />
      <Car />
    </Suspense>
  );
};

export default FinalProjectScene;
