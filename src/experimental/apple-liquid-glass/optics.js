/* Independent optical approximation. No third-party code copied.
   A rounded lens displaces pixels of a registered, controlled background image.
   This is NOT arbitrary live-DOM capture and NOT an Apple shader. */
export function lensField(width, height, bezel = 12, strength = 18, cornerRadius = Math.min(width, height) / 2) {
  const w = Math.max(2, Math.round(width)), h = Math.max(2, Math.round(height));
  const result = new Uint8ClampedArray(w * h * 4);
  const radius = Math.max(1, Math.min(cornerRadius, w / 2, h / 2));
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const px = x + .5 - w / 2, py = y + .5 - h / 2;
    const qx = Math.abs(px) - (w / 2 - radius), qy = Math.abs(py) - (h / 2 - radius);
    const ox = Math.max(qx, 0), oy = Math.max(qy, 0), l = Math.hypot(ox, oy);
    const d = Math.min(Math.max(qx, qy), 0) + l - radius;
    let nx = 0, ny = 0;
    if (l > .001) { nx = ox / l * Math.sign(px); ny = oy / l * Math.sign(py); }
    else if (qx > qy) nx = Math.sign(px); else ny = Math.sign(py);
    const t = Math.max(0, Math.min(1, -d / Math.min(bezel, radius)));
    // Raised curved rim; flat interior remains stable. Not physical ray tracing.
    const bend = d < 0 ? Math.pow(1 - t, 2) * strength : 0;
    const i = (y * w + x) * 4;
    result[i] = 128 - nx * bend / strength * 110;
    result[i + 1] = 128 - ny * bend / strength * 110;
    result[i + 2] = 128; result[i + 3] = 255;
  }
  return { width: w, height: h, pixels: result, scale: strength * 2 };
}
// Match visual thumb travel to pointer input, including both endpoints.
export function sliderRatio(clientX, left, width, thumbWidth = 56) {
  return Math.max(0, Math.min(1, (clientX - left - thumbWidth / 2) / Math.max(1, width - thumbWidth)));
}
export function springStep(state, target, dt, stiffness = 280, damping = 23) {
  const step = Math.min(Math.max(dt, 0), 1 / 30);
  const v = state.v + ((target - state.x) * stiffness - state.v * damping) * step;
  const x = state.x + v * step;
  return Math.abs(x - target) < .0008 && Math.abs(v) < .008 ? {x: target, v: 0} : {x, v};
}
