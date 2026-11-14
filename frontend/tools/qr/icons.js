// Render brand icons (react-icons) to 256px PNGs for QR centre logos. Build tooling only.
const M=(()=>{try{require.resolve('react');return ''}catch(e){return '/opt/npm-tools/node_modules/'}})();
const React=require(M+'react'),S=require(M+'react-dom/server'),sharp=require(M+'sharp');
const fa6=require(M+'react-icons/fa6'),fc=require(M+'react-icons/fc');
const out=process.argv[2];
const L=[['linkedin',fa6.FaLinkedin,'#0A66C2'],['youtube',fa6.FaYoutube,'#FF0000'],['facebook',fa6.FaFacebook,'#0866FF'],['x',fa6.FaXTwitter,'#000000'],['pinterest',fa6.FaPinterest,'#E60023'],['google',fc.FcGoogle,null]];
(async()=>{
for(const [n,C,col] of L){let svg=S.renderToStaticMarkup(React.createElement(C,{size:256,color:col||undefined}));
 if(!svg.includes('xmlns'))svg=svg.replace('<svg','<svg xmlns="http://www.w3.org/2000/svg"');
 await sharp(Buffer.from(svg),{density:300}).resize(256,256,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toFile(out+'/'+n+'.png');}
// Instagram: gradient glyph
const ig=S.renderToStaticMarkup(React.createElement(fa6.FaInstagram,{size:256})).replace(/currentColor/g,'url(#g)').replace(/color:[^;"]*;?/g,'').replace(/(<svg[^>]*>)/,'$1<defs><radialGradient id="g" cx="30%" cy="107%" r="150%"><stop offset="0" stop-color="#fdf497"/><stop offset=".05" stop-color="#fdf497"/><stop offset=".45" stop-color="#fd5949"/><stop offset=".6" stop-color="#d6249f"/><stop offset=".9" stop-color="#285AEB"/></radialGradient></defs>');
await sharp(Buffer.from(ig),{density:300}).resize(256,256,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toFile(out+'/instagram.png');
console.log('ok');})();
