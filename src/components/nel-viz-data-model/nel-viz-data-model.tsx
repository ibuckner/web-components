import {
  Component, ComponentInterface, Event, EventEmitter, h, Host, Prop, Watch
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Similar in function to an SVG tag
 */
@Component({
  tag: "nel-viz-data-model",
  shadow: false
})
export class VizDataModel implements ComponentInterface {
  private _client: any;
  private _data: any;
  
  /**
   * JSON data for visualisation
   */
  @Prop({ reflect: true }) public dataSet: any;

  @Watch("dataSet")
  validateDataSet(newValue: string): void {
    try {
      this.validating.emit();
      this._data = JSON.parse(newValue);
      this.valid = true;
    }
    catch {
      this.valid = false;
    }
    this.validated.emit(this.valid);
  }

  /**
   * Binds the data model to a container via container id
   */
  @Prop({ reflect: true }) public for: string;

  /**
   * Displays true, if model is able to verify consistency in data set
   */
  @Prop({ reflect: true }) public valid: boolean;

  /**
   * Fired when model can bind to visualisation container
   */
  @Event({ composed: true, cancelable: true, bubbles: true }) bound: EventEmitter
  
  /**
   * Fired when new data applied to element
   */
  @Event({ composed: true, cancelable: true, bubbles: true }) validating: EventEmitter
  
  /**
   * Fired when new data validated. Includes validation success flag
   */
  @Event({ composed: true, cancelable: true, bubbles: true }) validated: EventEmitter

  componentDidLoad(): void {
    this._client = document.querySelector(`#${this.for}`);
    if (this._client.ready) {
      this.bound.emit();
    }
    this.validateDataSet(this.dataSet);
  }

  public render(): JSX.NelVizDataModel {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
