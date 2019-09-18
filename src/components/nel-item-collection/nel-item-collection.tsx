import {
  Component, ComponentInterface, Element, Event, EventEmitter, h,
  Method, Prop, Watch
} from "@stencil/core";

/**
 * Organises child elements vertically or horizontally
 */
@Component({
  tag: "nel-item-collection",
  styleUrl: "nel-item-collection.css",
  shadow: true
})
export class ItemCollection implements ComponentInterface {
  @Element() el: HTMLElement;

  /**
   * Aligns child elements within collection. Defaults to vertical list.
   */
  @Prop({ reflect: true }) align: "horizontal" | "vertical" = "vertical";

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Displays the element resize handle (bottom right corner) if true
   */
  @Prop({ reflect: true }) resizable: boolean = false;

  /**
   * New elements added to the collection will cause all child elements
   * to be sorted alphabetically
   */
  @Prop({ reflect: true }) sortable: boolean = false;

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
    for (let el of Array.from(this.el.children)) {
      this.el.removeChild(el);
    }
    this.erased.emit(this.el);
    return Promise.resolve(true);
  }

  /**
   * Sorts child elements in collection based on text content
   * @param {boolean} reverse - default is false (A-Z sort order)
   */
  @Method()
  public async sort(reverse?: boolean | undefined): Promise<boolean> {
    reverse = reverse || false;
    const sorted: Node[] = Array.from(this.el.children)
      .sort(reverse
        ? (a: Node, b: Node) => (a.textContent || "") > (b.textContent || "") ? -1 : 1
        : (a: Node, b: Node) => (a.textContent || "") > (b.textContent || "") ? 1 : -1);
    Array.from(this.el.children)
      .map(el => this.el.removeChild(el));
    sorted.map(el => this.el.appendChild(el));
    this.sorted.emit(this.el);
    return Promise.resolve(true);
  }

  render(): any {
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
