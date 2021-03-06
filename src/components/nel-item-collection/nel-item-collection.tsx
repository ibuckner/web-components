import {
  Component, ComponentInterface, Element, Event, EventEmitter, h,
  Prop, Watch
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Organises child elements vertically or horizontally
 */
@Component({
  tag: "nel-item-collection",
  styleUrl: "nel-item-collection.scss",
  shadow: true
})
export class ItemCollection implements ComponentInterface {
  @Element() private host: HTMLElement;

  /**
   * Aligns child elements within collection. Defaults to vertical list.
   */
  @Prop({ reflect: true }) public align: "horizontal" | "vertical" = "vertical";
  
  @Watch("align")
  validateHAlign(newValue: "horizontal" | "vertical"): void {
    this.align = newValue;
  }

  /**
   * Clears out all child elements from collection
   */
  @Prop({ reflect: true }) public clear: boolean;
  
  @Watch("clear")
  validateClear(newValue: boolean): void {
    if (newValue) {
      for (let el of Array.from(this.host.children)) {
        this.host.removeChild(el);
      }
      this.cleared.emit(this.host);
      this.clear = false;
    }
  }
  
  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) public disabled: boolean = false;

  /**
   * True when element can correctly respond to external programmatic access
   */
  @Prop({ mutable: true, reflect: false }) public ready: boolean = false;

  /**
   * Displays the element resize handle (bottom right corner) if true
   */
  @Prop({ reflect: true }) public resizable: boolean = false;

  /**
   * Sorts child elements in collection based on text content
   */
  @Prop({ reflect: true }) public sort: "ASC" | "DESC" = "ASC";
  
  @Watch("sort")
  validateSort(newValue: "ASC" | "DESC"): void {
    const sorted: Node[] = Array.from(this.host.children)
      .sort(newValue === "DESC"
        ? (a: Node, b: Node) => (a.textContent || "") > (b.textContent || "") ? -1 : 1
        : (a: Node, b: Node) => (a.textContent || "") > (b.textContent || "") ? 1 : -1);
    Array.from(this.host.children)
      .map(el => this.host.removeChild(el));
    sorted.map(el => this.host.appendChild(el));
    this.sort = newValue;
    this.sorted.emit(this.host);
  }

  /**
   * Fired after child elements are removed via clear() method
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) cleared: EventEmitter;

  /**
   * Fired when element can correctly respond to external programmatic access
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) loaded: EventEmitter;

  /**
   * Fired after child elements are sorted
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) sorted: EventEmitter;

  componentDidLoad(): any {   
    this.loaded.emit(this.host);
  }

  componentWillLoad(): void {
    this.ready = true;
  }

  public render(): JSX.NelItemCollection {
    let cls: string = `item-collection ${this.align}`;
    cls += !this.disabled && this.resizable ? ` resize-${this.align}` : "";
    const tab: number = this.disabled ? undefined : 0;
    return (
      <div class={cls} tabindex={tab}>
        <slot></slot>
      </div>
    );
  }
}
