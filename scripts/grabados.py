"""Pasa los grabados descargados a WebP en public/img y escribe src/datos/grabados.json (tamaños y créditos)."""
import json
from PIL import Image
from comun import RAIZ
meta = json.load(open(RAIZ / "datos-crudos/elegidos.json"))
# Recortes para quitar el pie impreso o márgenes (fracciones del alto/ancho: x0, y0, x1, y1).
RECORTE = {"lectura": (0.0, 0.0, 1.0, 0.905)}
ANCHO = {"cohetes": 525, "libros": 547}
dest = RAIZ / "public/img"; dest.mkdir(parents=True, exist_ok=True)
salida = {}
for k, m in meta.items():
    im = Image.open(RAIZ / f"datos-crudos/img/{k}.jpg").convert("L")
    if k in RECORTE:
        x0, y0, x1, y1 = RECORTE[k]; w, h = im.size
        im = im.crop((int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h)))
    tope = ANCHO.get(k, 1200)
    if im.width > tope:
        im = im.resize((tope, round(im.height * tope / im.width)), Image.LANCZOS)
    im.save(dest / f"{k}.webp", "WEBP", quality=62, method=6)
    salida[k] = {"w": im.width, "h": im.height, "fichero": m["fichero"], "licencia": m["LicenseShortName"]}
    print(k, im.size, (dest / f"{k}.webp").stat().st_size // 1024, "KB")
(RAIZ / "src/datos").mkdir(parents=True, exist_ok=True)
json.dump(salida, open(RAIZ / "src/datos/grabados.json", "w"), ensure_ascii=False, indent=1)
