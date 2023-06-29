import {
  classMap
} from "./chunk-WJWTNJAW.js";
import {
  index_es_default
} from "./chunk-MH4P3RBK.js";
import {
  require_sublime
} from "./chunk-XTENQXFC.js";
import {
  require_search
} from "./chunk-X3OKHQV6.js";
import {
  require_searchcursor
} from "./chunk-DQLCJI4I.js";
import {
  require_jump_to_line
} from "./chunk-B4IMDGLU.js";
import {
  require_dialog
} from "./chunk-XJ5LIWAR.js";
import {
  require_comment
} from "./chunk-GWKODHOS.js";
import {
  range
} from "./chunk-AYD7LSFM.js";
import {
  map
} from "./chunk-3WKWFYTV.js";
import {
  LitElement,
  css
} from "./chunk-WAXPZXAD.js";
import {
  getTime
} from "./chunk-MJZMVDHZ.js";
import {
  unsafeHTML
} from "./chunk-UECXVOBK.js";
import {
  es_default
} from "./chunk-5C4C77BX.js";
import "./chunk-MLUNDPRD.js";
import {
  repeat
} from "./chunk-MNYQPZST.js";
import "./chunk-HY4YQS7H.js";
import {
  html,
  nothing,
  svg
} from "./chunk-PE6LRBOZ.js";
import {
  require_javascript
} from "./chunk-WXEQLOVX.js";
import {
  require_codemirror
} from "./chunk-PDMTOR63.js";
import {
  __publicField,
  __toESM
} from "./chunk-GKWPUQBP.js";

// ../../ircam-ismm/sc-components/styles.js
var fontFamily = css`Consolas, monaco, monospace`;
var fontSize = css`11px`;
var theme = {};
theme["--color-primary-0"] = css`#121212ff`;
theme["--color-primary-1"] = css`#272822ff`;
theme["--color-primary-2"] = css`#3d3e39ff`;
theme["--color-primary-3"] = css`#6a6a69ff`;
theme["--color-primary-4"] = css`#dededeff`;
theme["--color-secondary-1"] = css`#f0db4fff`;
theme["--color-secondary-2"] = css`#1c78c0ff`;
theme["--color-secondary-3"] = css`#d9534fff`;
theme["--color-secondary-4"] = css`#5ec451ff`;
theme["--color-secondary-5"] = css`#cd7afaff`;
theme["--color-secondary-6"] = css`#f4b43eff`;
var cssVars = `
:root {
  --sc-font-family: Consolas, monaco, monospace;
  --sc-font-size: 11px;
  --sc-color-primary-1: #121212ff;
  --sc-color-primary-2: #272822ff;
  --sc-color-primary-3: #3d3e39ff;
  --sc-color-primary-4: #6a6a69ff;
  --sc-color-primary-5: #dededeff;
  --sc-color-secondary-1: #f4b43eff; /* orange / yellow */
  --sc-color-secondary-2: #1c78c0ff; /* blue */
  --sc-color-secondary-3: #d9534fff; /* red */
  --sc-color-secondary-4: #5ec451ff; /* green */
  --sc-color-secondary-5: #cd7afaff; /* lila */
}
`;
var $style = document.createElement("style");
$style.type = "text/css";
$style.appendChild(document.createTextNode(""));
var $firstStylesheet = document.querySelector("style");
if ($firstStylesheet) {
  $firstStylesheet.parentNode.insertBefore($style, $firstStylesheet);
} else {
  document.head.appendChild($style);
}
$style.sheet.insertRule(cssVars);
var arrow = css`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkCAUKBTL+mGjUAAAAeUlEQVRIx+3OMQ6AIBBE0a93sMLEk1h4Y7Ww9mRiRUIM6jJUGob6/QXqfrCGkbbAHw0bE14+v8PAjBffwgDgWCS+4sJXlETElcSF5yYSPCdxw62JB25JvPC3hIE/JYz8LpHBU4lMfk0IPE6IPCRWepUDdHQlvO4jOwFwgu1NCrBo/wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wOC0wNVQxMDowNTo0OSswMDowMBWQx3oAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDgtMDVUMTA6MDU6NDkrMDA6MDBkzX/GAAAAIHRFWHRzb2Z0d2FyZQBodHRwczovL2ltYWdlbWFnaWNrLm9yZ7zPHZ0AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADUxMo+NU4EAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTEyHHwD3AAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNTk2NjIxOTQ5QVn8gAAAABJ0RVh0VGh1bWI6OlNpemUAMzI2MEJCw0lk+gAAAFR0RVh0VGh1bWI6OlVSSQBmaWxlOi8vLi91cGxvYWRzLzU2L2V4dHg3bGQvMjQ1Ni9pbmRpY2F0b3JfYXJyb3dfdHJpYW5nbGVfaWNvbl8xNDkwMjAucG5n2GvxiAAAAABJRU5ErkJggg==`;
var arrowRight = css`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAA7DgAAOw4AXEryjgAAAAHdElNRQflAxQLDS8ArDZ8AAACgklEQVRo3u3ZT0gUURzA8e+sstgSlmtg9MeCIoKKIIQCu0TZIbxIBdmhKDxZhw7mQYICQRCsU1B4CA8ReJEg+nMpKQjBTT0UERHlYmQGGUWYmOt0aHm9Ic2ZN7/9LYRvbnvY+fDmz/e9XVgaRR4l837qkSbFdPFYh3nGEGdYUZzTVzCIj88Mt9lNQh9QTRY/f3yglVXFBPjM8oC9uvMQBPj4THCJ1fqAKcaYyxNyPKaOUl3AKAe5wXczD5N0sk4TkKWaJI2MmHmYI0MDSU0AwEau8dXMwzeuskkXAEkaGCRnEM85zjJNAMBauvhsCFP0sE0XACUc4qk1D685zXJNAEAV7UwYwjS97MLTBECCfTxk1iCynJWO1r8BAJW08d4QxKO1OAA89nCHmcJEKwwAoJxzvCtEtMICwGMnvfyQjlZ4AECKJl4ZQo4n8aMVDQCwlR7JaEUHQJlktFwAIBgtV4BYtNwBIBKteACBaMUFQMxoSQB+R+tRIFqNugCANG18MYQM6fmchR0/8aOfS+oS1HLfugRjnNIEVHGBj9ZN2EeN3k1YygH6rcfwDc2aj+Ea2gMvoltsj/oVcV7F9QyYJPm84KTmq3gDlwMx6mazwww6Aso4wrCV42GOauZ4C92BBckV1ruePDogxQleWkuyAer1lmQeO7hpLUo/0aG5KC2nmbfWsryf/XrL8gQ19Fkbk3Euam5MKmkJbM3uUau3Nfs7Mq2slDv5YoBYkYkLiB2ZeACByLgDhCLjChCLjAsgKRmZqIBR6rguGZmogOCP1QKRiQr4cwhFxg0gGBkXgGhkwo40mXxk7spGJvw4xhAjnNf4285b4NMKPCatfd3S+H/HLwusPWkzmFSAAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTAzLTIwVDExOjEzOjQ3KzAwOjAwRxN4GAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wMy0yMFQxMToxMzo0NyswMDowMDZOwKQAAAAgdEVYdHNvZnR3YXJlAGh0dHBzOi8vaW1hZ2VtYWdpY2sub3JnvM8dnQAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQANTEyj41TgQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAA1MTIcfAPcAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE2MTYyMzg4MjfA6B9qAAAAEnRFWHRUaHVtYjo6U2l6ZQA1MTU5QkJP1GlWAAAAUHRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8uL3VwbG9hZHMvNTYvaEpIZnVxcC8yOTAyL2Fycm93X3JpZ2h0X3RyaWFuZ2xlX2ljb25fMTgzMTIxLnBuZ8GglZQAAAAASUVORK5CYII=`;
var arrowDown = css`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAQAAAD/5HvMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAA7DgAAOw4AXEryjgAAAAHdElNRQflAxQLDR8mdQbQAAADoklEQVRo3u2ZXUgUURiGn201VynNG7Ur0dSgH00iSFDsP0GiwCyKCougkAgMiiChrvq7EI2guijox6IfiqILIZKQKAgvKoxIyrK8MCrFzDJ12y46fjtqujszZ3a9mHdvZme/7z3vfN+Zs++cARcuXLhwMbnhGfFtKt4oaPAz8D9BsaxnE0kEIl6SHq5xi8HRP6ygm0CUPt2UDsuYIoKymRHh2gQxg+Kxgt7yPWqCemkaPoyRk03cYKc6HuIFvaMmvF4EmE6ejH6dB2MF/eYEi5kHgIernHb0jvOzhwXquIWT/P5/2FZ+qWn2hrkOyoE5vFEj/WLb+GEJXJSZfxmfY3J8XJJxLpIwUWgubSrwJzscE7SZn2qUNnJDBVfSr4JfM9sROTm0qBH6qQwdPo2bUs6zDrTNx1nhv8m0cFLyaVcJPyjTLqiMH4q9nfxwk/YzpJKaSdcqJ51mxTzEgfDTkrkvZT1lWKvsIoY64b1PspnUIjpV4jdKtAkq4Zti7aTIXKqHg/hV8lNmapEzkyeK0c9B839MKTRKeY9p+BvxcpQ/iu8xqVYolvBFEXxllW1BK/kqbKutXtMxadtDa9ckSOWhtMtGvdN4rGj+UG3DjnioNrQrzc6VraVHEXVQYJmlgA7F0sM6O3IgllqZ2g3mVg5BMg3CUUusPUGQyXNFNmjlZgX2MqAYnpNpVw5AOb2K8BMLTWcv5KPK7mWDDjkQxzkp+R0STeUmcltyzxGnRxBkioMZYLepzN3SrhZm6ZIDUCEer5W8sLNyaRX/uV2nHIg3uO0rE7tgQ84VyblEvF5BMJ93iryPLWFlbKFPZbxjvm45ALsM8yErZHSW5XkXNhK5IS04H8Jt+zgvsXdN3pkmkM97WVPKJ4wMrl0fWOSUHIAqaVszGeNGZYhzHqDKSTmQyD1pRd04btvonO85165hFIvb7gpuM41AKV3inItNsluAh0MTuu00nooVO+Tolo4ghUdi206OapuXIyL3kU2XaQJLDW57+Yhflhuc87JIyQEvx8WSNpJiqF2j1O54ZLeY0wzPWNVyNji7nmh6ljOBNXIvdVAIQKE45y7WRFoOeKkxPKcnkWTYD6iJyhsBMgxuex9VDOp1zlawUQxGlzSwj43RkgNxnBnzmuCCg5ulYSBbXM+/zytyoikHoELaFqCPimjLAR/1Iqhev3O2guFni9bQe86hoWO9+MxLfLRwmGfRrk0QMRq3Rl24cOHCxaTGX01uEpsie0MVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTAzLTIwVDExOjEzOjMxKzAwOjAwLgZEOwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wMy0yMFQxMToxMzozMSswMDowMF9b/IcAAAAgdEVYdHNvZnR3YXJlAGh0dHBzOi8vaW1hZ2VtYWdpY2sub3JnvM8dnQAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQANTEyj41TgQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAA1MTIcfAPcAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE2MTYyMzg4MTECpumcAAAAEnRFWHRUaHVtYjo6U2l6ZQA4MDQ0QkJ+TqcOAAAAT3RFWHRUaHVtYjo6VVJJAGZpbGU6Ly8uL3VwbG9hZHMvNTYvaEpIZnVxcC8yOTAyL2Fycm93X2Rvd25fdHJpYW5nbGVfaWNvbl8xODMwOTUucG5n/JrixgAAAABJRU5ErkJggg==`;

// ../../ircam-ismm/sc-components/ScElement.js
var id = 0;
var userSelectNoneOnBodyRegister = /* @__PURE__ */ new Set();
var ScElement = class extends LitElement {
  constructor() {
    super();
    this._scId = `${this.constructor.name.toLowerCase()}-${id++}`;
  }
  _preventContextMenu(e) {
    e.preventDefault();
  }
  _requestUserSelectNoneOnBody() {
    if (userSelectNoneOnBodyRegister.size === 0) {
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";
    }
    userSelectNoneOnBodyRegister.add(this._scId);
  }
  _cancelUserSelectNoneOnBody() {
    userSelectNoneOnBodyRegister.delete(this._scId);
    if (userSelectNoneOnBodyRegister.size === 0) {
      document.body.style.userSelect = "auto";
      document.body.style.webkitUserSelect = "auto";
    }
  }
};
var ScElement_default = ScElement;

// ../../ircam-ismm/sc-components/sc-position-surface.js
var ScPositionSurface = class extends ScElement_default {
  constructor() {
    super();
    this.xRange = [0, 1];
    this.yRange = [0, 1];
    this._activePointers = /* @__PURE__ */ new Map();
    this._pointerIds = [];
    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);
    this._touchStart = this._touchStart.bind(this);
    this._touchMove = this._touchMove.bind(this);
    this._touchEnd = this._touchEnd.bind(this);
    this._propagateValues = this._propagateValues.bind(this);
    this._resizeObserver = null;
    this._rafId = null;
  }
  render() {
    return html`
      <div
        @mousedown="${this._mouseDown}"
        @touchstart="${{
      handleEvent: this._touchStart,
      passive: false
    }}"
        @contextmenu="${this._preventContextMenu}"
      ></div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      const xDelta = this.xRange[1] - this.xRange[0];
      const yDelta = this.yRange[1] - this.yRange[0];
      this._px2x = (px) => px / width * xDelta + this.xRange[0];
      this._px2y = (px) => px / height * yDelta + this.yRange[0];
    });
    this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    this._resizeObserver.disconnect();
    super.disconnectedCallback();
  }
  _mouseDown(e) {
    window.addEventListener("mousemove", this._mouseMove, { passive: false });
    window.addEventListener("mouseup", this._mouseUp);
    this._pointerIds.push("mouse");
    this._activePointers.set("mouse", e);
    this._requestUserSelectNoneOnBody();
    this._requestPropagateValues(e);
  }
  _mouseMove(e) {
    this._activePointers.set("mouse", e);
    this._requestPropagateValues(e);
  }
  _mouseUp(e) {
    window.removeEventListener("mousemove", this._mouseMove);
    window.removeEventListener("mouseup", this._mouseUp);
    this._pointerIds.splice(this._pointerIds.indexOf("mouse"));
    this._activePointers.delete("mouse");
    this._cancelUserSelectNoneOnBody();
    const event = new CustomEvent("pointerend", {
      bubbles: true,
      composed: true,
      detail: { pointerId: "mouse" }
    });
    this.dispatchEvent(event);
    this._requestPropagateValues(e);
  }
  _touchStart(e) {
    e.preventDefault();
    if (this._pointerIds.length === 0) {
      window.addEventListener("touchmove", this._touchMove, { passive: false });
      window.addEventListener("touchend", this._touchEnd);
      window.addEventListener("touchcancel", this._touchEnd);
      this._requestUserSelectNoneOnBody();
    }
    for (let touch of e.changedTouches) {
      const id2 = touch.identifier;
      this._pointerIds.push(id2);
      this._activePointers.set(id2, touch);
    }
    this._requestPropagateValues(e);
  }
  _touchMove(e) {
    e.preventDefault();
    for (let touch of e.changedTouches) {
      const id2 = touch.identifier;
      if (this._pointerIds.indexOf(id2) !== -1) {
        this._activePointers.set(id2, touch);
      }
    }
    this._requestPropagateValues(e);
  }
  _touchEnd(e) {
    for (let touch of e.changedTouches) {
      const pointerId = touch.identifier;
      const index = this._pointerIds.indexOf(pointerId);
      if (index !== -1) {
        this._pointerIds.splice(index, 1);
        this._activePointers.delete(pointerId);
        const event = new CustomEvent("pointerend", {
          bubbles: true,
          composed: true,
          detail: { pointerId }
        });
        this.dispatchEvent(event);
      }
    }
    if (this._pointerIds.length === 0) {
      window.removeEventListener("touchmove", this._touchMove);
      window.removeEventListener("touchend", this._touchEnd);
      window.removeEventListener("touchcancel", this._touchEnd);
      this._cancelUserSelectNoneOnBody(e);
    }
    this._requestPropagateValues(e);
  }
  _requestPropagateValues(e) {
    window.cancelAnimationFrame(this._rafId);
    this._rafId = window.requestAnimationFrame(() => this._propagateValues(e));
  }
  _propagateValues(e) {
    const rect = this.getBoundingClientRect();
    const values = this._pointerIds.map((pointerId) => {
      const event2 = this._activePointers.get(pointerId);
      const x = event2.clientX - rect.left;
      const scaledX = this._px2x(x);
      const y = event2.clientY - rect.top;
      const scaledY = this._px2y(y);
      return { x: scaledX, y: scaledY, pointerId };
    });
    const event = new CustomEvent("input", {
      bubbles: true,
      composed: true,
      detail: { value: values }
    });
    this.dispatchEvent(event);
  }
};
__publicField(ScPositionSurface, "properties", {
  xRange: {
    type: Array,
    attribute: "x-range"
  },
  yRange: {
    type: Array,
    attribute: "y-range"
  }
});
__publicField(ScPositionSurface, "styles", css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    div {
      width: 100%;
      height: 100%;
    }
  `);
if (customElements.get("sc-position-surface") === void 0) {
  customElements.define("sc-position-surface", ScPositionSurface);
}

// ../../ircam-ismm/sc-components/sc-speed-surface.js
var ScSpeedSurface = class extends ScElement_default {
  constructor() {
    super();
    this._pointerId = null;
    this._lastPointer = null;
    this._lastTime = null;
    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);
    this._touchStart = this._touchStart.bind(this);
    this._touchMove = this._touchMove.bind(this);
    this._touchEnd = this._touchEnd.bind(this);
    this._propagateValues = this._propagateValues.bind(this);
    this._rafId = null;
  }
  render() {
    return html`
      <div
        @mousedown="${this._mouseDown}"
        @touchstart="${{
      handleEvent: this._touchStart,
      passive: false
    }}"
        @contextmenu="${this._preventContextMenu}"
      ></div>
    `;
  }
  _mouseDown(e) {
    window.addEventListener("mousemove", this._mouseMove);
    window.addEventListener("mouseup", this._mouseUp);
    this._requestUserSelectNoneOnBody();
    this._pointerId = "mouse";
    this._lastTime = getTime();
    this._lastPointer = e;
  }
  _mouseMove(e) {
    this._requestPropagateValues(e);
  }
  _mouseUp(e) {
    window.removeEventListener("mousemove", this._mouseMove);
    window.removeEventListener("mouseup", this._mouseUp);
    this._cancelUserSelectNoneOnBody();
    this._requestPropagateValues(e);
    setTimeout(() => {
      this._pointerId = null;
      this._requestPropagateValues(e);
    }, 20);
  }
  _touchStart(e) {
    e.preventDefault();
    if (this._pointerId === null) {
      const touch = e.changedTouches[0];
      this._pointerId = touch.identifier;
      window.addEventListener("touchmove", this._touchMove, { passive: false });
      window.addEventListener("touchend", this._touchEnd);
      window.addEventListener("touchcancel", this._touchEnd);
      this._requestUserSelectNoneOnBody();
      this._lastTime = getTime();
      this._lastPointer = touch;
    }
  }
  _touchMove(e) {
    e.preventDefault();
    for (let touch of e.changedTouches) {
      if (touch.identifier === this._pointerId) {
        this._requestPropagateValues(touch);
      }
    }
  }
  _touchEnd(e) {
    for (let touch of e.changedTouches) {
      if (touch.identifier === this._pointerId) {
        window.removeEventListener("touchmove", this._touchMove);
        window.removeEventListener("touchend", this._touchEnd);
        window.removeEventListener("touchcancel", this._touchEnd);
        this._cancelUserSelectNoneOnBody();
        this._requestPropagateValues(touch);
        setTimeout(() => {
          this._pointerId = null;
          this._requestPropagateValues(touch);
        }, 20);
      }
    }
  }
  _requestPropagateValues(e) {
    window.cancelAnimationFrame(this._rafId);
    this._rafId = window.requestAnimationFrame(() => this._propagateValues(e));
  }
  _propagateValues(e) {
    const lastX = this._lastPointer.screenX;
    const lastY = this._lastPointer.screenY;
    const x = e.screenX;
    const y = e.screenY;
    const now = getTime();
    const dt = (this._lastTime - now) * 1e3;
    const dx = (x - lastX) / dt;
    const dy = (y - lastY) / dt;
    this._lastTime = now;
    this._lastPointer = e;
    const event = new CustomEvent("input", {
      bubbles: true,
      composed: true,
      detail: { dx, dy, pointerId: this._pointerId }
    });
    this.dispatchEvent(event);
  }
};
__publicField(ScSpeedSurface, "styles", css`
    :host {
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    div {
      width: 100%;
      height: 100%;
    }
  `);
if (customElements.get("sc-speed-surface") === void 0) {
  customElements.define("sc-speed-surface", ScSpeedSurface);
}

// ../../ircam-ismm/sc-components/sc-bang.js
var ScBang = class extends ScElement_default {
  constructor() {
    super();
    this.active = false;
    this.disabled = false;
    this._timeoutId = null;
    this._triggerEvent = this._triggerEvent.bind(this);
  }
  render() {
    const size = this._size - 2;
    if (this.active) {
      clearTimeout(this._timeoutId);
      this._timeoutId = setTimeout(() => this.active = false, 50);
    }
    return html`
      <svg
        viewbox="0 0 100 100"
        @mousedown="${this._triggerEvent}"
        @touchstart="${{
      handleEvent: this._triggerEvent,
      passive: false
    }}"
        @contextmenu="${this._preventContextMenu}"
      >
        <circle cx="50" cy="50" r="34" ></circle>
        ${this.active ? svg`<circle class="active" cx="50" cy="50" r="20"></circle>` : nothing}
      </svg>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", 0);
    }
  }
  _triggerEvent(e) {
    if (this.disabled) {
      return;
    }
    e.preventDefault();
    this.focus();
    const inputEvent = new CustomEvent("input", {
      bubbles: true,
      composed: true,
      detail: { value: true }
    });
    this.active = true;
    this.dispatchEvent(inputEvent);
  }
};
__publicField(ScBang, "properties", {
  active: {
    type: Boolean,
    reflect: true
  },
  disabled: {
    type: Boolean,
    reflect: true
  }
});
__publicField(ScBang, "styles", css`
    :host {
      display: inline-block;
      width: 30px;
      height: 30px;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-2);
      font-size: 0;
      line-height: 0;
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    svg {
      box-sizing: border-box;
      border: 1px solid var(--sc-color-primary-3);
      width: 100%;
      height: 100%;
    }

    circle {
      stroke-width: 8px;
      stroke: var(--sc-color-primary-4);
      fill: var(--sc-color-primary-2);
    }

    circle.active {
      fill: var(--sc-color-primary-5);
      stroke: none;
    }
  `);
if (customElements.get("sc-bang") === void 0) {
  customElements.define("sc-bang", ScBang);
}

// ../../ircam-ismm/sc-components/sc-button.js
var ScButton = class extends ScElement_default {
  // sc-midi controller interface
  set midiValue(value) {
    if (this.disabled) {
      return;
    }
    const eventName = value === 0 ? "release" : "press";
    this._dispatchEvent(eventName);
  }
  constructor() {
    super();
    this.value = null;
    this.selected = false;
    this.disabled = false;
    this._pressed = false;
    this._onEvent = this._onEvent.bind(this);
  }
  render() {
    return html`
      <button
        tabindex="-1"
        class="${this.selected ? "selected" : ""}"
        @mousedown="${this._onEvent}"
        @mouseup="${this._onEvent}"

        @touchstart="${{
      handleEvent: this._onEvent,
      passive: false
    }}"
        @touchend="${this._onEvent}"
        @contextmenu="${this._preventContextMenu}"
      >
        <slot>${this.value}</slot>
      </button>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", 0);
    }
  }
  _onEvent(e) {
    e.preventDefault();
    if (this.disabled) {
      return;
    }
    const eventName = e.type === "touchend" || e.type === "mouseup" ? "release" : "press";
    if (eventName === "release") {
      this.shadowRoot.querySelector("button").classList.remove("active");
    } else {
      this.shadowRoot.querySelector("button").classList.add("active");
    }
    this._dispatchEvent(eventName);
  }
  _dispatchEvent(eventName) {
    if (eventName === "release" && this._pressed === false) {
      return;
    }
    this._pressed = eventName === "press";
    const event = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    });
    this.dispatchEvent(event);
    if (eventName === "press") {
      const inputEvent = new CustomEvent("input", {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      });
      this.dispatchEvent(inputEvent);
    }
  }
};
__publicField(ScButton, "properties", {
  value: {
    type: String,
    reflect: true
  },
  midiValue: {
    type: Number
  },
  selected: {
    type: Boolean,
    reflect: true
  },
  disabled: {
    type: Boolean,
    reflect: true
  }
});
__publicField(ScButton, "styles", css`
    :host {
      vertical-align: top;
      display: inline-block;
      box-sizing: border-box;
      overflow: hidden;
      width: 200px;
      height: 30px;
      font-size: var(--sc-font-size);
      color: #ffffff;
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    button {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      font-family: var(--sc-font-family);
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);
      border-radius:  1px;
      font-size: inherit;
      cursor: pointer;
      color: inherit;
    }

    /* remove default button focus */
    button:focus, button:focus-visible {
      outline: none;
    }

    button:hover {
      background-color: var(--sc-color-primary-3);
    }

    :host([disabled]) button:hover {
      background-color: var(--sc-color-primary-2);
      cursor: default;
    }

    /* use class because :active does not work in Firefox because of e.preventDefault(); */
    button.active {
      background-color: var(--sc-color-primary-4);
    }

    button.selected {
      background-color: var(--sc-color-secondary-3);
      border: 1px solid var(--sc-color-secondary-3);
    }

    :host([disabled]) button.selected:hover {
      background-color: var(--sc-color-secondary-3);
      cursor: default;
    }
  `);
if (customElements.get("sc-button") === void 0) {
  customElements.define("sc-button", ScButton);
}

// ../../ircam-ismm/sc-components/sc-clock.js
function padLeft(value, char, length) {
  value = value + "";
  while (value.length < length) {
    value = char + value;
  }
  return value;
}
var ScClock = class extends ScElement_default {
  get format() {
    return this._format;
  }
  set format(value) {
    this._showHours = /hh/.test(value) ? true : false;
    this._showMinutes = /mm/.test(value) ? true : false;
    this._showSeconds = /ss/.test(value) ? true : false;
    this._showMilliseconds = /ms/.test(value) ? true : false;
    this._format = value;
  }
  constructor() {
    super();
    this._currentTime = { hours: null, minutes: null, seconds: null, millesconds: null };
    this._format = null;
    this._showHours = false;
    this._showMinutes = false;
    this._showSeconds = false;
    this._showMilliseconds = false;
    const offset = (/* @__PURE__ */ new Date()).getTimezoneOffset();
    const offsetInSec = offset * 60;
    this.getTimeFunction = () => Date.now() / 1e3 - offsetInSec;
    this.twinkle = true;
    this.format = "hh:mm:ss:ms";
  }
  render() {
    const { time, twinkle, sign, hours, minutes, seconds, milliseconds } = this._currentTime;
    const idle = time === 0 ? true : false;
    let inner = [];
    if (this._showHours) {
      inner.push(html`<span>${hours}</span>`);
    }
    if (this._showMinutes) {
      inner.push(html`<span>${minutes}</span>`);
    }
    if (this._showSeconds) {
      inner.push(html`<span>${seconds}</span>`);
    }
    if (this._showMilliseconds) {
      inner.push(html`<span>${milliseconds}</span>`);
    }
    inner = inner.flatMap(
      (el) => [el, html`<span class="${twinkle ? "hidden" : ""}">:</span>`]
    ).slice(0, -1);
    return html`
      <div class="${idle ? "idle" : ""}">
        ${sign ? html`<span>${sign}</span>` : nothing}
        ${inner}
      </div>
    `;
  }
  _getFormattedInfos() {
    const time = this.getTimeFunction();
    let sign;
    let timeInSeconds;
    if (time >= 0) {
      sign = "";
      timeInSeconds = Math.abs(Math.floor(time));
    } else {
      sign = "-";
      timeInSeconds = Math.abs(Math.ceil(time));
    }
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;
    const secondsFrac = Math.abs(time) - timeInSeconds;
    const milliseconds = Math.floor(secondsFrac * 1e3);
    return {
      time,
      sign,
      hours: padLeft(hours % 24, "0", 2),
      minutes: padLeft(minutes, "0", 2),
      seconds: padLeft(seconds, "0", 2),
      milliseconds: padLeft(milliseconds, "0", 3)
    };
  }
  _render() {
    const now = this._getFormattedInfos();
    let requestUpdate = false;
    if (this._currentTime.sign !== now.sign) {
      requestUpdate = true;
    }
    if (this._showHours && this._currentTime.hours !== now.hours) {
      requestUpdate = true;
    }
    if (this._showMinutes && this._currentTime.minutes !== now.minutes) {
      requestUpdate = true;
    }
    if (this._showSeconds && this._currentTime.seconds !== now.seconds) {
      requestUpdate = true;
    }
    if (this._showMilliseconds && this._currentTime.milliseconds !== now.milliseconds) {
      requestUpdate = true;
    }
    now.twinkle = false;
    const millis = parseInt(now.milliseconds) / 1e3;
    if (this.twinkle && millis >= 0.5 && millis < 1) {
      now.twinkle = true;
    }
    if (this._currentTime.twinkle !== now.twinkle) {
      requestUpdate = true;
    }
    if (requestUpdate) {
      this._currentTime = now;
      this.requestUpdate();
    }
    this._rafId = requestAnimationFrame(() => this._render());
  }
  connectedCallback() {
    super.connectedCallback();
    this._render();
  }
  disconnectedCallback() {
    cancelAnimationFrame(this._timeoutInterval);
    super.disconnectedCallback();
  }
};
__publicField(ScClock, "properties", {
  // function that return a time in seconds
  getTimeFunction: {
    type: Function,
    attribute: false
  },
  twinkle: {
    type: Boolean,
    reflect: true
  },
  format: {
    type: String,
    reflect: true
  }
});
__publicField(ScClock, "styles", css`
    :host {
      vertical-align: top;
      display: inline-block;
      box-sizing: border-box;
      width: 200px;
      height: 30px;
      vertical-align: top;
      border-radius: 2px;
      font-size: var(--sc-font-size);
      font-family: var(--sc-font-family);
      background-color: var(--sc-color-primary-4);
      color: white;
      text-align: center;
    }

    div {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
    }

    .idle {
      opacity: 0.3;
    }

    .hidden {
      visibility: hidden;
    }
  `);
if (customElements.get("sc-clock") === void 0) {
  customElements.define("sc-clock", ScClock);
}

// ../../ircam-ismm/sc-components/sc-code-example.js
var ScCodeExample = class extends ScElement_default {
  constructor() {
    super();
    this.language = "javascript";
  }
  render() {
    let content = ``;
    try {
      content = es_default.highlight(this.textContent.trim(), { language: this.language }).value;
    } catch (err) {
      content = err.message;
    }
    return html`
      <pre><code class="hljs ${this.language ? `language-${this.language}` : ""}">${unsafeHTML(content)}</pre></code>
    `;
  }
};
__publicField(ScCodeExample, "properties", {
  language: {
    type: String,
    reflect: true
  }
});
__publicField(ScCodeExample, "styles", css`
    :host {
      vertical-align: top;
      display: block;
      box-sizing: border-box;
      vertical-align: top;
      font-size: 0;
      font-size: var(--sc-font-size);
      font-family: var(--sc-font-family);
      border-radius: 2px;
      background-color: #23241f;
    }

    pre, code {
      border-radius: inherit;
    }

    /* highlight.js monokai theme */
    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#23241f;color:#f8f8f2}.hljs-subst,.hljs-tag{color:#f8f8f2}.hljs-emphasis,.hljs-strong{color:#a8a8a2}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:#ae81ff}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:#a6e22e}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:#f92672}.hljs-attribute,.hljs-symbol{color:#66d9ef}.hljs-class .hljs-title,.hljs-params,.hljs-title.class_{color:#f8f8f2}.hljs-addition,.hljs-built_in,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:#e6db74}.hljs-comment,.hljs-deletion,.hljs-meta{color:#75715e}
  `);
if (customElements.get("sc-code-example") === void 0) {
  customElements.define("sc-code-example", ScCodeExample);
}

// ../../ircam-ismm/sc-components/utils/getScale.js
function getScale(domain, range2) {
  const slope = (range2[1] - range2[0]) / (domain[1] - domain[0]);
  const intercept = range2[0] - slope * domain[0];
  function scale(val) {
    return slope * val + intercept;
  }
  scale.invert = function(val) {
    return (val - intercept) / slope;
  };
  return scale;
}

// ../../ircam-ismm/sc-components/sc-dial.js
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}
function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(" ");
  return d;
}
var ScDial = class extends ScElement_default {
  get min() {
    return this._min;
  }
  set min(value) {
    if (value === this.max) {
      value -= 1e-10;
    }
    this._min = value;
    this.value = this.value;
    this._updateScales();
    this.requestUpdate();
  }
  get max() {
    return this._max;
  }
  set max(value) {
    if (value === this.min) {
      value += 1e-10;
    }
    this._max = value;
    this.value = this.value;
    this._updateScales();
    this.requestUpdate();
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = Math.max(this.min, Math.min(this.max, value));
    this.requestUpdate();
  }
  constructor() {
    super();
    this._min = 0;
    this._max = 0;
    this._value = 0;
    this._minAngle = -140;
    this._maxAngle = 140;
    this.max = 1;
    this.min = 0;
    this.value = 0;
    this.showValue = true;
    this.disabled = false;
  }
  render() {
    const radius = 32;
    const cx = 50;
    const cy = this.showValue ? 42 : 50;
    const angle = this._valueToAngleScale(this.value);
    const position = polarToCartesian(cx, cy, radius + 2, angle);
    return html`
      <div
        @contextmenu=${this._preventContextMenu}
        @dblclick=${this._resetValue}
        @keydown=${this._onKeypress}
        @keyup=${this._onKeyup}
      >
        <svg viewbox="0 0 100 100">
          <path
            class="bg"
            d="${describeArc(cx, cy, radius, Math.min(this._maxAngle, angle + 8), this._maxAngle)}"
          />
          <path
            class="fg"
            d="${describeArc(cx, cy, radius, this._minAngle, angle)}"
          />
          <line x1=${cx} y1=${cy} x2=${position.x} y2=${position.y} />
        </svg>
        ${this.showValue ? html`<p>${this.value.toFixed(2)}${this.unit ? ` ${this.unit}` : nothing}</p>` : nothing}

        <sc-speed-surface @input=${this._updateValue}></sc-speed-surface>
      </div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", 0);
    }
  }
  _updateScales() {
    this._valueToAngleScale = getScale([this.min, this.max], [this._minAngle, this._maxAngle]);
    this._pixelToDiffScale = getScale([0, 15], [0, this.max - this.min]);
  }
  _onKeypress(e) {
    console.log(e.key.code);
  }
  _onKeyup(e) {
    console.log(e.key.code);
  }
  _resetValue(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.value = this.min;
    ["input", "change"].forEach((eventName) => {
      const event = new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      });
      this.dispatchEvent(event);
    });
  }
  _updateValue(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled) {
      return;
    }
    if (e.detail.pointerId !== null) {
      if (Math.abs(e.detail.dy) < 0.02) {
        return;
      }
      const lastValue = this._value;
      const sign = e.detail.dy < 0 ? -1 : 1;
      const diff = this._pixelToDiffScale(e.detail.dy);
      this.value += diff;
      const event = new CustomEvent("input", {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      });
      this.dispatchEvent(event);
    } else {
      const event = new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      });
      this.dispatchEvent(event);
    }
  }
};
__publicField(ScDial, "properties", {
  min: {
    type: Number,
    reflect: true
  },
  max: {
    type: Number,
    reflect: true
  },
  value: {
    type: Number
  },
  unit: {
    type: String,
    reflect: true
  },
  showValue: {
    type: Boolean,
    reflect: true,
    attribute: "show-value"
  },
  disabled: {
    type: Boolean,
    reflect: true
  }
});
__publicField(ScDial, "styles", css`
    :host {
      display: inline-block;
      width: 50px;
      height: 50px;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-2);
      font-size: 0;
      line-height: 0;
      position: relative;

      --sc-dial-color: var(--sc-color-secondary-1);
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    path.bg {
      stroke: #fff;
      stroke-width: 3px;
      fill: transparent;
    }

    path.fg {
      stroke: var(--sc-dial-color);
      stroke-width: 4px;
      fill: transparent;
    }

    line {
      stroke-width: 3px;
      stroke: var(--sc-dial-color);
      stroke-linecap: butt;
    }

    sc-speed-surface {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    p {
      position: absolute;
      bottom: 2px;
      left: 0;
      width: 100%;
      height: 12px;
      line-height: 12px;
      color: var(--sc-color-primary-5);
      font-size: 8px;
      margin: 0;
      text-align: center;
      user-select: none
    }
  `);
if (customElements.get("sc-dial") === void 0) {
  customElements.define("sc-dial", ScDial);
}

// ../../ircam-ismm/sc-components/sc-dots.js
var ScDots = class extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        box-sizing: border-box;
        position: relative;
        line-height: 0;
        vertical-align: top;
        width: 300px;
        height: 300px;

        --sc-dots-opacity: 1;
        --sc-dots-color: var(--sc-color-secondary-2);
        --sc-dots-background-color: var(--sc-color-primary-1);
        --sc-dots-background-image: none;
      }

      :host(.debug) {
        outline: 1px solid yellow;
      }

      :host(.debug) sc-position-surface {
        outline: 1px dashed blue;
      }

      :host(.debug) svg {
        outline: 1px dotted red;
      }

      sc-position-surface {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }

      svg {
        position: relative;
        background-color: var(--sc-dots-background-color);
        background-image: var(--sc-dots-background-image);
        background-size: contain;
        background-position: 50% 50%;
        background-repeat: no-repeat;
      }

      circle {
        pointer-event: none;
        fill-opacity: var(--sc-dots-opacity);
        fill: var(--sc-dots-color);
      }
    `;
  }
  constructor() {
    super();
    this.value = [];
    this.xRange = [0, 1];
    this.yRange = [0, 1];
    this.radius = null;
    this.radiusRelative = null;
    this.captureEvents = false;
    this.persistEvents = false;
    this._defaultRadius = 5;
    this._resizeObserver = null;
    this._x2px = null;
    this._y2px = null;
    this._radius2px = null;
    this._width = null;
    this._height = null;
    this._svgWidth = null;
    this._svgHeight = null;
  }
  update(changedProperties) {
    if (changedProperties.has("xRange") || changedProperties.has("yRange")) {
      this._updateScales();
    }
    super.update(changedProperties);
  }
  render() {
    let radius = this._defaultRadius;
    if (this.radius) {
      radius = this.radius;
    } else if (this.radiusRelative) {
      radius = this._radius2px(this.radiusRelative);
    }
    return html`
      ${this.captureEvents ? html`
          <sc-position-surface
            style="
              width: ${this._svgWidth}px;
              height: ${this._svgHeight}px;
              left: ${(this._width - this._svgWidth) / 2}px;
              top: ${(this._height - this._svgHeight) / 2}px;
            "
            x-range="${JSON.stringify(this.xRange)}"
            y-range="${JSON.stringify(this.yRange)}"
            @input="${this._updatePositions}"
          ></sc-position-surface>
        ` : ""}
      <svg
        style="
          width: ${this._svgWidth}px;
          height: ${this._svgHeight}px;
          left: ${(this._width - this._svgWidth) / 2}px;
          top: ${(this._height - this._svgHeight) / 2}px;
        "
        viewBox="0 0 ${this._svgWidth} ${this._svgHeight}"
      >
        ${repeat(this.value, (d) => `${d.x}-${d.y}`, (d) => {
      return svg`<circle
            r="${radius}"
            cx="${this._x2px(d.x)}"
            cy="${this._y2px(d.y)}"
            style="${d.color ? `fill: ${d.color}` : ""}"
          ></circle>`;
    })}
      </svg>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => this._updateScales());
    this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    this._resizeObserver.disconnect();
    super.disconnectedCallback();
  }
  _updateScales() {
    const { width, height } = this.getBoundingClientRect();
    const xDelta = Math.abs(this.xRange[1] - this.xRange[0]);
    const yDelta = Math.abs(this.yRange[1] - this.yRange[0]);
    const deltaRatio = xDelta / yDelta;
    const pxRatio = width / height;
    let limitingSize;
    let limitingDelta;
    if (deltaRatio > pxRatio) {
      limitingSize = width;
      limitingDelta = xDelta;
    } else {
      limitingSize = height;
      limitingDelta = yDelta;
    }
    this._svgWidth = limitingSize / limitingDelta * xDelta;
    this._svgHeight = limitingSize / limitingDelta * yDelta;
    this._width = width;
    this._height = height;
    {
      const a = this._svgWidth / (this.xRange[1] - this.xRange[0]);
      const b = -(this.xRange[0] * a);
      this._x2px = (x) => a * x + b;
    }
    {
      const a = this._svgHeight / (this.yRange[1] - this.yRange[0]);
      const b = -(this.yRange[0] * a);
      this._y2px = (y) => a * y + b;
    }
    {
      const a = Math.abs(this._svgHeight / (this.yRange[1] - this.yRange[0]));
      this._radius2px = (r) => a * r;
    }
    this.requestUpdate();
  }
  _updatePositions(e) {
    e.stopPropagation();
    if (this.persistEvents && e.detail.value.length === 0) {
      return;
    }
    const value = e.detail.value.map((pointer) => {
      const minX = Math.min(this.xRange[0], this.xRange[1]);
      const maxX = Math.max(this.xRange[0], this.xRange[1]);
      const minY = Math.min(this.yRange[0], this.yRange[1]);
      const maxY = Math.max(this.yRange[0], this.yRange[1]);
      const x = Math.min(maxX, Math.max(minX, pointer.x));
      const y = Math.min(maxY, Math.max(minY, pointer.y));
      return { x, y };
    });
    this.value = value;
    const event = new CustomEvent("input", {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    });
    this.dispatchEvent(event);
    this.requestUpdate();
  }
};
__publicField(ScDots, "properties", {
  value: {
    type: Array,
    attribute: false,
    hasChanged(newVal, oldVal) {
      return true;
    }
  },
  xRange: {
    type: Array,
    attribute: "x-range"
  },
  yRange: {
    type: Array,
    attribute: "y-range"
  },
  radius: {
    // in pixels, takes precedence over radiusRel)
    type: Number,
    attribute: "radius",
    reflect: true
  },
  radiusRelative: {
    // according to ranges
    type: Number,
    attribute: "radius-relative",
    reflect: true
  },
  // as an input interface
  captureEvents: {
    type: Boolean,
    attribute: "capture-events"
  },
  persistEvents: {
    type: Boolean,
    attribute: "persist-events"
  }
});
if (customElements.get("sc-dots") === void 0) {
  customElements.define("sc-dots", ScDots);
}

// ../../ircam-ismm/sc-components/utils/icons.js
var icons = {};
icons.question = html`
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
  <g>
    <path fill="white" d="M500,9.9c270.1,0,490.5,220.6,490,490.3c-0.5,270.7-220.6,490.6-490.3,489.9C229.2,989.4,10.4,770.5,10,500.1C9.6,230.3,229.9,9.9,500,9.9z M943.7,499.9c0-244.4-198-443-443.5-443.5C255.5,55.9,56.6,254.5,56.3,499.9c-0.3,244.4,198.3,442.9,443.4,443.6C743.8,944.2,943.8,744.5,943.7,499.9z M527.3,658.3c-20.9,0-41.3,0-62.2,0c0-12.4-0.7-24.6,0.1-36.7c1.6-24.4,7.3-47.9,20-69.2c9.9-16.6,22.6-30.9,36.7-44c17.5-16.3,35.1-32.4,52.3-49.1c10.1-9.8,19-20.8,23.7-34.4c11.2-32.7,4-61.8-17.7-87.8c-36.1-43.1-96.4-44.6-133.4-23c-23.3,13.6-37.3,34.4-45.4,59.5c-3.7,11.2-6.2,22.8-9.5,35.1c-21.5-2.5-43.5-5.2-66.3-7.9c0.9-5.7,1.5-11,2.5-16.3c5.7-29.6,15.9-57.2,35.3-80.8c23.5-28.8,54.2-45.6,90.3-52.5c37.7-7.2,75.3-6.5,112,5.5c46.9,15.2,81.6,45,97.4,92.4c15.1,45.5,7.7,88.5-22.1,127c-18.9,24.4-42.4,44.2-64.5,65.4c-9.7,9.3-19.6,18.7-28,29.2c-12.5,15.5-17.3,34.3-18.8,53.9C528.6,635.5,528.1,646.6,527.3,658.3z M461,790c0-24.6,0-48.9,0-73.7c24.6,0,49,0,73.7,0c0,24.5,0,48.9,0,73.7C510.3,790,485.8,790,461,790z" />
  </g>
</svg>`;
icons.info = html`
<svg viewbox="0 0 23.7 23.7" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"
>
  <path fill="#fff" d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.5 17h-1v-9h1v9zm-.5-12c.466 0 .845.378.845.845 0 .466-.379.844-.845.844-.466 0-.845-.378-.845-.844 0-.467.379-.845.845-.845z"/>
</svg>
`;
icons.github = html`
<svg viewbox="0 0 98 98" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#fff"/>
</svg>
`;
icons.burger = html`
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g>
<path d="M3 6H21M3 12H21M3 18H21" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
`;
icons.gear = html`
<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"  xml:space="preserve">
  <style type="text/css">
    .st0{fill:#ffffff;}
  </style>
  <g>
    <path class="st0" d="M499.139,318.571l-37.178-5.407c-2.329-0.178-4.336-1.642-5.228-3.8l-12.054-29.086
      c-0.901-2.15-0.526-4.613,1-6.379l22.243-29.88c3.533-4.141,3.301-10.314-0.554-14.168l-17.602-17.594
      c-3.846-3.854-10.029-4.104-14.159-0.553l-29.889,22.233c-1.758,1.518-4.238,1.91-6.38,1.018l-29.094-12.062
      c-2.151-0.883-3.622-2.926-3.81-5.228l-5.389-37.169c-0.428-5.442-4.96-9.635-10.402-9.635h-24.893
      c-5.45,0-9.983,4.193-10.402,9.635l-5.407,37.169c-0.17,2.32-1.642,4.345-3.792,5.228l-29.103,12.062
      c-2.151,0.892-4.613,0.5-6.388-1.018l-29.872-22.233c-4.13-3.542-10.304-3.302-14.167,0.553l-17.594,17.594
      c-3.854,3.854-4.086,10.028-0.554,14.168l22.234,29.888c1.508,1.758,1.91,4.229,1.009,6.371l-12.054,29.086
      c-0.874,2.159-2.908,3.622-5.219,3.81l-37.195,5.398c-5.425,0.429-9.618,4.961-9.618,10.412v24.883
      c0,5.442,4.194,9.993,9.618,10.403l37.195,5.398c2.311,0.188,4.345,1.659,5.219,3.81l12.054,29.086
      c0.901,2.159,0.5,4.63-1.009,6.388l-22.234,29.889c-3.533,4.14-3.301,10.295,0.554,14.168l17.594,17.594
      c3.863,3.854,10.037,4.086,14.167,0.544l29.872-22.243c1.775-1.498,4.237-1.9,6.388-0.998l29.103,12.044
      c2.151,0.902,3.622,2.918,3.802,5.246l5.398,37.169c0.428,5.433,4.952,9.636,10.402,9.636h24.893c5.451,0,9.974-4.203,10.402-9.636
      l5.389-37.169c0.188-2.328,1.659-4.344,3.81-5.246l29.103-12.044c2.142-0.902,4.622-0.5,6.379,0.998l29.881,22.243
      c4.13,3.542,10.314,3.31,14.159-0.544l17.602-17.594c3.864-3.873,4.087-10.028,0.554-14.168l-22.243-29.889
      c-1.499-1.758-1.9-4.229-1-6.388l12.054-29.086c0.892-2.151,2.899-3.622,5.228-3.81l37.178-5.398
      c5.434-0.41,9.627-4.961,9.627-10.403v-24.883C508.766,323.532,504.573,319,499.139,318.571z M379.093,382.328
      c-10.93,10.912-25.445,16.926-40.898,16.926c-15.444,0-29.978-6.014-40.898-16.926c-10.92-10.938-16.943-25.454-16.943-40.907
      c0-15.444,6.022-29.969,16.943-40.89c10.92-10.939,25.454-16.934,40.898-16.934c15.454,0,29.969,5.995,40.898,16.934
      c10.92,10.92,16.934,25.446,16.934,40.89C396.027,356.874,390.014,371.39,379.093,382.328z"/>
    <path class="st0" d="M187.351,252.156c4.032-1.445,6.254-5.746,5.122-9.868l-5.898-28.854c-0.472-1.767,0.072-3.649,1.419-4.88
      l18.263-16.621c1.338-1.222,3.284-1.588,4.97-0.946l27.961,8.466c3.989,1.508,8.485-0.294,10.306-4.166l8.297-17.656
      c1.837-3.881,0.366-8.485-3.346-10.591l-24.339-16.14c-1.58-0.91-2.535-2.632-2.436-4.452l1.16-24.66
      c0.098-1.829,1.186-3.444,2.838-4.194l26.008-13.874c3.898-1.74,5.781-6.218,4.336-10.215l-6.603-18.371
      c-1.454-4.024-5.755-6.254-9.876-5.121l-28.863,5.879c-1.767,0.5-3.632-0.053-4.871-1.41L195.185,56.23
      c-1.24-1.357-1.614-3.265-0.955-4.978l8.468-27.944c1.507-4.006-0.294-8.494-4.175-10.306l-17.648-8.306
      c-3.872-1.821-8.494-0.366-10.608,3.354l-16.131,24.34c-0.902,1.58-2.623,2.533-4.444,2.445l-24.66-1.169
      c-1.82-0.08-3.462-1.205-4.202-2.847L106.974,4.821c-1.758-3.898-6.219-5.782-10.234-4.336L78.379,7.096
      c-4.024,1.446-6.254,5.738-5.112,9.859l5.888,28.872c0.482,1.748-0.062,3.64-1.418,4.862l-18.264,16.63
      c-1.356,1.222-3.274,1.597-4.987,0.955l-27.944-8.476c-3.988-1.516-8.476,0.304-10.305,4.175L7.939,81.622
      c-1.82,3.872-0.366,8.494,3.346,10.599l24.339,16.14c1.588,0.902,2.534,2.615,2.436,4.435l-1.16,24.66
      c-0.071,1.838-1.187,3.444-2.837,4.193L8.055,155.522c-3.9,1.749-5.782,6.219-4.336,10.216l6.611,18.37
      c1.445,4.024,5.746,6.254,9.859,5.131l28.881-5.906c1.749-0.482,3.64,0.071,4.862,1.427l16.612,18.255
      c1.24,1.356,1.598,3.283,0.954,4.987l-8.466,27.944c-1.499,3.997,0.304,8.485,4.175,10.305l17.648,8.297
      c3.881,1.829,8.493,0.357,10.608-3.346l16.122-24.348c0.91-1.57,2.623-2.534,4.452-2.428l24.661,1.16
      c1.829,0.09,3.453,1.178,4.211,2.846l13.847,25.989c1.767,3.9,6.219,5.8,10.233,4.354L187.351,252.156z M148.229,172.296
      c-11.394,4.095-23.714,3.524-34.68-1.633c-10.965-5.157-19.245-14.275-23.358-25.678c-4.095-11.402-3.524-23.714,1.634-34.67
      c5.156-10.974,14.283-19.254,25.677-23.357c11.402-4.105,23.714-3.534,34.67,1.641c10.956,5.139,19.254,14.258,23.366,25.66
      c4.096,11.403,3.516,23.706-1.632,34.672C168.731,159.886,159.621,168.183,148.229,172.296z"/>
  </g>
</svg>
`;
icons.save = html`
<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd" d="M35.2822 4.88487C34.7186 4.31826 33.9535 4 33.1551 4H6.99915C5.34286 4 3.99915 5.34372 3.99915 7V41C3.99915 42.6563 5.34286 44 6.99915 44H40.9991C42.6569 44 43.9991 42.6568 43.9991 41V14.888C43.9991 14.095 43.6861 13.3357 43.1261 12.7728L35.2822 4.88487ZM6.99915 6H12.9999V15.9508C12.9999 17.0831 13.9197 18.0028 15.0519 18.0028H32.9479C34.0802 18.0028 34.9999 17.0831 34.9999 15.9508V11.2048C34.9999 10.6525 34.5522 10.2048 33.9999 10.2048C33.4477 10.2048 32.9999 10.6525 32.9999 11.2048V15.9508C32.9999 15.9785 32.9757 16.0028 32.9479 16.0028H15.0519C15.0242 16.0028 14.9999 15.9785 14.9999 15.9508V6H33.1551C33.4211 6 33.6759 6.10599 33.8642 6.29523L41.7081 14.1831C41.8952 14.3712 41.9991 14.6234 41.9991 14.888V41C41.9991 41.5526 41.552 42 40.9991 42H6.99915C6.44743 42 5.99915 41.5517 5.99915 41V7C5.99915 6.44828 6.44743 6 6.99915 6ZM27.9999 30.0206C27.9999 27.8121 26.2089 26.0206 23.9999 26.0206C23.4477 26.0206 22.9999 25.5729 22.9999 25.0206C22.9999 24.4683 23.4477 24.0206 23.9999 24.0206C27.3136 24.0206 29.9999 26.7077 29.9999 30.0206C29.9999 33.3349 27.3142 36.0206 23.9999 36.0206C20.6857 36.0206 17.9999 33.3349 17.9999 30.0206C17.9999 29.4683 18.4477 29.0206 18.9999 29.0206C19.5522 29.0206 19.9999 29.4683 19.9999 30.0206C19.9999 32.2303 21.7902 34.0206 23.9999 34.0206C26.2097 34.0206 27.9999 32.2303 27.9999 30.0206Z" fill="#ffffff"/>
</svg>
`;
var icons_default = icons;

// ../../ircam-ismm/sc-components/sc-icon.js
var ScIcon = class extends ScElement_default {
  constructor() {
    super();
    this.icon = "question";
    this.value = null;
    this.href = null;
    this.disabled = false;
    this._pressed = false;
    this._onEvent = this._onEvent.bind(this);
  }
  render() {
    let include;
    if (this.href !== null && this.href !== "" && !this.disabled) {
      include = html`
        <a href="${this.href}" target="_blank">
          ${icons_default[this.icon]}
        </a>
      `;
    } else {
      include = icons_default[this.icon];
    }
    return html`
      <div
        @mousedown="${this._onEvent}"
        @mouseup="${this._onEvent}"
        @touchstart="${{
      handleEvent: this._onEvent,
      passive: false
    }}"
        @touchend="${this._onEvent}"
        @contextmenu="${this._preventContextMenu}"
      >
        ${include}
      </div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", 0);
    }
  }
  _onEvent(e) {
    e.preventDefault();
    if (this.disabled) {
      return;
    }
    const eventName = e.type === "touchend" || e.type === "mouseup" ? "release" : "press";
    if (eventName === "release" && this._pressed === false) {
      return;
    }
    this._pressed = eventName === "press";
    const event = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    });
    this.dispatchEvent(event);
    if (eventName === "press") {
      const inputEvent = new CustomEvent("input", {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      });
      this.dispatchEvent(inputEvent);
    }
  }
};
__publicField(ScIcon, "properties", {
  icon: {
    type: String,
    reflect: true
  },
  href: {
    type: String,
    reflect: true
  },
  value: {
    type: String,
    reflect: true
  },
  disabled: {
    type: Boolean,
    reflect: true
  }
});
__publicField(ScIcon, "styles", css`
    :host {
      vertical-align: top;
      display: inline-block;
      box-sizing: border-box;
      overflow: hidden;
      width: 30px;
      height: 30px;
      border: 1px solid var(--sc-color-primary-3);
      background-color: var(--sc-color-primary-2);
      cursor: pointer;
    }

    :host([disabled]) {
      opacity: 0.7;
      cursor: default;
    }

    :host([hidden]) {
      display: none;
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }


    div {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    div:active {
      opacity: 0.7;
    }

    :host([disabled]) div:active {
      opacity: 1;
    }

    a {
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 100%;
    }

    svg {
      box-sizing: border-box;
      padding: 3px;
      width: 100%;
      height: 100%;
    }
  `);
if (customElements.get("sc-icon") === void 0) {
  customElements.define("sc-icon", ScIcon);
}

// ../../ircam-ismm/sc-components/sc-editor.js
var import_codemirror = __toESM(require_codemirror(), 1);
var import_javascript = __toESM(require_javascript(), 1);
var import_sublime = __toESM(require_sublime(), 1);
var import_search = __toESM(require_search(), 1);
var import_searchcursor = __toESM(require_searchcursor(), 1);
var import_jump_to_line = __toESM(require_jump_to_line(), 1);
var import_dialog = __toESM(require_dialog(), 1);
var import_comment = __toESM(require_comment(), 1);

// ../../ircam-ismm/sc-components/vendors/codemirror-css.js
var codemirror_css_default = css`
/* BASICS */

.CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family: monospace;
  height: 300px;
  color: black;
  direction: ltr;
}

/* PADDING */

.CodeMirror-lines {
  padding: 4px 0; /* Vertical padding around content */
}
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  padding: 0 4px; /* Horizontal padding of content */
}

.CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
  background-color: white; /* The little square between H and V scrollbars */
}

/* GUTTER */

.CodeMirror-gutters {
  border-right: 1px solid #ddd;
  background-color: #f7f7f7;
  white-space: nowrap;
}
.CodeMirror-linenumbers {}
.CodeMirror-linenumber {
  padding: 0 3px 0 5px;
  min-width: 20px;
  text-align: right;
  color: #999;
  white-space: nowrap;
}

.CodeMirror-guttermarker { color: black; }
.CodeMirror-guttermarker-subtle { color: #999; }

/* CURSOR */

.CodeMirror-cursor {
  border-left: 1px solid black;
  border-right: none;
  width: 0;
}
/* Shown when moving in bi-directional text */
.CodeMirror div.CodeMirror-secondarycursor {
  border-left: 1px solid silver;
}
.cm-fat-cursor .CodeMirror-cursor {
  width: auto;
  border: 0 !important;
  background: #7e7;
}
.cm-fat-cursor div.CodeMirror-cursors {
  z-index: 1;
}
.cm-fat-cursor .CodeMirror-line::selection,
.cm-fat-cursor .CodeMirror-line > span::selection, 
.cm-fat-cursor .CodeMirror-line > span > span::selection { background: transparent; }
.cm-fat-cursor .CodeMirror-line::-moz-selection,
.cm-fat-cursor .CodeMirror-line > span::-moz-selection,
.cm-fat-cursor .CodeMirror-line > span > span::-moz-selection { background: transparent; }
.cm-fat-cursor { caret-color: transparent; }
@-moz-keyframes blink {
  0% {}
  50% { background-color: transparent; }
  100% {}
}
@-webkit-keyframes blink {
  0% {}
  50% { background-color: transparent; }
  100% {}
}
@keyframes blink {
  0% {}
  50% { background-color: transparent; }
  100% {}
}

/* Can style cursor different in overwrite (non-insert) mode */
.CodeMirror-overwrite .CodeMirror-cursor {}

.cm-tab { display: inline-block; text-decoration: inherit; }

.CodeMirror-rulers {
  position: absolute;
  left: 0; right: 0; top: -50px; bottom: 0;
  overflow: hidden;
}
.CodeMirror-ruler {
  border-left: 1px solid #ccc;
  top: 0; bottom: 0;
  position: absolute;
}

/* DEFAULT THEME */

.cm-s-default .cm-header {color: blue;}
.cm-s-default .cm-quote {color: #090;}
.cm-negative {color: #d44;}
.cm-positive {color: #292;}
.cm-header, .cm-strong {font-weight: bold;}
.cm-em {font-style: italic;}
.cm-link {text-decoration: underline;}
.cm-strikethrough {text-decoration: line-through;}

.cm-s-default .cm-keyword {color: #708;}
.cm-s-default .cm-atom {color: #219;}
.cm-s-default .cm-number {color: #164;}
.cm-s-default .cm-def {color: #00f;}
.cm-s-default .cm-variable,
.cm-s-default .cm-punctuation,
.cm-s-default .cm-property,
.cm-s-default .cm-operator {}
.cm-s-default .cm-variable-2 {color: #05a;}
.cm-s-default .cm-variable-3, .cm-s-default .cm-type {color: #085;}
.cm-s-default .cm-comment {color: #a50;}
.cm-s-default .cm-string {color: #a11;}
.cm-s-default .cm-string-2 {color: #f50;}
.cm-s-default .cm-meta {color: #555;}
.cm-s-default .cm-qualifier {color: #555;}
.cm-s-default .cm-builtin {color: #30a;}
.cm-s-default .cm-bracket {color: #997;}
.cm-s-default .cm-tag {color: #170;}
.cm-s-default .cm-attribute {color: #00c;}
.cm-s-default .cm-hr {color: #999;}
.cm-s-default .cm-link {color: #00c;}

.cm-s-default .cm-error {color: #f00;}
.cm-invalidchar {color: #f00;}

.CodeMirror-composing { border-bottom: 2px solid; }

/* Default styles for common addons */

div.CodeMirror span.CodeMirror-matchingbracket {color: #0b0;}
div.CodeMirror span.CodeMirror-nonmatchingbracket {color: #a22;}
.CodeMirror-matchingtag { background: rgba(255, 150, 0, .3); }
.CodeMirror-activeline-background {background: #e8f2ff;}

/* STOP */

/* The rest of this file contains styles related to the mechanics of
   the editor. You probably shouldn't touch them. */

.CodeMirror {
  position: relative;
  overflow: hidden;
  background: white;
}

.CodeMirror-scroll {
  overflow: scroll !important; /* Things will break if this is overridden */
  /* 50px is the magic margin used to hide the element's real scrollbars */
  /* See overflow: hidden in .CodeMirror */
  margin-bottom: -50px; margin-right: -50px;
  padding-bottom: 50px;
  height: 100%;
  outline: none; /* Prevent dragging from highlighting the element */
  position: relative;
  z-index: 0;
}
.CodeMirror-sizer {
  position: relative;
  border-right: 50px solid transparent;
}

/* The fake, visible scrollbars. Used to force redraw during scrolling
   before actual scrolling happens, thus preventing shaking and
   flickering artifacts. */
.CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
  position: absolute;
  z-index: 6;
  display: none;
  outline: none;
}
.CodeMirror-vscrollbar {
  right: 0; top: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.CodeMirror-hscrollbar {
  bottom: 0; left: 0;
  overflow-y: hidden;
  overflow-x: scroll;
}
.CodeMirror-scrollbar-filler {
  right: 0; bottom: 0;
}
.CodeMirror-gutter-filler {
  left: 0; bottom: 0;
}

.CodeMirror-gutters {
  position: absolute; left: 0; top: 0;
  min-height: 100%;
  z-index: 3;
}
.CodeMirror-gutter {
  white-space: normal;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  margin-bottom: -50px;
}
.CodeMirror-gutter-wrapper {
  position: absolute;
  z-index: 4;
  background: none !important;
  border: none !important;
}
.CodeMirror-gutter-background {
  position: absolute;
  top: 0; bottom: 0;
  z-index: 4;
}
.CodeMirror-gutter-elt {
  position: absolute;
  cursor: default;
  z-index: 4;
}
.CodeMirror-gutter-wrapper ::selection { background-color: transparent }
.CodeMirror-gutter-wrapper ::-moz-selection { background-color: transparent }

.CodeMirror-lines {
  cursor: text;
  min-height: 1px; /* prevents collapsing before first draw */
}
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  /* Reset some styles that the rest of the page might have set */
  -moz-border-radius: 0; -webkit-border-radius: 0; border-radius: 0;
  border-width: 0;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  margin: 0;
  white-space: pre;
  word-wrap: normal;
  line-height: inherit;
  color: inherit;
  z-index: 2;
  position: relative;
  overflow: visible;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-variant-ligatures: contextual;
  font-variant-ligatures: contextual;
}
.CodeMirror-wrap pre.CodeMirror-line,
.CodeMirror-wrap pre.CodeMirror-line-like {
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: normal;
}

.CodeMirror-linebackground {
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  z-index: 0;
}

.CodeMirror-linewidget {
  position: relative;
  z-index: 2;
  padding: 0.1px; /* Force widget margins to stay inside of the container */
}

.CodeMirror-widget {}

.CodeMirror-rtl pre { direction: rtl; }

.CodeMirror-code {
  outline: none;
}

/* Force content-box sizing for the elements where we expect it */
.CodeMirror-scroll,
.CodeMirror-sizer,
.CodeMirror-gutter,
.CodeMirror-gutters,
.CodeMirror-linenumber {
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

.CodeMirror-measure {
  position: absolute;
  width: 100%;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.CodeMirror-cursor {
  position: absolute;
  pointer-events: none;
}
.CodeMirror-measure pre { position: static; }

div.CodeMirror-cursors {
  visibility: hidden;
  position: relative;
  z-index: 3;
}
div.CodeMirror-dragcursors {
  visibility: visible;
}

.CodeMirror-focused div.CodeMirror-cursors {
  visibility: visible;
}

.CodeMirror-selected { background: #d9d9d9; }
.CodeMirror-focused .CodeMirror-selected { background: #d7d4f0; }
.CodeMirror-crosshair { cursor: crosshair; }
.CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection { background: #d7d4f0; }
.CodeMirror-line::-moz-selection, .CodeMirror-line > span::-moz-selection, .CodeMirror-line > span > span::-moz-selection { background: #d7d4f0; }

.cm-searching {
  background-color: #ffa;
  background-color: rgba(255, 255, 0, .4);
}

/* Used to force a border model for a node */
.cm-force-border { padding-right: .1px; }

@media print {
  /* Hide the cursor when printing */
  .CodeMirror div.CodeMirror-cursors {
    visibility: hidden;
  }
}

/* See issue #2901 */
.cm-tab-wrap-hack:after { content: ''; }

/* Help users use markselection to safely style text background */
span.CodeMirror-selectedtext { background: none; }

`;

// ../../ircam-ismm/sc-components/vendors/theme-monokai-css.js
var theme_monokai_css_default = css`
/* Based on Sublime Text's Monokai theme */

.cm-s-monokai.CodeMirror { background: #272822; color: #f8f8f2; }
.cm-s-monokai div.CodeMirror-selected { background: #49483E; }
.cm-s-monokai .CodeMirror-line::selection, .cm-s-monokai .CodeMirror-line > span::selection, .cm-s-monokai .CodeMirror-line > span > span::selection { background: rgba(73, 72, 62, .99); }
.cm-s-monokai .CodeMirror-line::-moz-selection, .cm-s-monokai .CodeMirror-line > span::-moz-selection, .cm-s-monokai .CodeMirror-line > span > span::-moz-selection { background: rgba(73, 72, 62, .99); }
.cm-s-monokai .CodeMirror-gutters { background: #272822; border-right: 0px; }
.cm-s-monokai .CodeMirror-guttermarker { color: white; }
.cm-s-monokai .CodeMirror-guttermarker-subtle { color: #d0d0d0; }
.cm-s-monokai .CodeMirror-linenumber { color: #d0d0d0; }
.cm-s-monokai .CodeMirror-cursor { border-left: 1px solid #f8f8f0; }

.cm-s-monokai span.cm-comment { color: #75715e; }
.cm-s-monokai span.cm-atom { color: #ae81ff; }
.cm-s-monokai span.cm-number { color: #ae81ff; }

.cm-s-monokai span.cm-comment.cm-attribute { color: #97b757; }
.cm-s-monokai span.cm-comment.cm-def { color: #bc9262; }
.cm-s-monokai span.cm-comment.cm-tag { color: #bc6283; }
.cm-s-monokai span.cm-comment.cm-type { color: #5998a6; }

.cm-s-monokai span.cm-property, .cm-s-monokai span.cm-attribute { color: #a6e22e; }
.cm-s-monokai span.cm-keyword { color: #f92672; }
.cm-s-monokai span.cm-builtin { color: #66d9ef; }
.cm-s-monokai span.cm-string { color: #e6db74; }

.cm-s-monokai span.cm-variable { color: #f8f8f2; }
.cm-s-monokai span.cm-variable-2 { color: #9effff; }
.cm-s-monokai span.cm-variable-3, .cm-s-monokai span.cm-type { color: #66d9ef; }
.cm-s-monokai span.cm-def { color: #fd971f; }
.cm-s-monokai span.cm-bracket { color: #f8f8f2; }
.cm-s-monokai span.cm-tag { color: #f92672; }
.cm-s-monokai span.cm-header { color: #ae81ff; }
.cm-s-monokai span.cm-link { color: #ae81ff; }
.cm-s-monokai span.cm-error { background: #f92672; color: #f8f8f0; }

.cm-s-monokai .CodeMirror-activeline-background { background: #373831; }
.cm-s-monokai .CodeMirror-matchingbracket {
  text-decoration: underline;
  color: white !important;
}

`;

// ../../ircam-ismm/sc-components/vendors/addon-dialog-css.js
var addon_dialog_css_default = css`
.CodeMirror-dialog {
  position: absolute;
  left: 0; right: 0;
  background: inherit;
  z-index: 15;
  padding: .1em .8em;
  overflow: hidden;
  color: inherit;
}

.CodeMirror-dialog-top {
  border-bottom: 1px solid #eee;
  top: 0;
}

.CodeMirror-dialog-bottom {
  border-top: 1px solid #eee;
  bottom: 0;
}

.CodeMirror-dialog input {
  border: none;
  outline: none;
  background: transparent;
  width: 20em;
  color: inherit;
  font-family: monospace;
}

.CodeMirror-dialog button {
  font-size: 70%;
}

`;

// ../../ircam-ismm/sc-components/sc-editor.js
import_codemirror.default.commands.save = function(cm) {
  cm._scComponent._save();
};
var ScEditor = class extends LitElement {
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value !== null ? value : "";
    if (this._codeMirror) {
      const pos = this._codeMirror.getCursor();
      this._codeMirror.setValue(this._value);
      this._codeMirror.setCursor(pos);
      this._cleanDoc();
      setTimeout(() => this._codeMirror.refresh(), 1);
    }
  }
  constructor() {
    super();
    this.value = ``;
    this.saveButton = false;
    this.dirty = false;
  }
  /**
   * @note: Initialization order
   * - connectedCallback()
   * - render()
   * - firstUpdated();
   * -> ResizeObserver callback is called after `firstUpdated()`
   */
  render() {
    return html`
      <div @keydown="${this._onKeydown}" class="container"></div>
      ${this.dirty && this.saveButton ? html`<sc-icon icon="save" @input=${this._save}></sc-icon>` : nothing}
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => {
      const $container = this.shadowRoot.querySelector(".container");
      const { width, height } = $container.getBoundingClientRect();
      this._codeMirror.setSize(width, height);
    });
    this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    this._resizeObserver.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    const $container = this.shadowRoot.querySelector(".container");
    this._codeMirror = (0, import_codemirror.default)($container, {
      value: this.value,
      mode: "javascript",
      theme: "monokai",
      lineNumbers: true,
      tabSize: 2,
      keyMap: "sublime"
    });
    this._codeMirror._scComponent = this;
    this._codeMirror.setOption("extraKeys", {
      Tab: function(cm) {
        let spaces = "";
        for (let i = 0; i < cm.getOption("indentUnit"); i++) {
          spaces += " ";
        }
        cm.replaceSelection(spaces);
      }
    });
    this._codeMirror.on("change", () => {
      if (!this._codeMirror.getDoc().isClean()) {
        this.dirty = true;
      }
    });
  }
  _onKeydown(e) {
    e.stopPropagation();
    if (e.metaKey && e.shiftKey) {
      e.preventDefault();
      if (e.key === "/") {
        this._codeMirror.toggleComment();
      }
    }
  }
  // need to copy same logic as for cmd + s / ctrl + s
  _save(e) {
    this._value = this._codeMirror.getValue();
    const event = new CustomEvent("change", {
      bubbles: true,
      composed: true,
      detail: { value: this._value }
    });
    this._cleanDoc();
    this.dispatchEvent(event);
  }
  _cleanDoc() {
    this._codeMirror.getDoc().markClean();
    this.dirty = false;
  }
};
__publicField(ScEditor, "properties", {
  value: {
    type: String
  },
  saveButton: {
    type: Boolean,
    reflect: true,
    attribute: "save-button"
  },
  dirty: {
    type: Boolean,
    reflect: true
  }
});
__publicField(ScEditor, "styles", css`
    :host {
      vertical-align: top;
      display: inline-block;
      box-sizing: boder-box;
      width: 300px;
      height: 200px;
      border: 1px solid var(--sc-color-primary-3);
      border-left: 2px solid var(--sc-color-primary-3);
      position: relative;
      font-size: var(--sc-font-size);
    }

    :host([dirty]) {
      border-left: 2px solid var(--sc-color-secondary-3);
    }

    .container {
      width: 100%;
      height: 100%;
    }

    /* highlight focused editor */
    .CodeMirror { opacity: 0.9; }
    .CodeMirror.CodeMirror-focused { opacity: 1; }
    /* code mirror styles */
    ${codemirror_css_default}
    ${theme_monokai_css_default}
    ${addon_dialog_css_default}

    sc-icon {
      position: absolute;
      bottom: 2px;
      right: 2px;
    }
  `);
if (customElements.get("sc-editor") === void 0) {
  customElements.define("sc-editor", ScEditor);
}

// ../../ircam-ismm/sc-components/sc-matrix.js
var ScMatrix = class extends ScElement_default {
  set rows(value) {
    if (value < 1) {
      console.warn("sc-matrix: Invalid value for rows, should be >= 1");
      return;
    }
    this._rows = value;
    this._resizeMatrix();
  }
  get rows() {
    return this._rows;
  }
  set columns(value) {
    if (value < 1) {
      console.warn("sc-matrix: Invalid value for columns, should be >= 1");
      return;
    }
    this._columns = value;
    this._resizeMatrix();
  }
  get columns() {
    return this._columns;
  }
  set value(value) {
    this._value = value;
    this._rows = this._value.length;
    this._columns = this._value[0].length;
    this.requestUpdate();
  }
  get value() {
    return this._value;
  }
  set reset(value) {
    this._value.forEach((row) => {
      for (let i = 0; i < row.length; i++) {
        row[i] = this._states[0];
      }
    });
    this.requestUpdate();
    this._emitChange();
  }
  get reset() {
    return void 0;
  }
  set states(states) {
    console.log(states);
    this._states = states;
    for (let y = 0; y < this._value.length; y++) {
      const row = this._value[y];
      for (let x = 0; x < row.length; x++) {
        const currentValue = row[x];
        if (this._states.indexOf(currentValue) === -1) {
          const closest = this.states.reduce((a, b) => {
            return Math.abs(b - currentValue) < Math.abs(a - currentValue) ? b : a;
          });
          this._value[y][x] = closest;
        }
      }
    }
    this._emitChange();
    this.requestUpdate();
  }
  get states() {
    return this._states;
  }
  constructor() {
    super();
    this._value = [];
    this._states = [0, 1];
    this._width = 300;
    this._height = 200;
    this._resizeObserver = null;
    this.columns = 8;
    this.rows = 4;
  }
  render() {
    const cellWidth = this._width / this.columns;
    const cellHeight = this._height / this.rows;
    const minValue = this._states[0];
    const maxValue = this._states[this._states.length - 1];
    return html`
      <svg @contextmenu="${this._preventContextMenu}">
        <g>
          ${this.value.map((row, rowIndex) => {
      const y = rowIndex * cellHeight;
      return row.map((value, columnIndex) => {
        const x = columnIndex * cellWidth;
        const opacity = (value - minValue) / (maxValue - minValue);
        return svg`
                <rect
                  width=${cellWidth}
                  height=${cellHeight}
                  x=${x}
                  y=${y}
                  style="fill-opacity: ${opacity}"
                  data-row-index=${rowIndex}
                  data-column-index=${columnIndex}
                  @mousedown=${this._updateCell}
                ></rect>
              `;
      });
    })}
        </g>
        <g>
          <!-- horizontal lines -->
          ${map(range(1, this.value.length), (i) => {
      const y = i * cellHeight;
      return svg`<line x1="0" y1=${y} x2=${this._width} y2=${y}></line>`;
    })}
          <!-- vertical lines -->
          ${map(range(1, this.value[0].length), (i) => {
      const x = i * cellWidth;
      return svg`<line x1=${x} y1="0" x2=${x} y2=${this._height}></line>`;
    })}
        <g>
      </svg>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => {
      const $svg = this.shadowRoot.querySelector("svg");
      const { width, height } = $svg.getBoundingClientRect();
      this._width = width;
      this._height = height;
      this.requestUpdate();
    });
    this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    this._resizeObserver.disconnect();
    super.disconnectedCallback();
  }
  _resizeMatrix() {
    const value = this.value;
    for (let y = value.length - 1; y >= this.rows; y--) {
      value.splice(y, 1);
    }
    value.forEach((row) => {
      for (let x = row.length - 1; x >= this.columns; x--) {
        row.splice(x, 1);
      }
    });
    const currentNumRows = value.length;
    for (let y = 0; y < this.rows; y++) {
      if (y < currentNumRows) {
        value.forEach((row) => {
          for (let x = row.length; x < this.columns; x++) {
            row[x] = this._states[0];
          }
        });
      } else {
        const row = new Array(this.columns).fill(this._states[0]);
        value[y] = row;
      }
    }
    this.requestUpdate();
  }
  _updateCell(e) {
    const { rowIndex, columnIndex } = e.target.dataset;
    const currentIndex = this._states.indexOf(this.value[rowIndex][columnIndex]);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % this._states.length;
    this.value[rowIndex][columnIndex] = this._states[nextIndex];
    this._emitChange();
    this.requestUpdate();
  }
  _emitChange() {
    const event = new CustomEvent("change", {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    });
    this.dispatchEvent(event);
  }
};
__publicField(ScMatrix, "properties", {
  columns: {
    type: Number,
    reflect: true
  },
  rows: {
    type: Number,
    reflect: true
  },
  // @todo - updates values when updated
  states: {
    type: Array
  },
  value: {
    type: Array
  },
  // @todo - document live directive
  reset: {
    type: Boolean,
    reflect: true
  }
});
__publicField(ScMatrix, "styles", css`
    :host {
      box-sizing: border-box;
      width: 300px;
      height: 200px;
      vertical-align: top;
      display: inline-block;
      user-select: none;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);

      --sc-matrix-cell-color: #ffffff;
      --sc-matrix-cell-border: var(--sc-color-primary-5);
    }

    svg {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    rect {
      fill: var(--sc-matrix-cell-color);
      shape-rendering: crispedges;
    }

    line {
      stroke: var(--sc-matrix-cell-border);
      shape-rendering: crispedges;
    }
  `);
if (customElements.get("sc-matrix") === void 0) {
  customElements.define("sc-matrix", ScMatrix);
}

// ../../ircam-ismm/sc-components/sc-number.js
var ScNumber = class extends ScElement_default {
  set min(value) {
    this._min = Math.min(value, this._max);
    if (this._value < this._min) {
      this.value = this._min;
      this._emitChange();
    }
  }
  get min() {
    return this._min;
  }
  set max(value) {
    this._max = Math.max(value, this._min);
    if (this._value > this._max) {
      this.value = this._max;
      this._emitChange();
    }
  }
  get max() {
    return this._max;
  }
  set value(val) {
    val = Math.min(this._max, Math.max(this._min, val));
    if (val !== this._value) {
      this._value = val;
      this._displayValue = val.toString();
      this.requestUpdate();
    }
  }
  get value() {
    return this._value;
  }
  constructor() {
    super();
    this.integer = false;
    this._min = -Infinity;
    this._max = Infinity;
    this._value = 0;
    this._displayValue = "0";
    this._valueChanged = false;
    this._updateValue1 = this._updateValueFromPointer(1);
    this._updateValue01 = this._updateValueFromPointer(0.1);
    this._updateValue001 = this._updateValueFromPointer(0.01);
    this._updateValue0001 = this._updateValueFromPointer(1e-3);
    this._updateValue00001 = this._updateValueFromPointer(1e-4);
    this._updateValue000001 = this._updateValueFromPointer(1e-5);
    this._updateValue0000001 = this._updateValueFromPointer(1e-6);
    this._numKeyPressed = 0;
    this._onKeyDown = this._onKeyDown.bind(this);
  }
  render() {
    const parts = this._displayValue.split(".");
    if (!parts[1]) {
      parts[1] = [];
    }
    const emptySpace = " ";
    const characterWidth = 7;
    const isEdited = { edited: this._numKeyPressed !== 0 };
    return html`
      <div
        tabindex="-1"
        class="container"
        @focus="${this._onFocus}"
        @blur="${this._onBlur}"
        @touchstart="${this._triggerFocus}"
        @touchend="${this._openKeyboard}"
        @contextmenu="${this._preventContextMenu}"
      >
        <div class="info ${classMap(isEdited)}"></div>

        <div class="content">
          <span class="z">
            ${parts[0]}
            <sc-speed-surface @input="${this._updateValue1}"></sc-speed-surface>
          </span>
          ${!this.integer ? html`
              <span class="z">
                .
              </span>
              <span class="z">
                ${parts[1][0] || emptySpace}
                <sc-speed-surface @input="${this._updateValue01}"></sc-speed-surface>
              </span>
              <span class="z">
                ${parts[1][1] || emptySpace}
                <sc-speed-surface @input="${this._updateValue001}"></sc-speed-surface>
              </span>
              <span class="z">
                ${parts[1][2] || emptySpace}
                <sc-speed-surface @input="${this._updateValue0001}"></sc-speed-surface>
              </span>
              <span class="z">
                ${parts[1][3] || emptySpace}
                <sc-speed-surface @input="${this._updateValue00001}"></sc-speed-surface>
              </span>
              <span class="z">
                ${parts[1][4] || emptySpace}
                <sc-speed-surface @input="${this._updateValue000001}"></sc-speed-surface>
              </span>
              <span class="z">
                ${parts[1][5] || emptySpace}
                <sc-speed-surface @input="${this._updateValue0000001}"></sc-speed-surface>
              </span>` : nothing}
        </div>
      </div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", 0);
    }
  }
  // force focus for touchstart (is prevented by speed-surfaces...)
  _triggerFocus(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  _openKeyboard(e) {
    const $number = document.createElement("input");
    $number.type = "number";
    this.shadowRoot.appendChild($number);
    $number.focus();
    $number.click();
    $number.addEventListener("input", (e2) => {
      console.log("input", $number.value);
      if (e2.target.value) {
        this.value = parseFloat(e2.target.value);
      }
    });
    $number.addEventListener("change", (e2) => {
      e2.preventDefault();
      e2.stopPropagation();
      console.log("change", $number.value);
      if (e2.target.value) {
        this.value = parseFloat(e2.target.value);
      }
    });
  }
  // keyboard interactions
  _onFocus() {
    this._numKeyPressed = 0;
    window.addEventListener("keydown", this._onKeyDown);
  }
  _onBlur() {
    this._updateValueFromDisplayValue();
    window.removeEventListener("keydown", this._onKeyDown);
  }
  _onKeyDown(e) {
    if (this.disabled) {
      return;
    }
    const validSymbols = this.integer ? ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-"] : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", ".", ","];
    if (validSymbols.indexOf(e.key) !== -1) {
      e.preventDefault();
      e.stopPropagation();
      if (this._numKeyPressed === 0) {
        this._displayValue = "";
      }
      let symbol = e.key;
      if (symbol === ",") {
        symbol = ".";
      }
      this._displayValue += symbol;
      this._numKeyPressed += 1;
      this.requestUpdate();
    }
    if (e.key === "Backspace" || e.which === 8) {
      e.preventDefault();
      e.stopPropagation();
      if (this._displayValue[this._displayValue.length - 1] === ".") {
        this._displayValue = this._displayValue.substring(0, this._displayValue.length - 1);
      }
      this._displayValue = this._displayValue.substring(0, this._displayValue.length - 1);
      this._numKeyPressed += 1;
      this.requestUpdate();
    }
    if (e.key === "Enter" || e.which === 13) {
      e.preventDefault();
      e.stopPropagation();
      this._updateValueFromDisplayValue();
    }
  }
  _updateValueFromPointer(step) {
    return (e) => {
      e.stopPropagation();
      if (this.disabled) {
        return;
      }
      if (e.detail.pointerId !== null) {
        if (Math.abs(e.detail.dy) < 0.02) {
          return;
        }
        const lastValue = this._value;
        const sign = e.detail.dy < 0 ? -1 : 1;
        const scale = 8;
        const exponent = 1.2;
        let dy = Math.pow(Math.abs(e.detail.dy * scale), exponent);
        dy = Math.max(1, dy);
        dy = dy * sign;
        this._value += step * dy;
        this._value = index_es_default.times(Math.round(this._value / step), step);
        this._value = Math.max(this._min, Math.min(this._max, this._value));
        const displayValue = this._value.toString();
        const valueParts = displayValue.toString().split(".");
        const stepDecimals = step.toString().split(".")[1];
        if (stepDecimals) {
          if (!valueParts[1]) {
            valueParts[1] = [];
          }
          while (valueParts[1].length < stepDecimals.length) {
            valueParts[1] += "0";
          }
        }
        this._displayValue = valueParts.join(".");
        if (this._value !== lastValue) {
          this._valueChanged = true;
          this._emitInput();
        }
      } else {
        if (this._valueChanged === true) {
          this._valueChanged = false;
          this._emitChange();
        }
      }
      this.requestUpdate();
    };
  }
  _updateValueFromDisplayValue() {
    if (this._numKeyPressed > 0) {
      this._value = this.integer ? parseInt(this._displayValue) : parseFloat(this._displayValue);
      if (this._value < this._min || this._value > this._max) {
        this._value = Math.max(this._min, Math.min(this._max, this._value));
        this._displayValue = this._value.toString();
      }
      this._numKeyPressed = 0;
      this._emitInput();
      this._emitChange();
      this.requestUpdate();
    }
  }
  _emitInput() {
    const event = new CustomEvent("input", {
      bubbles: true,
      composed: true,
      detail: { value: this._value }
    });
    this.dispatchEvent(event);
  }
  _emitChange() {
    const event = new CustomEvent("change", {
      bubbles: true,
      composed: true,
      detail: { value: this._value }
    });
    this.dispatchEvent(event);
  }
};
__publicField(ScNumber, "properties", {
  min: {
    type: Number,
    reflect: true
  },
  max: {
    type: Number,
    reflect: true
  },
  value: {
    type: Number
  },
  integer: {
    type: Boolean,
    reflect: true
  },
  disabled: {
    type: Boolean,
    reflect: true
  }
});
__publicField(ScNumber, "styles", css`
    :host {
      vertical-align: top;
      display: inline-block;
      width: 100px;
      height: 30px;
      box-sizing: border-box;
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: #ffffff;
      position: relative;
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    .container {
      overflow-y: hidden;
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);
      user-select: none;
    }

    .container:focus {
      outline: none;
    }

    .info {
      width: 15px;
      height: 100%;
      display: inline-block;
      background-color: var(--sc-color-primary-3);
      box-sizing: border-box;
    }

    .container:focus .info {
      outline: 2px solid var(--sc-color-secondary-2);
    }

    .info.edited {
      background-color: var(--sc-color-primary-4);
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 15px;
      padding-left: 12px;
      height: 100%;
      width: calc(100% - 15px);
    }

    .z {
      display: inline-block;
      vertical-align: top;
      text-align: center;
      position: relative;
/*      width: 7px;*/
      height: 100%;
      display: inline-flex;
      align-items: center;
    }

    /* contains the integer part which can be larger than one character */
    .z:first-child {
      width: auto;
      min-width: 7px;
    }

    /* full width if integer */
    :host([integer]) .z {
      width: 100%;
      text-align: left;
    }

    .z sc-speed-surface {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
    }

    /*input[type="number"] {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      padding: 0;
      border: none;
    }

    input[type="number"]:focus {
      outline: none;
    }*/
  `);
if (customElements.get("sc-number") === void 0) {
  customElements.define("sc-number", ScNumber);
}

// ../../ircam-ismm/sc-components/sc-select.js
var groupId = 0;
var itemId = 0;
var ScSelect = class extends ScElement_default {
  constructor() {
    super();
    this.options = [];
    this.value = null;
    this.disabled = false;
    this.name = `sc-select-${groupId++}`;
    this.placeholder = "";
  }
  render() {
    return html`
      <select
        ?disabled=${this.disabled}
        @change=${this._dispatchEvent}
      >
        ${this.placeholder ? html`<option value="">${this.placeholder}</option` : nothing}
        ${repeat(this.options, () => `sc-select-${itemId++}`, (value) => {
      return html`
            <option
              value=${value}
              ?selected=${value === this.value}
            >${value}</option>
          `;
    })}
      </select>
    `;
  }
  _dispatchEvent(e) {
    if (this.disabled) {
      return;
    }
    this.value = e.target.value;
    const changeEvent = new CustomEvent("change", {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
        value: this.value
      }
    });
    this.dispatchEvent(changeEvent);
  }
};
__publicField(ScSelect, "properties", {
  options: {
    type: Object
  },
  value: {
    type: String,
    reflect: true
  },
  name: {
    type: String,
    reflect: true
  },
  placeholder: {
    type: String,
    reflect: true
  },
  disabled: {
    type: Boolean,
    reflect: true
  }
});
__publicField(ScSelect, "styles", css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
      height: 30px;
      width: 200px;
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: #fff;
      border-radius: 2px;
      overflow: auto;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    select {
      display: block;
      font-family: inherit;
      font-size: inherit;
      width: 100%;
      height: 100%;
      text-indent: 4px;
    }

    select:focus {
      outline: none;
    }

    option {
      text-indent: 4px;
    }
  `);
if (customElements.get("sc-select") === void 0) {
  customElements.define("sc-select", ScSelect);
}

// ../../ircam-ismm/sc-components/utils/getClipper.js
function getClipper(min, max, step) {
  return (val) => {
    const clippedValue = Math.round(val / step) * step;
    const fixed = Math.max(Math.log10(1 / step), 0);
    const fixedValue = clippedValue.toFixed(fixed);
    return Math.min(max, Math.max(min, parseFloat(fixedValue)));
  };
}

// ../../ircam-ismm/sc-components/sc-slider.js
var ScSlider = class extends ScElement_default {
  get min() {
    return this._min;
  }
  set min(value) {
    this._min = value;
    this._updateScales();
  }
  get max() {
    return this._max;
  }
  set max(value) {
    this._max = value;
    this._updateScales();
  }
  get step() {
    return this._step;
  }
  set step(value) {
    this._step = value;
    this._updateScales();
  }
  set midiValue(value) {
    const newValue = (this.max - this.min) * value / 127 + this.min;
    this.value = this._clipper(newValue);
    const inputEvent = new CustomEvent("input", {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    });
    this.dispatchEvent(inputEvent);
    const changeEvent = new CustomEvent("change", {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    });
    this.dispatchEvent(changeEvent);
  }
  get midiValue() {
    return Math.round((this.value - this.min) / (this.max - this.min) * 127);
  }
  constructor() {
    super();
    this._scale = null;
    this._clipper = null;
    this._min = 0;
    this._max = 1;
    this._step = 1e-3;
    this.min = 0;
    this.max = 1;
    this.step = 1e-3;
    this.value = 0.5;
    this.orientation = "horizontal";
    this.numberBox = false;
    this._pointerId = null;
  }
  render() {
    const size = Math.max(0, this._scale(this.value));
    return html`
      <div @contextmenu=${this._preventContextMenu}>
        <svg viewbox="0 0 1000 1000" preserveAspectRatio="none">
          ${this.orientation === "horizontal" ? svg`
                <rect class="background" width="1000" height="1000"></rect>
                <rect class="foreground" width="${size}" height="1000"></rect>
              ` : svg`
                <rect class="foreground" width="1000" height="1000"></rect>
                <rect class="background" width="1000" height="${1e3 - size}"></rect>
              `}
        </svg>
        <sc-position-surface
          x-range=${JSON.stringify([this.min, this.max])}
          y-range=${JSON.stringify([this.max, this.min])}
          clamp
          @input=${this._onInput}
          @pointerend=${this._onChange}
        ></sc-position-surface>
      </div>
      ${this.numberBox ? html`
          <sc-number
            min=${this.min}
            max=${this.max}
            value=${this.value}
            @input=${this._onNumberBoxChange}
          ></sc-number>
        ` : nothing}
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", 0);
    }
  }
  _updateScales() {
    if (this._max < this._min) {
      const tmp = this._max;
      this._max = this._min;
      this._min = tmp;
    }
    this._scale = getScale([this._min, this._max], [0, 1e3]);
    this._clipper = getClipper(this._min, this._max, this._step);
    this.value = this._clipper(this.value);
  }
  _onNumberBoxChange(e) {
    e.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.value = this._clipper(e.detail.value);
    const inputEvent = new CustomEvent("input", {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    });
    this.dispatchEvent(inputEvent);
    const changeEvent = new CustomEvent("change", {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    });
    this.dispatchEvent(changeEvent);
  }
  _onChange(e) {
    if (this.disabled) {
      return;
    }
    if (e.detail.pointerId === this._pointerId) {
      this._pointerId = null;
      const event = new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      });
      this.dispatchEvent(event);
    }
  }
  _onInput(e) {
    e.stopPropagation();
    if (this.disabled) {
      return;
    }
    if (e.detail.value[0] && (this._pointerId === null || e.detail.value[0].pointerId === this._pointerId)) {
      const { x, y, pointerId } = e.detail.value[0];
      const value = this.orientation === "horizontal" ? x : y;
      this._pointerId = pointerId;
      this.value = this._clipper(value);
      const event = new CustomEvent("input", {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      });
      this.dispatchEvent(event);
      this.requestUpdate();
    }
  }
};
__publicField(ScSlider, "properties", {
  min: {
    type: Number,
    reflect: true
  },
  max: {
    type: Number,
    reflect: true
  },
  step: {
    type: Number,
    reflect: true
  },
  value: {
    type: Number
  },
  orientation: {
    type: String,
    reflect: true
  },
  numberBox: {
    type: Boolean,
    reflect: true,
    attribute: "number-box"
  },
  disabled: {
    type: Boolean,
    reflect: true
  }
});
__publicField(ScSlider, "styles", css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      width: 200px;
      height: 30px;
      vertical-align: top;

      --sc-slider-background-color: var(--sc-color-primary-2);
      --sc-slider-foreground-color: var(--sc-color-primary-5);
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    div {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      position: relative;
      display: inline-block;
      border: 1px solid var(--sc-color-primary-3);
    }

    :host([number-box][orientation="horizontal"]) div {
      width: calc(100% - 86px);
    }

    :host([number-box][orientation="vertical"]) div {
      height: calc(100% - 36px);
    }

    svg {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    rect.background {
      fill: var(--sc-slider-background-color);
    }

    rect.foreground {
      fill: var(--sc-slider-foreground-color);
    }

    sc-position-surface {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    sc-number {
      display: inline-block;
      width: 80px;
    }

    :host([number-box][orientation="vertical"]) sc-number {
      display: block;
    }
  `);
if (customElements.get("sc-slider") === void 0) {
  customElements.define("sc-slider", ScSlider);
}

// ../../ircam-ismm/sc-components/sc-text.js
var ScText = class extends ScElement_default {
  static get properties() {
    return {
      readonly: {
        type: Boolean,
        reflect: true
      },
      value: {
        type: String
      },
      disabled: {
        type: Boolean,
        reflect: true
      },
      _dirty: {
        type: Boolean,
        state: true
      }
    };
  }
  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: top;
        font-size: 0;
        width: 200px;
        height: 30px;
        font-size: var(--sc-font-size);
        font-family: var(--sc-font-family);
      }

      :host([disabled]) {
        opacity: 0.7;
      }

      :host([hidden]) {
        display: none
      }

      :host(:focus), :host(:focus-visible) {
        outline: none;
      }

      textarea {
        width: 100%;
        height: 100%;
        vertical-align: top;
        box-sizing: border-box;
        background-color: var(--sc-color-primary-3);
        border: 1px dotted var(--sc-color-primary-5);
        color: white;
        padding: 6px 2px 6px 6px;
        border-radius: 2px;
        font-size: inherit;
        font-family: inherit;
        resize: none;
        margin: 0;
      }

      :host(:focus) textarea, :host(:focus-visible) textarea {
        outline: none;
        border: 1px solid var(--sc-color-primary-5);
      }

      :host(:focus) textarea.dirty, :host(:focus-visible) textarea.dirty {
        border: 1px solid var(--sc-color-secondary-3);
      }

      textarea[readonly], textarea[readonly]:focus {
        background-color: var(--sc-color-primary-4);
        border: 1px solid var(--sc-color-primary-4);
      }
    `;
  }
  constructor() {
    super();
    this.readonly = false;
    this.value = "";
    this.disabled = false;
    this._dirty = false;
    this._propagateFocus = this._propagateFocus.bind(this);
  }
  render() {
    if (this.readonly === true) {
      this.removeAttribute("tabindex");
    } else {
      this.setAttribute("tabindex", 0);
    }
    this.textContent = this.value;
    return html`
      <textarea
        tabindex="-1"
        class="${this._dirty ? "dirty" : ""}"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        .value="${this.value}"
        @blur=${this._updateValue}
        @keydown=${this._onKeyDown}
        @keyup=${this._onKeyUp}
        @contextmenu=${this._preventContextMenu}
      ></textarea>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", 0);
    }
    this.addEventListener("focus", this._propagateFocus);
    this.value = this.textContent;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("focus", this._propagateFocus);
  }
  _propagateFocus() {
    this.shadowRoot.querySelector("textarea").focus();
  }
  _onKeyDown(e) {
    if (e.metaKey && e.key === "s") {
      e.preventDefault();
      this._updateValue(e, true);
    }
  }
  _onKeyUp(e) {
    if (e.target.value !== this.value && this._dirty === false) {
      this._dirty = true;
    } else if (e.target.value === this.value && this._dirty === true) {
      this._dirty = false;
    }
  }
  _updateValue(e, forceUpdate = false) {
    e.preventDefault();
    e.stopPropagation();
    if (this._dirty || forceUpdate) {
      this.value = this.shadowRoot.querySelector("textarea").value;
      this._dirty = false;
      const event = new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      });
      this.dispatchEvent(event);
    }
  }
};
if (customElements.get("sc-text") === void 0) {
  customElements.define("sc-text", ScText);
}

// ../../ircam-ismm/sc-components/sc-toggle.js
var ScToggle = class extends ScElement_default {
  // alias active for consistency and genericity with other components
  get value() {
    return this.active;
  }
  set value(active) {
    this.active = active;
  }
  // sc-midi controller interface
  set midiValue(value) {
    if (this.disabled) {
      return;
    }
    this.active = value === 0 ? false : true;
    this._dispatchEvent();
  }
  get midiValue() {
    return this.value ? 127 : 0;
  }
  constructor() {
    super();
    this.active = false;
    this.disabled = false;
    this._updateValue = this._updateValue.bind(this);
  }
  render() {
    const padding = 25;
    return html`
      <svg
        class="${this.active ? "active" : ""}"
        viewbox="0 0 100 100"
        @mousedown="${this._updateValue}"
        @touchstart="${{
      handleEvent: this._updateValue,
      passive: false
    }}"
        @contextmenu="${this._preventContextMenu}"
      >
        <line x1="${padding}" y1="${padding}" x2="${100 - padding}" y2="${100 - padding}" />
        <line x1="${padding}" y1="${100 - padding}" x2="${100 - padding}" y2="${padding}" />
      </svg>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", 0);
    }
  }
  _updateValue(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.active = !this.active;
    this._dispatchEvent();
  }
  _dispatchEvent() {
    const changeEvent = new CustomEvent("change", {
      bubbles: true,
      composed: true,
      detail: { value: this.active }
    });
    this.dispatchEvent(changeEvent);
  }
};
__publicField(ScToggle, "properties", {
  active: {
    type: Boolean,
    reflect: true
  },
  // do not reflect just an alias for the `active` attribute
  value: {
    type: Boolean
  },
  disabled: {
    type: Boolean,
    reflect: true
  }
});
__publicField(ScToggle, "styles", css`
    :host {
      display: inline-block;
      width: 30px;
      height: 30px;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-2);
      font-size: 0;
      line-height: 0;
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    svg {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 1px solid var(--sc-color-primary-3);
    }

    svg line {
      stroke-width: 10px;
      stroke: var(--sc-color-primary-4);
    }

    svg.active line {
      stroke: #ffffff;
    }
  `);
if (customElements.get("sc-toggle") === void 0) {
  customElements.define("sc-toggle", ScToggle);
}

// ../../ircam-ismm/sc-components/sc-radio.js
var groupId2 = 0;
var itemId2 = 0;
var ScRadio = class extends ScElement_default {
  // see  `_dispatchEvent` for the explaination of the getter / setter
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    this.requestUpdate();
  }
  constructor() {
    super();
    this.options = [];
    this.value = null;
    this.disabled = false;
    this.orientation = "vertical";
    this.name = `sc-radio-${groupId2++}`;
  }
  render() {
    return repeat(this.options, (item) => `sc-radio-${itemId2++}`, (value, key) => {
      return html`
        <label>
          <input
            type="radio"
            value=${value}
            name=${this.name}
            @change=${this._dispatchEvent}
            ?checked=${value == this.value}
            ?disabled=${this.disabled && !(value == this.value)}
          />
          ${value}
        </label>
      `;
    });
  }
  _dispatchEvent(e) {
    if (this.disabled) {
      return;
    }
    this._value = e.target.value;
    const changeEvent = new CustomEvent("change", {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
        value: this.value
      }
    });
    this.dispatchEvent(changeEvent);
  }
};
__publicField(ScRadio, "properties", {
  options: {
    type: Object
  },
  value: {
    type: String,
    reflect: true
  },
  name: {
    type: String,
    reflect: true
  },
  disabled: {
    type: Boolean,
    reflect: true
  },
  orientation: {
    type: String,
    reflect: true
  }
});
__publicField(ScRadio, "styles", css`
    :host {
      display: inline-block;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-2);
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: #fff;
      border-radius: 2px;
      overflow: auto;
    }

    :host([orientation="horizontal"]) {
      height: 30px;
      width: auto;
      padding: 4px 7px 4px 7px;
    }

    :host([orientation="vertical"]) {
      width: 200px;
      height: auto;
      padding: 6px 7px 8px 7px;
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    label {
      vertical-align: middle;
      user-select: none;
      webkit-user-select: none;
    }

    :host([orientation="horizontal"]) label {
      display: inline-block;
      margin-right: 12px;
      height: 20px;
      line-height: 20px;
    }

    :host([orientation="vertical"]) label {
      display: block;
      height: 20px;
      line-height: 20px;
    }

    input[type="radio"] {
      vertical-align: middle;
      position: relative;
      top: -1px;
    }
  `);
if (customElements.get("sc-radio") === void 0) {
  customElements.define("sc-radio", ScRadio);
}
//# sourceMappingURL=@ircam_sc-components_index__js.js.map
