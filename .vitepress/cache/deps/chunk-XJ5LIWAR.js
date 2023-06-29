import {
  require_codemirror
} from "./chunk-PDMTOR63.js";
import {
  __commonJS
} from "./chunk-GKWPUQBP.js";

// ../../ircam-ismm/sc-components/node_modules/codemirror/addon/dialog/dialog.js
var require_dialog = __commonJS({
  "../../ircam-ismm/sc-components/node_modules/codemirror/addon/dialog/dialog.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror2) {
      function dialogDiv(cm, template, bottom) {
        var wrap = cm.getWrapperElement();
        var dialog;
        dialog = wrap.appendChild(document.createElement("div"));
        if (bottom)
          dialog.className = "CodeMirror-dialog CodeMirror-dialog-bottom";
        else
          dialog.className = "CodeMirror-dialog CodeMirror-dialog-top";
        if (typeof template == "string") {
          dialog.innerHTML = template;
        } else {
          dialog.appendChild(template);
        }
        CodeMirror2.addClass(wrap, "dialog-opened");
        return dialog;
      }
      function closeNotification(cm, newVal) {
        if (cm.state.currentNotificationClose)
          cm.state.currentNotificationClose();
        cm.state.currentNotificationClose = newVal;
      }
      CodeMirror2.defineExtension("openDialog", function(template, callback, options) {
        if (!options)
          options = {};
        closeNotification(this, null);
        var dialog = dialogDiv(this, template, options.bottom);
        var closed = false, me = this;
        function close(newVal) {
          if (typeof newVal == "string") {
            inp.value = newVal;
          } else {
            if (closed)
              return;
            closed = true;
            CodeMirror2.rmClass(dialog.parentNode, "dialog-opened");
            dialog.parentNode.removeChild(dialog);
            me.focus();
            if (options.onClose)
              options.onClose(dialog);
          }
        }
        var inp = dialog.getElementsByTagName("input")[0], button;
        if (inp) {
          inp.focus();
          if (options.value) {
            inp.value = options.value;
            if (options.selectValueOnOpen !== false) {
              inp.select();
            }
          }
          if (options.onInput)
            CodeMirror2.on(inp, "input", function(e) {
              options.onInput(e, inp.value, close);
            });
          if (options.onKeyUp)
            CodeMirror2.on(inp, "keyup", function(e) {
              options.onKeyUp(e, inp.value, close);
            });
          CodeMirror2.on(inp, "keydown", function(e) {
            if (options && options.onKeyDown && options.onKeyDown(e, inp.value, close)) {
              return;
            }
            if (e.keyCode == 27 || options.closeOnEnter !== false && e.keyCode == 13) {
              inp.blur();
              CodeMirror2.e_stop(e);
              close();
            }
            if (e.keyCode == 13)
              callback(inp.value, e);
          });
          if (options.closeOnBlur !== false)
            CodeMirror2.on(dialog, "focusout", function(evt) {
              if (evt.relatedTarget !== null)
                close();
            });
        } else if (button = dialog.getElementsByTagName("button")[0]) {
          CodeMirror2.on(button, "click", function() {
            close();
            me.focus();
          });
          if (options.closeOnBlur !== false)
            CodeMirror2.on(button, "blur", close);
          button.focus();
        }
        return close;
      });
      CodeMirror2.defineExtension("openConfirm", function(template, callbacks, options) {
        closeNotification(this, null);
        var dialog = dialogDiv(this, template, options && options.bottom);
        var buttons = dialog.getElementsByTagName("button");
        var closed = false, me = this, blurring = 1;
        function close() {
          if (closed)
            return;
          closed = true;
          CodeMirror2.rmClass(dialog.parentNode, "dialog-opened");
          dialog.parentNode.removeChild(dialog);
          me.focus();
        }
        buttons[0].focus();
        for (var i = 0; i < buttons.length; ++i) {
          var b = buttons[i];
          (function(callback) {
            CodeMirror2.on(b, "click", function(e) {
              CodeMirror2.e_preventDefault(e);
              close();
              if (callback)
                callback(me);
            });
          })(callbacks[i]);
          CodeMirror2.on(b, "blur", function() {
            --blurring;
            setTimeout(function() {
              if (blurring <= 0)
                close();
            }, 200);
          });
          CodeMirror2.on(b, "focus", function() {
            ++blurring;
          });
        }
      });
      CodeMirror2.defineExtension("openNotification", function(template, options) {
        closeNotification(this, close);
        var dialog = dialogDiv(this, template, options && options.bottom);
        var closed = false, doneTimer;
        var duration = options && typeof options.duration !== "undefined" ? options.duration : 5e3;
        function close() {
          if (closed)
            return;
          closed = true;
          clearTimeout(doneTimer);
          CodeMirror2.rmClass(dialog.parentNode, "dialog-opened");
          dialog.parentNode.removeChild(dialog);
        }
        CodeMirror2.on(dialog, "click", function(e) {
          CodeMirror2.e_preventDefault(e);
          close();
        });
        if (duration)
          doneTimer = setTimeout(close, duration);
        return close;
      });
    });
  }
});

export {
  require_dialog
};
//# sourceMappingURL=chunk-XJ5LIWAR.js.map
