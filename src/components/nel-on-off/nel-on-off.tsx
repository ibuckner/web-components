import {
  Component, ComponentInterface, Element, Event, EventEmitter, h,
  Listen, Prop
} from "@stencil/core";
import { RGB } from "@buckneri/js-lib-color";
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
  private _rgb: RGB;

  @Element() private host: HTMLElement;

  /**
   * Sets the foreground color of the element
   */
  @Prop({ reflect: true }) public color: string = "#000000";

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
   * Toggle event raised after element is toggled
   */
  @Event({
    eventName: "toggle",
    composed: true,
    cancelable: true,
    bubbles: true
  }) private toggle: EventEmitter;

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
  handleClick(): void {
    this.on = this._input.checked;
    this.toggle.emit(this.host);
  }

  public render(): JSX.NelOnOff {
    this._rgb = new RGB(this.color);
    const lightest: string = `rgba(${this._rgb.r}, ${this._rgb.g}, ${this._rgb.b}, 0.2)`;
    const lighter: string = `rgba(${this._rgb.r}, ${this._rgb.g}, ${this._rgb.b}, 0.3)`;
    const ht: string = `${this.size / 2}rem`;
    const w: string = `${this.size}rem`;
    const st: string = `input { height: ${ht}; width: ${w} }
    input:before { height: ${ht}; width: ${ht} }
    input:checked { background-color: ${lightest}; border-color: ${lighter} }
    input:checked:before { background-color: ${this.color}; }
    `;
    return (
      <span>
        <style>{st}</style>
        <input type="checkbox" checked={this.on} />
      </span>
    );
  }
}