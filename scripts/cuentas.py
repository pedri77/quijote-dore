"""Recuentos sobre el texto completo (Project Gutenberg #2000), de «En un lugar de la Mancha» al final."""
import json, re
from comun import RAIZ
t = (RAIZ / "datos-crudos/quijote.txt").read_text(encoding="utf-8")
cuerpo = t[t.index("En un lugar de la Mancha"):t.index("*** END")]
PALABRAS = {"palabras": None, "castillo": r"castillos?", "gigante": r"gigantes?", "encantador": r"encantador(?:es)?",
            "Dulcinea": r"Dulcinea", "locura": r"locuras?", "cuerdo": r"cuerdos?", "Sancho": r"Sancho", "Rocinante": r"Rocinante"}
out = {k: (len(cuerpo.split()) if v is None else len(re.findall(r"\b" + v + r"\b", cuerpo))) for k, v in PALABRAS.items()}
json.dump(out, open(RAIZ / "src/datos/cuentas.json", "w"), ensure_ascii=False, indent=1)
print(out)
