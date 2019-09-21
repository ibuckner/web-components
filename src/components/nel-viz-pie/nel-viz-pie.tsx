import {
  Component, ComponentInterface, h, Prop
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Creates the container for a pie chart
 */
@Component({
  tag: "nel-viz-pie",
  styleUrl: "nel-viz-pie.css",
  shadow: true
})
export class VizPie implements ComponentInterface {
  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) public disabled: boolean = false;

  public render(): JSX.NelVizPie {
    return (
      <g class="pie">
        <slot></slot>
      </g>
    );
  }
}
