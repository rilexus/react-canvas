import React, { useEffect, useState } from "react";
import { Canvas } from "./components/canvas";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { Cycles } from "./components/cycles";

function App() {
  const dim = useWindowDimensions();
  return (
    <div id="App">
      <Canvas width={dim.width} height={dim.height}>
        <Cycles />
      </Canvas>
    </div>
  );
}

export default App;
