import {
  Component, ComponentInterface, h, Listen, Prop
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Displays content when network connectivity is interrupted
 */
@Component({
  tag: "nel-network-connection",
  styleUrl: "nel-network-connection.css",
  shadow: true
})
export class NetworkConnection implements ComponentInterface {
  /**
   * If true, content within element remains hidden
   */
  @Prop({ reflect: true }) public available: boolean = true;

  @Listen("online", { target: "window" })
  onOnline(): void {
    this.available = true;
  }

  @Listen("offline", { target: "window" })
  onOffline(): void {
    this.available = false;
  }

  public render(): JSX.NelNetworkConnection {
    return (
      <div hidden={this.available}><slot></slot></div>
    );
  }
}
