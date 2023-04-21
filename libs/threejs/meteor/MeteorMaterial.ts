import { AdditiveBlending, Color, ShaderMaterial } from "three";

import vert from "./vert.glsl";
import frag from "./frag.glsl";

export const MeteorMaterial = new ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    size: { value: 8 },
    progress: { value: 0 },
    color: { value: new Color("#000000") },
  },
  blending: AdditiveBlending,
  transparent: true,
  vertexShader: vert,
  fragmentShader: frag,
  depthWrite: false,
  depthTest: false,
});
