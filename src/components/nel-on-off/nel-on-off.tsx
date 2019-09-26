import {
  Component, ComponentInterface, Element, Event, EventEmitter, 
  h, Host, Listen, Prop, Watch
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
  @Element() private host: HTMLElement;

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) public disabled: boolean = false;

  /**
   * If true, element is in the 'on' state
   */
  @Prop({ mutable: true, reflect: true }) public on: boolean = false;

  @Watch("on")
  validateOpen(): void {
    this.changed.emit(this.host);
  }

  /**
   * True when element can correctly respond to external programmatic access
   */
  @Prop({ mutable: true, reflect: false }) public ready: boolean = false;

  /**
   * Adjusts the size of the element, using CSS rem units of measurement
   */
  @Prop({ reflect: true }) public size: number = 4;

  /**
   * Fired when element can correctly respond to external programmatic access
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) loaded: EventEmitter;

  /**
   * Fired after element is toggled
   */
  @Event({ composed: true, cancelable: true, bubbles: true }) changed: EventEmitter;

  componentDidLoad(): void {
    this.loaded.emit(this.host);
    this.ready = true;
  }

  @Listen("click")
  onClick(): void {
    this.on = !this.on;
  }

  public render(): JSX.NelOnOff {
    const ht: string = `${this.size / 2}rem`;
    const w: string = `${this.size}rem`;
    const st: string = `input { height: ${ht}; width: ${w} }
    input:before { height: ${ht}; width: ${ht} }`;
    return (
      <Host aria-checked={this.on ? "true" : "false"}>
        <span>
          <style>{st}</style>
          <input type="checkbox" checked={this.on} />
        </span>
      </Host>      
    );
  }
}