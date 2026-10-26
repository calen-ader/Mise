/* Mise glass system: every drink drawn from its recipe data.
   glassSVG(d) -> inline SVG string. Shapes are flat inks on a coloured tile. */
(function(){
const INK={pa:'#f3eee4',ul:'#1d2bd6',co:'#ee4a36',su:'#f7c21b',ink:'#141414',fo:'#12513a',bl:'#f2b7ae'};
const TILES=['ul','co','su','ink','fo','bl'];
// hand-set liquid inks (flat, not photo-sampled)
const LIQ={'alexander':'#d9b98f','americano':'#d7322a','angel-face':'#e39a3b','aviation':'#b7a6f0','bee-s-knees':'#f2c14e','bellini':'#f6b27a','between-the-sheets':'#e9a54a','black-russian':'#3b1d12','bloody-mary':'#c9341f','boulevardier':'#a8301e','bramble':'#7a1e4a','brandy-crusta':'#e08a2c','caipirinha':'#e6efc7','canchanchara':'#ecdba0','cardinale':'#d24a2a','casino':'#f1e6c0','champagne-cocktail':'#f2c14e','chartreuse-swizzle':'#c8d84a','clover-club':'#e8456b','corpse-reviver-2':'#f3e2a6','cosmopolitan':'#f07a9a','cuba-libre':'#3b1d12','daiquiri':'#eef0cf','dark-n-stormy':'#b0703a','don-s-special-daiquiri':'#f2c14e','dry-martini':'#eef1e2','espresso-martini':'#2a1712','fernandito':'#2e1a12','french-75':'#f5e7b0','french-connection':'#b5651e','french-martini':'#d94a6a','garibaldi':'#f39a2c','gin-basil-smash':'#9fd36a','gin-fizz':'#f3efdf','grand-margarita':'#f1df98','grasshopper':'#9ed8a4','hanky-panky':'#8a2f1a','hemingway-special':'#f6d6c4','horse-s-neck':'#e9b456','iba-tiki':'#e48a30','illegal':'#efe9cf','irish-coffee':'#3b1d12','john-collins':'#f3efdf','jungle-bird':'#c2361f','kir':'#b0284f','last-word':'#c8d84a','lemon-drop-martini':'#f5ec9a','long-island-iced-tea':'#8a4a1e','mai-tai':'#e39a3b','manhattan':'#8f2a14','margarita':'#eef0c4','martinez':'#a7451f','mary-pickford':'#f07a6a','mimosa':'#f7a83a','mint-julep':'#e3b25a','missionary-s-downfall':'#b9dc6a','mojito':'#d8ecb6','monkey-gland':'#f08a5a','moscow-mule':'#e9dfa8','naked-and-famous':'#f39a2c','negroni':'#d7322a','new-york-sour':'#e9b456','old-cuban':'#d79a4a','old-fashioned':'#d47a26','paloma':'#f4c6b8','paper-plane':'#f08a24','paradise':'#f39a2c','penicillin':'#e9b456','pina-colada':'#f3ead2','pisco-punch':'#f1df98','pisco-sour':'#f3ead2','planters-punch':'#d0541f','porn-star-martini':'#f5c84c','porto-flip':'#8e3a3a','rabo-de-galo':'#8a3a1c','ramos-fizz':'#f6f1e2','remember-the-maine':'#8a2a18','russian-spring-punch':'#b0284f','rusty-nail':'#d98b2b','sazerac':'#c6602a','sea-breeze':'#e0485a','sex-on-the-beach':'#f0743a','sherry-cobbler':'#d9a44a','sidecar':'#e9a54a','singapore-sling':'#ef6a6a','south-side':'#cfe6a8','spicy-fifty':'#f2d6a0','spritz':'#f06a1f','stinger':'#d9b07a','suffering-bastard':'#d48a3a','tequila-sunrise':'#f5a623','three-dots-and-a-dash':'#e48a30','tipperary':'#b04a24','tommy-s-margarita':'#eef0c4','trinidad-sour':'#a9342a','tuxedo':'#f1ecd8','ve-n-to':'#f3ead2','vesper':'#f3e6b0','vieux-carr':'#9a3a1a','whiskey-sour':'#edc77a','white-lady':'#f3efdf','zombie':'#e48a30'};
const LAYER={'tequila-sunrise':{bottom:'#d7322a'},'dark-n-stormy':{top:'#4a2416'},'new-york-sour':{top:'#6e1230'},'irish-coffee':{top:'#f3ead2',th:22},'bramble':{bottom:'#4a0f2c'}};
const FIZZ=['soda','sparkling','champagne','prosecco','cola','ginger-beer','ginger-ale','grapefruit-soda'];
// glass shapes on a 200x240 canvas, ground at y=232
const P={
 coupe:{o:'M26 78Q26 146 100 148Q174 146 174 78Z',i:'M33 84Q34 140 100 141Q166 140 167 84Z',f:92,r:[26,174,78],st:[148,74],ft:44},
 slim:{o:'M46 72Q46 138 100 140Q154 138 154 72Z',i:'M52 78Q53 132 100 133Q147 132 148 78Z',f:86,r:[46,154,72],st:[140,78],ft:38},
 goblet:{o:'M40 62L160 62Q162 150 100 156Q38 150 40 62Z',i:'M46 68L154 68Q154 144 100 149Q46 144 46 68Z',f:84,r:[40,160,62],st:[156,62],ft:42},
 martini:{o:'M20 60L180 60L100 148Z',i:'M32 66L168 66L100 140Z',f:76,r:[20,180,60],st:[146,72],ft:40},
 flute:{o:'M74 22L126 22Q130 120 104 150L96 150Q70 120 74 22Z',i:'M79 28L121 28Q124 116 102 143L98 143Q76 116 79 28Z',f:46,r:[74,126,22],st:[150,68],ft:36},
 wine:{o:'M48 50L152 50Q172 130 100 156Q28 130 48 50Z',i:'M54 56L146 56Q163 126 100 149Q37 126 54 56Z',f:96,r:[48,152,50],st:[156,62],ft:40},
 rocks:{o:'M36 100L164 100L158 222Q158 232 148 232L52 232Q42 232 42 222Z',i:'M43 108L157 108L152 206L48 206Z',f:132,r:[36,164,100]},
 dof:{o:'M30 84L170 84L164 222Q164 232 154 232L46 232Q36 232 36 222Z',i:'M37 92L163 92L158 206L42 206Z',f:116,r:[30,170,84]},
 low:{o:'M48 116L152 116L148 224Q148 232 140 232L60 232Q52 232 52 224Z',i:'M54 123L146 123L143 210L57 210Z',f:144,r:[48,152,116]},
 highball:{o:'M56 30L144 30L140 224Q140 232 132 232L68 232Q60 232 60 224Z',i:'M62 36L138 36L135 212L65 212Z',f:60,r:[56,144,30]},
 collins:{o:'M64 18L136 18L134 226Q134 232 128 232L72 232Q66 232 66 226Z',i:'M69 24L131 24L129 214L71 214Z',f:48,r:[64,136,18]},
 hurricane:{o:'M64 24L136 24Q150 90 124 120Q112 140 130 186Q132 196 112 198L112 214L132 226Q134 232 126 232L74 232Q66 232 68 226L88 214L88 198Q68 196 70 186Q88 140 76 120Q50 90 64 24Z',i:'M70 30L130 30Q142 90 118 118Q106 140 123 184Q124 191 108 192L92 192Q76 191 77 184Q94 140 82 118Q58 90 70 30Z',f:54,r:[64,136,24]},
 irish:{o:'M54 40L146 40L140 150Q138 160 126 160L74 160Q62 160 60 150Z',i:'M60 46L140 46L135 148Q134 154 126 154L74 154Q66 154 65 148Z',f:60,r:[54,146,40],st:[160,58],ft:40,h:'M146 64Q176 66 174 100Q172 132 142 132L142 120Q160 118 161 100Q162 78 145 78Z'},
 copper:{o:'M48 70L140 70L136 226Q136 232 128 232L60 232Q52 232 52 226Z',r:[48,140,70],op:'#c8743e',h:'M140 100Q178 100 176 140Q174 176 138 176L138 162Q160 160 161 140Q162 114 140 114Z'},
 tiki:{o:'M56 44L144 44L148 226Q148 232 140 232L60 232Q52 232 52 226Z',r:[56,144,44],op:'#8a5a3a',face:1},
 julep:{o:'M50 90L150 90L142 200L118 206L122 222Q124 232 112 232L88 232Q76 232 78 222L82 206L58 200Z',r:[50,150,90],op:'#cfcac0',frost:1},
 clay:{o:'M44 96L156 96Q166 150 148 200Q140 232 100 232Q60 232 52 200Q34 150 44 96Z',r:[44,156,96],op:'#c56a3c'}
};
const SHAPE={cocktail:'coupe',slim:'slim',goblet:'goblet',cobbler:'goblet',martini:'martini',flute:'flute',wine:'wine',rocks:'rocks',dof:'dof','small-tumbler':'low',highball:'highball','tall-tumbler':'highball',collins:'collins',hurricane:'hurricane',irish:'irish',copper:'copper',tiki:'tiki',julep:'julep',clay:'clay'};
const hx=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16));
const dist=(a,b)=>{a=hx(a);b=hx(b);const r=(a[0]+b[0])/2;return Math.sqrt((2+r/256)*(a[0]-b[0])**2+4*(a[1]-b[1])**2+(2+(255-r)/256)*(a[2]-b[2])**2)};
const hash=s=>{let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h};
let uid=0;
const CIT={orange:['#f08a24','#f7c21b'],lemon:['#f7c21b','#fbe58a'],lime:['#3e9e3a','#b9dc6a']};
function wheel(x,y,r,k,rot){const[c1,c2]=CIT[k];return `<g transform="rotate(${rot||0} ${x} ${y})"><path d="M${x-r} ${y}a${r} ${r} 0 0 1 ${2*r} 0z" fill="${c1}"/><path d="M${x-r*.8} ${y}a${r*.8} ${r*.8} 0 0 1 ${r*1.6} 0z" fill="${c2}"/><path d="M${x} ${y}l${-r*.55} ${-r*.5}M${x} ${y}v${-r*.75}M${x} ${y}l${r*.55} ${-r*.5}" stroke="${c1}" stroke-width="${r/10}"/></g>`}
function peel(x,y,k){return `<path d="M${x-6} ${y-30}q20 4 10 24q-8 16 10 32" fill="none" stroke="${CIT[k][0]}" stroke-width="9" stroke-linecap="round"/>`}
function cherry(x,y){return `<path d="M${x} ${y-10}q6-26 26-34" fill="none" stroke="${INK.ink}" stroke-width="2.6"/><circle cx="${x}" cy="${y}" r="10" fill="#c81d3a"/><circle cx="${x-3}" cy="${y-3}" r="2.6" fill="#fff" opacity=".45"/>`}
function pick(x1,y1,x2,y2){return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${INK.ink}" stroke-width="3" stroke-linecap="round"/>`}
function olive(x,y){return `<ellipse cx="${x}" cy="${y}" rx="12" ry="9" transform="rotate(-58 ${x} ${y})" fill="#6f8f2a"/><circle cx="${x-4}" cy="${y+7}" r="3.6" fill="${INK.co}"/>`}
function berries(pts,c){return pts.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9.5" fill="${c}"/><circle cx="${x-3}" cy="${y-3}" r="2.4" fill="#fff" opacity=".4"/>`).join('')}
function mint(x,y){return `<g fill="#2f9e5a"><ellipse cx="${x}" cy="${y}" rx="16" ry="8" transform="rotate(-35 ${x} ${y})"/><ellipse cx="${x+18}" cy="${y-12}" rx="16" ry="8" transform="rotate(25 ${x+18} ${y-12})"/><ellipse cx="${x-6}" cy="${y-20}" rx="14" ry="7" transform="rotate(-75 ${x-6} ${y-20})"/><ellipse cx="${x+10}" cy="${y-30}" rx="12" ry="6" transform="rotate(80 ${x+10} ${y-30})"/></g><path d="M${x+4} ${y+14}L${x+6} ${y-26}" stroke="#1e6b3c" stroke-width="3"/>`}
function pineapple(x,y){return `<path d="M${x-22} ${y+6}L${x+22} ${y+6}L${x} ${y-26}Z" fill="${INK.su}"/><path d="M${x-22} ${y+6}L${x+22} ${y+6}L${x+19} ${y+12}L${x-19} ${y+12}Z" fill="#b8860b"/><path d="M${x-4} ${y-24}l-10-22l12 14l2-20l6 20l10-14l-8 22z" fill="#2f9e5a"/>`}
function passion(x,y){return `<circle cx="${x}" cy="${y}" r="17" fill="#5b2a5e"/><circle cx="${x}" cy="${y}" r="13" fill="${INK.su}"/>${[[-5,-4],[4,-6],[-2,4],[6,3],[0,-1]].map(([a,b])=>`<circle cx="${x+a}" cy="${y+b}" r="1.8" fill="${INK.ink}"/>`).join('')}`}
function celery(x,y){return `<path d="M${x} ${y}L${x+20} ${y-90}" stroke="#8cc63f" stroke-width="12" stroke-linecap="round"/><g fill="#5aa832"><ellipse cx="${x+22}" cy="${y-100}" rx="12" ry="7" transform="rotate(-40 ${x+22} ${y-100})"/><ellipse cx="${x+30}" cy="${y-90}" rx="11" ry="6" transform="rotate(20 ${x+30} ${y-90})"/></g>`}
function chili(x,y){return `<path d="M${x-4} ${y-30}q-4 30 14 46q-22-6-24-40z" fill="#d8231f"/><path d="M${x-4} ${y-30}l4-8" stroke="#2f9e5a" stroke-width="4" stroke-linecap="round"/>`}
function beans(cx,y){return [-14,0,14].map(a=>`<ellipse cx="${cx+a}" cy="${y}" rx="6" ry="4" fill="#2a1712"/><path d="M${cx+a-4} ${y}h8" stroke="#6b4630" stroke-width="1.2"/>`).join('')}
function specks(xl,xr,y,c,n){let s='',h=11;for(let i=0;i<n;i++){h=(h*7919+13)%997;s+=`<circle cx="${xl+((h%100)/100)*(xr-xl)}" cy="${y+(h%7)-2}" r="1.6" fill="${c}"/>`}return s}
function rim(xl,xr,y,half){let s='';const end=half?(xl+xr)/2:xr;for(let x=xl+3;x<=end;x+=5)s+=`<circle cx="${x}" cy="${y+1}" r="2.6" fill="#fff"/>`;return s}
function straw(x,y,c){return `<rect x="${x}" y="${y-70}" width="7" height="150" rx="1" fill="${c}" transform="rotate(14 ${x} ${y})"/>`}
function ginger(x,y){return `<rect x="${x-7}" y="${y-7}" width="14" height="14" fill="#f3d27a" transform="rotate(12 ${x} ${y})"/>`}
function grapes(x,y){return [[0,0],[12,4],[5,12]].map(([a,b])=>`<circle cx="${x+a}" cy="${y+b}" r="7" fill="#c9df8a"/>`).join('')}

function pickBG(d){const S=P[SHAPE[d.glass]||'coupe'],liq=LIQ[d.id]||d.color||'#e9a54a',h=hash(d.id);for(let j=0;j<TILES.length;j++){const c=INK[TILES[(h+j)%TILES.length]];if(dist(c,liq)>200&&(!S.op||dist(c,S.op)>150))return c}return INK.ink}
window.glassBG=pickBG;window.glassLiq=d=>LIQ[d.id]||d.color||'#e9a54a';
window.glassSVG=function(d,opt){opt=opt||{};
 const k=SHAPE[d.glass]||'coupe',S=P[k],id='g'+(++uid);
 const liq=LIQ[d.id]||d.color||'#e9a54a',L=LAYER[d.id]||{};
 const ings=(d.lines||[]).flatMap(l=>l.ids||[]);
 const has=x=>ings.includes(x);
 const bg=opt.bg||pickBG(d);
 const G=mix(INK.pa,bg,.2),[xl,xr,ry]=S.r,cx=(xl+xr)/2,w=xr-xl;
 const g=((d.garnish&&d.garnish.en)||'').toLowerCase(),ice=d.ice;
 const foam=has('egg-white')||has('egg-yolk')?'#f1e6cf':has('espresso')?'#c9a77a':null;
 const fizz=FIZZ.some(has);
 let back='',body='',front='',top='';
 // stem + foot
 if(S.st){body+=`<rect x="${100-4}" y="${S.st[0]-2}" width="8" height="${S.st[1]+4}" fill="${G}"/><ellipse cx="100" cy="224" rx="${S.ft}" ry="8" fill="${G}"/>`}
 if(S.h)body+=`<path d="${S.h}" fill="${S.op?shade(S.op):G}"/>`;
 if(S.op){
  // opaque vessel: show the top (ice dome) and the vessel
  const dome=ice==='crushed'||ice==='cracked'||ice==='blended';
  if(dome)back+=`<path d="M${xl+4} ${ry+2}Q${cx-30} ${ry-34} ${cx} ${ry-36}Q${cx+30} ${ry-34} ${xr-4} ${ry+2}Z" fill="#fff" opacity=".92"/>${specks(xl+20,xr-20,ry-18,'#d9e8ee',14)}`;
  else back+=`<rect x="${cx-34}" y="${ry-22}" width="30" height="30" fill="#fff" opacity=".9" transform="rotate(-10 ${cx-19} ${ry-7})"/><rect x="${cx+2}" y="${ry-18}" width="28" height="28" fill="#fff" opacity=".85" transform="rotate(12 ${cx+16} ${ry-4})"/>`;
  body+=`<path d="${S.o}" fill="${S.op}"/>`;
  if(k==='copper')body+=`<path d="M52 92H140M53 204H137" stroke="${shade(S.op)}" stroke-width="6"/>`;
  if(S.face)body+=`<g fill="#4a2c1a"><rect x="70" y="92" width="22" height="10"/><rect x="108" y="92" width="22" height="10"/><path d="M96 110h8l4 40h-16z"/><rect x="72" y="168" width="56" height="12"/><path d="M72 168v-8M86 168v-8M100 168v-8M114 168v-8M128 168v-8" stroke="#4a2c1a" stroke-width="5"/></g>`;
  if(S.frost)body+=`<g fill="#fff" opacity=".55">${specks(64,136,120,'#fff',18)}${specks(70,130,160,'#fff',14)}</g>`;
 }else{
  const top0=ice==='crushed'||ice==='blended'?S.r[2]+6:S.f;
  body+=`<path d="${S.o}" fill="${G}"/><clipPath id="${id}"><path d="${S.i}"/></clipPath>`;
  let inner=`<rect x="0" y="${top0}" width="200" height="240" fill="${liq}"/>`;
  if(L.bottom)inner+=`<rect x="0" y="${top0+(232-top0)*.6}" width="200" height="240" fill="${L.bottom}"/>`;
  if(L.top)inner+=`<rect x="0" y="${top0}" width="200" height="${L.th||12}" fill="${L.top}"/>`;
  if(foam)inner+=`<rect x="0" y="${top0}" width="200" height="13" fill="${foam}"/>`;
  if(ice==='cubes'||ice==='cracked'){const s=Math.min(46,w*.34);inner+=`<g fill="${G}" opacity=".3"><rect x="${cx-s-4}" y="${top0-8}" width="${s}" height="${s}" transform="rotate(-12 ${cx-s/2-4} ${top0-8+s/2})"/><rect x="${cx+2}" y="${top0+s*.4}" width="${s*.92}" height="${s*.92}" transform="rotate(14 ${cx+2+s*.46} ${top0+s*.86})"/><rect x="${cx-s*.7}" y="${top0+s*1.25}" width="${s*.85}" height="${s*.85}" transform="rotate(6 ${cx-s*.28} ${top0+s*1.67})"/></g>`}
  if(ice==='crushed'){let s='',h=5;for(let i=0;i<26;i++){h=(h*7919+31)%1009;s+=`<rect x="${xl+(h%100)/100*w}" y="${top0+(h%140)}" width="${8+h%7}" height="${7+h%5}" transform="rotate(${h%60-30} ${xl+(h%100)/100*w} ${top0+(h%140)})"/>`}inner+=`<g fill="${G}" opacity=".4">${s}</g>`}
  if(fizz){let s='',h=3;for(let i=0;i<9;i++){h=(h*7919+7)%1013;s+=`<circle cx="${cx-w*.3+(h%100)/100*w*.6}" cy="${top0+20+(h%120)}" r="${2+h%3}"/>`}inner+=`<g fill="${G}" opacity=".55">${s}</g>`}
  body+=`<g clip-path="url(#${id})">${inner}<rect x="${xl+10}" y="${ry}" width="7" height="240" fill="${bg}" opacity=".28"/></g>`;
  if(ice==='crushed'||ice==='blended')top+=`<path d="M${xl+6} ${ry+6}Q${cx-30} ${ry-26} ${cx} ${ry-28}Q${cx+30} ${ry-26} ${xr-6} ${ry+6}Z" fill="${ice==='blended'?liq:'#fff'}" opacity="${ice==='blended'?1:.9}"/>`;
  if(has('nutmeg')||/nutmeg/.test(g))top+=specks(xl+16,xr-16,top0+4,'#7a4a2a',14);
  if(/amargo|bitters on top/.test(g))top+=[cx-14,cx,cx+14].map(x=>`<circle cx="${x}" cy="${top0+6}" r="3" fill="#8e1d2c"/>`).join('');
  if(has('espresso'))top+=beans(cx,top0+6);
  if(/passion/.test(g))top+=passion(cx,top0-2);
 }
 // garnish on the rim
 const gx=xr-14,gy=ry;
 if(/salt rim|sugar rim|dipped in sugar|half salt/.test(g))front+=rim(xl,xr,ry-3,/half/.test(g));
 if(/celery/.test(g))front+=celery(xr-30,ry+40);
 if(/olive/.test(g))front+=pick(xr+6,ry-44,cx,S.f+30)+olive(cx+18,S.f+4);
 if(/raspberr|blackberr|berries/.test(g))front+=pick(xl+10,ry-24,xr+8,ry-6)+berries([[xl+40,ry-18],[cx,ry-13],[xr-36,ry-8]],/black/.test(g)?'#2b1630':'#d8335e');
 if(/mint/.test(g)&&!/optional mint leaf/.test(g))front+=mint(cx+6,ry-14);
 else if(/mint leaf/.test(g))front+=`<ellipse cx="${cx}" cy="${S.f||ry}" rx="14" ry="7" fill="#2f9e5a" transform="rotate(-20 ${cx} ${S.f||ry})"/>`;
 if(/pineapple/.test(g))front+=pineapple(gx-6,ry-4);
 else if(/orange slice|orange wedge|orange wheel/.test(g))front+=wheel(gx,ry+4,28,'orange',/wedge/.test(g)?-20:0);
 else if(/lime (slice|wedge|wheel)/.test(g))front+=wheel(gx,ry+4,24,'lime',/wedge/.test(g)?-20:0);
 else if(/lemon (slice|wedge|wheel)|citrus/.test(g))front+=wheel(gx,ry+4,24,'lemon',/wedge/.test(g)?-20:0);
 if(/orange (zest|twist|peel)|lemon or orange/.test(g)&&!/slice/.test(g))front+=peel(gx,ry,'orange');
 else if(/lemon (zest|twist|peel|rind)|lemon twist|long peel/.test(g)&&!/slice|wheel/.test(g))front+=peel(gx,ry,'lemon');
 else if(/lime peel/.test(g))front+=peel(gx-40,ry,'lime');
 if(/cherr/.test(g))front+=cherry(xl+30,ry-6);
 if(/chili/.test(g))front+=chili(gx,ry);
 if(/ginger/.test(g))front+=pick(xr+4,ry-36,cx+10,S.f+20)+ginger(cx+30,ry-8);
 if(/grape/.test(g))front+=grapes(gx-10,ry-12);
 if(/three cherries/.test(g))front+=pick(xl,ry-30,xr,ry-30)+cherry(cx-20,ry-30)+cherry(cx,ry-30)+cherry(cx+20,ry-30);
 if(ice==='hot')front+=`<path d="M${cx-14} ${ry-10}q-8-12 0-24q8-12 0-24M${cx+12} ${ry-14}q-8-12 0-24q8-12 0-24" fill="none" stroke="${G}" stroke-width="4" stroke-linecap="round" opacity=".7"/>`;
 if((k==='highball'||k==='collins'||k==='hurricane'||S.op)&&(ice==='crushed'||ice==='blended'||/straw/.test(g)))back+=straw(cx+10,ry+10,bg===INK.ink?INK.co:INK.ink);
 const tile=opt.noTile?'':`<rect width="200" height="240" fill="${bg}"/>`;
 return `<svg viewBox="0 0 200 240" class="gl" aria-hidden="true">${tile}<g transform="translate(${opt.full?0:16} ${opt.full?0:38}) scale(${opt.full?1:.84})">${back}${body}${top}${front}</g></svg>`;
};
function mix(a,b,t){a=hx(a);b=hx(b);return '#'+a.map((v,i)=>Math.round(v*(1-t)+b[i]*t).toString(16).padStart(2,'0')).join('')}
function shade(c){return '#'+hx(c).map(v=>Math.round(v*.72).toString(16).padStart(2,'0')).join('')}
window.GLASS_INK=INK;
})();
