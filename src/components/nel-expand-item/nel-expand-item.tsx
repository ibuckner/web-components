import {
  Component, Element, Event, EventEmitter, h, Listen, Prop, Watch
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Similar in function to detail/summary elements
 */
@Component({
  tag: "nel-expand-item",
  styleUrl: "nel-expand-item.scss",
  shadow: true
})
export class ExpandItem {
  @Element() private host: HTMLElement;
  private _size: number = 1 + (2 * 0.25);

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) public disabled: boolean = false;

  /**
   * If true, main contents of element are visible
   */
  @Prop({ reflect: true }) public open: boolean = false;

  @Watch("open")
  validateOpen(newValue: string): void {
    if (Boolean(newValue)) {
      this.opened.emit(this.host);
    } else {
      this.closed.emit(this.host);
    }
  }

  /**
   * True when element can correctly respond to external programmatic access
   */
  @Prop({ mutable: true, reflect: false }) public ready: boolean = false;

  /**
   * Adjusts the size of the marker, using CSS rem units of measurement
   */
  @Prop({ reflect: true }) public size: number = 2;

  @Watch("size")
  validateSize(newValue: string): void {
    if (+newValue > 0 && +newValue < 11) {
      this._size = 1 + (Math.ceil(+newValue) * 0.25);
    }
  }

  /**
   * Fired when element's open property is false either via UI or programmatically
   */
  @Event({ composed: true, cancelable: true, bubbles: true }) closed: EventEmitter;

  /**
   * Fired when element can correctly respond to external programmatic access
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) loaded: EventEmitter;

  /**
   * Fired when element's open property is true either via UI or programmatically
   */
  @Event({ composed: true, cancelable: true, bubbles: true }) opened: EventEmitter;

  componentDidLoad(): any {
    const su: HTMLElement = this.host.shadowRoot.querySelector("summary");
    const dt: HTMLDetailsElement = this.host.shadowRoot.querySelector("details");
    su.addEventListener("click", (ev: MouseEvent) => {
      if (this.disabled) {
        ev.preventDefault();
        ev.stopPropagation();
        return false;
      }
      return true;
    });

    dt.addEventListener("toggle", (ev: MouseEvent) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      return false;
    });
    
    this.loaded.emit(this.host);
  }

  componentWillLoad(): void {
    this.ready = true;
  }

  @Listen("click")
  onClick(ev: MouseEvent): boolean {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }
    const e: Element = ev.target as Element;
    let p = e.parentNode as Element;
    if (e.tagName !== "NEL-EXPAND-ITEM") {
      while (p.slot !== "title" && p.tagName !== "NEL-EXPAND-ITEM") {
        p = p.parentNode as Element;
      }
    }
    if (e.slot === "title" || e.tagName === "NEL-EXPAND-ITEM" || p.slot === "title") {
      this.open = !(this.host as any).open;
    }
    return true;
  }

  @Listen("keydown")
  onKeyDown(ev: KeyboardEvent): boolean {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }
    if (ev.keyCode === 229) {
      return false;
    }
    switch (ev.code) {
      case "Space": this.open = !this.open; break;
    }
    return true;
  }

  public render(): JSX.NelExpandItem {
    const tab: number = this.disabled ? undefined : 0;
    const contentStyle: any = {
      padding: `0.75rem 0.75rem 0.75rem ${this._size + 1.5}rem`
    };
    const iconStyle: any = {
      "background-image": this.open
        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' height='${this._size}rem' width='${this._size}rem' aria-hidden='true'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23005eb8'%3E%3C/circle%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M8 12h8'%3E%3C/path%3E%3C/svg%3E%0A")`
        : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' height='${this._size}rem' width='${this._size}rem' aria-hidden='true'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23005eb8'%3E%3C/circle%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M12 8v8M8 12h8'%3E%3C/path%3E%3C/svg%3E%0A")`,
      "background-position": "center",
      "background-repeat": "no-repeat",
      "border-radius": "50%",
      height: `${this._size}rem`,
      width: `${this._size}rem`
    };
    return (
      <details tabindex={tab} open={this.open}>
        <summary role="button" tabindex="-1">
          <div class="icon" style={iconStyle}>
            <slot name="icon"></slot>
          </div>
          <div class="title">
            <slot name="title"></slot>
          </div>
        </summary>
        <div class="content" style={contentStyle}>
          <slot name="content"></slot>
        </div>
      </details>
    );
  }
}
