import {
  Component, ComponentInterface, Element, Event, EventEmitter, h,
  Listen, Prop
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Similar in behaviour to the checkbox (without indeterminate state)
 */
@Component({
  tag: "nel-on-off",
  styleUrl: "nel-on-off.css",
  shadow: true
})
export class OnOff implements ComponentInterface {
  private _input: HTMLInputElement;

  @Element() private host: HTMLElement;

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) public disabled: boolean = false;

  /**
   * If true, element is in the 'on' state
   */
  @Prop({ reflect: true }) public on: boolean = false;

  /**
   * Adjusts the size of the element, using CSS rem units of measurement
   */
  @Prop({ reflect: true }) public size: number = 4;

  /**
   * Fired after element is toggled
   */
  @Event({ composed: true, cancelable: true, bubbles: true }) toggle: EventEmitter;

  componentWillLoad(): void {
    this.host.setAttribute("aria-checked", `${this.on}`);
  }

  componentDidLoad(): void {
    this._input = this.host.shadowRoot.querySelector("input");
  }

  componentWillUpdate(): void {
    this.host.setAttribute("aria-checked", `${this.on}`);
  }

  @Listen("click")
  onClick(): void {
    this.on = this._input.checked;
    this.toggle.emit(this.host);
  }

  public render(): JSX.NelOnOff {
    const ht: string = `${this.size / 2}rem`;
    const w: string = `${this.size}rem`;
    const st: string = `input { height: ${ht}; width: ${w} }
    input:before { height: ${ht}; width: ${ht} }`;
    return (
      <span>
        <style>{st}</style>
        <input type="checkbox" checked={this.on} />
      </span>
    );
  }
}