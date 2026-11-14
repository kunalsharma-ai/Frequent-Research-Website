"""Build src/assets/images/flags/flags-sprite.webp (+ order JSON) from Noto Color Emoji (SIL OFL 1.1).
Each cell is 40x30 px (shown at 20x15). Run: python3 tools/cc/make_flags.py"""
import json,sys,os
from PIL import Image,ImageDraw,ImageFont
sys.path.insert(0,os.path.dirname(__file__));from dial_codes import DIAL
f=ImageFont.truetype('/usr/share/fonts/truetype/noto/NotoColorEmoji.ttf',109)
W,H=40,30;isos=sorted(DIAL);cols=16;rows=(len(isos)+cols-1)//cols
sheet=Image.new('RGBA',(cols*W,rows*H),(0,0,0,0));order=[];bad=[]
for n,iso in enumerate(isos):
    ch=''.join(chr(0x1F1E6+ord(c)-65) for c in iso)
    im=Image.new('RGBA',(160,160),(0,0,0,0));ImageDraw.Draw(im).text((0,0),ch,font=f,embedded_color=True)
    bb=im.getbbox()
    if not bb or (bb[2]-bb[0])>140: bad.append(iso); continue   # renders as two letters = no flag glyph
    fl=im.crop(bb)
    # flags are drawn ~4:3 with transparent waving edges; fit into cell
    fl=fl.resize((W,H),Image.LANCZOS)
    i=len(order);sheet.paste(fl,((i%cols)*W,(i//cols)*H));order.append(iso)
rows=(len(order)+cols-1)//cols;sheet=sheet.crop((0,0,cols*W,rows*H))
os.makedirs('src/assets/images/flags',exist_ok=True)
sheet.save('src/assets/images/flags/flags-sprite.webp','WEBP',quality=82,method=6)
json.dump({'cols':cols,'w':W,'h':H,'order':order},open('src/assets/images/flags/flags-sprite.json','w'))
print(len(order),'flags; no glyph:',bad,os.path.getsize('src/assets/images/flags/flags-sprite.webp'))
