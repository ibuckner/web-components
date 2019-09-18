import {
  Component, ComponentInterface, Element, Event, EventEmitter,
  h, Listen, Method, Prop
} from "@stencil/core";
import { RGB } from "@buckneri/js-lib-color";

/**
 * Similar in function to mark element
 */
@Component({
  tag: "nel-text-tag",
  styleUrl: "nel-text-tag.css",
  shadow: true
})
export class TextTag implements ComponentInterface {
  @Element() el: HTMLElement;

  /**
   * Sets the background color of the element
   */
  @Prop({ reflect: true }) color: string = "#eeeeee";

  /**
   * If true, allows the element to be delete using keyboard
   */
  @Prop({ reflect: true }) deletable: boolean = false;

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Sets the text label  to be applied to the element
   */
  @Prop({ reflect: true }) label: string = "";

  /**
   * If true, allows the element to receive focus
   */
  @Prop({ reflect: true }) selectable: boolean = false;

  /**
   * Raised before element is removed from DOM
   */
  @Event({
    eventName: "deleting", composed: true,
    cancelable: true, bubbles: true
  }) deleting: EventEmitter;

  /**
   * Raised after element is removed from DOM
   */
  @Event() deleted: EventEmitter;

  /**
   * Raised after element receives focus
   */
  @Event() selected: EventEmitter;

  @Listen("click")
  handleClick(ev: MouseEvent): void {
    if (this.disabled || !this.selectable) {
      ev.preventDefault();
      return;
    }
    if (this.el.classList.contains("selected")) {
      this.el.classList.remove("selected");
    } else {
      this.el.classList.add("selected");
    }
    this.selected.emit(this.el);
  }

  @Listen("keydown")
  handleKeyDown(ev: KeyboardEvent): void {
    if (this.disabled || !this.selectable || ev.keyCode === 229) {
      ev.preventDefault();
      return;
    }
    switch (ev.code) {
      case "Backspace":
      case "Delete": this.deleting.emit(this.el); break;
    }
  }

  @Listen("deleting")
  handleDeleting(): void {
    this.deleted.emit(this.el);
    this.delete();
  }

  /**
   * Removes element from DOM
   */
  @Method()
  async delete(): Promise<boolean> {
    const parent: any = this.el.parentNode;
    this.el.insertAdjacentText("beforebegin", this.el.textContent || "");
    parent.removeChild(this.el);
    parent.normalize();
    return Promise.resolve(true);
  }

  render(): any {
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
