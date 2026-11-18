import json, sys
from comun import get_json
def lista(c):
    out=[];cont={}
    while True:
        d=get_json({'action':'query','format':'json','list':'categorymembers','cmtitle':c,'cmlimit':500,'cmtype':'file',**cont})
        out+=[m['title'][5:] for m in d['query']['categorymembers']]
        if 'continue' not in d: break
        cont=d['continue']
    return out
v1=lista("Category:Illustrations by Gustave Doré in L'ingénieux hidalgo don Quichotte de la Manche (1863), Volume I")
v2=lista("Category:Illustrations by Gustave Doré in L'ingénieux hidalgo don Quichotte de la Manche (1863) - Volume II")
json.dump({"v1":v1,"v2":v2},open(sys.argv[1],'w'),ensure_ascii=False,indent=0)
print(len(v1),len(v2))
