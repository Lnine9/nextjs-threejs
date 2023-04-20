"use client";
import React, { useRef, useState } from "react";
import GeoMap from "@/app/doc/ChongQingMap/GeoMap";
import chongQingGeoJson from "./chongqing.json";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { Euler } from "three";

type TipsProps = {
  areaData?: any;
  visible: boolean;
  top?: number;
  left?: number;
};
const Tips = ({ areaData, visible, top, left }: TipsProps) => (
  <div
    className="
    min-w-30
    absolute
    p-2
    z-40
    bg-neutral-800
    bg-opacity-60
    rounded
    text-white
    pointer-events-none
    "
    style={{
      top: top,
      left: left,
      visibility: visible ? "visible" : "hidden",
    }}
  >
    {areaData?.name}
    <p>{areaData?.fullname}</p>
  </div>
);

interface Props {}

const Page: React.FC<Props> = () => {
  const [tips, setTips] = useState<TipsProps>({ visible: false });

  const cameraRef = useRef<any>(null);

  return (
    <div className="px-6 md:px-16 py-8 w-full min-h-[calc(100vh-theme(height.navh))]">
      <div className="h-[700px] relative">
        <Canvas
          camera={{
            position: [1, -4.7, 5],
            rotation: new Euler(0.74, 0.1, -0.1),
          }}
          shadows="soft"
        >
          <color attach="background" args={["#404956"]} />
          <ambientLight color="#707070" />
          <directionalLight position={[-6, -6, 8]} intensity={0.75} />
          <GeoMap
            geoJson={chongQingGeoJson}
            setTips={setTips}
            position={[-1, -1, 0]}
          />
          {/*<PerspectiveCamera*/}
          {/*  makeDefault*/}
          {/*  position={[1, -4.7, 5]}*/}
          {/*  rotation={new Euler(0.74, 0.1, -0.1)}*/}
          {/*  ref={cameraRef}*/}
          {/*/>*/}
          <Preload all />
          <OrbitControls />
          <mesh position={[0, 0, -4]}>
            <planeGeometry args={[100, 100]} />
            <meshLambertMaterial color="#505050" />
          </mesh>
        </Canvas>
        <Tips {...tips} />
      </div>
    </div>
  );
};

export default Page;
