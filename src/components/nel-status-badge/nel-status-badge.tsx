import {
  Component, ComponentInterface, Element, Event, EventEmitter,
  h, Prop
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Displays a status badge
 */
@Component({
  tag: "nel-status-badge",
  styleUrl: "nel-status-badge.css",
  shadow: true
})
export class StatusBadge implements ComponentInterface {
  @Element() private host: HTMLElement;

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) public disabled: boolean = false;

  /**
   * Sets the text label to be applied to the element
   */
  @Prop({ reflect: true }) public label: string = "";

  /**
   * Sets the prefix label to be applied to the element
   */
  @Prop({ reflect: true }) public pre: string = "";

  /**
   * Sets the Red-Amber-Green icon to be applied to the element
   */
  @Prop({ reflect: true }) public rag: number;

  /**
   * True when element can correctly respond to external programmatic access
   */
  @Prop({ mutable: true, reflect: false }) public ready: boolean = false;

  /**
   * Sets the suffix label to be applied to the element
   */
  @Prop({ reflect: true }) public suf: string = "";

  /**
   * Fired when element can correctly respond to external programmatic access
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) loaded: EventEmitter;

  componentDidLoad(): void {
    this.loaded.emit(this.host);
    this.ready = true;
  }

  public render(): JSX.NelStatusBadge {
    const ico: string = this.rag === undefined
      ? ""
      : this.rag === -1
        ? "diamond" 
        : this.rag === 0 
          ? "triangle"
          : "circle";
    return (
      <div class="status-badge">
        <div class="icon"><div class={ico}></div></div>
        <div class="text">
          <span>{this.pre}</span><slot/><span>{this.suf}</span>
        </div>
        <div class="label">{this.label ? " " + this.label : ""}</div>
      </div>
    );
  }
}
