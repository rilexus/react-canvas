import React from "react";
import { Canvas } from "./components/canvas";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { Cycles } from "./components/cycles";
import { AnimatedArc } from "./components/animated-cycle";
import { RequestAnimationFrame } from "./components/request-animation-frame";

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
        name={"cycles"}
        style={{
          position: "absolute"
        }}
      >
        <RequestAnimationFrame>
          {(time: number, clearAnimationFrame: () => void) => (
            <>
              <AnimatedArc factor={1.2} />
              <AnimatedArc factor={1} />
            </>
          )}
        </RequestAnimationFrame>
      </Canvas>
    </div>
  );
}

export default App;
