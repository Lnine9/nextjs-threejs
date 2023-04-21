"use client";
import {
  ColorRepresentation,
  ExtrudeGeometry,
  Shape,
  Vector2,
  Vector3,
} from "three";
import { Line } from "@react-three/drei";
import React from "react";
import { geoMercator } from "d3";
import { randInt } from "three/src/math/MathUtils";

type Options = {
  primaryColor: ColorRepresentation;
  borderColor: ColorRepresentation;
  hoverColor: ColorRepresentation;
  height: number;
  colors?: ColorRepresentation[];
  opacity: number;
};

const drawExtrudeMesh = (polygon, projection, options: Options, userData) => {
  const points = polygon.map((row) => {
    const [x, y] = projection(row);
    return new Vector2(x, -y);
  });
  const upBorder = points.map(
    (p) => new Vector3(p.x, p.y, options.height + 0.01)
  );
  const shape = new Shape(points);
  const geometry = new ExtrudeGeometry(shape, {
    depth: options.height,
    bevelEnabled: false,
  });

  const color = options.colors
    ? options.colors[randInt(0, options.colors.length - 1)]
    : options.primaryColor;

  return (
    <group>
      <mesh
        geometry={geometry}
        castShadow={true}
        userData={{ ...userData, isArea: true }}
      >
        <meshLambertMaterial
          color={color}
          transparent={true}
          opacity={options.opacity}
        />
      </mesh>
      <Line points={upBorder} color={options.borderColor} lineWidth={1} />
    </group>
  );
};

export const getAreas = (geoJson, options: Options) => {
  console.log("compute areas ... ");
  const projection = geoMercator()
    .center(geoJson.propertity.center)
    .scale(80)
    .translate([0, 0]);

  const data: any[] = [];

  const jsxs = geoJson.features.map((feature) => {
    const areaData = feature.properties;
    const coordinates = feature.geometry.coordinates;
    if (areaData.centroid) {
      const [x, y] = projection(areaData.centroid)!;
      areaData.canvasCenter = new Vector3(x, -y, options.height);
    }
    data.push(areaData);
    const meshes: any[] = [];
    coordinates.forEach((coordinate) => {
      coordinate.forEach((rows) => {
        meshes.push(drawExtrudeMesh(rows, projection, options, areaData));
      });
    });
    return <group key={areaData.code}>{meshes}</group>;
  });

  return [jsxs, data];
};
