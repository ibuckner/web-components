import { Component, Element, Event, EventEmitter, h, Listen, Method, Prop } from "@stencil/core";

@Component({
  tag: "nel-list-item",
  styleUrl: "nel-list-item.css",
  shadow: true
})
export class ListItem {
  @Element() el: HTMLElement;

  /**
   * List item color
   */
  @Prop({ reflect: true }) color: string = "#eeeeee";

  /**
   * Set whether element can be deleted
   */
  @Prop({ reflect: true }) deletable: boolean = false;

  /**
   * Declare if element is disabled
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Set whether element can be selected
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
    if (this.disabled || !this.selectable || !this.deletable
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
    this.delete();
  }

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
