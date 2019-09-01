import React, { useEffect, useState } from "react";
import { Canvas } from "./components/canvas";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { Cycles } from "./components/cycles";
import { AnimationFrame, useAnimation } from "./components/animation-frame";
import { AnimatedCycle } from "./components/animated-cycle";

function App() {
  const dim = useWindowDimensions();
  return (
    <div id="App">
      <Canvas
        width={dim.width}
        height={dim.height}
        name={"cycles"}
        style={{
          position: "absolute"
        }}
      >
        <Cycles />
      </Canvas>
      <Canvas
        width={dim.width}
        height={dim.height}
        name={"animated"}
        style={{
          position: "absolute"
        }}
      >
        <AnimatedCycle />
      </Canvas>
    </div>
  );
}

export default App;
