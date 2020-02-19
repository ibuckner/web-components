import {
  Component, ComponentInterface, Element, Event, EventEmitter, h,
  Listen, Prop, Watch
} from "@stencil/core";
import { JSX } from "../../components";
import { Slicer as _Slicer, SlicerModifier } from "@buckneri/js-lib-slicer";

/**
 * Organises child elements vertically or horizontally
 */
@Component({
  tag: "nel-slicer",
  styleUrl: "nel-slicer.scss",
  shadow: true
})
export class Slicer implements ComponentInterface {
  private _slicer: _Slicer<string> = new _Slicer<string>();

  @Element() private host: HTMLElement;

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) public clear: boolean = false;

  @Watch("clear")
  validateClear(newValue: boolean): void {
    if (newValue) {
      this._slicer.clear();
      for (let el of Array.from(this.host.children)) {
        (el as any).classList.remove("filtered");
        (el as any).classList.remove("selected");
      }
      this.clear = false;
      this.cleared.emit(this.host);
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
   * Fired after child elements are removed via clear() method
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) cleared: EventEmitter;

  /**
   * Fired when error occurs
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) errored: EventEmitter;

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
          if (el.classList.contains("slicer-item")) {
            const item: string = el.textContent;
            if (this._slicer.has(item)) {
              if (el && el.parentNode) {
                el.parentNode.removeChild(el);
              }
              this.errored.emit(`Duplicate entry detected: ${item}`);
            } else {
              this._slicer.add(item);
            }
          }
        }
      }
    });
  
    obs.observe(this.host, { childList: true });    
    for (let el of Array.from(this.host.children)) {
      this._slicer.add(el.textContent);
    }
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
      const selection: string[] = this._slicer.selection;
      if (selection.length === 0) {
        this.clear = true;
      } else {
        for (let el of Array.from(this.host.children)) {
          if (selection.indexOf(el.textContent) === -1) {
            (el as any).classList.add("filtered");
            (el as any).classList.remove("selected");
          } else {
            (el as any).classList.remove("filtered");
            (el as any).classList.add("selected");
          }
        }
      }
      this.selected.emit(selection);
    }
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
