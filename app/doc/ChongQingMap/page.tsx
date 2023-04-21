"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import GeoMap from "@/app/doc/ChongQingMap/GeoMap";
import chongQingGeoJson from "./chongqing.json";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, Sky } from "@react-three/drei";
import SkyBox from "@/app/doc/components/SkyBox";

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

const CustomCamera = (props) => {
  const cameraRef = useRef<any>();

  const { set, controls } = useThree();

  useEffect(() => {
    set({ camera: cameraRef.current });
    cameraRef.current.position.set(1, -5.4, 4);
  }, []);

  useFrame(() => {
    cameraRef.current.updateMatrixWorld();
  });

  return <perspectiveCamera ref={cameraRef} {...props} />;
};

const Page: React.FC<Props> = () => {
  const [tips, setTips] = useState<TipsProps>({ visible: false });

  return (
    <div className="px-6 md:px-16 py-8 w-full min-h-[calc(100vh-theme(height.navh))]">
      <div className="h-[700px] relative">
        <Canvas shadows="soft">
          <Sky />
          {/*<SkyBox />*/}
          <ambientLight color="#707070" />
          <directionalLight
            position={[-6, -6, 8]}
            intensity={0.75}
            castShadow={true}
          />
          <CustomCamera />
          <GeoMap geoJson={chongQingGeoJson} setTips={setTips} />
          <Preload all />
          <OrbitControls target={[1, 1, 0]} />
          {/*<mesh receiveShadow={true} position={[0, 0, -4]}>*/}
          {/*  <planeGeometry args={[100, 100]} />*/}
          {/*  <meshLambertMaterial color={"#f3f3f3"} />*/}
          {/*</mesh>*/}
        </Canvas>
        <Tips {...tips} />
      </div>
    </div>
  );
};

export default Page;
