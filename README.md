# Don Quijote: lo que ve, lo que hay

Siete aventuras de Don Quijote contadas dos veces: como las ve él y como son. Cada una empieza con un recorte de cerca de un grabado de Gustave Doré sobre oro (lo que imagina) y, al bajar, la cámara se aleja hasta el grabado entero en tinta (lo que hay). Después, el libro de cuentas de todos los engaños, recuentos sobre el texto completo y la última página.

Demo: https://pedri77.github.io/quijote-dore/

## Material

- Texto: *Don Quijote*, Project Gutenberg #2000 (dominio público). Las citas son literales.
- Grabados: Gustave Doré para *L'ingénieux hidalgo don Quichotte de la Manche* (1863, trad. Louis Viardot), vía Wikimedia Commons, dominio público. Solo recortados, pasados a gris y teñidos en pantalla.

## Scripts

```
cd scripts
uv run --no-project python listar.py ../datos-crudos/vols.json   # ficheros de las categorías de Commons
uv run --no-project python descargar.py                           # grabados elegidos (miniaturas estándar)
uv run --no-project --with pillow python grabados.py              # WebP y src/datos/grabados.json
uv run --no-project python cuentas.py                             # recuentos sobre datos-crudos/quijote.txt
```

## Desarrollo

```
npm install
npm run dev     # http://localhost:3023
npm run lint && npm run build
```

React 19, Vite, Tailwind 4 y Lenis; un solo bucle requestAnimationFrame escribe estilos en el DOM. Respeta `prefers-reduced-motion`.

Hecha con ayuda de IA (Claude). Ninguna imagen está generada con IA.
