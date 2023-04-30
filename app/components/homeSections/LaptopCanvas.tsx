"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Laptop from "../models/laptop/Mac";
import { ContactShadows, Environment } from "@react-three/drei";
import CanvasLoader from "@/app/components/canvas/CanvasLoader";

const Scene = () => {
  return (
    <Canvas shadows="soft" camera={{ position: [-2, 0, 5] }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow={true} />
      <Suspense fallback={<CanvasLoader />}>
        <Laptop position={[-2, 0, 0]} />
        <Environment preset="warehouse" />
      </Suspense>
      <ContactShadows
        position={[0, -1, 0]}
        color={"#ececec"}
        scale={20}
        blur={2}
        far={4.5}
      />
    </Canvas>
  );
};

export default Scene;
