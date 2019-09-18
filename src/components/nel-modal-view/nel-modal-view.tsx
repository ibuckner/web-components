import {
  Component, ComponentInterface, h, Prop
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
  /**
   * Aligns child elements. Defaults to center of viewport.
   */
  @Prop({ reflect: true }) public alignment: "bottom" | "center" | "top" = "center";

  /**
   * If true, displays the modal element
   */
  @Prop({ reflect: true }) public open: boolean = false;

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
