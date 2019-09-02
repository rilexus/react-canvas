import React, { useEffect, useState } from "react";
import {
  RequestAnimationFrame,
  useRequestedAnimationFrameContext
} from "./request-animation-frame";
import Arc from "./arc";

export function AnimatedArc({ factor }: any) {
  const { time, cancelAnimationFrame } = useRequestedAnimationFrameContext();
  const [cycle, setCycle] = useState({
    x: 0,
    y: 0,
    radius: 50,
    startAngle: 0,
    endAngle: Math.PI
  });
  //if (time > 4000) cancelAnimationFrame();

  useEffect(() => {
    setCycle({
      x: (time / 100) * factor,
      y: 0,
      radius: 50,
      startAngle: 0,
      endAngle: Math.PI
    });
  }, [time]);

  return <Arc {...cycle} />;
}

export function AnimatedCycle() {
  return (
    <RequestAnimationFrame>
      {(time: number, clearAnimationFrame: () => void) => {
        return (
          <>
            <AnimatedArc factor={1.2} />
            <AnimatedArc factor={1} />
          </>
        );
      }}
    </RequestAnimationFrame>
  );
}
