import React, { Component, CSSProperties } from "react";
import { CanvasContext, CanvasContextProvider } from "./context";

interface CanvasPropsI {
  height: number;
  width: number;
  name: string;
  style?: CSSProperties;
}
interface CanvasStateI {
  height: number;
  width: number;
}
export class Canvas extends Component<CanvasPropsI, any> {
  contextValue?: CanvasContext;
  container?: any;

  constructor(props: any) {
    super(props);
    this.bindContainer = this.bindContainer.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.applyCSSStyles = this.applyCSSStyles.bind(this);
    this.setClassName = this.setClassName.bind(this);
    this.state = {
      refresh: false
    };
  }

  componentDidMount(): void {
    const { width, height, name } = this.props;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.contextValue = {
      ctx,
      clearCanvas: this.clearCanvas,
      canvas: canvas
    };
    this.setClassName();
    this.applyCSSStyles();
    this.container.appendChild(canvas);

    this.forceUpdate();
  }

  clearCanvas() {
    if (this.contextValue) {
      const { width, height } = this.contextValue.canvas;
      this.contextValue.ctx.clearRect(0, 0, width, height);
    }
  }

  applyCSSStyles() {
    if (this.contextValue && this.props.style) {
      const styleString = Object.entries(this.props.style)
        .map(([cssAttr, cssValue]) => `${cssAttr}: ${cssValue};`)
        .join(" ");
      this.contextValue.canvas.setAttribute("style", styleString);
    }
  }

  setClassName() {
    if (this.contextValue) {
      const canvas = this.contextValue.canvas;
      canvas.setAttribute("class", `${this.props.name}-canvas`);
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
    if (fromProps.name !== toProps.name) {
      canvas.setAttribute("class", toProps.name);
    }
    if (
      fromProps.width !== toProps.width ||
      fromProps.height !== toProps.height
    ) {
      canvas.width = toProps.width;
      canvas.height = toProps.height;
    }
    this.applyCSSStyles();
  }

  render() {
    return (
      <div
        ref={this.bindContainer}
        className={`canvas-wrapper ${this.props.name}-canvas-wrapper`}
      >
        {this.contextValue ? (
          <CanvasContextProvider value={this.contextValue}>
            {this.props.children}
          </CanvasContextProvider>
        ) : null}
      </div>
    );
  }
}
