import {
  Component, ComponentInterface, Element, Event, EventEmitter, h,
  Listen, Method, Prop
} from "@stencil/core";

/**
 * Similar in behaviour to li element
 */
@Component({
  tag: "nel-list-item",
  styleUrl: "nel-list-item.css",
  shadow: true
})
export class ListItem implements ComponentInterface {
  @Element() el: HTMLElement;

  /**
   * Sets the bullet color of the element. Default is #eeeeee
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
    if (this.disabled || !this.selectable || !this.deletable || ev.keyCode === 229) {
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
    this.delete();
  }

  /**
   * Removes element from DOM
   */
  @Method()
  async delete(): Promise<boolean> {
    this.deleted.emit(this.el);
    const parent: any = this.el.parentNode;
    parent.removeChild(this.el);
    return Promise.resolve(true);
  }

  render(): any {
    const tab: number = this.selectable ? 0 : undefined;
    const bcls: string = `bullet${this.selectable && !this.disabled ? " selectable" : ""}`;
    const tcls: string = `text${this.selectable && !this.disabled ? " selectable" : ""}`;
    const bst: any = {
      "background-color": this.color,
      border: `1px solid ${this.color}`
    };
    return (
      <div class="list-item" tabindex={tab}>
        <div class={bcls} style={bst}></div>
        <div class={tcls}>
          <slot></slot>
        </div>
      </div>
    );
  }
}
