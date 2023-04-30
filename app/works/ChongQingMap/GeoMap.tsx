"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { getAreas } from "@/app/works/ChongQingMap/utils";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";
import { ColorRepresentation, Vector2, Vector3 } from "three";
import ShaderFlyLine from "@/libs/threejs/flyline/ShaderFlyLine";
import { randInt } from "three/src/math/MathUtils";

const PRIMARY_COLOR = "#6acea5";
const BORDER_COLOR = "#cecece50";
const HEIGHT = 0.4;
const HOVER_COLOR = "#529f82";
const COLORS: ColorRepresentation[] = [
  "#690302",
  "#821515",
  "#ab3939",
  "#ffaba9",
];

interface GeoMapProps extends GroupProps {
  geoJson: any;
  setTips: (val: any) => void;
}

const GeoMap = ({ geoJson, setTips, ...rest }: GeoMapProps) => {
  const { scene, raycaster, camera, gl } = useThree();

  const [areas, areaData] = useMemo(
    () =>
      getAreas(geoJson, {
        primaryColor: PRIMARY_COLOR,
        borderColor: BORDER_COLOR,
        height: HEIGHT,
        hoverColor: HOVER_COLOR,
        colors: COLORS,
        opacity: 0.75,
      }),
    [geoJson]
  );

  const mapRef = useRef<any>(null);

  const mouse = useRef<any>({ x: 0, y: 0 });

  const last = useRef<any>();

  useEffect(() => {
    const makeLine = () => {
      const from = areaData[randInt(0, areaData.length - 1)];
      if (from.canvasCenter instanceof Vector3) {
        const line = new ShaderFlyLine(scene, [
          {
            from: from.canvasCenter,
            to: new Vector3(0, 0, HEIGHT),
            height: 1.6 + (Math.random() - 0.5),
          },
        ]);
      }
    };

    const timer = setInterval(makeLine, 2000);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const handleHover = () => {
    const { left, top, width, height } = gl.domElement.getBoundingClientRect();
    const x = ((mouse.current.x - left) / width) * 2 - 1;
    const y = -((mouse.current.y - top) / height) * 2 + 1;
    raycaster.setFromCamera(new Vector2(x, y), camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (last.current) {
      last.current.object.material.opacity = 0.75;
      last.current.object.parent.scale.set(1, 1, 1);
    }
    last.current = null;
    last.current = intersects.find((item) => item.object.userData.isArea);
    if (last.current) {
      last.current.object.material.opacity = 1;
      last.current.object.parent.scale.set(1, 1, 1.4);
      setTips({
        areaData: last.current.object.userData,
        visible: true,
        top: mouse.current.y - top,
        left: mouse.current.x - left,
      });
    } else {
      setTips({
        visible: false,
      });
    }
  };

  useFrame((state, delta, frame) => {
    handleHover();
  });

  return (
    <>
      <group ref={mapRef} {...rest}>
        {areas}
      </group>
    </>
  );
};

export default React.memo(GeoMap);
