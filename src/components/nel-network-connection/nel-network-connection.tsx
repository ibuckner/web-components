import { Component, Element, h, Listen, Prop } from "@stencil/core";

@Component({
  tag: "nel-network-connection",
  styleUrl: "nel-network-connection.css",
  shadow: true
})
export class NetworkConnection {
  @Element() el: HTMLElement;

  /**
   * If browser can access network resources
   */
  @Prop({ reflect: true }) available: boolean = true;

  /**
   * Is element disabled
   */
  @Prop({ reflect: true }) disabled: boolean = false;

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
