"""Parses the service-packages proposal (docx converted to text) into pricing.json.
Usage: python3 tools/af/parse_pricing.py "<Service Packages>.txt" tools/af/pricing.json
"""
import re,json,sys
L=[l.strip() for l in open(sys.argv[1]) if l.strip()]
out=[];i=0
while i<len(L):
    m=re.match(r'^(\d+)\. (.+)$',L[i])
    if m and i+1<len(L) and L[i+1].startswith('Positioning:'):
        svc={'n':int(m.group(1)),'title':m.group(2),'pos':L[i+1][12:].strip(),'rows':[]}
        i+=2
        assert L[i]=='Package',L[i]; i+=4
        while not (L[i].startswith('Key deliverables') or L[i].startswith('Not included')):
            svc['rows'].append([L[i],L[i+1],L[i+2],L[i+3]]); i+=4
        while i<len(L) and (L[i].startswith('Key deliverables') or L[i].startswith('Not included') or L[i].startswith('Important') or L[i].startswith('Positioning note')):
            k,v=L[i].split(':',1); svc[k.strip()]=v.strip(); i+=1
        out.append(svc); continue
    i+=1
json.dump(out,open(sys.argv[2],'w'),indent=1,ensure_ascii=False)
for s in out: print(s['n'],s['title'],'|',s['rows'][0],len(s['rows']),[k for k in s if k not in('n','title','pos','rows')])
