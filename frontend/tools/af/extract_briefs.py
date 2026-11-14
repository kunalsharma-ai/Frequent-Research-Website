"""Extracts hero copy, capabilities, process, FAQs, industries and keywords from the 16 Accounts & Finance briefs
(docx converted to text, one file per brief).
Usage: python3 tools/af/extract_briefs.py <folder of brief .txt files> tools/af/briefs.json
"""
import re,os,sys,json
src=sys.argv[1]
out={}
def sec(lines,start_pat,end_pat=r'^\d{1,2}\. [A-Z]'):
    s=None
    for i,l in enumerate(lines):
        if s is None and re.search(start_pat,l): s=i; continue
        if s is not None and re.match(end_pat,l): return lines[s:i]
    return lines[s:] if s is not None else []
for f in sorted(os.listdir(src)):
    if not f[0].isdigit(): continue
    L=open(os.path.join(src,f)).read().split('\n')
    d={}
    # hero
    hero=sec(L,r'HERO SECTION|Hero Section|^Hero section|Main Headline')
    d['hero']=[x for x in hero[:14] if x.strip()]
    # capabilities
    caps=[];cur=None
    capsec=sec(L,r'DETAILED .*CAPABILITIES|Service Categories|Service overview|^Heading: Complete')
    for l in capsec:
        m=re.match(r'^(?:SERVICE \d+: )(.+)',l) or re.match(r'^\d{1,2}\. (.+)$',l)
        if m:
            cur=[m.group(1).strip(),[]];caps.append(cur);continue
        if cur and l.strip() and not l.startswith(('Cover','CTA','Create','Every service','Explain','Clarify','Do not','Only','Where','Clearly')):
            cur[1].append(l.strip().rstrip('.'))
    d['caps']=caps
    # faq
    fq=sec(L,r'FAQ SECTION|^\d+\. Frequently Asked Questions|FAQ')
    d['faq']=[x.strip() for x in fq if x.strip().endswith('?')]
    # process
    pr=sec(L,r'WORK PROCESS|Delivery Process|Our .*Process$|ITR Filing Process|Tax Advisory Process')
    d['process']=[x.strip() for x in pr if re.match(r'^(Step|Phase|Stage)\s*\d',x.strip())]
    # industries
    ind=sec(L,r'INDUSTRY-SPECIFIC|Who Can Benefit')
    d['ind']=[x.strip().rstrip('.') for x in ind if 2<len(x.strip())<60 and not x.strip().endswith(':')][:20]
    # keywords
    kw=sec(L,r'SEO KEYWORD STRATEGY|SEO STRATEGY|Keyword Research|SEO Keyword Research')
    d['kw']=[x.strip() for x in kw if 2<len(x.strip())<60][:40]
    out[f]=d
json.dump(out,open(sys.argv[2],'w'),indent=0,ensure_ascii=False)
for f,d in out.items():
    print('=====',f)
    print('HERO:',' | '.join(d['hero'])[:700])
    print('CAPS:')
    for t,b in d['caps']: print('  -',t,':',' / '.join(b[:12])[:400])
    print('PROCESS:',' | '.join(d['process'])[:600])
    print('FAQ:',' | '.join(d['faq'])[:1500])
    print('IND:',', '.join(d['ind'])[:400])
