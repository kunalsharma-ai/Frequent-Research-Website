# Remove top-level declarations (function X / const X) from a JSX file by name.
# Usage: python3 dropdecl.py file.jsx Name1 Name2 ...
import sys,re
p=sys.argv[1]; names=set(sys.argv[2:])
lines=open(p).read().split('\n')
blocks=[];cur=[]
for ln in lines:
    if re.match(r'(function |const |/\*)',ln) and cur:
        blocks.append(cur);cur=[]
    cur.append(ln)
blocks.append(cur)
out=[];dropped=[]
for b in blocks:
    m=re.match(r'(?:function|const) (\w+)',b[0])
    if m and m.group(1) in names:
        dropped.append(m.group(1));continue
    out.append(b)
# remove section comments followed directly by nothing meaningful: keep (harmless)
open(p,'w').write('\n'.join('\n'.join(b) for b in out))
missing=names-set(dropped)
print('dropped',len(dropped),'missing',sorted(missing))
