import {
  Component, ComponentInterface, Element, Event, EventEmitter, h,
  Method, Prop, Watch
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Organises child elements vertically or horizontally
 */
@Component({
  tag: "nel-item-collection",
  styleUrl: "nel-item-collection.css",
  shadow: true
})
export class ItemCollection implements ComponentInterface {
  @Element() private host: HTMLElement;

  /**
   * Aligns child elements within collection. Defaults to vertical list.
   */
  @Prop({ reflect: true }) public align: "horizontal" | "vertical" = "vertical";

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) public disabled: boolean = false;

  /**
   * Displays the element resize handle (bottom right corner) if true
   */
  @Prop({ reflect: true }) public resizable: boolean = false;

  /**
   * New elements added to the collection will cause all child elements
   * to be sorted alphabetically
   */
  @Prop({ reflect: true }) public sortable: boolean = false;

  @Watch("align")
  validateHAlign(newValue: "horizontal" | "vertical"): void {
    this.align = newValue;
  }

  @Watch("sortable")
  validateSortable(newValue: string): void {
    if (Boolean(newValue)) {
      this.sort();
    }
  }

  /**
   * Raised after child elements are removed via clear() method
   */
  @Event() erased: EventEmitter;

  /**
   * Raised after child elements are sorted
   */
  @Event() sorted: EventEmitter;

  /**
   * Clears out all child elements from collection
   */
  @Method()
  public async clear(): Promise<boolean> {
    for (let el of Array.from(this.host.children)) {
      this.host.removeChild(el);
    }
    this.erased.emit(this.host);
    return Promise.resolve(true);
  }

  /**
   * Sorts child elements in collection based on text content
   * @param {boolean} reverse - default is false (A-Z sort order)
   */
  @Method()
  public async sort(reverse?: boolean | undefined): Promise<boolean> {
    reverse = reverse || false;
    const sorted: Node[] = Array.from(this.host.children)
      .sort(reverse
        ? (a: Node, b: Node) => (a.textContent || "") > (b.textContent || "") ? -1 : 1
        : (a: Node, b: Node) => (a.textContent || "") > (b.textContent || "") ? 1 : -1);
    Array.from(this.host.children)
      .map(el => this.host.removeChild(el));
    sorted.map(el => this.host.appendChild(el));
    this.sorted.emit(this.host);
    return Promise.resolve(true);
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
