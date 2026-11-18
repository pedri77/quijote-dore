"""Descarga los grabados elegidos (miniatura de Commons al ancho indicado) y guarda sus licencias."""
import json, time, urllib.request
from comun import info, RAIZ, UA
V2 = ", Volume II, Illustrations by Gustave Doré in L'ingénieux hidalgo don Quichotte de la Manche (1863) "
ELEGIDOS = {
    "lectura": ('Gustave Doré - Miguel de Cervantes - Don Quixote - Part 1 - Chapter 1 - Plate 1 "A world of disorderly notions, picked out of his books, crowded into his imagination".jpg', 1920),
    "venta": ("Cap III Quixote a velar armas.jpg", 1600),
    "molinos": ("Adventure with the Windmills.jpg", 1920),
    "ovejas": ("Cap XVIII Dom Quixote acomete um dos exércitos.jpg", 960),
    "batanes": ("Cap XX Dom Quixote e Sancho Pança aproximando-se do pisão.jpg", 960),
    "dulcinea": ("Cap 10" + V2 + "02.jpg", 960),
    "retablo": ("Cap 026" + V2 + "02.jpg", 960),
    "clavileno": ("Cap 041" + V2 + "01.jpg", 960),
    "cohetes": ("Cap 041" + V2 + "02.jpg", 500),
    "muerte": ("Cap 074" + V2 + "02.jpg", 960),
    "libros": ("Cap VI A queima dos livros Doré.jpg", 500),
}
out = RAIZ / "datos-crudos/img"; out.mkdir(parents=True, exist_ok=True)
meta = {}
for k, (f, ancho) in ELEGIDOS.items():
    m = info([f], ancho=ancho or 2000)[f]
    meta[k] = {"fichero": f, **m}
    dest = out / f"{k}.jpg"
    if not dest.exists():
        u = m["thumb"] if ancho and ancho < m["w"] else m["url"]
        for i in range(3):
            try:
                with urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": UA}), timeout=60) as r: dest.write_bytes(r.read()); break
            except Exception as e: print("aviso", e); time.sleep(60)
        time.sleep(8)
    print(k, m["w"], m["h"], m["LicenseShortName"], dest.exists())
json.dump(meta, open(RAIZ / "datos-crudos/elegidos.json", "w"), ensure_ascii=False, indent=1)
