# Compose a build-34 page: replaces @@FORM@@ with the first <DM_Form .../> from orig33/<File>.
import sys,subprocess
tpl,src,out=sys.argv[1:4]
t=open(tpl).read()
f=subprocess.run(['python3','tools/formblock.py',src],capture_output=True,text=True,timeout=20).stdout.strip()
assert f.startswith('<DM_Form'),'no form'
t=t.replace('@@FORM@@','      '+f)
open(out,'w').write(t);print('ok',out)
