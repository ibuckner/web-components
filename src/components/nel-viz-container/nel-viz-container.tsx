import {
  Component, ComponentInterface, Element, h, Prop
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
  @Element() private host: HTMLElement;

  /**
   * Sets the element's height
   */
  @Prop({ reflect: true }) public borderRadius: number = 5;

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) public disabled: boolean = false;

  /**
   * Sets the element's height
   */
  @Prop({ reflect: true }) public height: string = "100%";

  /**
   * Sets the element's width
   */
  @Prop({ reflect: true }) public width: string = "100%";

  public render(): JSX.NelVizContainer {
    const r: number = this.borderRadius;
    const box: ClientRect = (this.host.parentNode as HTMLElement).getBoundingClientRect();
    const vw: string = `0 0 ${box.width} ${box.height}`;
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
          <slot></slot>
        </g>
      </svg>
    );
  }
}
