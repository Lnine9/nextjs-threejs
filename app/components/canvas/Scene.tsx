"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import React from "react";
import { Props as CanvasProps } from "@react-three/fiber/dist/declarations/src/web/Canvas";

interface Props extends CanvasProps {}

export default function Scene({ children, ...props }: Props) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      <directionalLight intensity={0.75} />
      <ambientLight intensity={0.75} />
      {children}
      <Preload all />
      <OrbitControls />
    </Canvas>
  );
}
