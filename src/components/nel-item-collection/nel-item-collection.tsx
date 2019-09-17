import { Component, Element, Event, EventEmitter, h, Method, Prop, Watch } from "@stencil/core";

@Component({
  tag: "nel-item-collection",
  styleUrl: "nel-item-collection.css",
  shadow: true
})
export class ItemCollection {
  private _observerConfig: any = {
    attributes: false, childList: true, subtree: false
  };

  @Element() el: HTMLElement;

  /**
   * Horizontal alignment of items in collection
   */
  @Prop({ reflect: true }) align: "horizontal" | "vertical" = "vertical";

  /**
   * Declare if element is disabled
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Set whether collection can be resized
   */
  @Prop({ reflect: true }) resizable: boolean = false;

  /**
   * Set whether collection is sorted (alphabetically)
   */
  @Prop({ reflect: true }) sortable: boolean = false;

  @Watch("align")
  validateHAlign(newValue: "horizontal" | "vertical"): void {
    this.align = newValue;
  }

  @Watch("sortable")
  validateSortable(newValue: string): void {
    if (Boolean(newValue)) {
      this._sort();
    }
  }

  @Event() erased: EventEmitter;
  @Event() sorted: EventEmitter;

  public componentWillLoad(): void {
    const obs: MutationObserver = new MutationObserver(list => {
      let addedNodes: number = 0;
      obs.disconnect();
      for (let mutation of list) {
        if (mutation.type === "childList") { // add/remove node
          if (mutation.addedNodes.length > 0 && this.sortable) {
            ++addedNodes;
          }
        }
      }
      if (addedNodes > 0) {
        this._sort();
        addedNodes = 0;
      }
      obs.observe(this.el, this._observerConfig);
    });
    obs.observe(this.el, this._observerConfig);
  }

  @Method()
  async clear(): Promise<boolean> {
    for (let el of Array.from(this.el.children)) {
      this.el.removeChild(el);
    }
    this.erased.emit(this.el);
    return Promise.resolve(true);
  }

  private _sort(): void {
    const sorted: Node[] = Array.from(this.el.children)
      .sort((a: Node, b: Node) => (a.textContent || "") > (b.textContent || "") ? 1 : -1);
    Array.from(this.el.children)
      .map(el => this.el.removeChild(el));
    sorted.map(el => this.el.appendChild(el));
    this.sorted.emit(this.el);
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
