import {cuentas, miles} from '../content';
import {useAparecer} from '../hooks/useAparecer';

/** Seis recuentos sobre el texto completo, en una rejilla que aparece al entrar. */
export function Recuentos() {
  const ref = useAparecer<HTMLElement>();
  const r = cuentas.recuentos;
  return (
    <section ref={ref} aria-labelledby="recuentos-titulo" className="bg-tinta px-4 py-[14svh] text-papel sm:px-6 md:px-[6vw]">
      <div className="mx-auto max-w-[72rem]">
        <h2 id="recuentos-titulo" data-aparece className="font-display text-display font-black text-oro">
          {r.titulo}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-12 md:grid-cols-3 md:gap-y-12">
          {r.items.map((it, i) => (
            <li key={it.texto} data-aparece style={{'--i': i} as React.CSSProperties} className="border-t border-papel/25 pt-3">
              <span className={`block font-display text-[clamp(2.75rem,6vw,5rem)] leading-none font-black tabular-nums ${i % 2 === 0 ? 'text-oro' : 'text-anil-claro'}`}>{miles(it.n)}</span>
              <span className="mt-2 block text-[1rem] text-papel/80">{it.texto}</span>
            </li>
          ))}
        </ul>
        <p data-aparece className="mt-10 max-w-[40rem] text-[0.9375rem] text-papel/60">
          {r.nota}
        </p>
      </div>
    </section>
  );
}
