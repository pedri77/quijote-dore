"""Descarga miniaturas de los grabados candidatos para elegir a ojo."""
import json, re, sys, time, urllib.request
from comun import info, RAIZ, UA
d = json.load(open(RAIZ / "datos-crudos/vols.json"))
V1 = ["ALUCINACIONES DEL QUIJOTE.jpg", "Adventure with the Windmills.jpg", "Cap II Chegada de Quixote a uma estalagem.jpg",
      "Cap III Quixote a velar armas.jpg", "Cap VIII Dom Quixote caido Gustave Doré.jpg", "Cap XVIII Dom Quixote acomete um dos exércitos.jpg",
      "Cap XX Dom Quixote e Sancho Pança aproximando-se do pisão.jpg", "Cap XX Sancho Pança ri-se do engano.jpg",
      "Cap XXI Dom Quixote avista o elmo de Mambrino.jpg", "Cap XXI Dom Quixote e o elmo de Mambrino.jpg", "Cap XXXV a.jpg",
      "Cap VI A queima dos livros Doré.jpg", "Cap XIX Dom Quixote ataca no escuro.jpg", "Cap XXII Dom Quixote liberta os condenados.jpg"]
V2 = [n for n in d["v2"] if re.match(r"Cap 0?(10|17|026|041|074),", n)]
lista = V1 + V2
meta = info(lista, ancho=330)
out = RAIZ / "datos-crudos/cand"; out.mkdir(parents=True, exist_ok=True)
for i, n in enumerate(lista):
    m = meta.get(n, {})
    if m.get("falta"): print("FALTA", n); continue
    f = out / f"{i:02d}.jpg"
    if not f.exists():
        for k in range(3):
            try:
                with urllib.request.urlopen(urllib.request.Request(m["thumb"], headers={"User-Agent": UA}), timeout=30) as r: f.write_bytes(r.read())
                break
            except Exception as e: print("aviso", e); time.sleep(10)
        time.sleep(3)
    print(f"{i:02d} {m['w']}x{m['h']} {m['LicenseShortName']} | {n[:70]}")
json.dump({"lista": lista, "meta": meta}, open(RAIZ / "datos-crudos/cand.json", "w"), ensure_ascii=False)
