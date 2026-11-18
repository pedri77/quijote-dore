import {useEffect, useRef} from 'react';
import {G, final, url} from '../content';
import {oroAPapel} from '../lib/lamina';
import {lerp, progresoFijado, tramo} from '../lib/math';
import {enCadaFotograma} from '../lib/scroll';

/**
 * La última página: el grabado de la muerte, en tinta, y la frase de Alonso Quijano palabra a palabra. Al final,
 * Sancho pide volver al campo y el oro vuelve, ahora en él.
 *
 * Guion de scroll (p), sección de 460 svh:
 *   0.00 – 0.10  título e introducción; el grabado se acerca despacio en todo el tramo (1,08 → 1)
 *   0.12 – 0.62  la frase, palabra a palabra
 *   0.66 – 0.76  la cita de Sancho, con un poco de oro de vuelta en el fondo
 *   0.80 – 0.88  cierre
 */

const PALABRAS = final.frase.split(' ');
const M = G.muerte;

export function Final() {
  const raizRef = useRef<HTMLElement>(null);
  const fondoRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const cabRef = useRef<HTMLDivElement>(null);
  const palRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sanchoRef = useRef<HTMLQuoteElement>(null);
  const cierreRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let pAnterior = -1;
    return enCadaFotograma(() => {
      const raiz = raizRef.current;
      if (!raiz) return;
      const {p, visible} = progresoFijado(raiz);
      if (!visible || Math.abs(p - pAnterior) < 0.00003) return;
      pAnterior = p;
      imgRef.current!.style.transform = `scale(${lerp(1.08, 1, tramo(p, 0, 1))})`;
      const c = tramo(p, 0, 0.08);
      cabRef.current!.style.opacity = String(c);
      const n = tramo(p, 0.12, 0.62) * PALABRAS.length;
      palRefs.current.forEach((el, i) => el && (el.style.opacity = String(lerp(0.14, 1, Math.min(1, Math.max(0, n - i))))));
      const s = tramo(p, 0.66, 0.76);
      sanchoRef.current!.style.opacity = String(s);
      sanchoRef.current!.style.transform = `translate3d(0, ${(1 - s) * 12}px, 0)`;
      fondoRef.current!.style.backgroundColor = oroAPapel(lerp(1, 0.7, s));
      cierreRef.current!.style.opacity = String(tramo(p, 0.8, 0.88));
    });
  }, []);

  return (
    <section ref={raizRef} id="final" aria-labelledby="final-titulo" className="relative" style={{height: '460svh'}}>
      <div ref={fondoRef} className="sticky top-0 flex h-pantalla flex-col overflow-hidden md:flex-row" style={{backgroundColor: 'var(--color-papel)'}}>
        <div className="order-1 flex min-h-0 min-w-0 flex-1 items-center justify-center px-4 pt-4 md:order-2 md:flex-1 md:px-[4vw] md:py-[5svh]" style={{containerType: 'size'}}>
          <div className="pliego relative overflow-hidden bg-papel" style={{aspectRatio: `${M.w} / ${M.h}`, width: `min(100cqw, 100cqh * ${M.w / M.h})`}}>
            <img
              ref={imgRef}
              src={url('muerte')}
              alt="Grabado de Doré: Alonso Quijano en la cama, rodeado de la sobrina, el ama, el cura y Sancho, que llora sentado"
              width={M.w}
              height={M.h}
              loading="lazy"
              decoding="async"
              className="block size-full object-cover mix-blend-multiply"
              style={{filter: 'grayscale(1) contrast(1.08)'}}
            />
          </div>
        </div>
        <div className="relative order-2 flex h-[50svh] shrink-0 flex-col px-4 pt-4 pb-5 sm:px-6 md:order-1 md:h-auto md:flex-1 md:justify-center md:px-[5vw]">
          <div ref={cabRef} style={{opacity: 0}}>
            <p className="etiqueta text-tinta-3">{final.antetitulo}</p>
            <h2 id="final-titulo" className="mt-1 font-display text-[clamp(1.9rem,3.8vw,3.5rem)] leading-none font-black">
              {final.titulo}
            </h2>
            <p className="mt-2 max-w-[34rem] text-[0.9375rem] text-tinta-2 md:mt-4 md:text-body">{final.intro}</p>
          </div>
          <p className="mt-3 max-w-[36rem] font-sans text-[clamp(1.2rem,2.3vw,2.1rem)] leading-snug italic md:mt-6" aria-label={final.frase}>
            «
            {PALABRAS.map((w, i) => (
              <span
                key={i}
                aria-hidden="true"
                ref={(el) => {
                  palRefs.current[i] = el;
                }}
                className={/Quijano|Bueno|cuerdo/.test(w) ? 'font-medium text-anil not-italic' : /loco|Quijote|Mancha/.test(w) ? 'text-oro-osc' : ''}
                style={{opacity: 0.14}}
              >
                {w}{' '}
              </span>
            ))}
            »
          </p>
          <blockquote ref={sanchoRef} className="mt-3 max-w-[34rem] border-l-[3px] border-oro-2 pl-3 md:mt-6" style={{opacity: 0}}>
            <p className="text-[0.9375rem] leading-snug italic md:text-[1.05rem]">«{final.sancho.texto}»</p>
            <footer className="etiqueta mt-1 text-tinta-3">{final.sancho.quien}</footer>
          </blockquote>
          <p ref={cierreRef} className="mt-3 font-display text-[1.25rem] font-extrabold text-oro-osc md:mt-6 md:text-[1.6rem]" style={{opacity: 0}}>
            {final.cierre}
          </p>
        </div>
      </div>
    </section>
  );
}
