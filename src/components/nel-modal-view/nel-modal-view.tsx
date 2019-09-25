import {
  Component, ComponentInterface, Element, Event, EventEmitter, h, Prop, Watch
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Displays a modal background for displaying messages above page content
 */
@Component({
  tag: "nel-modal-view",
  styleUrl: "nel-modal-view.css",
  shadow: true
})
export class ModalView implements ComponentInterface {
  @Element() private host: HTMLElement;

  /**
   * Aligns child elements. Defaults to center of viewport.
   */
  @Prop({ reflect: true }) public alignment: "bottom" | "center" | "top" = "center";

  /**
   * If true, displays the modal element
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
    this.loaded.emit(this.host);
    this.ready = true;
  }

  public render(): JSX.NelModalView {
    const mcls: string = `modal-view${this.open ? " open" : ""}`;
    const cls: string = `modal-content ${this.alignment}`;
    return (
      <div class={mcls}>
        <div class={cls}>
          <slot></slot>
        </div>
      </div>
    );
  }
}
