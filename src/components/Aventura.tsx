import {useEffect, useRef} from 'react';
import {G, aventuras, url, type Aventura as Datos} from '../content';
import {encuadre, oroAPapel} from '../lib/lamina';
import {easeInOutSine, lerp, progresoFijado, tramo} from '../lib/math';
import {enCadaFotograma} from '../lib/scroll';

/**
 * Una aventura contada dos veces. Primero lo que ve don Quijote: un recorte de cerca del grabado sobre oro, con
 * su palabra y su cita. Al bajar, la cámara se aleja hasta el grabado entero, el oro se vuelve papel, su palabra
 * se tacha y aparece lo que hay, en añil.
 *
 * Guion de scroll (p), sección de 340 svh:
 *   0.00 – 0.12  entra «lo que ve»: etiqueta, palabra y cita (el recorte se acerca un poco más)
 *   0.38 – 0.62  la cámara se aleja hasta el grabado entero; de 0.40 a 0.60 el oro pasa a papel
 *   0.40 – 0.46  se va la cita de lo que ve
 *   0.44 – 0.54  la palabra de lo que ve se tacha
 *   0.52 – 0.64  entra «lo que hay»: palabra y cita
 *   0.66 – 0.74  (si la hay) la viñeta extra
 *   0.72 – 0.80  nota de lo que pasa después
 */

const TOTAL = aventuras.length;

export function Aventura({a, n}: {a: Datos; n: number}) {
  const raizRef = useRef<HTMLElement>(null);
  const fondoRef = useRef<HTMLDivElement>(null);
  const marcoRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const extraRef = useRef<HTMLImageElement>(null);
  const veRef = useRef<HTMLDivElement>(null);
  const palabraVeRef = useRef<HTMLSpanElement>(null);
  const citaVeRef = useRef<HTMLQuoteElement>(null);
  const hayRef = useRef<HTMLDivElement>(null);
  const citaHayRef = useRef<HTMLQuoteElement>(null);
  const notaRef = useRef<HTMLParagraphElement>(null);
  const img = G[a.img];
  const [etiquetaVe, etiquetaHay] = a.etiquetas ?? ['Lo que ve', 'Lo que hay'];

  useEffect(() => {
    let pAnterior = -1;
    const pon = (el: HTMLElement | null, o: number, dy = 12) => {
      if (!el) return;
      el.style.opacity = String(o);
      el.style.visibility = o > 0.01 ? 'visible' : 'hidden';
      el.style.transform = `translate3d(0, ${(1 - o) * dy}px, 0)`;
    };
    return enCadaFotograma(() => {
      const raiz = raizRef.current;
      if (!raiz) return;
      const {p, visible} = progresoFijado(raiz);
      if (!visible || Math.abs(p - pAnterior) < 0.00003) return;
      pAnterior = p;

      // Antes de alejarse, el recorte se acerca un poco (t negativo = algo más de aumento).
      const t = p < 0.38 ? lerp(-0.08, 0, tramo(p, 0, 0.38)) : easeInOutSine(tramo(p, 0.38, 0.62));
      encuadre(imgRef.current!, a.zoom, t);
      const k = tramo(p, 0.4, 0.6);
      marcoRef.current!.style.backgroundColor = oroAPapel(k);
      fondoRef.current!.style.backgroundColor = oroAPapel(lerp(0.62, 1, k));

      pon(veRef.current, tramo(p, 0.02, 0.1));
      pon(citaVeRef.current, tramo(p, 0.05, 0.12) * (1 - tramo(p, 0.4, 0.46)));
      palabraVeRef.current!.style.setProperty('--raya', String(tramo(p, 0.44, 0.54)));
      palabraVeRef.current!.style.opacity = String(lerp(1, 0.55, tramo(p, 0.5, 0.58)));
      pon(hayRef.current, tramo(p, 0.52, 0.6));
      pon(citaHayRef.current, tramo(p, 0.56, 0.64));
      pon(notaRef.current, tramo(p, 0.72, 0.8));
      if (extraRef.current) {
        const e = tramo(p, 0.66, 0.74);
        extraRef.current.style.opacity = String(e);
        extraRef.current.style.transform = `rotate(${lerp(-14, -4, e)}deg) scale(${lerp(0.7, 1, e)})`;
      }
    });
  }, [a]);

  return (
    <section ref={raizRef} id={a.id} aria-labelledby={`${a.id}-titulo`} className="relative" style={{height: '340svh'}}>
      <div ref={fondoRef} className="sticky top-0 flex h-pantalla flex-col overflow-hidden md:flex-row md:items-stretch" style={{backgroundColor: oroAPapel(0.62)}}>
        {/* Grabado */}
        <div className="relative order-1 flex min-h-0 min-w-0 flex-1 items-center justify-center px-4 pt-4 md:order-2 md:px-[4vw] md:py-[5svh]" style={{containerType: 'size'}}>
          <div ref={marcoRef} className="pliego relative overflow-hidden" style={{aspectRatio: `${img.w} / ${img.h}`, width: `min(100cqw, 100cqh * ${img.w / img.h})`, backgroundColor: 'var(--color-oro)'}}>
            <img
              ref={imgRef}
              src={url(a.img)}
              alt={`Grabado de Doré: ${a.titulo.toLowerCase()}. ${a.hay.palabra}.`}
              width={img.w}
              height={img.h}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 block size-full origin-top-left object-cover mix-blend-multiply"
              style={{filter: 'grayscale(1) contrast(1.1)'}}
            />
          </div>
          {a.extra && (
            <img
              ref={extraRef}
              src={url(a.extra)}
              alt="Viñeta de Doré: Clavileño reventando en el aire con don Quijote y Sancho"
              width={G[a.extra].w}
              height={G[a.extra].h}
              loading="lazy"
              decoding="async"
              className="pliego absolute right-3 bottom-2 w-[34%] max-w-[15rem] border-[6px] border-papel bg-papel md:right-[3vw] md:bottom-[4svh]"
              style={{opacity: 0}}
            />
          )}
        </div>

        {/* Texto */}
        <div className="relative order-2 flex h-[50svh] shrink-0 flex-col px-4 pt-4 pb-5 sm:px-6 md:order-1 md:h-auto md:w-[42vw] md:justify-center md:px-[5vw] md:py-[7svh]">
          <p className="etiqueta text-tinta-2">
            Aventura {n} de {TOTAL} · {a.donde}
          </p>
          <h2 id={`${a.id}-titulo`} className="mt-1 font-display text-[clamp(1.75rem,3.4vw,3.25rem)] leading-none font-black">
            {a.titulo}
          </h2>

          <div className="relative mt-3 md:mt-8">
            <div ref={veRef} style={{opacity: 0}}>
              <p className="etiqueta inline-block bg-oro px-2 py-0.5 text-tinta">{etiquetaVe}</p>
              <p className="mt-1.5 font-display text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.02] font-extrabold text-oro-osc">
                <span ref={palabraVeRef} className="tachado">
                  {a.ve.palabra}
                </span>
              </p>
            </div>
            <div ref={hayRef} className="mt-1" style={{opacity: 0}}>
              <p className="etiqueta inline-block bg-anil px-2 py-0.5 text-papel">{etiquetaHay}</p>
              <p className="mt-1.5 font-display text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.02] font-extrabold text-anil">{a.hay.palabra}</p>
            </div>
          </div>

          <div className="relative mt-3 min-h-[7.5rem] md:mt-6 md:min-h-[9.5rem]">
            {[
              {ref: citaVeRef, c: a.ve, borde: 'border-oro-2'},
              {ref: citaHayRef, c: a.hay, borde: 'border-anil'},
            ].map(({ref, c, borde}, i) => (
              <blockquote key={i} ref={ref} className={`absolute inset-x-0 top-0 border-l-[3px] pl-3 md:pl-4 ${borde}`} style={{opacity: 0}}>
                <p className="text-[0.975rem] leading-snug italic md:text-[1.15rem] md:leading-relaxed">«{c.cita}»</p>
                <footer className="etiqueta mt-1.5 text-tinta-3">{c.quien}</footer>
              </blockquote>
            ))}
          </div>

          <p ref={notaRef} className="mt-2 max-w-[34rem] text-[0.875rem] leading-snug text-tinta-2 md:mt-4 md:text-body" style={{opacity: 0}}>
            {a.nota}
          </p>
        </div>
      </div>
    </section>
  );
}
