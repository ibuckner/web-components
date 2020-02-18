import {
  Component, ComponentInterface, Element,
  Event, EventEmitter, h, Listen, Prop
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Displays content when network connectivity is interrupted
 */
@Component({
  tag: "nel-network-connection",
  styleUrl: "nel-network-connection.scss",
  shadow: true
})
export class NetworkConnection implements ComponentInterface {
  @Element() private host: HTMLElement;

  /**
   * If true, content within element remains hidden
   */
  @Prop({ reflect: true }) public available: boolean = true;

  /**
   * Fired when element can correctly respond to external programmatic access
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) loaded: EventEmitter;

  /**
   * True when element can correctly respond to external programmatic access
   */
  @Prop({ mutable: true, reflect: false }) public ready: boolean = false;

  /**
   * Fired after network status change
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) changed: EventEmitter;

  componentDidLoad(): any {    
    this.loaded.emit(this.host);
    // this.ready = true;
  }

  componentWillLoad(): void {
    this.ready = true;
  }

  @Listen("online", { target: "window" })
  onOnline(): void {
    this.available = true;
    this.changed.emit(this.host);
  }

  @Listen("offline", { target: "window" })
  onOffline(): void {
    this.available = false;
    this.changed.emit(this.host);
  }

  public render(): JSX.NelNetworkConnection {
    return (
      <div hidden={this.available}>
        <slot></slot>
      </div>
    );
  }
}
