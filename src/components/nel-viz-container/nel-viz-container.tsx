import {
  Component, ComponentInterface, Element, Event, EventEmitter,
  h, Prop
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Similar in function to an SVG tag
 */
@Component({
  tag: "nel-viz-container",
  styleUrl: "nel-viz-container.css",
  shadow: true
})
export class VizContainer implements ComponentInterface {
  private _svg: SVGSVGElement;

  @Element() private host: HTMLElement;

  /**
   * Sets the element's background border radius
   */
  @Prop({ reflect: true }) public borderRadius: number = 5;

  /**
   * Returns the centered x position
   */
  @Prop({ mutable: true }) public cx: number;

  /**
   * Returns the centered y position
   */
  @Prop({ mutable: true }) public cy: number;

  /**
   * If true, displays visible artefacts for ascertaining position, etc.
   */
  @Prop({ reflect: true }) public debug: boolean = false;

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) public disabled: boolean = false;

  /**
   * Sets the element's height
   */
  @Prop({ reflect: true }) public height: string = "100%";

  /**
   * Sets the element's padding-bottom
   */
  @Prop({ reflect: true }) public paddingBottom: number = 10;

  /**
   * Sets the element's padding-left
   */
  @Prop({ reflect: true }) public paddingLeft: number = 10;

  /**
   * Sets the element's padding-right
   */
  @Prop({ reflect: true }) public paddingRight: number = 10;

  /**
   * Sets the element's padding-top
   */
  @Prop({ reflect: true }) public paddingTop: number = 10;

  /**
   * Sets the element's relative height
   */
  @Prop({ mutable: true }) public rh: number;

  /**
   * Sets the element's relative width
   */
  @Prop({ mutable: true }) public rw: number;

  /**
   * Sets the element's width
   */
  @Prop({ reflect: true }) public width: string = "100%";

  /**
   * Raised after element is rendered in the DOM
   */
  @Event({
    eventName: "ready",
    composed: true,
    cancelable: true,
    bubbles: true
  }) private ready: EventEmitter;

  componentDidLoad() {
    this._svg = this.host.shadowRoot.querySelector("svg");
  }

  componentDidRender(): void {
    const container: any = this._svg ? this._svg : this.host.parentNode;
    const box: ClientRect = container.getBoundingClientRect();
    this.cx = box.width / 2;
    this.cy = box.height / 2;
    this.rh = box.height - this.paddingLeft - this.paddingRight;
    this.rw = box.width - this.paddingTop - this.paddingBottom;
    this.ready.emit(this.host);
  }

  componentWillLoad(): void {
    const box: ClientRect = (this.host.parentNode as HTMLElement).getBoundingClientRect();
    this.cx = box.width / 2;
    this.cy = box.height / 2;
    this.rh = box.height - this.paddingLeft - this.paddingRight;
    this.rw = box.width - this.paddingTop - this.paddingBottom;
  }

  public render(): JSX.NelVizContainer {
    const r: number = this.borderRadius;
    const container: any = this._svg ? this._svg : this.host.parentNode;
    const box: ClientRect = container.getBoundingClientRect();
    const vw: string = `0 0 ${box.width} ${box.height}`;
    const debugClass: string = this.debug ? "visible" : "hidden";
    const path: string = `M0,0 h${box.width - r} a${r},${r} 0 0 1 ${r},${r} v${box.height-(r*2)} a${r},${r} 0 0 1 -${r},${r} h-${box.width-(r*2)} a${r},${r} 0 0 1 -${r},-${r} v-${box.height-(r*2)} a${r},${r} 0 0 1 ${r},-${r} z`;
    return (
      <svg
        height={this.height}
        preserveAspectRatio="xMidYMid meet"
        viewBox={vw}
        width={this.width}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <clipPath id="container-bounds" clipPathUnits="userSpaceOnUse">
            <path class="background" d={path}></path>
          </clipPath>
        </defs>
        <g clip-path="url(#container-bounds)">
          <path class="background" d={path}></path>
          <line class={debugClass} stroke="darkred" stroke-width="1" x1="0" x2={box.width} y1={this.cy} y2={this.cy}></line>
          <line class={debugClass} stroke="darkred" stroke-width="1" x1={this.cx} x2={this.cx} y1="0" y2={box.height}></line>
          <text class={"small-text " + debugClass} x={this.cx + 4} y={this.cy - 4}>({Math.round(this.cx)}, {Math.round(this.cy)})</text>
          <rect class={debugClass} fill="#990" fill-opacity="0.3" x={this.paddingLeft} y="0" height={this.paddingTop} width={this.rw}>
            <title>padding top</title>
          </rect>
          <rect class={debugClass} fill="#099" fill-opacity="0.3" x={this.rw + this.paddingLeft} y={this.paddingTop} height={this.rh} width={this.paddingRight}>
            <title>padding right</title>
          </rect>
          <rect class={debugClass} fill="#909" fill-opacity="0.3" x={this.paddingLeft} y={this.rh + this.paddingTop} height={this.paddingBottom} width={this.rw}>
            <title>padding bottom</title>
          </rect>
          <rect class={debugClass} fill="#999" fill-opacity="0.3" x="0" y={this.paddingTop} height={this.rh} width={this.paddingLeft}>
            <title>padding left</title>
          </rect>
          <slot></slot>
        </g>
      </svg>
    );
  }
}
