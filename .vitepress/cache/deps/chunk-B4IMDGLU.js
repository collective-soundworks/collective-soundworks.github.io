import {
  require_dialog
} from "./chunk-XJ5LIWAR.js";
import {
  require_codemirror
} from "./chunk-PDMTOR63.js";
import {
  __commonJS
} from "./chunk-GKWPUQBP.js";

// ../../ircam-ismm/sc-components/node_modules/codemirror/addon/search/jump-to-line.js
var require_jump_to_line = __commonJS({
  "../../ircam-ismm/sc-components/node_modules/codemirror/addon/search/jump-to-line.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror(), require_dialog());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror", "../dialog/dialog"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror2) {
      "use strict";
      CodeMirror2.defineOption("search", { bottom: false });
      function dialog(cm, text, shortText, deflt, f) {
        if (cm.openDialog)
          cm.openDialog(text, f, { value: deflt, selectValueOnOpen: true, bottom: cm.options.search.bottom });
        else
          f(prompt(shortText, deflt));
      }
      function getJumpDialog(cm) {
        return cm.phrase("Jump to line:") + ' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">' + cm.phrase("(Use line:column or scroll% syntax)") + "</span>";
      }
      function interpretLine(cm, string) {
        var num = Number(string);
        if (/^[-+]/.test(string))
          return cm.getCursor().line + num;
        else
          return num - 1;
      }
      CodeMirror2.commands.jumpToLine = function(cm) {
        var cur = cm.getCursor();
        dialog(cm, getJumpDialog(cm), cm.phrase("Jump to line:"), cur.line + 1 + ":" + cur.ch, function(posStr) {
          if (!posStr)
            return;
          var match;
          if (match = /^\s*([\+\-]?\d+)\s*\:\s*(\d+)\s*$/.exec(posStr)) {
            cm.setCursor(interpretLine(cm, match[1]), Number(match[2]));
          } else if (match = /^\s*([\+\-]?\d+(\.\d+)?)\%\s*/.exec(posStr)) {
            var line = Math.round(cm.lineCount() * Number(match[1]) / 100);
            if (/^[-+]/.test(match[1]))
              line = cur.line + line + 1;
            cm.setCursor(line - 1, cur.ch);
          } else if (match = /^\s*\:?\s*([\+\-]?\d+)\s*/.exec(posStr)) {
            cm.setCursor(interpretLine(cm, match[1]), cur.ch);
          }
        });
      };
      CodeMirror2.keyMap["default"]["Alt-G"] = "jumpToLine";
    });
  }
});

export {
  require_jump_to_line
};
//# sourceMappingURL=chunk-B4IMDGLU.js.map
