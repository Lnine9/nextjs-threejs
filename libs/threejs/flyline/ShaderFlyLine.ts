import AbstractFlyLine, {
  FlyLineArgs,
} from "@/libs/threejs/flyline/AbstractFlyLine";
import {
  BufferGeometry,
  Color,
  ColorRepresentation,
  Float32BufferAttribute,
  Group,
  Material,
  Mesh,
  Points,
  QuadraticBezierCurve3,
  Scene,
  ShaderMaterial,
  Vector3,
} from "three";
import { Tween, update } from "@tweenjs/tween.js";
import frag from "./flyLine.frag.glsl";
import vert from "./flyLine.vert.glsl";

interface FlyLineOption {
  flyColor?: ColorRepresentation;
  duration?: number;
  step?: number;
  length?: number;
}

export default class ShaderFlyLine extends AbstractFlyLine {
  args: FlyLineArgs[];
  group: Group;
  scene: Scene;
  options: FlyLineOption;
  // tweens: GSAPTween[];

  constructor(
    scene: Scene,
    args: FlyLineArgs[],
    group?: Group,
    options?: FlyLineOption
  ) {
    super();
    this.scene = scene;
    this.args = args;
    this.group = group || new Group();
    const defaultOptions: FlyLineOption = {
      flyColor: "#0ebcfd",
      duration: 5000,
      step: 300,
      length: 200,
    };
    if (options) {
      this.options = { ...defaultOptions, ...options };
    } else {
      this.options = defaultOptions;
    }
    this.scene.add(this.draw());
    this._animate();
  }

  _animate(): void {
    update();
    requestAnimationFrame(() => {
      this._animate();
    });
  }

  draw(): Group {
    this.args.map((arg) => {
      const { from, to, height } = arg;
      const mid: Vector3 = new Vector3(
        (from.x + to.x) / 2 - 0.2 * (to.x - from.x),
        (from.y + to.y) / 2 - 0.2 * (to.y - from.y),
        (from.z + to.z) / 2 + height
      );
      const curve = new QuadraticBezierCurve3(from, mid, to);
      const points = curve.getPoints(this.options.step);
      const range = points.map((_, index) => index);
      const geom = new BufferGeometry().setFromPoints(points);
      geom.setAttribute("aIndex", new Float32BufferAttribute(range, 1));
      const mate = new ShaderMaterial({
        uniforms: {
          uColor: {
            value: new Color(this.options.flyColor),
          },
          uTime: {
            value: 0,
          },
          uLength: {
            value: points.length,
          },
        },
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
      });
      const flyLine = new Points(geom, mate);
      this.group.add(flyLine);
      const tween = new Tween({ index: 0 })
        .to(
          { index: this.options.step! + 2 * this.options.length! },
          this.options.duration
        )
        .onUpdate((t) => {
          mate.uniforms.uTime.value = Math.ceil(t.index);
        })
        .onComplete(() => {
          this.remove();
        })
        .repeat(0);
      tween.start();
    });
    return this.group;
  }

  remove(): void {
    console.log("dispose flyLine");
    this.scene.remove(this.group);
    this.group.children.forEach((item) => {
      if (item instanceof Mesh) {
        item.geometry.dispose();
        if (item.material instanceof Material) {
          item.material.dispose();
        }
      }
    });
  }
}
