import { Component, Element, h, Prop } from "@stencil/core";

@Component({
  tag: "nel-modal-view",
  styleUrl: "nel-modal-view.css",
  shadow: true
})
export class ModalView {
  @Element() el: HTMLElement;

  /**
   * Set the modal alignment
   */
  @Prop({ reflect: true }) alignment: "bottom" | "center" | "top" = "center";

  /**
   * Is the modal view open or closed?
   */
  @Prop({ reflect: true }) open: boolean = false;

  render(): any {
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
