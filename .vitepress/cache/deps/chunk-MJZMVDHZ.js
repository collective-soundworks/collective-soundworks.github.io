// ../../ircam-ismm/sc-components/node_modules/@ircam/sc-gettime/src/browser.js
var usePerf = globalThis.performance && globalThis.performance.now;
var start = usePerf ? performance.now() : Date.now();
if (!globalThis.crossOriginIsolated) {
  console.warn(`[@ircam/sc-gettime] Your page is not Cross Origin Isolated. The accuracy of the clock may be reduced by the User-Agent to prevent finger-printing
(see: https://web.dev/coop-coep/ for more informations)`);
}
function getTime() {
  if (usePerf) {
    const now = performance.now();
    const delta = now - start;
    return delta * 1e-3;
  } else {
    const now = Date.now();
    const delta = now - start;
    return delta * 1e-3;
  }
}

export {
  getTime
};
//# sourceMappingURL=chunk-MJZMVDHZ.js.map
