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
  @Element() public host: HTMLElement;

  /**
   * Sets the bullet color of the element. Default is #eeeeee
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
   * If true, allows the element to receive focus
   */
  @Prop({ reflect: true }) public selectable: boolean = false;

  /**
   * Raised before element is removed from DOM
   */
  @Event({
    eventName: "deleting", composed: true,
    cancelable: true, bubbles: true
  }) private deleting: EventEmitter;

  /**
   * Raised after element is removed from DOM
   */
  @Event() private deleted: EventEmitter;

  /**
   * Raised after element receives focus
   */
  @Event() private selected: EventEmitter;

  @Listen("click")
  handleClick(ev: MouseEvent): void {
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
  handleKeyDown(ev: KeyboardEvent): void {
    if (this.disabled || !this.selectable || !this.deletable || ev.keyCode === 229) {
      ev.preventDefault();
      return;
    }
    switch (ev.code) {
      case "Backspace":
      case "Delete": this.deleting.emit(this.host); break;
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
  public async delete(): Promise<boolean> {
    this.deleted.emit(this.host);
    const parent: any = this.host.parentNode;
    parent.removeChild(this.host);
    return Promise.resolve(true);
  }

  public render(): any {
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
