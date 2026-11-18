import {useEffect, useRef} from 'react';
import {G, portada, url} from '../content';
import {encuadre, oroAPapel} from '../lib/lamina';
import {easeInOutSine, progresoFijado, tramo} from '../lib/math';
import {enCadaFotograma} from '../lib/scroll';

/**
 * Portada: el grabado de don Quijote leyendo (cap. I). Empieza pegado a su cara y la cámara se aleja hasta
 * enseñar todo lo que le sale de los libros; mientras se aleja, el papel se vuelve oro (su imaginación).
 *
 * Guion de scroll (p), sección de 600 svh:
 *   0.00 – 0.10  título y entradilla; el grabado, de cerca en la cara, en tinta
 *   0.10 – 0.16  el título se va
 *   0.12 – 0.60  la cámara se aleja (aumento 3,4 → 1); de 0.20 a 0.55 el papel se vuelve oro
 *   0.16 – 0.34  cita 1: «se le secó el celebro»
 *   0.36 – 0.56  cita 2: «no había otra historia más cierta»
 *   0.58 – 0.66  pie de Doré
 *   0.66 – 1.00  cómo se lee: oro = lo que ve, añil = lo que hay
 */

const ZOOM = {x: 0.56, y: 0.47, s: 3.4};
const L = G.lectura;

export function Portada() {
  const raizRef = useRef<HTMLElement>(null);
  const marcoRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const tituloRef = useRef<HTMLDivElement>(null);
  const citaRefs = useRef<(HTMLElement | null)[]>([]);
  const pieRef = useRef<HTMLParagraphElement>(null);
  const leyendaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pAnterior = -1;
    return enCadaFotograma(() => {
      const raiz = raizRef.current;
      if (!raiz) return;
      const {p, visible} = progresoFijado(raiz);
      if (!visible || Math.abs(p - pAnterior) < 0.00003) return;
      pAnterior = p;

      encuadre(imgRef.current!, ZOOM, easeInOutSine(tramo(p, 0.12, 0.6)));
      marcoRef.current!.style.backgroundColor = oroAPapel(1 - tramo(p, 0.2, 0.55));

      const ti = 1 - tramo(p, 0.1, 0.16);
      tituloRef.current!.style.opacity = String(ti);
      tituloRef.current!.style.visibility = ti > 0.01 ? 'visible' : 'hidden';
      const o = [tramo(p, 0.16, 0.2) * (1 - tramo(p, 0.32, 0.35)), tramo(p, 0.36, 0.4) * (1 - tramo(p, 0.55, 0.58)), tramo(p, 0.58, 0.62) * (1 - tramo(p, 0.66, 0.69)), tramo(p, 0.68, 0.73)];
      [citaRefs.current[0], citaRefs.current[1], pieRef.current, leyendaRef.current].forEach((el, i) => {
        if (!el) return;
        el.style.opacity = String(o[i]);
        el.style.visibility = o[i] > 0.01 ? 'visible' : 'hidden';
        el.style.transform = `translate3d(0, ${(1 - Math.min(1, o[i] * 1.5)) * 14}px, 0)`;
      });
    });
  }, []);

  return (
    <section ref={raizRef} id="inicio" aria-labelledby="portada-titulo" className="relative" style={{height: '600svh'}}>
      <div className="papel sticky top-0 flex h-pantalla flex-col overflow-hidden md:flex-row md:items-center">
        {/* Grabado */}
        <div className="order-1 flex min-h-0 min-w-0 flex-1 items-center justify-center px-4 pt-4 md:order-2 md:h-full md:flex-1 md:px-[4vw] md:py-[5svh]" style={{containerType: 'size'}}>
          <div ref={marcoRef} className="pliego relative overflow-hidden" style={{aspectRatio: `${L.w} / ${L.h}`, width: `min(100cqw, 100cqh * ${L.w / L.h})`, backgroundColor: 'var(--color-papel)'}}>
            <img
              ref={imgRef}
              src={url('lectura')}
              alt="Grabado de Doré: don Quijote sentado en su sillón con un libro y la espada en alto, rodeado de caballeros, damas, monstruos y gigantes que le salen de los libros"
              width={L.w}
              height={L.h}
              className="absolute inset-0 block size-full origin-top-left object-cover mix-blend-multiply"
              style={{filter: 'grayscale(1) contrast(1.08)'}}
            />
          </div>
        </div>

        {/* Texto */}
        <div className="relative order-2 h-[42svh] shrink-0 px-4 pt-4 pb-5 sm:px-6 md:order-1 md:h-auto md:flex-1 md:self-stretch md:px-[5vw] md:py-[8svh]">
          <div ref={tituloRef} className="absolute inset-x-4 top-4 sm:inset-x-6 md:inset-x-[5vw] md:top-1/2 md:-translate-y-1/2">
            <p className="etiqueta text-oro-osc">{portada.antetitulo}</p>
            <h1 id="portada-titulo" className="mt-3 font-display text-hero font-black whitespace-nowrap">
              <span className="block text-oro-2">{portada.titulo[0]},</span>
              <span className="block text-anil">{portada.titulo[1]}</span>
            </h1>
            <p className="mt-4 max-w-[30rem] text-lead text-tinta-2 md:mt-6">{portada.entradilla}</p>
            <p className="etiqueta mt-4 text-tinta-3 md:mt-8">↓ {portada.pista}</p>
          </div>

          {portada.citas.map((c, i) => (
            <blockquote
              key={i}
              ref={(el) => {
                citaRefs.current[i] = el;
              }}
              className="absolute inset-x-4 top-4 sm:inset-x-6 md:inset-x-[5vw] md:top-1/2 md:-translate-y-1/2"
              style={{opacity: 0, visibility: 'hidden'}}
            >
              <p className="max-w-[34rem] font-sans text-[clamp(1.3rem,2.3vw,2.2rem)] leading-snug italic">«{c.texto}»</p>
              <footer className="etiqueta mt-4 text-oro-osc">{c.donde}</footer>
            </blockquote>
          ))}

          <p ref={pieRef} className="absolute inset-x-4 top-4 max-w-[30rem] text-lead text-tinta-2 sm:inset-x-6 md:inset-x-[5vw] md:top-1/2 md:-translate-y-1/2" style={{opacity: 0, visibility: 'hidden'}}>
            {portada.pie}
          </p>

          <div ref={leyendaRef} className="absolute inset-x-4 top-4 sm:inset-x-6 md:inset-x-[5vw] md:top-1/2 md:-translate-y-1/2" style={{opacity: 0, visibility: 'hidden'}}>
            <p className="etiqueta text-tinta-3">{portada.leyenda.titulo}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="bg-oro px-3 py-1 font-display text-[1.25rem] font-extrabold text-tinta">{portada.leyenda.ve}</span>
              <span className="bg-anil px-3 py-1 font-display text-[1.25rem] font-extrabold text-papel">{portada.leyenda.hay}</span>
            </div>
            <p className="mt-4 max-w-[32rem] text-lead text-tinta-2">{portada.leyenda.texto}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
