import React, { useEffect, useState } from "react";
import Arc from "./arc";
import {
  Frame,
  useRequestAnimationFrame
} from "../hooks/useRequestAnimationFrame";
import { useCanvasContext } from "./context";

export function AnimatedCycle() {
  const { clearCanvas } = useCanvasContext();
  const [cycle, setCycle] = useState({
    x: 0,
    y: 0,
    radius: 50,
    startAngle: 0,
    endAngle: Math.PI
  });
  const frame: any = useRequestAnimationFrame((requestedFrame: Frame) => {
    const { time } = requestedFrame;
    clearCanvas();
    setCycle({
      x: time / 100,
      y: 0,
      radius: 50,
      startAngle: 0,
      endAngle: Math.PI
    });
  });

  useEffect(() => {}, [frame]);

  return (
    <Arc
      endAngle={cycle.endAngle}
      startAngle={cycle.startAngle}
      radius={cycle.radius}
      y={cycle.y}
      x={cycle.x}
    />
  );
}
