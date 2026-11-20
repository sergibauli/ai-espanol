import sys
from PIL import Image, ImageDraw
out=sys.argv[1]; fs=sys.argv[2:]
tw=260; th=563
cols=min(6,len(fs)); rows=(len(fs)+cols-1)//cols
c=Image.new('RGB',(cols*(tw+8),rows*(th+30)),(30,30,30)); d=ImageDraw.Draw(c)
for i,f in enumerate(fs):
  im=Image.open(f).convert('RGB'); im=im.crop((0,0,im.width,min(im.height,int(im.width*2532/1170)))); im=im.resize((tw,th))
  x=(i%cols)*(tw+8); y=(i//cols)*(th+30); c.paste(im,(x,y)); d.text((x+4,y+th+6),f.split('/')[-1][:40],fill=(255,255,0))
c.save(out)
