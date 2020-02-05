import {
  Component, ComponentInterface, Element, Event, EventEmitter, h,
  Method, Prop, Watch
} from "@stencil/core";
import { JSX } from "../../components";
// import { Slicer as slicer } from "@buckneri/js-lib-slicer";

/**
 * Organises child elements vertically or horizontally
 */
@Component({
  tag: "nel-slicer",
  styleUrl: "nel-slicer.css",
  shadow: true
})
export class Slicer implements ComponentInterface {
  // private _slicer: slicer<string> = new slicer<string>();

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
    // this.ready = true;
  }

  componentWillLoad(): void {
    this.ready = true;
  }

  /**
   * Clears out all child elements from collection
   */
  @Method()
  public async clear(): Promise<boolean> {
    for (let el of Array.from(this.host.children)) {
      this.host.removeChild(el);
    }
    this.cleared.emit(this.host);
    return Promise.resolve(true);
  }

  /**
   * Sorts child elements in collection based on text content
   * @param reverse - default is false (A-Z sort order)
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

  public render(): JSX.NelSlicer {
    let cls: string = `slicer ${this.align}`;
    cls += !this.disabled && this.resizable ? ` resize-${this.align}` : "";
    const tab: number = this.disabled ? undefined : 0;
    return (
      <div class={cls} tabindex={tab}>
        <slot></slot>
      </div>
    );
  }
}
