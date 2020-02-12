import {
  Component, ComponentInterface, Element, Event, EventEmitter, h,
  Listen, Method, Prop
} from "@stencil/core";
import { JSX } from "../../components";
import { Slicer as _Slicer, TSlicerState, SlicerModifier } from "@buckneri/js-lib-slicer";

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
   * Fired when slicer item state changes occur
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) selected: EventEmitter;

  componentDidLoad(): any {
    const obs = new MutationObserver((mutations) => {
      for (let i = 0; i < mutations.length; ++i) {
        for(let j = 0; j < mutations[i].addedNodes.length; ++j) {
          const el: HTMLElement = mutations[i].addedNodes[j] as HTMLElement;
          if(el.classList.contains("slicer-item")) {
            const items: string[] = [];
            for (let el of Array.from(this.host.children)) {
              items.push(el.textContent);
            }
            this._slicer.data = items;
          }
        }
      }
    });
  
    obs.observe(this.host, { childList: true });

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

  @Listen("click")
  onclick(ev: MouseEvent): void {
    if (this.disabled) {
      ev.preventDefault();
      return;
    }
    const el: HTMLElement = ev.target as HTMLElement;
    if (el.classList.contains("slicer-item")) {
      this._slicer.toggle(
        el.textContent, 
        ev.shiftKey 
          ? SlicerModifier.SHIFT_KEY 
          : ev.ctrlKey 
            ? SlicerModifier.CTRL_KEY 
            : SlicerModifier.NO_KEY
      );
      if (this._slicer.selected === 0 || this.host.children.length === this._slicer.selected) {
        this.clear();
      } else {
        for (let el of Array.from(this.host.children)) {
          const state: TSlicerState = this._slicer.data.get(el.textContent);
          if (state) {
            if (state.filtered) {
              (el as any).classList.add("filtered");
            } else {
              (el as any).classList.remove("filtered");
            }
          }
        }
      }
      this.selected.emit(this._slicer.data);
    }
  }

  /**
   * Clears out slicer selections
   */
  @Method()
  public async clear(): Promise<boolean> {
    this._slicer.clear();
    for (let el of Array.from(this.host.children)) {
      (el as any).classList.remove("filtered");
    }
    this.cleared.emit(this.host);
    return Promise.resolve(true);
  }

  public render(): JSX.NelSlicer {
    const tab: number = this.disabled ? undefined : 0;
    return (
      <div class="slicer" tabindex={tab}>
        <slot></slot>
      </div>
    );
  }
}
