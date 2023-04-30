import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { easing } from "maath";

const useCoolCameraRig = (
  ref: React.RefObject<Group>,
  damp: number,
  cx: number
) => {
  useFrame((state, delta) => {
    // ref.current?.rotation.set(
    //   state.pointer.y / damp,
    //   state.pointer.x / (damp / 2),
    //   0
    // );
    easing.damp3(
      // @ts-ignore
      ref.current?.rotation,
      [state.pointer.y / damp, state.pointer.x / (damp / 2), 0],
      0.2,
      delta
    );
    easing.damp3(
      state.camera.position,
      [
        cx + Math.sin(state.pointer.x / 4) * -3,
        state.pointer.y * 0.3,
        Math.cos(state.pointer.x / 4) * 5,
      ],
      0.5,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
};

export default useCoolCameraRig;
