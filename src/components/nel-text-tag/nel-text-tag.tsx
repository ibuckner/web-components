import {
  Component, ComponentInterface, Element, Event, EventEmitter,
  h, Listen, Method, Prop
} from "@stencil/core";
import { RGB } from "@buckneri/js-lib-color";
import { JSX } from "../../components";

/**
 * Similar in function to mark element
 */
@Component({
  tag: "nel-text-tag",
  styleUrl: "nel-text-tag.css",
  shadow: true
})
export class TextTag implements ComponentInterface {
  @Element() private host: HTMLElement;

  /**
   * Sets the background color of the element
   */
  @Prop({ reflect: true }) public color: string = "#eeeeee";

  /**
   * If true, allows the element to be delete using keyboard
   */
  @Prop({ reflect: true }) public deletable: boolean = false;

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) public disabled: boolean = false;

  /**
   * Sets the text label  to be applied to the element
   */
  @Prop({ reflect: true }) public label: string = "";

  /**
   * True when element can correctly respond to external programmatic access
   */
  @Prop({ mutable: true, reflect: false }) public ready: boolean;

  /**
   * If true, allows the element to receive focus
   */
  @Prop({ reflect: true }) public selectable: boolean = false;

  /**
   * Fired before element is removed from DOM
   */
  @Event({ composed: true, cancelable: true, bubbles: true }) deleting: EventEmitter;

  /**
   * Fired after element is removed from DOM
   */
  @Event() deleted: EventEmitter;

  /**
   * Fired when element can correctly respond to external programmatic access
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) loaded: EventEmitter;

  /**
   * Fired after element receives focus
   */
  @Event() selected: EventEmitter;

  componentDidLoad(): void {
    this.loaded.emit(this.host);
    // this.ready = true;
  }

  componentWillLoad(): void {
    this.ready = true;
  }

  @Listen("click")
  onClick(ev: MouseEvent): void {
    if (this.disabled || !this.selectable) {
      ev.preventDefault();
      return;
    }
    if (this.host.classList.contains("selected")) {
      this.host.classList.remove("selected");
    } else {
      this.host.classList.add("selected");
    }
    this.selected.emit(this.host);
  }

  @Listen("keydown")
  onKeyDown(ev: KeyboardEvent): void {
    if (this.disabled || !this.selectable || ev.keyCode === 229) {
      ev.stopImmediatePropagation();
      ev.preventDefault();
      return;
    }
    if (this.deletable && (ev.code === "Backspace" || ev.code === "Delete")) {
      this.deleting.emit(this.host);
    }
  }

  /**
   * Removes element from DOM
   */
  @Method()
  public async delete(): Promise<boolean> {
    this.deleted.emit(this.host);
    const parent: any = this.host.parentNode;
    this.host.insertAdjacentText("beforebegin", this.host.textContent || "");
    parent.removeChild(this.host);
    parent.normalize();
    return Promise.resolve(true);
  }

  public render(): JSX.NelTextTag {
    const cls: string = this.selectable ? "selectable" : "";
    const tab: number = this.selectable ? 0 : undefined;
    const _foreColor: string = (new RGB(this.color)).brightness > RGB.brightnessThreshold
      ? "#000000"
      : "#ffffff";
    const styles: any = {
      "background-color": this.color,
      color: _foreColor
    };
    return (
      <mark class={cls} tabindex={tab} style={styles}>
        <slot/>
        <span>{this.label ? " " + this.label : ""}</span>
      </mark>
    );
  }
}
