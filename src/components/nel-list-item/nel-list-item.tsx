import {
  Component, ComponentInterface, Element, Event, EventEmitter, h,
  Listen, Prop, Watch
} from "@stencil/core";

/**
 * Similar in behaviour to li element
 */
@Component({
  tag: "nel-list-item",
  styleUrl: "nel-list-item.scss",
  shadow: true
})
export class ListItem implements ComponentInterface {
  @Element() public host: HTMLElement;

  /**
   * Sets the bullet color of the element. Default is #eeeeee
   */
  @Prop({ reflect: true }) public color: string = "#eeeeee";

  /**
   * Removes element from DOM
   */
  @Prop({ reflect: true }) public clear: boolean;
  
  @Watch("clear")
  validateClear(newValue: boolean): void {
    if (newValue) {
      this.deleted.emit(this.host);
      const parent: any = this.host.parentNode;
      parent.removeChild(this.host);
    }
  }

  /**
   * If true, allows the element to be delete using keyboard
   */
  @Prop({ reflect: true }) public deletable: boolean = false;

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) public disabled: boolean = false;

  /**
   * True when element can correctly respond to external programmatic access
   */
  @Prop({ mutable: true, reflect: false }) public ready: boolean = false;

  /**
   * If true, allows the element to receive focus
   */
  @Prop({ reflect: true }) public selectable: boolean = false;

  /**
   * Fired when delete key pressed on selected element
   */
  @Event({ composed: true, cancelable: true, bubbles: true }) deleting: EventEmitter;

  /**
   * Fired after element is removed from DOM
   */
  @Event({ composed: true, cancelable: true, bubbles: true }) deleted: EventEmitter;

  /**
   * Fired when element can correctly respond to external programmatic access
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) loaded: EventEmitter;

  /**
   * Fired after element receives focus
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) selected: EventEmitter;

  componentDidLoad(): any {   
    this.loaded.emit(this.host);
  }

  componentWillLoad(): void {
    this.ready = true;
  }

  @Listen("click")
  onclick(ev: MouseEvent): void {
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
    if (this.deletable && ev.code === "Delete") {
      this.deleting.emit(this.host);
    }
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
