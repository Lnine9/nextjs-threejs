import React, { useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { Meteor } from "@/libs/threejs/meteor/Meteor";
import { Vector3 } from "three";

function Meteors(props) {
  const { scene } = useThree();

  useEffect(() => {
    const meteor = new Meteor({
      from: new Vector3(10, 10, 5),
      target: new Vector3(-5, 5, 5),
    });
    scene.add(meteor.group);
    console.log(meteor);
    console.log(scene);
    meteor.anime();
  }, []);

  return <></>;
}

export default Meteors;
