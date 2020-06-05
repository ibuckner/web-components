import {
  Component, ComponentInterface, Element, Event, EventEmitter, 
  h, Host, Prop, Watch
} from "@stencil/core";
import { JSX } from "../../components";
import { positionPop, TPosition } from "@buckneri/spline";

/**
 * Displays a content tooltip
 */
@Component({
  tag: "nel-tip",
  styleUrl: "nel-tip.scss",
  shadow: true
})
export class Tip implements ComponentInterface {
  @Element() private host: HTMLElement;
  private _for: HTMLElement;
  private _panel: HTMLElement;
  private _pause: HTMLElement;
  private _paused: boolean = false;
  private _pointer: string = "";
  private _position: TPosition = { orientX: "left", orientY: "top", x: -1, y: -1 };
  private _progress: HTMLProgressElement;
  private _progressCount: number;
  private _timerProgress: ReturnType<typeof setInterval>;
  private _tip: HTMLElement;

  /**
   * Hides the visible tip after n milliseconds. 0 (disabled) is default
   */
  @Prop({ mutable: true, reflect: true }) public expires: number = 0;

  @Watch("expires")
  validateExpires(): void {
    this._progressCount = 0; 
    if (this.expires) {
      this._panel.classList.remove("hidden");
      this._progress.classList.remove("hidden");
    } else {
      this._panel.classList.add("hidden");
      this._progress.classList.add("hidden");
    }
  }

  /**
   * If true, element is visible
   */
  @Prop({ mutable: true, reflect: true }) public for: string = "";

  @Watch("for")
  validateFor(): void {
    if (this.for) {
      this._for = document.getElementById(this.for);
      this._position = positionPop(this._for as any, this._tip);
      this._tip.style.top = (this._position.y + (this._position.orientY === "top" ? -20 : 20)) + "px";
      this._tip.style.left = (this._position.x + (this._position.orientX === "right" ? -40 : 40)) + "px";
      this._pointer = `${this._position.orientY}-${this._position.orientX}`;
    }
  }

  /**
   * True when element can correctly respond to external programmatic access
   */
  @Prop({ mutable: true, reflect: false }) public ready: boolean = false;

  /**
   * If true, element is visible
   */
  @Prop({ mutable: true, reflect: true }) public show: boolean = false;

  @Watch("show")
  validateShow(): void {
    this._tip.style.opacity = this.show ? "1" : "0";
    if (this.show) {
      this._startTimer();
    } else {
      this._clearTimer();
    }
    this.changed.emit(this.host);
  }

  /**
   * Fired when element can correctly respond to external programmatic access
   */
  @Event({ composed: true, cancelable: false, bubbles: true }) loaded: EventEmitter;

  /**
   * Fired after element is activated
   */
  @Event({ composed: true, cancelable: true, bubbles: true }) changed: EventEmitter;

  componentDidLoad(): void {
    this.loaded.emit(this.host);
    this._tip = this.host.shadowRoot.querySelector(".tip");
    this._panel = this._tip.querySelector(".tip-panel") as HTMLDivElement;
    this._progress = this._tip.querySelector(".tip-progress") as HTMLProgressElement;
    this._pause = this._panel.querySelector(".tip-action") as HTMLSpanElement;
    this._pause.addEventListener("click", () => {
      if (this._paused) {
        this._startTimer();
        this._paused = false;
      } else {
        this._pause.textContent = "resume";
        this._paused = true;
        clearInterval(this._timerProgress);
        this._timerProgress = null;
      }
    });
  }

  componentWillLoad(): void {
    this.ready = true;
  }

  private _clearTimer(): void {
    clearInterval(this._timerProgress);
    this._paused = false;
    this._timerProgress = null;
  }

  private _startTimer(): void {
    if (this.show && this.expires) {
      this._pause.textContent = "pause";
      if (!this._paused) {
        this._progressCount = this.expires / 100;
        this._progress.max = this.expires;
        this._progress.value = 0;
      }
      this._timerProgress = setInterval(() => {
        this._progress.value += this._progressCount;
        if (this._progress.value >= this._progress.max) {
          this._clearTimer();
          this.show = false;
        }
      }, this._progressCount);
    }
  }

  public render(): JSX.NelTip {
    const cls: string = `tip`;
    const clsWrapper: string = `tip-wrapper ${this._pointer}`;
    const clsPanel: string = `tip-panel${this.expires ? "" : " hidden"}`;
    const clsBar: string = `tip-progress${this.expires ? "" : " hidden"} ${this._position.orientY}`;
    return (
      <Host>
        <div class={cls}>
          <div class={clsWrapper}>
            <progress class={clsBar} max="100" value="0"></progress>
            <div class="tip-message">
              <slot/>
            </div>
            <div class={clsPanel}>
              <span class="tip-action">pause</span>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}