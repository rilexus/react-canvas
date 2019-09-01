import React, { Component } from "react";
import { CanvasContext, CanvasContextProvider } from "./context";

interface CanvasPropsI {
  height: number;
  width: number;
  context?: (ctx: CanvasRenderingContext2D) => void;
}
interface CanvasStateI {
  height: number;
  width: number;
}
export class Canvas extends Component<CanvasPropsI, CanvasStateI> {
  contextValue?: CanvasContext;
  container?: any;

  constructor(props: any) {
    super(props);
    this.bindContainer = this.bindContainer.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
  }

  componentDidMount(): void {
    const { width, height } = this.props;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.contextValue = {
      ctx,
      clearCanvas: this.clearCanvas,
      canvas: canvas
    };
    this.container.appendChild(canvas);

    this.forceUpdate();
  }

  clearCanvas() {
    if (this.contextValue) {
      const { width, height } = this.contextValue.canvas;
      this.contextValue.ctx.clearRect(0, 0, width, height);
    }
  }

  componentWillUnmount(): void {}

  componentDidUpdate(
    prevProps: Readonly<CanvasPropsI>,
    prevState: Readonly<CanvasStateI>,
    snapshot?: any
  ): void {
    this.updateCanvas(prevProps, this.props);
  }

  bindContainer(container: any) {
    this.container = container;
  }

  updateCanvas(fromProps: CanvasPropsI, toProps: CanvasPropsI) {
    if (!this.contextValue) return;
    const canvas = this.contextValue.canvas;
    const ctx = this.contextValue.ctx;
    if (
      fromProps.width !== toProps.width ||
      fromProps.height !== toProps.height
    ) {
      canvas.width = toProps.width;
      canvas.height = toProps.height;
    }
  }

  render() {
    return (
      <div ref={this.bindContainer}>
        {this.contextValue ? (
          <CanvasContextProvider value={this.contextValue}>
            {this.props.children}
          </CanvasContextProvider>
        ) : null}
      </div>
    );
  }
}
