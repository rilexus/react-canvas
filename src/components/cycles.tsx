import React, { useEffect, useMemo } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Arc from "./arc";
import { useCanvasContext } from "./context";

export function Cycles() {
  const dim = useWindowDimensions();
  const { clearCanvas } = useCanvasContext();

  function initCycles() {
    const numOfCycles = 5;
    const cycles: any[] = [];
    const radius = 30;
    for (let u = 0; u < numOfCycles; u++) {
      for (let v = 0; v < numOfCycles; v++) {
        const x = (dim.width / numOfCycles) * u + radius;
        const y = (dim.height / numOfCycles) * v + radius;
        const cycle = {
          x,
          y,
          radius,
          startAngle: 0,
          endAngle: 2 * Math.PI
        };
        cycles.push(cycle);
      }
    }

    return cycles;
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
