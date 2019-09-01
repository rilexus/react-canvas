import React, {
  createContext,
  forwardRef,
  useContext,
  FC,
  Component
} from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

export type CanvasContext = {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  clearCanvas: () => void;
};
export const _CanvasContext = createContext<any>({});

export const useCanvasContext = (): CanvasContext =>
  useContext<CanvasContext>(_CanvasContext);
export const CanvasContextProvider = _CanvasContext.Provider;
export const CanvasContextConsumer = _CanvasContext.Consumer;

export const withCanvasContext = <Props, Instance>(
  WrappedComponent: any
): FC<Omit<Props, "ctx" | "canvas" | "clearCanvas">> => {
  const WithCanvasContextComponent = (props: any, ref: any) => (
    <CanvasContextConsumer>
      {(contextProps: any) => (
        <WrappedComponent ref={ref} {...props} {...contextProps} />
      )}
    </CanvasContextConsumer>
  );
  const name =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithCanvasContextComponent.displayName = `CanvasComponent(${name})`;

  const CanvasComponent = forwardRef(WithCanvasContextComponent);
  hoistNonReactStatics(CanvasComponent, WrappedComponent);
  return CanvasComponent;
};
