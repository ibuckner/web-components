import {
  Component, Element, h, Listen, Prop
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Similar in function to detail/summary elements
 */
@Component({
  tag: "nel-expand-item",
  styleUrl: "nel-expand-item.css",
  shadow: true
})
export class ExpandItem {
  @Element() private host: HTMLElement;

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) public disabled: boolean = false;

  /**
   * If true, main contents of element are visible
   */
  @Prop({ reflect: true }) public open: boolean = false;

  /**
   * Adjusts the size of the marker, using CSS rem units of measurement
   */
  @Prop({ reflect: true }) public size: number = 2;

  @Listen("click")
  handleClick(ev: MouseEvent): boolean {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }
    this.open = !(this.host as any).open;
    return true;
  }

  @Listen("keydown")
  handleKeyDown(ev: KeyboardEvent): boolean {
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
      padding: `0.75rem 0.75rem 0.75rem ${this.size + 1.5}rem`
    };
    const iconStyle: any = {
      "background-image": this.open
        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' height='${this.size}rem' width='${this.size}rem' aria-hidden='true'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23005eb8'%3E%3C/circle%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M8 12h8'%3E%3C/path%3E%3C/svg%3E%0A")`
        : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' height='${this.size}rem' width='${this.size}rem' aria-hidden='true'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23005eb8'%3E%3C/circle%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M12 8v8M8 12h8'%3E%3C/path%3E%3C/svg%3E%0A")`,
      "background-position": "center",
      "background-repeat": "no-repeat",
      "border-radius": "50%",
      height: `${this.size}rem`,
      width: `${this.size}rem`
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
        <div style={contentStyle}>
          <slot name="content"></slot>
        </div>
      </details>
    );
  }
}
