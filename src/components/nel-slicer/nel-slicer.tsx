import {
  Component, ComponentInterface, Element, Event, EventEmitter, h,
  Method, Prop, Watch
} from "@stencil/core";
import { JSX } from "../../components";
import { Slicer as _Slicer, TSlicerState } from "@buckneri/js-lib-slicer";

/**
 * Organises child elements vertically or horizontally
 */
@Component({
  tag: "nel-slicer",
  styleUrl: "nel-slicer.css",
  shadow: true
})
export class Slicer implements ComponentInterface {
  private _slicer: _Slicer<string> = new _Slicer<string>();

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

  componentDidLoad(): any {
    const items: string[] = [];
    for (let el of Array.from(this.host.children)) {
      items.push(el.textContent);
    }
    this._slicer.data = items;
    this.loaded.emit(this.host);
  }

  componentWillLoad(): void {
    this.ready = true;
  }

  /**
   * Clears out slicer selections
   */
  @Method()
  public async clear(): Promise<boolean> {
    this._slicer.clear();
    for (let el of Array.from(this.host.children)) {
      const state: TSlicerState = this._slicer.data.get(el.textContent);
      if (state) {
        if (state.filtered) {
          el.classList.add("filtered");
        } else {
          el.classList.remove("filtered");
        }
      }
    }
    this.cleared.emit(this.host);
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
