import React from "react";
import { CanvasContext, useCanvasContext } from "./context";

interface CirclePropsI {
  x: number;
  y: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  children?: any;
}

function Arc({ x, y, radius, startAngle, endAngle, children }: CirclePropsI) {
  const { ctx } = useCanvasContext();

  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle);
  ctx.stroke();

  if (children == null) {
    return null;
  }
  return <>{children}</>;
}

export default Arc;
