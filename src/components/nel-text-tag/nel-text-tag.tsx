import { Component, Element, Event, EventEmitter, Listen, Prop, h } from "@stencil/core";
import { RGB } from "@buckneri/js-lib-color";

@Component({
  tag: "nel-text-tag",
  styleUrl: "nel-text-tag.css",
  shadow: true
})
export class TextTag {
  @Element() el: HTMLElement;

  /**
   * Main color
   */
  @Prop({ reflect: true }) color: string = "#aaa";

  /**
   * Declare if tag responds to delete/backspace keys
   */
  @Prop({ reflect: true }) deletable: boolean = false;

  /**
   * Declare if tag is disabled
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Text label
   */
  @Prop({ reflect: true }) label: string = "";

  /**
   * Declare if tag can be selected
   */
  @Prop({ reflect: true }) selectable: boolean = false;

  @Event({
    eventName: "deleting", composed: true,
    cancelable: true, bubbles: true
  }) deleting: EventEmitter;
  @Event() deleted: EventEmitter;
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
    if (this.disabled || !this.selectable
        || ev.isComposing || ev.keyCode === 229) {
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
    this._delete();
  }

  private _delete(): void {
    if (this.disabled || !this.deletable) { return; }
    const parent: any = this.el.parentNode;
    this.el.insertAdjacentText("beforebegin", this.el.textContent || "");
    parent.removeChild(this.el);
    parent.normalize();
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
