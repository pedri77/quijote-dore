import {useEffect, useRef} from 'react';
import {cuentas} from '../content';
import {progresoFijado, tramo} from '../lib/math';
import {enCadaFotograma} from '../lib/scroll';

/**
 * El libro de cuentas: cada engaño en una fila, con lo que ve tachado, lo que hay y su explicación de siempre.
 *
 * Guion de scroll (p), sección de 360 svh:
 *   0.00 – 0.12  título y la cita del retablo
 *   0.14 – 0.86  nueve filas, una cada 0.08: aparece la fila y luego se tacha lo que ve
 *   0.86 – 1.00  todo el libro a la vista
 */

const N = cuentas.filas.length;

export function Cuentas() {
  const raizRef = useRef<HTMLElement>(null);
  const cabRef = useRef<HTMLDivElement>(null);
  const filaRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const rayaRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let pAnterior = -1;
    return enCadaFotograma(() => {
      const raiz = raizRef.current;
      if (!raiz) return;
      const {p, visible} = progresoFijado(raiz);
      if (!visible || Math.abs(p - pAnterior) < 0.00003) return;
      pAnterior = p;
      const c = tramo(p, 0, 0.1);
      cabRef.current!.style.opacity = String(c);
      cabRef.current!.style.transform = `translate3d(0, ${(1 - c) * 14}px, 0)`;
      for (let i = 0; i < N; i++) {
        const ini = 0.14 + (i * 0.72) / N;
        const o = tramo(p, ini, ini + 0.035);
        const f = filaRefs.current[i];
        if (f) {
          f.style.opacity = String(o);
          f.style.transform = `translate3d(${(1 - o) * -16}px, 0, 0)`;
        }
        rayaRefs.current[i]?.style.setProperty('--raya', String(tramo(p, ini + 0.035, ini + 0.07)));
      }
    });
  }, []);

  return (
    <section ref={raizRef} id="cuentas" aria-labelledby="cuentas-titulo" className="relative" style={{height: '360svh'}}>
      <div className="papel sticky top-0 flex h-pantalla flex-col justify-center overflow-hidden px-4 py-[4svh] sm:px-6 md:px-[6vw]">
        <div className="mx-auto w-full max-w-[72rem]">
          <div ref={cabRef} style={{opacity: 0}}>
            <p className="etiqueta text-tinta-3">{cuentas.antetitulo}</p>
            <h2 id="cuentas-titulo" className="mt-1 font-display text-display font-black">
              {cuentas.titulo}
            </h2>
            <blockquote className="mt-3 max-w-[50rem] border-l-[3px] border-oro-2 pl-3 md:mt-5 md:pl-4">
              <p className="text-[0.9375rem] leading-snug italic md:text-[1.2rem] md:leading-relaxed">«{cuentas.cita}»</p>
              <footer className="etiqueta mt-1.5 text-tinta-3">{cuentas.citaDonde}</footer>
            </blockquote>
          </div>

          <table className="mt-4 w-full border-collapse text-left md:mt-8">
            <caption className="sr-only">Lo que ve don Quijote, lo que hay, dónde pasa y cómo lo explica él</caption>
            <thead>
              <tr className="etiqueta border-b-2 border-tinta text-tinta-2">
                {cuentas.cabecera.map((h, i) => (
                  <th key={h} scope="col" className={`py-1.5 pr-3 font-bold ${i === 2 ? 'hidden md:table-cell' : ''} ${i === 3 ? 'hidden lg:table-cell' : ''}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cuentas.filas.map(([ve, hay, donde, porque], i) => (
                <tr
                  key={i}
                  ref={(el) => {
                    filaRefs.current[i] = el;
                  }}
                  className="border-b border-tinta/15 align-baseline"
                  style={{opacity: 0}}
                >
                  <td className="py-1 pr-3 font-display text-[0.95rem] font-extrabold text-oro-osc md:py-2 md:text-[1.2rem]">
                    <span
                      ref={(el) => {
                        rayaRefs.current[i] = el;
                      }}
                      className="tachado"
                    >
                      {ve}
                    </span>
                  </td>
                  <td className="py-1 pr-3 font-display text-[0.95rem] font-extrabold text-anil md:py-2 md:text-[1.2rem]">
                    {hay}
                    <span className="block font-sans text-[0.75rem] font-normal text-tinta-3 md:hidden">{donde}</span>
                  </td>
                  <td className="hidden py-2 pr-3 font-sans text-[0.9375rem] text-tinta-2 tabular-nums md:table-cell">{donde}</td>
                  <td className="hidden py-2 font-sans text-[0.9375rem] text-tinta-2 italic lg:table-cell">{porque}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
