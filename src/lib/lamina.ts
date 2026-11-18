import {clamp, lerp} from './math';

/**
 * Coloca un grabado dentro de su marco con un aumento `s` centrado en (x, y), en fracciones de la imagen.
 * El centro se recorta para que nunca asome el borde. Con t = 1 la imagen queda entera (s = 1, centro 0,5).
 */
export function encuadre(img: HTMLElement, zoom: {x: number; y: number; s: number}, t: number) {
  const s = lerp(zoom.s, 1, t);
  const m = 0.5 / s;
  const cx = clamp(lerp(zoom.x, 0.5, t), m, 1 - m);
  const cy = clamp(lerp(zoom.y, 0.5, t), m, 1 - m);
  img.style.transform = `translate3d(${(0.5 - cx * s) * 100}%, ${(0.5 - cy * s) * 100}%, 0) scale(${s})`;
}

/** Mezcla del oro (imaginación) al papel (lo que hay), k = 0 todo oro, k = 1 todo papel. */
export const oroAPapel = (k: number) => `color-mix(in oklch, var(--color-papel) ${Math.round(k * 100)}%, var(--color-oro))`;
