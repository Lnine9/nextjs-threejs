import {
  BufferAttribute,
  BufferGeometry,
  Clock,
  Color,
  Group,
  Material,
  Points,
  Scene,
  Vector3,
} from "three";
import { MeteorMaterial } from "@/libs/threejs/meteor/MeteorMaterial";
import { Tween, update as UPDATE } from "@tweenjs/tween.js";

interface Props {
  pointsNum: number;
  color: {
    from: Color;
    to: Color;
  };
  from: Vector3;
  target: Vector3;
  life: number;
  hideSecond: number;
  scene?: Scene;
}

const defaultProps: Props = {
  pointsNum: 1000,
  color: {
    from: new Color("#10ffc2"),
    to: new Color("#002aff"),
  },
  from: new Vector3(0, 0, 0),
  target: new Vector3(10, 10, 10),
  life: 8000,
  hideSecond: 3,
};

export class Meteor {
  group = new Group();
  points: Points | undefined;
  props = defaultProps;
  clock = new Clock();
  time = 0;
  tween: Tween<{ process: number }> | undefined;
  material = MeteorMaterial.clone();
  initSize = this.material.uniforms.size.value;

  constructor(props: Partial<Props>) {
    this.props = { ...this.props, ...props };
    this.initObj();
    this.genTween();
  }

  genGeometry() {
    const {
      pointsNum,
      color: { from: fromColor, to },
      from,
    } = this.props;
    const geom = new BufferGeometry();
    const positions = new Float32Array(pointsNum * 3);
    const colors = new Float32Array(pointsNum * 3);
    const percents = new Float32Array(pointsNum);
    const colorRange = {
      r: to.r - fromColor.r,
      g: to.g - fromColor.g,
      b: to.b - fromColor.b,
    };

    for (let i = 0, curLen = 0; i <= pointsNum; i++) {
      const i3 = i * 3;
      const x = from.x;
      const y = from.y;
      const z = from.z;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      const percent = i / pointsNum;
      percents[i] = percent;

      colors[i3] = fromColor.r + colorRange.r * percent;
      colors[i3 + 1] = fromColor.g + colorRange.g * percent;
      colors[i3 + 2] = fromColor.b + colorRange.b * percent;
    }

    geom.setAttribute("position", new BufferAttribute(positions, 3));
    geom.setAttribute("color", new BufferAttribute(colors, 3));
    geom.setAttribute("percent", new BufferAttribute(percents, 1));

    return geom;
  }

  initObj() {
    const geom = this.genGeometry();
    this.material.uniforms.target = {
      value: this.props.target,
    };
    this.points = new Points(geom, this.material);
    this.group.add(this.points);
  }

  update(process: number) {
    // const { life, hideSecond } = this.props;
    // if (this.props.life) {
    //   this.time += this.clock.getDelta();
    //   percent = this.time / this.props.life;
    //
    //   // 流星结束后尾迹消失过程
    //   if (percent >= 1 && hideSecond) {
    //     let fade = 1 - (this.time - life) / hideSecond;
    //
    //     if (fade >= 1) {
    //       this.time = 0;
    //       fade = 0;
    //       percent = 0;
    //     }
    //
    //     this.material.uniforms.size.value = this.initSize * (1 - fade);
    //   }
    // }

    this.material.uniforms.progress.value = process;
  }

  genTween() {
    this.tween = new Tween({
      process: 0,
    })
      .to(
        {
          process: 1,
        },
        this.props.life
      )
      .onUpdate((t) => {
        this.update(t.process);
      })
      .onComplete(() => {
        this.dispose();
      })
      .repeat(Infinity);

    this.tween.start();
  }

  anime() {
    UPDATE();
    requestAnimationFrame(() => {
      this.anime();
    });
  }

  dispose() {
    console.log("dispose Meteor");
    if (this.points) {
      if (this.props.scene) {
        this.props.scene.remove(this.points);
      }
      this.group.remove(this.points);

      this.points.geometry.dispose();
      if (this.points.material instanceof Material) {
        this.points.material.dispose();
      } else {
        this.points.material.forEach((m) => m.dispose());
      }
    }
  }
}
