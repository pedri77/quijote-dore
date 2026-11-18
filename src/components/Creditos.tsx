import {G, commons, creditos, url} from '../content';
import {useAparecer} from '../hooks/useAparecer';
import {irA} from '../lib/scroll';

const TEXTO: Record<string, string> = {
  lectura: 'Don Quijote leyendo (primera parte, cap. I)',
  venta: 'La vela de armas en la venta (I, 3)',
  molinos: 'Los molinos de viento (I, 8)',
  ovejas: 'Los rebaños (I, 18)',
  batanes: 'Camino de los batanes (I, 20)',
  dulcinea: 'Las tres labradoras (II, 10)',
  retablo: 'El retablo de maese Pedro (II, 26)',
  clavileno: 'Clavileño en el jardín de los duques (II, 41)',
  cohetes: 'Clavileño revienta (II, 41)',
  muerte: 'La muerte de Alonso Quijano (II, 74)',
};

/** Fuentes, licencia de cada grabado y método. */
export function Creditos() {
  const ref = useAparecer<HTMLElement>();
  return (
    <footer ref={ref} aria-labelledby="creditos-titulo" className="papel px-4 pt-[14svh] pb-10 sm:px-6 md:px-[6vw]">
      <div className="mx-auto grid max-w-[78rem] gap-10 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-16">
        <figure data-aparece className="max-w-[20rem]">
          <img src={url('libros')} alt="Viñeta de Doré: el ama barre los libros de caballerías hacia el fuego" width={G.libros.w} height={G.libros.h} loading="lazy" decoding="async" className="block w-full mix-blend-multiply" />
          <figcaption className="mt-3 text-[0.875rem] leading-snug text-tinta-3">Los libros de caballerías, al fuego (I, 6).</figcaption>
        </figure>
        <div>
          <h2 id="creditos-titulo" data-aparece className="font-display text-display font-black">
            {creditos.titulo}
          </h2>
          <ul className="mt-6 grid gap-2.5 text-body">
            {creditos.fuentes.map((f) => (
              <li key={f.url}>
                <a href={f.url} target="_blank" rel="noreferrer" className="underline decoration-tinta/30 underline-offset-4 hover:decoration-anil">
                  {f.nombre} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[52rem] text-[0.9375rem] text-tinta-2">{creditos.grabados}</p>
          <ul className="mt-4 grid gap-1.5 text-[0.9375rem] text-tinta-2 md:grid-cols-2 md:gap-x-8">
            {Object.entries(TEXTO).map(([k, t]) => (
              <li key={k} className="border-b border-tinta/15 pb-1.5">
                <a href={commons(G[k as keyof typeof G].fichero)} target="_blank" rel="noreferrer" className="text-tinta underline decoration-tinta/25 underline-offset-4 hover:decoration-anil">
                  {t}
                </a>
                . {G[k as keyof typeof G].licencia === 'Public domain' ? 'Dominio público' : G[k as keyof typeof G].licencia}.
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[52rem] text-[0.9375rem] text-tinta-2">{creditos.metodo}</p>
          <button type="button" onClick={() => irA('#inicio')} className="etiqueta mt-8 border border-tinta/60 px-5 py-2.5 transition-colors hover:border-anil hover:bg-anil hover:text-papel">
            ↑ Volver al principio
          </button>
          <p className="mt-10 font-display text-[1.75rem] font-black text-oro-osc">{creditos.firma}</p>
        </div>
      </div>
    </footer>
  );
}
