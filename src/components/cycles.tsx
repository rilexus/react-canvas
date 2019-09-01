import React, { useEffect, useMemo } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Arc from "./arc";
import { useCanvasContext } from "./context";
import { AnimatedCycle } from "./animated-cycle";

export function Cycles() {
  const dim = useWindowDimensions();
  const { ctx, canvas, clearCanvas } = useCanvasContext();

  function initCycles() {
    const cyclesCount = 5;
    const res = [];
    const radius = 30;
    for (let u = 0; u < cyclesCount; u++) {
      for (let v = 0; v < cyclesCount; v++) {
        const x = Math.floor((dim.width / cyclesCount) * u + radius);
        const y = Math.floor((dim.height / cyclesCount) * v + radius);
        res.push({
          x,
          y,
          radius,
          startAngle: 0,
          endAngle: 2 * Math.PI
        });
      }
    }

    return res;
  }
  const cycles = useMemo(initCycles, [dim.height, dim.width]);

  useEffect(() => {
    return () => {
      clearCanvas();
    };
  }, []);

  return (
    <>
      {cycles.map((cycle: any, idx: number) => (
        <Arc key={`cycle-${idx}`} {...cycle} />
      ))}
    </>
  );
}
