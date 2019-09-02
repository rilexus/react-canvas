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

/**
 * mounts HTMLCanvasElement in to the DOM and passes its context to own children
 */
export class Canvas extends Component<CanvasPropsI, any> {
  contextValue?: CanvasContext;
  container?: HTMLElement;

  constructor(props: any) {
    super(props);
    this.bindCanvasContainer = this.bindCanvasContainer.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.applyCanvasCSSStyles = this.applyCanvasCSSStyles.bind(this);
    this.setClassName = this.setClassName.bind(this);
    this.state = {
      refresh: false
    };
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
    this.setClassName();
    this.applyCanvasCSSStyles();
    if (this.container) this.container.appendChild(canvas);
    // reload since canvas was created
    this.forceUpdate();
  }

  clearCanvas() {
    if (this.contextValue) {
      const { width, height } = this.contextValue.canvas;
      this.contextValue.ctx.clearRect(0, 0, width, height);
    }
  }

  /**
   * applies passed style to the HTMLCanvasElement through the style tag
   */
  applyCanvasCSSStyles() {
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

  bindCanvasContainer(container: any) {
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
    this.applyCanvasCSSStyles();
  }

  render() {
    return (
      <div
        ref={this.bindCanvasContainer}
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
