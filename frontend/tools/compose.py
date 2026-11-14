# Compose a page from a template with placeholders resolved against orig31/ files.
#   @@DECL:File.jsx:Name1,Name2@@   -> top-level declarations copied verbatim
#   @@BLOCK:File.jsx:key@@          -> a JSX section block (see jsxblock.py)
# Usage: python3 tools/compose.py template.jsx out.jsx
import sys,re,os
sys.path.insert(0,os.path.dirname(__file__))
from jsxblock import block
root=os.path.join(os.path.dirname(__file__),'..',os.environ.get('ORIG','orig31'))
def decls(fn,names):
    lines=open(os.path.join(root,fn)).read().split('\n');blocks=[];cur=[]
    for ln in lines:
        if re.match(r'(function |const |/\*)',ln) and cur: blocks.append(cur);cur=[]
        cur.append(ln)
    blocks.append(cur);out=[]
    for n in names:
        found=[b for b in blocks if re.match(r'(?:function|const) '+re.escape(n)+r'\b',b[0])]
        if not found: raise SystemExit('decl not found: '+fn+':'+n)
        out.append('\n'.join(found[0]).rstrip())
    return '\n\n'.join(out)
t=open(sys.argv[1]).read()
t=re.sub(r'@@DECL:([^:]+):([^@]+)@@',lambda m:decls(m.group(1),m.group(2).split(',')),t)
t=re.sub(r'@@BLOCK:([^:]+):([^@]+)@@',lambda m:block(open(os.path.join(root,m.group(1))).read(),m.group(2)),t)
open(sys.argv[2],'w').write(t);print('ok',sys.argv[2])
