// ../../ircam-ismm/sc-components/node_modules/lit-html/development/directives/map.js
function* map(items, f) {
  if (items !== void 0) {
    let i = 0;
    for (const value of items) {
      yield f(value, i++);
    }
  }
}

export {
  map
};
/*! Bundled license information:

lit-html/development/directives/map.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=chunk-3WKWFYTV.js.map
