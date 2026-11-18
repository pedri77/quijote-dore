import {useEffect} from 'react';
import {Aventura} from './components/Aventura';
import {Creditos} from './components/Creditos';
import {Cuentas} from './components/Cuentas';
import {Final} from './components/Final';
import {Portada} from './components/Portada';
import {Recuentos} from './components/Recuentos';
import {aventuras} from './content';
import {useMovimientoReducido} from './hooks/useMovimientoReducido';
import {iniciarScroll} from './lib/scroll';

/** Orden del guion: el lector · siete aventuras · el libro de cuentas · recuentos · la última página · fuentes. */
export default function App() {
  const reducido = useMovimientoReducido();
  useEffect(() => iniciarScroll(reducido), [reducido]);
  return (
    <main>
      <Portada />
      {aventuras.map((a, i) => (
        <Aventura key={a.id} a={a} n={i + 1} />
      ))}
      <Cuentas />
      <Recuentos />
      <Final />
      <Creditos />
    </main>
  );
}
