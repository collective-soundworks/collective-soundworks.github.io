// ../../ircam-ismm/sc-components/node_modules/lit-html/development/directives/range.js
function* range(startOrEnd, end, step = 1) {
  const start = end === void 0 ? 0 : startOrEnd;
  end !== null && end !== void 0 ? end : end = startOrEnd;
  for (let i = start; step > 0 ? i < end : end < i; i += step) {
    yield i;
  }
}

export {
  range
};
/*! Bundled license information:

lit-html/development/directives/range.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=chunk-AYD7LSFM.js.map
