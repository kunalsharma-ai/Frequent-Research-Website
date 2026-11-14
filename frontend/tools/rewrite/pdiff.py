import sys
from PIL import Image, ImageChops
for n in sys.argv[1:]:
    a=Image.open(f'/tmp/claude-0/cmp-{n}-a.png').convert('RGB');b=Image.open(f'/tmp/claude-0/cmp-{n}-b.png').convert('RGB')
    d=ImageChops.difference(a,b).convert('L').point(lambda v:255 if v>24 else 0)
    cnt=d.histogram()[255]
    print(n,'diff px',cnt,round(100*cnt/(a.width*a.height),3),'%',d.getbbox())
