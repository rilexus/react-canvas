import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { useCanvasContext } from "./context";

type RequestedAnimationFrameContextI = {
  time: number;
  cancelAnimationFrame: () => void;
};

const AnimationContext = createContext<any>({});
const AnimationContextProvider = AnimationContext.Provider;
const AnimationContextConsumer = AnimationContext.Consumer;
export const useRequestedAnimationFrameContext = (): RequestedAnimationFrameContextI =>
  useContext<RequestedAnimationFrameContextI>(AnimationContext);

export function RequestAnimationFrame({ children }: any) {
  const { ctx, canvas } = useCanvasContext();
  const [time, setTime] = useState(0);
  const frameIDRef = useRef(-1);
  function requestFrame(t: number) {
    frameIDRef.current = requestAnimationFrame(requestFrame);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTime(t);
  }
  const cancelAnimation = () => cancelAnimationFrame(frameIDRef.current);

  useEffect(() => {
    requestAnimationFrame(requestFrame);
    return cancelAnimation;
  }, []);

  return (
    <AnimationContextProvider
      value={{ time: time, cancelAnimationFrame: cancelAnimation }}
    >
      {children(time, cancelAnimation)}
    </AnimationContextProvider>
  );
}
