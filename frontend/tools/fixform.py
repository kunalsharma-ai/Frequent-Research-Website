# Normalise a page's DM_Form: title, submitLabel, and team-free sub.  Usage: fixform.py FILE "Title" "Submit label"
import sys,re
p,title,submit=sys.argv[1:4]; s=open(p).read()
i=s.find('<DM_Form'); j=s.find('/>',s.find('chips={[',i)); j=s.find('\n',s.rfind(']}',i,j))  # end of chips
head=s[i:s.find('chips={[',i)]
new=re.sub(r'title="[^"]*"',f'title="{title}"',head,1)
new=re.sub(r'sub="[^"]*(specialist|team|expert)[^"]*"','sub="A few quick steps help us understand your goals before we talk."',new,flags=re.I)
if 'submitLabel=' in new: new=re.sub(r'submitLabel="[^"]*"',f'submitLabel="{submit}"',new)
else: new=new.replace('successTitle=',f'submitLabel="{submit}"\n        successTitle=',1)
s=s[:i]+new+s[i+len(head):]
open(p,'w').write(s); print(new)
