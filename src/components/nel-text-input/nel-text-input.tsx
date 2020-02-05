import {
  Component, ComponentInterface, Element, Event, EventEmitter,
  h, Listen, Prop, Watch
} from "@stencil/core";
import { JSX } from "../../components";

/**
 * Similar in behaviour to the input element
 */
@Component({
  tag: "nel-text-input",
  styleUrl: "nel-text-input.css",
  shadow: true
})
export class TextInput implements ComponentInterface {
  private _input: HTMLInputElement;
  private _mask: RegExp = /.*/gi;

  @Element() private host: HTMLElement;

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ mutable: true, reflect: true }) public cleartext: boolean = true;

  /**
   * If false, element is partly greyed out and not responding to user input
   */
  @Prop({ reflect: true }) public disabled: boolean = false;

  /**
   * Sets a regular expression to restrict data entry to allowed characters
   */
  @Prop({ reflect: true }) public mask: string = "";

  @Watch("mask")
  validateMask(newValue: string): void {
    this._mask = new RegExp(newValue);
  }

  /**
   * Maximum length of text entry
   */
  @Prop({ reflect: true }) public maxlength: number = -1;

  /**
   * Minimum length of text entry
   */
  @Prop({ reflect: true }) public minlength: number = -1;

  /**
   * Sets a regular expression to validate text
   */
  @Prop({ reflect: true }) public pattern: string = "";

  /**
   * Sets a visual text prompt as a palceholder within text box
   */
  @Prop({ reflect: true }) public placeholder: string = "";

  /**
   * True when element can correctly respond to external programmatic access
   */
  @Prop({ mutable: true, reflect: false }) public ready: boolean = false;

  /**
   * Sets the value of the text box
   */
  @Prop({ reflect: true }) public value: string;

  /**
   * Width of text entry
   */
  @Prop({ reflect: true }) public width: number = 20;

  /**
   * Fired when element can correctly respond to external programmatic access
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) loaded: EventEmitter;

  componentDidLoad(): void {
    this._input = this.host.shadowRoot.querySelector("input");
    this._mask = new RegExp(this.mask);
    this.loaded.emit(this.host);
    // this.ready = true;
  }

  componentWillLoad(): void {
    this.ready = true;
  }

  @Listen("input")
  onInput(): void {
    this.value = this._input.value;
  }

  @Listen("keydown")
  onKeyDown(ev: KeyboardEvent): boolean {
    if (this.disabled || ev.keyCode === 229) {
      return false;
    }
    if (!this._editKeyPressed(ev) && !this._mask.test(ev.key)) {
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }
    return true;
  }

  @Listen("paste")
  onPaste(ev: ClipboardEvent): boolean {
    if (!this.disabled && ev.clipboardData) {
      const paste: string = ev.clipboardData.getData("text/plain");
      if (!this._mask.test(paste)) {
        ev.preventDefault();
        ev.stopPropagation();
        return false;
      }
      return true;
    }
    return false;
  }

  @Listen("search")
  onSearch(): void {
    const input: InputEvent = new InputEvent("input", { bubbles: true, cancelable: true });
    this.host.dispatchEvent(input);
  }

  private _editKeyPressed(ev: KeyboardEvent): boolean {
    return ev.code === "Delete" || ev.code === "Backspace" ||
           ev.code === "ArrowLeft" || ev.code === "ArrowRight";
  }

  public render(): JSX.NelTextInput {
    return (
      <input type={this.cleartext ? "search" : "password"}
        maxlength={this.maxlength}
        minlength={this.minlength}
        pattern={this.pattern}
        placeholder={this.placeholder}
        size={this.width}
        value={this.value}>
      </input>
    );
  }
}
