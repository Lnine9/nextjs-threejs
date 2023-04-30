import { BasicTarget, getTargetElement } from "@/libs/domTarget";
import { useEffect, useState } from "react";

type Position = { left: number; top: number; leftR: number; topR: number };

export type Target = BasicTarget<Element | Document>;
export type ScrollListenController = (val: Position) => boolean;
function useScroll(target?: Target): Position | undefined {
  const [position, setPosition] = useState<Position>();

  useEffect(() => {
    const el = getTargetElement(target, document);
    if (!el) {
      return;
    }
    const updatePosition = () => {
      let newPosition: Position;
      if (el === document) {
        if (document.scrollingElement) {
          newPosition = {
            left: document.scrollingElement.scrollLeft,
            top: document.scrollingElement.scrollTop,
            leftR:
              document.scrollingElement.scrollLeft /
              (document.scrollingElement.scrollWidth -
                document.scrollingElement.clientWidth),
            topR:
              document.scrollingElement.scrollTop /
              (document.scrollingElement.scrollHeight -
                document.scrollingElement.clientHeight),
          };
        } else {
          newPosition = {
            left: Math.max(
              window.scrollY,
              document.documentElement.scrollTop,
              document.body.scrollTop
            ),
            top: Math.max(
              window.scrollY,
              document.documentElement.scrollLeft,
              document.body.scrollLeft
            ),
            leftR:
              document.documentElement.scrollLeft /
              (document.documentElement.scrollWidth -
                document.documentElement.clientWidth),
            topR:
              document.documentElement.scrollTop /
              (document.documentElement.scrollHeight -
                document.documentElement.clientHeight),
          };
        }
      } else {
        newPosition = {
          left: (el as Element).scrollLeft,
          top: (el as Element).scrollTop,
          leftR:
            (el as Element).scrollLeft /
            ((el as Element).scrollWidth - (el as Element).clientWidth),
          topR:
            (el as Element).scrollTop /
            ((el as Element).scrollHeight - (el as Element).clientHeight),
        };
      }
      setPosition(newPosition);
    };

    updatePosition();

    el.addEventListener("scroll", updatePosition);
    return () => {
      el.removeEventListener("scroll", updatePosition);
    };
  }, []);

  return position;
}

export default useScroll;
