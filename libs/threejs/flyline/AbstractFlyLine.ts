import { Group, Scene, Vector3 } from "three";

export interface FlyLineArgs {
  from: Vector3;
  to: Vector3;
  height: number;
}

export default abstract class AbstractFlyLine {
  abstract scene: Scene;
  abstract args: FlyLineArgs[];
  abstract group: Group;

  abstract draw(): Group;
  abstract remove(): void;
  abstract _animate(): void;
}
