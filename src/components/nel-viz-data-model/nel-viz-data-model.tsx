import {
  Component, ComponentInterface, Host, h, Prop
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Similar in function to an SVG tag
 */
@Component({
  tag: "nel-viz-data-model",
  shadow: false
})
export class VizContainer implements ComponentInterface {
  private _viz: HTMLElement;

  /**
   * JSON data for visualisation
   */
  @Prop({ reflect: true }) public dataSet: any;

  /**
   * Binds the data model to a container via container id
   */
  @Prop({ reflect: true }) public for: string;

  /**
   * Displays true, if model is able to verify consistency in data set
   */
  @Prop({ reflect: true }) public valid: boolean;

  componentDidLoad(): void {
    this._viz = document.querySelector(`#${this.for}`);
    if (this._viz) {
      console.log(`Bind to ${this._viz.id} successful`);
    }
  }

  public render(): JSX.NelVizDataModel {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
