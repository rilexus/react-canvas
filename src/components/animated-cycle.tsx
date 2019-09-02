import React, { useMemo } from "react";
import { useRequestedAnimationFrameContext } from "./request-animation-frame";
import Arc from "./arc";

export function AnimatedArc({ factor }: any) {
  const { time, cancelAnimationFrame } = useRequestedAnimationFrameContext();

  function initCycle() {
    return {
      x: (time / 40) * factor,
      y: 0,
      radius: 50,
      startAngle: 0,
      endAngle: Math.PI
    };
  }
  const cycle = useMemo(initCycle, [time, factor]);
  return <Arc {...cycle} />;
}
