import {
  Component, ComponentInterface, Element, Event, EventEmitter, h,
  Listen, Prop
} from "@stencil/core";

/**
 * Similar in behaviour to li element
 */
@Component({
  tag: "nel-slicer-item",
  styleUrl: "nel-slicer-item.css",
  shadow: true
})
export class SlicerItem implements ComponentInterface {
  @Element() public host: HTMLElement;

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
   * Fired when element can correctly respond to external programmatic access
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) loaded: EventEmitter;

  /**
   * Fired after element receives focus
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) selected: EventEmitter;

  componentDidLoad(): any {   
    this.loaded.emit(this.host);
    // this.ready = true;
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
  }

  public render(): any {
    const tab: number = this.selectable ? 0 : undefined;
    const cls: string = `slicer-item${this.selectable && !this.disabled ? " selectable" : ""}`;
    return (
      <div class={cls} tabindex={tab}>
        <slot></slot>
      </div>
    );
  }
}
