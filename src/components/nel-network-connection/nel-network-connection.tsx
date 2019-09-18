import {
  Component, ComponentInterface, Element, h, Listen, Prop
} from "@stencil/core";

/**
 * Displays content when network connectivity is interrupted
 */
@Component({
  tag: "nel-network-connection",
  styleUrl: "nel-network-connection.css",
  shadow: true
})
export class NetworkConnection implements ComponentInterface {
  @Element() el: HTMLElement;

  /**
   * If true, content within element remains hidden
   */
  @Prop({ reflect: true }) available: boolean = true;

  @Listen("online", { target: "window" })
  handleOnline(): void {
    this.available = true;
  }

  @Listen("offline", { target: "window" })
  handleOffline(): void {
    this.available = false;
  }

  render(): any {
    return (
      <div hidden={this.available}><slot></slot></div>
    );
  }
}
