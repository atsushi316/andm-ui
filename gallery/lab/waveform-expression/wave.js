/** Decorative geometry is never a measured signal. Units: viewBox, cycles per width. */
export function decorativePath({amplitude = 12, cycles = 4, style = 'precise', phase = 0, decay = 0, travel = null} = {}) {
  return Array.from({length: 121}, (_, i) => {
    const t = i / 120, angle = 2 * Math.PI * cycles * t - phase;
    const carrier = style === 'organic' ? (Math.sin(angle) + .3 * Math.sin(angle * 2.3 + .8)) / 1.3 : style === 'signal' ? Math.tanh(3 * Math.sin(angle)) : Math.sin(angle);
    const envelope = travel === null ? 1 : Math.exp(-(((t - travel) / .2) ** 2));
    const y = 40 - amplitude * carrier * envelope * Math.exp(-decay);
    return `${i ? 'L' : 'M'}${(14 + t * 212).toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
}
/** Data geometry: no randomization, visual-style parameters, smoothing or invented samples. */
export function samplesPath(values, {min = -1, max = 1} = {}) {
  if (!Array.isArray(values) || !values.length) return '';
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min || values.some(v => !Number.isFinite(v) || v < min || v > max)) throw new RangeError('Finite in-range samples and increasing bounds required');
  return values.map((v, i) => `${i ? 'L' : 'M'}${(14 + i / Math.max(1, values.length - 1) * 212).toFixed(2)},${(66 - (v - min) / (max - min) * 52).toFixed(2)}`).join(' ');
}
export const AUDIO_FIXTURE = Object.freeze([0,.2,-.15,.4,-.5,.7,-.85,.55,-.3,.15,0,-.1,.3,-.6,.8,-.7,.45,-.2,.1,-.35,.5,-.25,.1,0]);
