import {
  Component, ComponentInterface, Element, Event, EventEmitter,
  h, Prop, Method
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Similar in function to an SVG tag
 */
@Component({
  tag: "nel-viz-container",
  styleUrl: "nel-viz-container.css",
  shadow: false
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

  componentDidLoad(): void {
    this._svg = this.host.querySelector("svg");
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

  /**
   * Adds SVG element to container
   * @param {string} template - string containing valid markup for SVG element
   * @param {Node | string} parent - node to append new element to. If string, must be valid selector
   */
  @Method()
  public async addElement(template: string, parent: Node | string): Promise<void> {
    const d: DOMParser = new DOMParser();
    const root: Document = d.parseFromString(`<svg xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">${template}</svg>`, "image/svg+xml");
    const child: Node = root.documentElement.children[0];
    if (typeof parent === "string") {
      this._svg.querySelector(parent).appendChild(child);
    } else {
      this._svg.appendChild(child);
    }
  }

  public render(): JSX.NelVizContainer {
    const r: number = this.borderRadius;
    const container: any = this._svg ? this._svg : this.host.parentNode;
    const box: ClientRect = container.getBoundingClientRect();
    const vw: string = `0 0 ${box.width} ${box.height}`;
    const debugClass: string = this.debug ? "visible" : "hidden";
    const path: string = `M0,0 h${box.width - r} a${r},${r} 0 0 1 ${r},${r} v${box.height-(r*2)} a${r},${r} 0 0 1 -${r},${r} h-${box.width-(r*2)} a${r},${r} 0 0 1 -${r},-${r} v-${box.height-(r*2)} a${r},${r} 0 0 1 ${r},-${r} z`;
    const moveTo: string = `translate(${this.paddingLeft},${this.paddingTop})`;
    const patternStyle: any = { fill: "url(#dash-pattern) #999" };
    return (
      <svg
        height={this.height}
        preserveAspectRatio="xMidYMid meet"
        viewBox={vw}
        width={this.width}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <clipPath id="container-bounds" clipPathUnits="userSpaceOnUse">
            <path class="background" d={path}></path>
          </clipPath>
          <pattern id="dash-pattern" patternUnits="userSpaceOnUse" width="10" height="10" fill="#900">
            <image xlinkHref="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScvPgogIDxwYXRoIGQ9J00tMSwxIGwyLC0yCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMAogICAgICAgICAgIE05LDExIGwyLC0yJyBzdHJva2U9J2JsYWNrJyBzdHJva2Utd2lkdGg9JzEnLz4KPC9zdmc+Cg==" x="0" y="0" width="10" height="10" stroke="#900" fill="#900"> </image>
          </pattern>
        </defs>
        <g clip-path="url(#container-bounds)">
          <path class="background" d={path}></path>

          <line class={debugClass} stroke="darkred" stroke-width="1" x1="0" x2={box.width} y1={this.cy} y2={this.cy}></line>
          <line class={debugClass} stroke="darkred" stroke-width="1" x1={this.cx} x2={this.cx} y1="0" y2={box.height}></line>
          <text class={"small-text " + debugClass} x={this.cx + 4} y={this.cy - 4}>({Math.round(this.cx)}, {Math.round(this.cy)})</text>

          <rect class={debugClass} style={patternStyle} fill-opacity="0.3"
            x={this.paddingLeft} y="0" height={this.paddingTop} width={this.rw}>
          </rect>
          <text class={debugClass + " center-text small-text"} x={this.cx} y={this.paddingTop + 10}>padding top</text>

          <rect class={debugClass} style={patternStyle} fill="#099" fill-opacity="0.3"
            x={this.rw + this.paddingLeft} y={this.paddingTop} height={this.rh} width={this.paddingRight}>
          </rect>
          <text class={debugClass + " right-text small-text"} x={this.rw} y={this.cy}>padding right</text>

          <rect class={debugClass} style={patternStyle} fill="#909" fill-opacity="0.3"
            x={this.paddingLeft} y={this.rh + this.paddingTop} height={this.paddingBottom} width={this.rw}></rect>
          <text class={debugClass + " center-text small-text"} x={this.cx} y={this.rh}>padding bottom</text>

          <rect class={debugClass} style={patternStyle} fill="#999" fill-opacity="0.3"
            x="0" y={this.paddingTop} height={this.rh} width={this.paddingLeft}></rect>
          <text class={debugClass +" left-text small-text"} x={this.paddingLeft + 10} y={this.cy}>padding left</text>

          <g class="canvas" transform={moveTo}></g>
        </g>
      </svg>
    );
  }
}
