import Raect, { ReactNode } from "react";

interface AnimationFramePropsI {
  children: () => any;
}
function anim(callback: any) {
  let res: any;
  requestAnimationFrame(() => {
    anim(callback);
  });

  callback("s");
}
export function useAnimation(callback: any) {
  // requestAnimationFrame(useAnimation);

  callback(2);
}

export function AnimationFrame({ children }: AnimationFramePropsI) {
  return children();
}
