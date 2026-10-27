/* Mise glass system v2: every drink drawn from its recipe, then matched to the glass and garnish in its IBA photo.
   glassSVG(d) -> inline SVG string. Flat inks on a coloured tile; 200x240 canvas, ground at y=232. */
(function(){
const INK={pa:'#f3eee4',ul:'#1d2bd6',co:'#ee4a36',su:'#f7c21b',ink:'#141414',fo:'#12513a',bl:'#f2b7ae'};
const TILES=['ul','co','su','fo','bl'];
const LIQ={'alexander':'#d9b98f','americano':'#d7322a','angel-face':'#e39a3b','aviation':'#b7a6f0','bee-s-knees':'#f2c14e','bellini':'#f6b27a','between-the-sheets':'#e9a54a','black-russian':'#3b1d12','bloody-mary':'#c9341f','boulevardier':'#a8301e','bramble':'#7a1e4a','brandy-crusta':'#e08a2c','caipirinha':'#e6efc7','canchanchara':'#ecdba0','cardinale':'#d24a2a','casino':'#f1e6c0','champagne-cocktail':'#f2c14e','chartreuse-swizzle':'#c8d84a','clover-club':'#e8456b','corpse-reviver-2':'#f3e2a6','cosmopolitan':'#f07a9a','cuba-libre':'#3b1d12','daiquiri':'#eef0cf','dark-n-stormy':'#b0703a','don-s-special-daiquiri':'#f2c14e','dry-martini':'#eef1e2','espresso-martini':'#2a1712','fernandito':'#2e1a12','french-75':'#f5e7b0','french-connection':'#b5651e','french-martini':'#d94a6a','garibaldi':'#f39a2c','gin-basil-smash':'#9fd36a','gin-fizz':'#f3efdf','grand-margarita':'#f1df98','grasshopper':'#9ed8a4','hanky-panky':'#8a2f1a','hemingway-special':'#f6d6c4','horse-s-neck':'#e9b456','iba-tiki':'#e48a30','illegal':'#efe9cf','irish-coffee':'#3b1d12','john-collins':'#f3efdf','jungle-bird':'#c2361f','kir':'#b0284f','last-word':'#c8d84a','lemon-drop-martini':'#f5ec9a','long-island-iced-tea':'#8a4a1e','mai-tai':'#e39a3b','manhattan':'#8f2a14','margarita':'#eef0c4','martinez':'#a7451f','mary-pickford':'#f07a6a','mimosa':'#f7a83a','mint-julep':'#e3b25a','missionary-s-downfall':'#b9dc6a','mojito':'#d8ecb6','monkey-gland':'#f08a5a','moscow-mule':'#e9dfa8','naked-and-famous':'#f39a2c','negroni':'#d7322a','new-york-sour':'#e9b456','old-cuban':'#d79a4a','old-fashioned':'#d47a26','paloma':'#f4c6b8','paper-plane':'#f08a24','paradise':'#f39a2c','penicillin':'#e9b456','pina-colada':'#f3ead2','pisco-punch':'#f1df98','pisco-sour':'#f3ead2','planters-punch':'#d0541f','porn-star-martini':'#f5c84c','porto-flip':'#8e3a3a','rabo-de-galo':'#8a3a1c','ramos-fizz':'#f6f1e2','remember-the-maine':'#8a2a18','russian-spring-punch':'#b0284f','rusty-nail':'#d98b2b','sazerac':'#c6602a','sea-breeze':'#e0485a','sex-on-the-beach':'#f0743a','sherry-cobbler':'#d9a44a','sidecar':'#e9a54a','singapore-sling':'#ef6a6a','south-side':'#cfe6a8','spicy-fifty':'#f2d6a0','spritz':'#f06a1f','stinger':'#d9b07a','suffering-bastard':'#d48a3a','tequila-sunrise':'#f5a623','three-dots-and-a-dash':'#e48a30','tipperary':'#b04a24','tommy-s-margarita':'#eef0c4','trinidad-sour':'#a9342a','tuxedo':'#f1ecd8','ve-n-to':'#f3ead2','vesper':'#f3e6b0','vieux-carr':'#9a3a1a','whiskey-sour':'#edc77a','white-lady':'#f3efdf','zombie':'#e48a30'};
const OVR={
 'french-connection':{s:'swirl'},
 'tommy-s-margarita':{s:'swirl'},
 'rabo-de-galo':{s:'swirl'},
 'black-russian':{s:'swirl'},
 'tequila-sunrise':{s:'taper'},
 'mojito':{ice:'crushed',gar:['mint','wheel-lime']},
 'cuba-libre':{s:'tikiglass',ice:'cubes'},
 'french-75':{s:'cflute'},
 'spritz':{s:'balloon',ice:'cubes',liq:'#e8601c',gar:['wheel-in']},
 'missionary-s-downfall':{s:'fgoblet',ice:'crushed',liq:'#b9d46a',gar:['pine','mint']},
 'margarita':{s:'dcoupe',liq:'#e8ead6',gar:['salt']},
 'manhattan':{s:'scoupe',liq:'#7a2412',gar:['cherry']},
 'jungle-bird':{s:'crocks',ice:'cubes',liq:'#c2361f',foam:'#efe6da',foamH:24,gar:['pine']},
 'alexander':{s:'ctulip',liq:'#e8dcc6'},'americano':{liq:'#9e2a1c'},'angel-face':{s:'trumpet',liq:'#b8742c'},'aviation':{s:'ctulip',liq:'#dcd6e4',gar:[]},
 'bee-s-knees':{s:'ctulip',liq:'#ebe2a6'},'bellini':{s:'cflute',liq:'#f2b27e',foam:'#f6efe4'},'between-the-sheets':{s:'trumpet',liq:'#d99a3a'},
 'bloody-mary':{s:'taper',ice:'cubes',liq:'#b8321c'},'boulevardier':{s:'scoupe',liq:'#5e1a12'},'bramble':{liq:'#ece4d2',bottom:'#5a1030'},'brandy-crusta':{s:'crusta',liq:'#d08a3a',gar:['sugar','peel-orange']},
 'caipirinha':{s:'rocks',ice:'crushed',liq:'#e3e6b0',g:'lime wedge'},'canchanchara':{s:'rocks',ice:'cracked',liq:'#ece7c8',g:'lime wheel'},'cardinale':{s:'trumpet',liq:'#b0442a',gar:['peel-lemon']},
 'champagne-cocktail':{s:'coupe',liq:'#e0a85a'},'chartreuse-swizzle':{liq:'#dfe08a'},'clover-club':{liq:'#b0243e'},'corpse-reviver-2':{liq:'#ead9a8'},'cosmopolitan':{liq:'#e8b4a0'},
 'daiquiri':{s:'ctulip',liq:'#e8ead0'},'don-s-special-daiquiri':{s:'highball',liq:'#ecd59a'},'espresso-martini':{s:'martini'},'french-martini':{s:'trumpet',liq:'#d9b8a8'},
 'garibaldi':{s:'taper',liq:'#f08a4a'},'gin-basil-smash':{s:'ctulip',liq:'#d8e3a0'},'gin-fizz':{liq:'#ecebe2'},'grand-margarita':{s:'swirl',liq:'#e8e3c0'},'grasshopper':{s:'ctulip',liq:'#cfe3c8',gar:[]},
 'hanky-panky':{s:'ctulip',liq:'#6e1a14'},'hemingway-special':{s:'tcoupe',liq:'#f0c8bc',gar:[]},'horse-s-neck':{liq:'#d99a40',gar:['spiral']},'iba-tiki':{s:'tikiglass',ice:'crushed',liq:'#e8a640',gar:['fronds','wheel-lime']},
 'illegal':{s:'rocks',ice:'cubes',liq:'#e6e2cc'},'kir':{s:'cflute',liq:'#c98466'},'last-word':{s:'ctulip',liq:'#dfe2b0',gar:[]},'lemon-drop-martini':{s:'martini'},
 'mai-tai':{s:'highball'},'martinez':{s:'martini',liq:'#5a1a10'},'mary-pickford':{s:'ctulip',liq:'#b84a3a'},'mimosa':{s:'cflute',liq:'#f6b24a'},
 'mint-julep':{s:'gmug',liq:'#d9b25a'},'monkey-gland':{s:'trumpet',liq:'#e8925a',gar:[]},'moscow-mule':{s:'gmug',liq:'#e6e2cc'},'naked-and-famous':{s:'trumpet',liq:'#e8873a'},
 'negroni':{liq:'#8e1c14'},'old-cuban':{s:'dcoupe',liq:'#c0773a',gar:['leaves']},'old-fashioned':{liq:'#b8642a'},'paloma':{liq:'#e3d6d6'},'paper-plane':{liq:'#d8622a'},'paradise':{s:'ctulip',liq:'#e8a03a'},
 'pina-colada':{s:'tikiglass',ice:'blended'},'pisco-punch':{s:'dcoupe',liq:'#e3dcb4',gar:[]},'pisco-sour':{s:'ctulip'},'planters-punch':{s:'wtumbler',ice:'cubes',liq:'#e08a2a',gar:['peel-orange']},
 'porn-star-martini':{s:'tcoupe',liq:'#f2c49a',gar:['passion']},'porto-flip':{s:'ctulip',liq:'#9a6a6a'},'remember-the-maine':{s:'ctulip',liq:'#6a1a12'},'russian-spring-punch':{s:'ctulip',ice:'cubes',liq:'#c0705a'},
 'rusty-nail':{liq:'#c8a050'},'sazerac':{s:'ctulip',ice:'up',liq:'#c0602a'},'sea-breeze':{s:'rocks',liq:'#c8302a'},'sex-on-the-beach':{liq:'#f0a050'},'sherry-cobbler':{s:'gmug',liq:'#d9a44a'},
 'sidecar':{s:'trumpet',liq:'#d9903a'},'singapore-sling':{s:'fgoblet',ice:'cubes',liq:'#e8632e',foam:'#f3ece2',foamH:26,gar:['cherry-pick']},'south-side':{s:'ctulip',liq:'#d8e6b8'},'spicy-fifty':{s:'trumpet',liq:'#e6e2c0'},
 'stinger':{s:'ctulip',liq:'#d8b47a',gar:['leaves']},'suffering-bastard':{s:'tikiglass',ice:'crushed',liq:'#d0782a',gar:['mint']},'three-dots-and-a-dash':{s:'trumpet',ice:'up',liq:'#e8873a',gar:['pine-wedge']},'tipperary':{s:'ctulip',liq:'#8a2a1a'},
 'trinidad-sour':{s:'trumpet',liq:'#7a1a22'},'tuxedo':{s:'ctulip',liq:'#ece6cc'},'vesper':{s:'martini',liq:'#ece6c4'},'vieux-carr':{s:'ctulip',liq:'#6a1a12'},'whiskey-sour':{s:'trumpet',liq:'#e8d49a'},
 'white-lady':{s:'ctulip',liq:'#e6e8e4'},'zombie':{s:'tikiglass',ice:'crushed',liq:'#e8603a',gar:['mint']}
};
const LAYER={'tequila-sunrise':{bottom:'#d7322a'},'dark-n-stormy':{top:'#3a1c10',th:44},'new-york-sour':{top:'#8a1838',th:58},'irish-coffee':{top:'#f3ead2',th:22},'bramble':{bottom:'#4a0f2c'}};
const FIZZ=['soda','sparkling','champagne','prosecco','cola','ginger-beer','ginger-ale','grapefruit-soda'];
// glass shapes. o = outline; i = inside (computed for bowls); r = [rim left, rim right, rim y]; f = liquid line;
// bot = bottom of a stemmed bowl; st = stem style; ft = foot radius; cut = cut crystal; op = opaque vessel
const P={
 // the IBA photo set
 ctulip:{o:'M64 24C67 36 64 52 66 70C68 96 84 120 100 121C116 120 132 96 134 70C136 52 133 36 136 24Z',r:[64,136,24],bot:121,st:'bal',ft:40,f:38,cut:1},
 crusta:{o:'M72 70C72 88 76 112 100 132C124 112 128 88 128 70Z',r:[72,128,70],bot:132,st:'knop',ft:36,f:82,cut:1},
 dcoupe:{o:'M38 56C38 94 52 120 82 124L118 124C148 120 162 94 162 56Z',r:[38,162,56],bot:124,st:'knop',ft:44,f:70,cut:1},
 saucer:{o:'M24 68C26 104 62 122 100 123C138 122 174 104 176 68Z',r:[24,176,68],bot:123,st:'plain',ft:44,f:80},
 nick:{o:'M46 100C44 134 70 152 100 152C130 152 156 134 154 100Z',r:[46,154,100],bot:152,st:'plain',ft:40,f:112},
 fgoblet:{o:'M54 58C40 98 40 150 66 176C80 190 120 190 134 176C160 150 160 98 146 58Z',r:[54,146,58],bot:186,st:'short',ft:48,f:74},
 balloon:{o:'M52 46C38 94 42 142 72 160C88 169 112 169 128 160C158 142 162 94 148 46Z',r:[52,148,46],bot:166,st:'plain',ft:42,f:74},
 tikiglass:{o:'M56 40L144 40L141 224Q140 232 132 232L68 232Q60 232 59 224Z',i:'M62 46L138 46L135.5 214L64.5 214Z',r:[56,144,40],f:56,relief:1},
 crocks:{o:'M36 96L164 96L158 222Q158 232 148 232L52 232Q42 232 42 222Z',i:'M43 104L157 104L152 206L48 206Z',r:[36,164,96],f:128,cut:'v'},
 wtumbler:{o:'M34 66L166 66C167 140 164 196 152 222Q148 232 136 232L64 232Q52 232 48 222C36 196 33 140 34 66Z',i:'M41 73L159 73C160 140 157 190 147 210L53 210C43 190 40 140 41 73Z',r:[34,166,66],f:82},
 tcoupe:{o:'M42 40C36 72 54 102 100 104C146 102 164 72 158 40Z',r:[42,158,40],bot:104,st:'plain',ft:46,f:54},
 scoupe:{o:'M42 64C44 96 66 114 100 114C134 114 156 96 158 64Z',r:[42,158,64],bot:114,st:'plain',ft:42,f:80},
 trumpet:{o:'M50 32C56 74 78 114 100 116C122 114 144 74 150 32Z',r:[50,150,32],bot:116,st:'knop',ft:40,f:44,cut:1},
 taper:{o:'M52 22L148 22C146 90 140 150 134 224Q133 232 125 232L75 232Q67 232 66 224C60 150 54 90 52 22Z',i:'M58 28L142 28C140 90 134 150 129 214L71 214C66 150 60 90 58 28Z',r:[52,148,22],f:52,cut:'b'},
 swirl:{o:'M38 84C34 140 38 200 48 222Q50 232 62 232L138 232Q150 232 152 222C162 200 166 140 162 84Z',i:'M45 92C42 140 45 196 54 210L146 210C155 196 158 140 155 92Z',r:[38,162,84],f:112,relief:'swirl'},
 // the rest of the bar
 coupe:{o:'M26 78Q26 146 100 148Q174 146 174 78Z',i:'M33 84Q34 140 100 141Q166 140 167 84Z',f:92,r:[26,174,78],bot:148,st:'plain',ft:44},
 slim:{o:'M46 72Q46 138 100 140Q154 138 154 72Z',i:'M52 78Q53 132 100 133Q147 132 148 78Z',f:86,r:[46,154,72],bot:140,st:'plain',ft:38},
 goblet:{o:'M40 62L160 62Q162 150 100 156Q38 150 40 62Z',i:'M46 68L154 68Q154 144 100 149Q46 144 46 68Z',f:84,r:[40,160,62],bot:156,st:'plain',ft:42},
 martini:{o:'M20 60L180 60L100 148Z',i:'M32 66L168 66L100 140Z',f:76,r:[20,180,60],bot:146,st:'plain',ft:40},
 flute:{o:'M74 22L126 22Q130 120 104 150L96 150Q70 120 74 22Z',i:'M79 28L121 28Q124 116 102 143L98 143Q76 116 79 28Z',f:46,r:[74,126,22],bot:150,st:'plain',ft:36},
 cflute:{o:'M70 24L130 24Q134 104 108 140L92 140Q66 104 70 24Z',i:'M75 30L125 30Q128 100 105 133L95 133Q72 100 75 30Z',f:48,r:[70,130,24],bot:140,st:'bal',ft:38,cut:1},
 wine:{o:'M48 50L152 50Q172 130 100 156Q28 130 48 50Z',i:'M54 56L146 56Q163 126 100 149Q37 126 54 56Z',f:96,r:[48,152,50],bot:156,st:'plain',ft:40},
 rocks:{o:'M36 100L164 100L158 222Q158 232 148 232L52 232Q42 232 42 222Z',i:'M43 108L157 108L152 206L48 206Z',f:132,r:[36,164,100]},
 dof:{o:'M30 84L170 84L164 222Q164 232 154 232L46 232Q36 232 36 222Z',i:'M37 92L163 92L158 206L42 206Z',f:116,r:[30,170,84]},
 low:{o:'M48 116L152 116L148 224Q148 232 140 232L60 232Q52 232 52 224Z',i:'M54 123L146 123L143 210L57 210Z',f:144,r:[48,152,116]},
 highball:{o:'M56 30L144 30L140 224Q140 232 132 232L68 232Q60 232 60 224Z',i:'M62 36L138 36L135 212L65 212Z',f:60,r:[56,144,30]},
 collins:{o:'M64 18L136 18L134 226Q134 232 128 232L72 232Q66 232 66 226Z',i:'M69 24L131 24L129 214L71 214Z',f:48,r:[64,136,18]},
 hurricane:{o:'M64 24L136 24Q150 90 124 120Q112 140 130 186Q132 196 112 198L112 214L132 226Q134 232 126 232L74 232Q66 232 68 226L88 214L88 198Q68 196 70 186Q88 140 76 120Q50 90 64 24Z',i:'M70 30L130 30Q142 90 118 118Q106 140 123 184Q124 191 108 192L92 192Q76 191 77 184Q94 140 82 118Q58 90 70 30Z',f:54,r:[64,136,24]},
 irish:{o:'M54 40L146 40L140 150Q138 160 126 160L74 160Q62 160 60 150Z',i:'M60 46L140 46L135 148Q134 154 126 154L74 154Q66 154 65 148Z',f:60,r:[54,146,40],bot:160,st:'plain',ft:40,h:'M146 64Q176 66 174 100Q172 132 142 132L142 120Q160 118 161 100Q162 78 145 78Z'},
 copper:{o:'M48 70L140 70L136 226Q136 232 128 232L60 232Q52 232 52 226Z',r:[48,140,70],op:'#c8743e',h:'M140 100Q178 100 176 140Q174 176 138 176L138 162Q160 160 161 140Q162 114 140 114Z'},
 tiki:{o:'M56 44L144 44L148 226Q148 232 140 232L60 232Q52 232 52 226Z',r:[56,144,44],op:'#8a5a3a',face:1},
 julep:{o:'M50 90L150 90L142 200L118 206L122 222Q124 232 112 232L88 232Q76 232 78 222L82 206L58 200Z',r:[50,150,90],op:'#cfcac0',frost:1},
 gmug:{o:'M58 70L150 70L146 224Q146 232 138 232L70 232Q62 232 62 224Z',i:'M64 76L144 76L141 214L67 214Z',f:92,r:[58,150,70],h:'M60 100Q24 100 26 140Q28 178 62 178L62 164Q40 162 40 140Q40 114 60 114Z'},
 clay:{o:'M44 96L156 96Q166 150 148 200Q140 232 100 232Q60 232 52 200Q34 150 44 96Z',r:[44,156,96],op:'#c56a3c'}
};
P.tulip=P.ctulip;
// inside of a bowl: the outline pulled in from the walls and up from the bottom
function inset(S){const[xl,xr,ry]=S.r,cx=(xl+xr)/2,sx=(xr-xl-12)/(xr-xl),h=S.bot-ry,sy=(h-9)/h;
 return S.o.replace(/(-?\d+\.?\d*) (-?\d+\.?\d*)/g,(m,a,b)=>`${(cx+(a-cx)*sx).toFixed(1)} ${(ry+4+(b-ry)*sy).toFixed(1)}`).replace(/([MLCQ])(-?\d+\.?\d*) /g,(m,c,a)=>m)}
Object.values(P).forEach(S=>{if(!S.i&&!S.op&&S.bot)S.i=inset(S)});
const SHAPE={cocktail:'coupe',slim:'slim',goblet:'goblet',cobbler:'goblet',martini:'martini',flute:'flute',wine:'wine',rocks:'rocks',dof:'dof','small-tumbler':'low',highball:'highball','tall-tumbler':'highball',collins:'collins',hurricane:'hurricane',irish:'irish',copper:'copper',tiki:'tiki',julep:'julep',clay:'clay'};
const shapeOf=d=>((d.ovr||OVR[d.id])&&(d.ovr||OVR[d.id]).s)||SHAPE[d.glass]||'coupe';
const liqOf=d=>((d.ovr||OVR[d.id])&&(d.ovr||OVR[d.id]).liq)||LIQ[d.id]||d.color||'#e9a54a';
const hx=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16));
const dist=(a,b)=>{a=hx(a);b=hx(b);const r=(a[0]+b[0])/2;return Math.sqrt((2+r/256)*(a[0]-b[0])**2+4*(a[1]-b[1])**2+(2+(255-r)/256)*(a[2]-b[2])**2)};
const hash=s=>{let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h};
let uid=0;
const CIT={orange:['#f08a24','#f7c21b','#fbe3b0'],lemon:['#f7c21b','#fbe58a','#fdf3c8'],lime:['#3e9e3a','#b9dc6a','#e6f2c8']};
const LEAF=['#2f9e5a','#1e7a44','#4cb86e'];
const CHERRY='#c81d3a', PINE='#f7c21b';
const rot=(a,x,y)=>`rotate(${a} ${x} ${y})`;

/* ---- garnish parts ---- */
// flat zest strip with one twist; drawn behind the glass so the lower half reads as tucked inside
function peel(x,y,k){return spiral(x,y,k,4,.78)}
// brandy crusta: a whole peel lining the rim and standing up above it
function collar(xl,xr,ry,k){const[c1,,c3]=CIT[k],cx=(xl+xr)/2,H=26,D=18;return {back:`<path d="M${xl+3} ${ry+4}L${xl+3} ${ry-H}Q${cx} ${ry-H-9} ${xr-3} ${ry-H}L${xr-3} ${ry+4}Z" fill="${c3}"/>`,
 front:`<path d="M${xl} ${ry-H+3}Q${cx} ${ry-H+13} ${xr} ${ry-H+3}L${xr} ${ry+D}Q${cx} ${ry+D+11} ${xl} ${ry+D}Z" fill="${c1}"/><path d="M${xr-8} ${ry-H+5}Q${xr+6} ${ry-H-12} ${xr+16} ${ry-H-4}L${xr+10} ${ry-H+4}Q${xr+4} ${ry-H-2} ${xr} ${ry-H+8}Z" fill="${c1}"/>`}}
// citrus wheel slotted onto the rim (whole) or floating in the drink
function wheel(x,y,r,k,a){const[c1,c2,c3]=CIT[k];let seg='';for(let i=0;i<8;i++){const t=i*Math.PI/4;seg+=`M${x} ${y}L${(x+Math.cos(t)*r*.78).toFixed(1)} ${(y+Math.sin(t)*r*.78).toFixed(1)}`}
 return `<g transform="${rot(a||0,x,y)}"><circle cx="${x}" cy="${y}" r="${r}" fill="${c1}"/><circle cx="${x}" cy="${y}" r="${r*.86}" fill="${c3}"/><circle cx="${x}" cy="${y}" r="${r*.78}" fill="${c2}"/><path d="${seg}" stroke="${c3}" stroke-width="${(r/9).toFixed(1)}"/></g>`}
function halfWheel(x,y,r,k,a){const[c1,c2,c3]=CIT[k];return `<g transform="${rot(a||0,x,y)}"><path d="M${x-r} ${y}a${r} ${r} 0 0 1 ${2*r} 0z" fill="${c1}"/><path d="M${x-r*.86} ${y}a${r*.86} ${r*.86} 0 0 1 ${r*1.72} 0z" fill="${c3}"/><path d="M${x-r*.78} ${y}a${r*.78} ${r*.78} 0 0 1 ${r*1.56} 0z" fill="${c2}"/><path d="M${x} ${y}l${-r*.55} ${-r*.5}M${x} ${y}v${-r*.75}M${x} ${y}l${r*.55} ${-r*.5}" stroke="${c3}" stroke-width="${(r/9).toFixed(1)}"/></g>`}
function cherry(x,y,stem){return `${stem===false?'':`<path d="M${x+2} ${y-8}q4-22 22-30" fill="none" stroke="${INK.ink}" stroke-width="2.6"/>`}<circle cx="${x}" cy="${y}" r="10" fill="${CHERRY}"/><circle cx="${x-3}" cy="${y-3}" r="2.6" fill="#fff" opacity=".45"/>`}
function pick(x1,y1,x2,y2){return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${INK.ink}" stroke-width="3" stroke-linecap="round"/>`}
function onion(x,y){return `<circle cx="${x}" cy="${y}" r="10" fill="#e4d9c2"/><path d="M${x-10} ${y}a10 10 0 0 0 20 0a10 6 0 0 1 -20 0z" fill="#c4b493"/><circle cx="${x-3.5}" cy="${y-4}" r="2.6" fill="#fbf7ee"/>`}
function olive(x,y){return `<ellipse cx="${x}" cy="${y}" rx="12" ry="9" transform="${rot(-58,x,y)}" fill="#6f8f2a"/><circle cx="${x-4}" cy="${y+7}" r="3.6" fill="${INK.co}"/>`}
function berries(pts,c){return pts.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9.5" fill="${c}"/><circle cx="${x-3}" cy="${y-3}" r="2.4" fill="#fff" opacity=".4"/>`).join('')}
// one pointed leaf, base at x,y, pointing at angle a (0 = up)
function leaf(x,y,l,a,c){const w=l*.36;return `<path d="M${x} ${y}C${x-w} ${y-l*.35} ${x-w*.6} ${y-l*.8} ${x} ${y-l}C${x+w*.6} ${y-l*.8} ${x+w} ${y-l*.35} ${x} ${y}Z" fill="${c}" transform="${rot(a,x,y)}"/>`}
// a bunch of mint tips standing in crushed ice
function mint(x,y,s){s=s||1;const L=[[-52,26,0],[-24,30,1],[0,34,0],[24,30,2],[50,26,1],[-38,20,2],[36,20,0],[-8,22,2],[12,24,1]];
 return `<g>${L.map(([a,l,c],i)=>leaf(x+(i%3-1)*6*s,y+(i%2)*4,l*s,a,LEAF[c])).join('')}</g>`}
function mintLeaves(x,y){return leaf(x-4,y,26,-20,LEAF[0])+leaf(x+4,y,22,24,LEAF[2])}
// horse's neck: one long rind spiralling up out of the glass
function spiral(x,y,k,n,z){const[c1,,c3]=CIT[k];n=n||7;z=z||1;let s='';for(let i=0;i<n;i++){const yy=y-i*14*z,m=i%2?-1:1,a=13*z;s+=`<path d="M${x-a*m} ${yy}Q${x} ${yy-14*z} ${x+a*m} ${yy-8*z}L${x+a*m} ${yy+z}Q${x} ${yy-5*z} ${x-a*m} ${yy+9*z}Z" fill="${i%2?c3:c1}"/>`}return s}
// pineapple: wedge on the rim, fronds standing out of the drink
function wedge(x,y,a){return `<g transform="translate(${x} ${y}) rotate(${a==null?-8:a})"><path d="M-24 0L20 0L-2 -40Z" fill="${PINE}"/><path d="M-10 0L6 0L-2 -28Z" fill="#fbe58a"/><path d="M-26 0L22 0L20 9L-24 9Z" fill="#b8860b"/><path d="M-20 4h4M-10 4h4M0 4h4M10 4h4" stroke="#6b4a10" stroke-width="2.4"/></g>`}
function fronds(x,y,s){s=s||1;return [[-30,64,1],[-12,78,0],[6,72,2],[22,60,0],[-46,50,2]].map(([a,l,c])=>`<path d="M${x} ${y}L${x-5*s} ${y-l*s}L${x+6*s} ${y-l*s+8}Z" fill="${LEAF[c]}" transform="${rot(a,x,y)}"/>`).join('')}
function passion(x,y){return `<circle cx="${x}" cy="${y}" r="17" fill="#5b2a5e"/><circle cx="${x}" cy="${y}" r="13" fill="${INK.su}"/>${[[-5,-4],[4,-6],[-2,4],[6,3],[0,-1]].map(([a,b])=>`<circle cx="${x+a}" cy="${y+b}" r="1.8" fill="${INK.ink}"/>`).join('')}`}
function celery(x,y){return `<path d="M${x} ${y}L${x+20} ${y-90}" stroke="#8cc63f" stroke-width="12" stroke-linecap="round"/><g fill="#5aa832"><ellipse cx="${x+22}" cy="${y-100}" rx="12" ry="7" transform="${rot(-40,x+22,y-100)}"/><ellipse cx="${x+30}" cy="${y-90}" rx="11" ry="6" transform="${rot(20,x+30,y-90)}"/></g>`}
function chili(x,y){return `<path d="M${x-4} ${y-30}q-4 30 14 46q-22-6-24-40z" fill="#d8231f"/><path d="M${x-4} ${y-30}l4-8" stroke="#2f9e5a" stroke-width="4" stroke-linecap="round"/>`}
function beans(cx,y){return [-14,0,14].map(a=>`<ellipse cx="${cx+a}" cy="${y}" rx="6" ry="4" fill="#2a1712"/><path d="M${cx+a-4} ${y}h8" stroke="#6b4630" stroke-width="1.2"/>`).join('')}
function specks(xl,xr,y,c,n){let s='',h=11;for(let i=0;i<n;i++){h=(h*7919+13)%997;s+=`<circle cx="${(xl+((h%100)/100)*(xr-xl)).toFixed(1)}" cy="${y+(h%7)-2}" r="1.6" fill="${c}"/>`}return s}
// salt or sugar crusted on the outside of the rim
function crust(S,G,half,off){off=off||0;const[xl,xr,ry0]=S.r,ry=ry0+off,end=half?(xl+xr)/2:xr;let s='',h=17;const nn=Math.round(46*Math.min(1,(end-xl)/124));for(let i=0;i<nn;i++){h=(h*7919+29)%1013;const x=xl+2+(h%100)/100*(end-xl-4);if(x>end)continue;s+=`<rect x="${x.toFixed(1)}" y="${ry+1+(h%13)}" width="${2+h%3}" height="${2+h%3}" fill="#fff"/>`}
 return `<path d="M${xl+1} ${ry}L${end-1} ${ry}L${end-1} ${ry+14}L${xl+2} ${ry+14}Z" fill="#fff" opacity=".42"/>${s}`}
function straw(x,y,c){return `<rect x="${x}" y="${y-70}" width="7" height="150" rx="1" fill="${c}" transform="${rot(14,x,y)}"/>`}
function ginger(x,y){return `<rect x="${x-7}" y="${y-7}" width="14" height="14" fill="#f3d27a" transform="${rot(12,x,y)}"/>`}
function grapes(x,y){return [[0,0],[12,4],[5,12]].map(([a,b])=>`<circle cx="${x+a}" cy="${y+b}" r="7" fill="#c9df8a"/>`).join('')}

// garnish tokens: explicit in OVR.gar, otherwise read from the IBA garnish text
function tokens(g){const T=[];
 if(/half salt/.test(g))T.push('salt-half');else if(/salt rim/.test(g))T.push('salt');
 if(/sugar rim|dipped in sugar/.test(g))T.push('sugar');
 if(/celery/.test(g))T.push('celery');if(/onion/.test(g))T.push('onion');if(/olive/.test(g))T.push('olive');
 if(/raspberr|blackberr|berries/.test(g))T.push(/black/.test(g)?'berries-black':'berries');
 if(/three cherries/.test(g))T.push('cherries3');
 if(/pineapple/.test(g))T.push('pine');
 else if(/orange slice|orange wedge|orange wheel/.test(g))T.push('wheel-orange');
 else if(/lime (slice|wedge|wheel)/.test(g))T.push('wheel-lime');
 else if(/lemon (slice|wedge|wheel)|citrus/.test(g))T.push('wheel-lemon');
 if(/orange (zest|twist|peel)|lemon or orange/.test(g)&&!/slice/.test(g))T.push('peel-orange');
 else if(/lemon (zest|twist|peel|rind)|lemon twist|long peel/.test(g)&&!/slice|wheel/.test(g))T.push('peel-lemon');
 else if(/lime peel/.test(g))T.push('peel-lime');
 if(/cherr/.test(g)&&!/three cherries/.test(g))T.push('cherry');
 if(/mint/.test(g)&&!/optional mint leaf/.test(g))T.push(/mint leaf/.test(g)?'leaves':'mint');
 if(/chili/.test(g))T.push('chili');if(/ginger/.test(g))T.push('ginger');if(/grape/.test(g))T.push('grapes');
 if(/passion/.test(g))T.push('passion');
 return T}
const TOKC={'wheel-orange':CIT.orange[0],'wheel-lime':CIT.lime[0],'wheel-lemon':CIT.lemon[0],'peel-orange':CIT.orange[0],'peel-lemon':CIT.lemon[0],'peel-lime':CIT.lime[0],'crusta':CIT.orange[0],
 cherry:CHERRY,cherries3:CHERRY,'cherry-pick':[CHERRY,PINE],mint:LEAF[0],leaves:LEAF[0],pine:[PINE,LEAF[0]],'pine-wedge':PINE,spiral:CIT.lemon[0],fronds:LEAF[0],berries:'#d8335e',chili:'#d8231f',olive:'#6f8f2a',onion:'#efe9d8',celery:'#8cc63f','wheel-in':CIT.orange[0]};
function garOf(d){const O=(d.ovr||OVR[d.id])||{};const g=(O.g!==undefined?O.g:((d.garnish&&d.garnish.en)||'')).toLowerCase();return O.gar||tokens(g)}

// tile colour: far from the liquid, the vessel and every garnish colour
const lum=c=>{const v=hx(c).map(x=>{x/=255;return x<=.03928?x/12.92:((x+.055)/1.055)**2.4});return .2126*v[0]+.7152*v[1]+.0722*v[2]};
const hs=c=>{const[r,g,b]=hx(c).map(x=>x/255),mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,dd=mx-mn;if(!dd)return[0,0];const sa=dd/(1-Math.abs(2*l-1));let h=mx===r?((g-b)/dd)%6:mx===g?(b-r)/dd+2:(r-g)/dd+4;return[(h*60+360)%360,sa]};
// same hue family as the drink reads as one mass, even when the values differ
const clash=(c,x)=>{const[h1,s1]=hs(c),[h2,s2]=hs(x),dh=Math.min(Math.abs(h1-h2),360-Math.abs(h1-h2));return lum(c)<.12&&s1>.3&&s2>.15&&dh<55?.6:9};
const ratio=(a,b)=>{const p=lum(a),q=lum(b);return (Math.max(p,q)+.05)/(Math.min(p,q)+.05)};
// tile colour carries no meaning: it is picked to make the drawing stand out (light against dark), clear of every garnish colour
function pickBG(d){const S=P[shapeOf(d)],liq=liqOf(d),h=hash(d.id),gc=garOf(d).flatMap(t=>[].concat(TOKC[t]||[]));
 let best=null,bs=-1;
 for(let j=0;j<TILES.length;j++){const c=INK[TILES[(h+j)%TILES.length]];
  const sc=Math.min(ratio(c,S.op||liq)/2.2,dist(c,liq)/200,clash(c,liq),...gc.map(x=>dist(c,x)/170));
  if(sc>=1)return c; if(sc>bs){bs=sc;best=c}}
 return best}
window.glassRim=d=>P[shapeOf(d)].r;window.glassShape=shapeOf;window.glassBG=pickBG;window.glassLiq=liqOf;

window.glassSVG=function(d,opt){opt=opt||{};
 const O=(d.ovr||OVR[d.id])||{},k=shapeOf(d),S=P[k],id='gv'+(++uid);
 const liq=liqOf(d),L=Object.assign({},LAYER[d.id]||{},O.bottom?{bottom:O.bottom}:{});
 const ings=(d.lines||[]).flatMap(l=>l.ids||[]),has=x=>ings.includes(x);
 const bg=opt.bg||pickBG(d);
 const G=mix(INK.pa,bg,.2),[xl,xr,ry]=S.r,cx=(xl+xr)/2,w=xr-xl;
 const ice=O.ice||d.ice,T=garOf(d),is=t=>T.includes(t);
 const foam=O.foam||(has('egg-white')||has('egg-yolk')?'#f1e6cf':has('espresso')?'#c9a77a':null),foamH=O.foamH||13;
 const fizz=FIZZ.some(has);
 let back='',body='',front='',top='',post='';
 // stem and foot
 if(S.st){const b=S.bot;
  if(S.st==='short')body+=`<path d="M88 ${b-4}L112 ${b-4}L108 216L92 216Z" fill="${G}"/>`;
  else{body+=`<rect x="96.5" y="${b-3}" width="7" height="${224-b+3}" fill="${G}"/>`;
   if(S.st==='knop')body+=`<ellipse cx="100" cy="${b+(224-b)*.42}" rx="7.5" ry="5.5" fill="${G}"/><ellipse cx="100" cy="${b+2}" rx="9" ry="3.5" fill="${G}"/>`;
   if(S.st==='bal')body+=`<ellipse cx="100" cy="${b+3}" rx="10" ry="4" fill="${G}"/><ellipse cx="100" cy="${b+(224-b)*.32}" rx="6.5" ry="${(224-b)*.17}" fill="${G}"/><ellipse cx="100" cy="${b+(224-b)*.62}" rx="7.5" ry="3.6" fill="${G}"/>`}
  body+=`<ellipse cx="100" cy="224" rx="${S.ft}" ry="8" fill="${G}"/>`;
  if(S.cut)body+=`<path d="M${100-S.ft*.62} 222L${100+S.ft*.62} 222" stroke="${bg}" stroke-width="1.6" opacity=".35"/>`}
 if(S.h)body+=`<path d="${S.h}" fill="${S.op?shade(S.op):G}"/>`;
 if(S.op){
  const dome=ice==='crushed'||ice==='cracked'||ice==='blended';
  if(dome)back+=`<path d="M${xl+4} ${ry+2}Q${cx-30} ${ry-26} ${cx} ${ry-28}Q${cx+30} ${ry-26} ${xr-4} ${ry+2}Z" fill="#fff" opacity=".92"/>${specks(xl+20,xr-20,ry-14,'#d9e8ee',14)}`;
  body+=`<path d="${S.o}" fill="${S.op}"/>`;
  if(k==='copper')body+=`<path d="M52 92H140M53 204H137" stroke="${shade(S.op)}" stroke-width="6"/>`;
  if(S.face)body+=`<g fill="#4a2c1a"><rect x="70" y="92" width="22" height="10"/><rect x="108" y="92" width="22" height="10"/><path d="M96 110h8l4 40h-16z"/><rect x="72" y="168" width="56" height="12"/><path d="M72 168v-8M86 168v-8M100 168v-8M114 168v-8M128 168v-8" stroke="#4a2c1a" stroke-width="5"/></g>`;
  if(S.frost)body+=`<g fill="#fff" opacity=".55">${specks(64,136,120,'#fff',18)}${specks(70,130,160,'#fff',14)}</g>`;
 }else{
  const crushed=ice==='crushed'||ice==='blended', top0=crushed?ry+6:S.f;
  const ib=S.bot?S.bot-6:212;            // inside bottom
  body+=`<path d="${S.o}" fill="${G}"/><clipPath id="${id}"><path d="${S.i}"/></clipPath>`;
  let inner=`<rect x="0" y="${top0}" width="200" height="240" fill="${liq}"/>`;
  if(L.bottom)inner+=`<rect x="0" y="${top0+(ib-top0)*.58}" width="200" height="240" fill="${L.bottom}"/>`;
  if(L.top)inner+=`<rect x="0" y="${top0}" width="200" height="${L.th||12}" fill="${L.top}"/>`;
  if(foam)inner+=`<rect x="0" y="${top0}" width="200" height="${foamH}" fill="${foam}"/>`;
  if(is('wheel-in'))inner+=wheel(cx-w*.12,top0+(ib-top0)*.42,Math.min(30,w*.22),'orange',-14);
  // ice stays inside the drink: cubes sit below the surface, never above the rim
  if(ice==='cubes'||ice==='cracked'){const room=ib-top0,s=Math.max(18,Math.min(44,w*.3,room*.42)),n=room>s*2.2?3:2;
   const C=[[cx-s*.95,top0+5,-10],[cx+s*.08,top0+5+s*.55,12],[cx-s*.55,top0+5+s*1.22,-4]].slice(0,n);
   inner+=`<g class="ic">${C.map(([x,y,a])=>`<g transform="${rot(a,x+s/2,y+s/2)}"><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" rx="4" fill="${G}" opacity=".34"/><rect x="${(x+4).toFixed(1)}" y="${(y+4).toFixed(1)}" width="${(s*.4).toFixed(1)}" height="4" rx="2" fill="#fff" opacity=".45"/></g>`).join('')}</g>`}
  if(crushed&&ice==='crushed'){let s='',h=5;for(let i=0;i<30;i++){h=(h*7919+31)%1009;const x=xl+(h%100)/100*w,y=top0+6+(h%160);s+=`<path d="M${x.toFixed(1)} ${y}l${6+h%5} ${-2-h%3}l${2+h%4} ${7+h%4}l${-8-h%3} ${2}z"/>`}inner+=`<g class="ic" fill="${G}" opacity=".42">${s}</g>`}
  if(fizz){let s='',h=3;for(let i=0;i<9;i++){h=(h*7919+7)%1013;s+=`<circle cx="${(cx-w*.3+(h%100)/100*w*.6).toFixed(1)}" cy="${top0+20+(h%120)}" r="${2+h%3}"/>`}inner+=`<g class="fz" fill="${G}" opacity=".55">${s}</g>`}
  // glass texture over the drink: cut crystal, cut rocks, tiki relief
  let tex='';
  if(S.cut===1&&S.bot){const y1=S.bot,y0=ry+(y1-ry)*.42,n=Math.max(4,Math.round(w/16));for(let i=0;i<n;i++){const x=xl+6+(i+.5)*(w-12)/n;tex+=`<path d="M${x.toFixed(1)} ${y1}L${(x-5).toFixed(1)} ${y0+((i%2)*10)}L${(x+5).toFixed(1)} ${y0+((i%2)*10)}Z"/>`}}
  if(S.cut==='b'){for(let x=xl+12;x<xr-8;x+=11)tex+=`<rect x="${x}" y="${232-(232-ry)*.24}" width="5" height="200"/>`}
  if(S.cut==='v'){for(let x=xl+14;x<xr-8;x+=12)tex+=`<rect x="${x}" y="${232-(232-ry)*.52}" width="5" height="200"/>`}
  if(S.relief==='swirl'){let p='';for(let y=ry+34;y<222;y+=20){p+=`M${xl+8} ${y}`;for(let x=xl+8;x<xr-14;x+=14)p+=`q7 ${((x/14|0)+(y/20|0))%2?-8:8} 14 0`}tex+=`<path d="${p}" fill="none" stroke="${G}" stroke-width="3.6" stroke-linecap="round"/>`}
  if(S.relief===1)tex+=`<path d="M70 92q14-10 28 0M102 92q14-10 28 0M78 104h14M108 104h14M96 112l-6 36h20l-6-36M72 168q28 22 56 0M76 172v10M88 176v10M100 178v10M112 176v10M124 172v10M66 70h68M66 204h68" fill="none" stroke="${G}" stroke-width="5" stroke-linecap="round"/>`;
  if(tex)tex=`<g fill="${G}" opacity="${S.relief?.5:.3}">${tex}</g>`;
  body+=`<g clip-path="url(#${id})"><g class="lq">${inner}</g>${tex}<rect x="${xl+10}" y="${ry}" width="7" height="240" fill="${bg}" opacity=".28"/></g>`;
  if(crushed){let s='',h=9;for(let i=0;i<16;i++){h=(h*7919+17)%1013;const x=xl+8+(h%100)/100*(w-16),y=ry-2-(h%9)*(1-Math.abs(x-cx)/(w*.6));s+=`<path d="M${x.toFixed(1)} ${(y+4).toFixed(1)}l${5+h%5} ${-6-h%4}l${7+h%3} ${4+h%3}l${-3} ${7}z"/>`}
   top+=`<path d="M${xl+5} ${ry+6}Q${cx} ${ry-12} ${xr-5} ${ry+6}Z" fill="${ice==='blended'?liq:'#fff'}" opacity="${ice==='blended'?1:.88}"/>${ice==='blended'?'':`<g fill="#fff">${s}</g>`}`}
  if(has('nutmeg')||is('nutmeg'))top+=specks(xl+16,xr-16,top0+4,'#7a4a2a',14);
  if(/amargo|bitters on top/.test(((d.garnish&&d.garnish.en)||'').toLowerCase()))top+=[cx-14,cx,cx+14].map(x=>`<circle cx="${x}" cy="${top0+6}" r="3" fill="#8e1d2c"/>`).join('');
  if(has('espresso'))top+=beans(cx,top0+6);
  if(is('passion'))top+=passion(cx,top0-2);
 }
 // garnish
 const gx=xr-12;
 if(is('crusta')&&is('sugar'))post+=crust(S,G,true,20)+crust({r:[S.r[0]+(S.r[1]-S.r[0])/2,S.r[1],S.r[2]]},G,false,20);else if(is('salt')||is('sugar'))post+=crust(S,G,false);if(is('salt-half'))post+=crust(S,G,true);
 if(is('crusta')){const c=collar(xl,xr,ry,'orange');back+=c.back;front+=c.front}
 if(is('celery'))front+=celery(xr-30,ry+40);
 if(is('olive'))front+=pick(xr+6,ry-44,cx,S.f+30)+olive(cx+18,S.f+4);
 if(is('onion'))front+=pick(xr+6,ry-44,cx,S.f+30)+onion(cx+22,S.f-6)+onion(cx+8,S.f+12);
 if(is('berries')||is('berries-black'))front+=pick(xl+10,ry-24,xr+8,ry-6)+berries([[xl+40,ry-18],[cx,ry-13],[xr-36,ry-8]],is('berries-black')?'#2b1630':'#d8335e');
 if(is('fronds'))back+=fronds(cx+6,ry+14,1);
 if(is('mint'))front+=mint(cx-4,ry-4,w<70?.8:1);
 if(is('leaves'))front+=mintLeaves(cx,ry+2);
 if(is('pine')){back+=fronds(gx-14,ry+10,.9);front+=wedge(gx-2,ry+6)}
 if(is('pine-wedge')){back+=fronds(gx-10,ry+4,.5);front+=wedge(gx-2,ry+6)}
 if(is('spiral'))back+=spiral(gx-14,ry+40,'lemon');
 if(is('cherry-pick')){front+=pick(gx+8,ry-64,gx-14,ry+20)+wedge(gx-4,ry+2,-4)+cherry(gx+2,ry-44,false)}
 if(is('wheel-orange'))front+=wheel(gx,ry,22,'orange',-12);
 if(is('wheel-lime'))front+=wheel(gx,ry,20,'lime',-12);
 if(is('wheel-lemon'))front+=wheel(gx,ry,20,'lemon',-12);
 if(is('half-orange'))front+=halfWheel(gx,ry+4,26,'orange',-14);
 if(is('peel-orange'))back+=peel(gx-10,ry+12,'orange');
 if(is('peel-lemon'))back+=peel(gx-10,ry+12,'lemon');
 if(is('peel-lime'))back+=peel(gx-10,ry+12,'lime');
 if(is('cherry'))front+=cherry(xl+18,ry-4);
 if(is('chili'))front+=chili(gx,ry);
 if(is('ginger'))front+=pick(xr+4,ry-36,cx+10,S.f+20)+ginger(cx+30,ry-8);
 if(is('grapes'))front+=grapes(gx-10,ry-12);
 if(is('cherries3'))front+=pick(xl,ry-30,xr,ry-30)+cherry(cx-20,ry-30,false)+cherry(cx,ry-30,false)+cherry(cx+20,ry-30,false);
 if(ice==='hot')front+=`<path d="M${cx-14} ${ry-10}q-8-12 0-24q8-12 0-24M${cx+12} ${ry-14}q-8-12 0-24q8-12 0-24" fill="none" class="stm" stroke="${G}" stroke-width="4" stroke-linecap="round" opacity=".7"/>`;
 if((k==='highball'||k==='collins'||k==='hurricane'||S.op)&&(ice==='crushed'||ice==='blended'||is('straw')))back+=straw(cx+10,ry+10,INK.ink);
 const tile=opt.noTile?'':`<rect width="200" height="240" fill="${bg}"/>`;
 return `<svg viewBox="0 0 200 240" class="gl" aria-hidden="true">${tile}<g transform="translate(${opt.full?0:16} ${opt.full?0:38}) scale(${opt.full?1:.84})">${back}${body}${post}<g class="tp">${top}</g><g class="gn">${front}</g></g></svg>`;
};
function mix(a,b,t){a=hx(a);b=hx(b);return '#'+a.map((v,i)=>Math.round(v*(1-t)+b[i]*t).toString(16).padStart(2,'0')).join('')}
function shade(c){return '#'+hx(c).map(v=>Math.round(v*.72).toString(16).padStart(2,'0')).join('')}
window.GLASS_INK=INK;
})();
