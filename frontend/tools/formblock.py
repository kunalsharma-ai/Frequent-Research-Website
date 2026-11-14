# Print the first <DM_Form ... /> element of a file (simple scanner; safe on formNode usage).
import sys,re
s=open(sys.argv[1]).read();i=s.index('<DM_Form');depth=0;j=i
while True:
    c=s[j]
    if c=='{':depth+=1
    elif c=='}':depth-=1
    elif s.startswith('/>',j) and depth==0:
        print(s[i:j+2]);break
    j+=1
