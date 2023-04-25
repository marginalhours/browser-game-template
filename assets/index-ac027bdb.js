(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();/**
 * @preserve
 * Kontra.js v9.0.0
 */let D=()=>{},Ft="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);";function St(i,t){let e=t.parentNode;if(i.setAttribute("data-kontra",""),e){let s=e.querySelector("[data-kontra]:last-of-type")||t;e.insertBefore(i,s.nextSibling)}else document.body.appendChild(i)}function X(i,t){let e=i.indexOf(t);if(e!=-1)return i.splice(e,1),!0}let U={};function M(i,t){U[i]=U[i]||[],U[i].push(t)}function qt(i,t){U[i]=(U[i]||[]).filter(e=>e!=t)}function k(i,...t){(U[i]||[]).map(e=>e(...t))}let R,tt,Yt={get(i,t){return t=="_proxy"?!0:D}};function A(){return R}function C(){return tt}function Te(i,{contextless:t=!1}={}){if(R=document.getElementById(i)||i||document.querySelector("canvas"),t&&(R=R||new Proxy({},Yt)),!R)throw Error("You must provide a canvas element for the game");return tt=R.getContext("2d")||new Proxy({},Yt),tt.imageSmoothingEnabled=!1,k("init"),{canvas:R,context:tt}}class ut{constructor({spriteSheet:t,frames:e,frameRate:s,loop:n=!0,name:r}){let{width:h,height:o,margin:l=0}=t.frame;Object.assign(this,{spriteSheet:t,frames:e,frameRate:s,loop:n,name:r,width:h,height:o,margin:l,isStopped:!1,_f:0,_a:0})}clone(){return new ut(this)}start(){this.isStopped=!1,this.loop||this.reset()}stop(){this.isStopped=!0}reset(){this._f=0,this._a=0}update(t=1/60){if(!this.isStopped){if(!this.loop&&this._f==this.frames.length-1){this.stop();return}for(this._a+=t;this._a*this.frameRate>=1;)this._f=++this._f%this.frames.length,this._a-=1/this.frameRate}}render({x:t,y:e,width:s=this.width,height:n=this.height,context:r=C()}){let h=this.frames[this._f]/this.spriteSheet._f|0,o=this.frames[this._f]%this.spriteSheet._f|0;r.drawImage(this.spriteSheet.image,o*this.width+(o*2+1)*this.margin,h*this.height+(h*2+1)*this.margin,this.width,this.height,t,e,s,n)}}function Kt(){return new ut(...arguments)}let Ye=/(jpeg|jpg|gif|png|webp)$/,$e=/(wav|mp3|ogg|aac)$/,Qt=/^\//,De=/\/$/,Jt=new WeakMap,Vt="",Zt="",jt="";function ft(i,t){return new URL(i,t).href}function bt(i,t){return[i.replace(De,""),i?t.replace(Qt,""):t].filter(e=>e).join("/")}function At(i){return i.split(".").pop()}function Mt(i){let t=i.replace("."+At(i),"");return t.split("/").length==2?t.replace(Qt,""):t}function Be(i){return{wav:i.canPlayType('audio/wav; codecs="1"'),mp3:i.canPlayType("audio/mpeg;"),ogg:i.canPlayType('audio/ogg; codecs="vorbis"'),aac:i.canPlayType("audio/aac;")}}let T={},H={},Y={};function Pt(){window.__k||(window.__k={dm:Jt,u:ft,d:Y,i:T})}function He(i){Vt=i}function Ue(i){Zt=i}function Xe(i){jt=i}function te(i){return Pt(),new Promise((t,e)=>{let s,n,r;if(s=bt(Vt,i),T[s])return t(T[s]);n=new Image,n.onload=function(){r=ft(s,window.location.href),T[Mt(i)]=T[s]=T[r]=this,k("assetLoaded",this,i),t(this)},n.onerror=function(){e("Unable to load image "+s)},n.src=s})}function ee(i){return new Promise((t,e)=>{let s=i,n,r,h,o;if(n=new Audio,r=Be(n),i=[].concat(i).reduce((l,a)=>l||(r[At(a)]?a:null),0),!i)return e("cannot play any of the audio formats provided "+s);if(h=bt(Zt,i),H[h])return t(H[h]);n.addEventListener("canplay",function(){o=ft(h,window.location.href),H[Mt(i)]=H[h]=H[o]=this,k("assetLoaded",this,i),t(this)}),n.onerror=function(){e("Unable to load audio "+h)},n.src=h,n.load()})}function ie(i){Pt();let t,e;return t=bt(jt,i),Y[t]?Promise.resolve(Y[t]):fetch(t).then(s=>{if(!s.ok)throw s;return s.clone().json().catch(()=>s.text())}).then(s=>(e=ft(t,window.location.href),typeof s=="object"&&Jt.set(s,e),Y[Mt(i)]=Y[t]=Y[e]=s,k("assetLoaded",s,i),s))}function ze(...i){return Pt(),Promise.all(i.map(t=>{let e=At([].concat(t)[0]);return e.match(Ye)?te(t):e.match($e)?ee(t):ie(t)}))}function We(i){return i*Math.PI/180}function Fe(i){return i*180/Math.PI}function qe(i,t){return Math.atan2(t.y-i.y,t.x-i.x)}function se(i,t){let e=Math.sin(t),s=Math.cos(t);return{x:i.x*s-i.y*e,y:i.x*e+i.y*s}}function Ke(i,t,e){return{x:i.x+Math.cos(t)*e,y:i.y+Math.sin(t)*e}}function Qe(i,t){return(Math.random()*(t-i+1)|0)+i}function Je(i){for(var t=0,e=2166136261>>>0;t<i.length;t++)e=Math.imul(e^i.charCodeAt(t),16777619);e+=e<<13,e^=e>>>7,e+=e<<3,e^=e>>>17;let s=(e+=e<<5)>>>0,n=()=>(2**31-1&(s=Math.imul(48271,s)))/2**31;return n(),n}function Ve(i,t,e){return i*(1-e)+t*e}function Ze(i,t,e){return(e-i)/(t-i)}function z(i,t,e){return Math.min(Math.max(i,e),t)}function je(i,t){t==null?localStorage.removeItem(i):localStorage.setItem(i,JSON.stringify(t))}function ti(i){let t=localStorage.getItem(i);try{t=JSON.parse(t)}catch{}return t}function ne(i,t){return[i,t]=[i,t].map(e=>K(e)),i.x<t.x+t.width&&i.x+i.width>t.x&&i.y<t.y+t.height&&i.y+i.height>t.y}function K(i){let{x:t=0,y:e=0,width:s,height:n}=i.world||i;return i.mapwidth&&(s=i.mapwidth,n=i.mapheight),i.anchor&&(t-=s*i.anchor.x,e-=n*i.anchor.y),s<0&&(t+=s,s*=-1),n<0&&(e+=n,n*=-1),{x:t,y:e,width:s,height:n}}function ei(i,t,e="y"){return[i,t]=[i,t].map(K),i[e]-t[e]}class ${constructor(t=0,e=0,s={}){t.x!=null?(this.x=t.x,this.y=t.y):(this.x=t,this.y=e),s._c&&(this.clamp(s._a,s._b,s._d,s._e),this.x=t,this.y=e)}set(t){this.x=t.x,this.y=t.y}add(t){return new $(this.x+t.x,this.y+t.y,this)}subtract(t){return new $(this.x-t.x,this.y-t.y,this)}scale(t){return new $(this.x*t,this.y*t)}normalize(t=this.length()||1){return new $(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.hypot(this.x,this.y)}distance(t){return Math.hypot(this.x-t.x,this.y-t.y)}angle(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}direction(){return Math.atan2(this.y,this.x)}clamp(t,e,s,n){this._c=!0,this._a=t,this._b=e,this._d=s,this._e=n}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?z(this._a,this._d,t):t}set y(t){this._y=this._c?z(this._b,this._e,t):t}}function et(){return new $(...arguments)}class ii{constructor(t){return this.init(t)}init(t={}){this.position=et(),this.velocity=et(),this.acceleration=et(),this.ttl=1/0,Object.assign(this,t)}update(t){this.advance(t)}advance(t){let e=this.acceleration;t&&(e=e.scale(t)),this.velocity=this.velocity.add(e);let s=this.velocity;t&&(s=s.scale(t)),this.position=this.position.add(s),this._pc(),this.ttl--}get dx(){return this.velocity.x}get dy(){return this.velocity.y}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}_pc(){}}class W extends ii{init({width:t=0,height:e=0,context:s=C(),render:n=this.draw,update:r=this.advance,children:h=[],anchor:o={x:0,y:0},opacity:l=1,rotation:a=0,scaleX:d=1,scaleY:c=1,...u}={}){this._c=[],super.init({width:t,height:e,context:s,anchor:o,opacity:l,rotation:a,scaleX:d,scaleY:c,...u}),this._di=!0,this._uw(),this.addChild(h),this._rf=n,this._uf=r,M("init",()=>{this.context??(this.context=C())})}update(t){this._uf(t),this.children.map(e=>e.update&&e.update(t))}render(){let t=this.context;t.save(),(this.x||this.y)&&t.translate(this.x,this.y),this.rotation&&t.rotate(this.rotation),(this.scaleX!=1||this.scaleY!=1)&&t.scale(this.scaleX,this.scaleY);let e=-this.width*this.anchor.x,s=-this.height*this.anchor.y;(e||s)&&t.translate(e,s),this.context.globalAlpha=this.opacity,this._rf(),(e||s)&&t.translate(-e,-s),this.children.map(r=>r.render&&r.render()),t.restore()}draw(){}_pc(){this._uw(),this.children.map(t=>t._pc())}get x(){return this.position.x}get y(){return this.position.y}set x(t){this.position.x=t,this._pc()}set y(t){this.position.y=t,this._pc()}get width(){return this._w}set width(t){this._w=t,this._pc()}get height(){return this._h}set height(t){this._h=t,this._pc()}_uw(){if(!this._di)return;let{_wx:t=0,_wy:e=0,_wo:s=1,_wr:n=0,_wsx:r=1,_wsy:h=1}=this.parent||{};this._wx=this.x,this._wy=this.y,this._ww=this.width,this._wh=this.height,this._wo=s*this.opacity,this._wsx=r*this.scaleX,this._wsy=h*this.scaleY,this._wx=this._wx*r,this._wy=this._wy*h,this._ww=this.width*this._wsx,this._wh=this.height*this._wsy,this._wr=n+this.rotation;let{x:o,y:l}=se({x:this._wx,y:this._wy},n);this._wx=o,this._wy=l,this._wx+=t,this._wy+=e}get world(){return{x:this._wx,y:this._wy,width:this._ww,height:this._wh,opacity:this._wo,rotation:this._wr,scaleX:this._wsx,scaleY:this._wsy}}set children(t){this.removeChild(this._c),this.addChild(t)}get children(){return this._c}addChild(...t){t.flat().map(e=>{this.children.push(e),e.parent=this,e._pc=e._pc||D,e._pc()})}removeChild(...t){t.flat().map(e=>{X(this.children,e)&&(e.parent=null,e._pc())})}get opacity(){return this._opa}set opacity(t){this._opa=z(0,1,t),this._pc()}get rotation(){return this._rot}set rotation(t){this._rot=t,this._pc()}setScale(t,e=t){this.scaleX=t,this.scaleY=e}get scaleX(){return this._scx}set scaleX(t){this._scx=t,this._pc()}get scaleY(){return this._scy}set scaleY(t){this._scy=t,this._pc()}}function si(){return new W(...arguments)}let Ot=class extends W{init({image:t,width:e=t?t.width:void 0,height:s=t?t.height:void 0,...n}={}){super.init({image:t,width:e,height:s,...n})}get animations(){return this._a}set animations(t){let e,s;this._a={};for(e in t)this._a[e]=t[e].clone(),s=s||this._a[e];this.currentAnimation=s,this.width=this.width||s.width,this.height=this.height||s.height}playAnimation(t){var e;(e=this.currentAnimation)==null||e.stop(),this.currentAnimation=this.animations[t],this.currentAnimation.start()}advance(t){var e;super.advance(t),(e=this.currentAnimation)==null||e.update(t)}draw(){this.image&&this.context.drawImage(this.image,0,0,this.image.width,this.image.height),this.currentAnimation&&this.currentAnimation.render({x:0,y:0,width:this.width,height:this.height,context:this.context}),this.color&&(this.context.fillStyle=this.color,this.context.fillRect(0,0,this.width,this.height))}};function ni(){return new Ot(...arguments)}let ri=/(\d+)(\w+)/;function hi(i){if(!i)return{computed:0};let t=i.match(ri),e=+t[1],s=t[2];return{size:e,unit:s,computed:e}}class re extends W{init({text:t="",textAlign:e="",lineHeight:s=1,font:n=(h=>(h=C())==null?void 0:h.font)(),...r}={}){t=""+t,super.init({text:t,textAlign:e,lineHeight:s,font:n,...r}),this.context&&this._p(),M("init",()=>{this.font??(this.font=C().font),this._p()})}get width(){return this._w}set width(t){this._d=!0,this._w=t,this._fw=t}get text(){return this._t}set text(t){this._d=!0,this._t=""+t}get font(){return this._f}set font(t){this._d=!0,this._f=t,this._fs=hi(t).computed}get lineHeight(){return this._lh}set lineHeight(t){this._d=!0,this._lh=t}render(){this._d&&this._p(),super.render()}_p(){this._s=[],this._d=!1;let t=this.context,e=[this.text];if(t.font=this.font,e=this.text.split(`
`),this._fw&&e.map(s=>{let n=s.split(" "),r=n.shift(),h=r;n.map(o=>{h+=" "+o,t.measureText(h).width>this._fw&&(this._s.push(r),h=o),r=h}),this._s.push(h)}),!this._s.length&&this.text.includes(`
`)){let s=0;e.map(n=>{this._s.push(n),s=Math.max(s,t.measureText(n).width)}),this._w=this._fw||s}this._s.length||(this._s.push(this.text),this._w=this._fw||t.measureText(this.text).width),this.height=this._fs+(this._s.length-1)*this._fs*this.lineHeight,this._uw()}draw(){let t=0,e=this.textAlign,s=this.context;e=this.textAlign||(s.canvas.dir=="rtl"?"right":"left"),t=e=="right"?this.width:e=="center"?this.width/2|0:0,this._s.map((n,r)=>{s.textBaseline="top",s.textAlign=e,s.fillStyle=this.color,s.font=this.font,this.strokeColor&&(s.strokeStyle=this.strokeColor,s.lineWidth=this.lineWidth??1,s.strokeText(n,t,this._fs*this.lineHeight*r)),s.fillText(n,t,this._fs*this.lineHeight*r)})}}function he(){return new re(...arguments)}let G=new WeakMap,it={},pt={},oe={0:"left",1:"middle",2:"right"};function oi(i=A()){return G.get(i)}function ai(i,t){let{x:e,y:s,width:n,height:r}=K(i);do e-=i.sx||0,s-=i.sy||0;while(i=i.parent);let h=t.x-Math.max(e,Math.min(t.x,e+n)),o=t.y-Math.max(s,Math.min(t.y,s+r));return h*h+o*o<t.radius*t.radius}function ae(i){let t=i._lf.length?i._lf:i._cf;for(let e=t.length-1;e>=0;e--){let s=t[e];if(s.collidesWithPointer?s.collidesWithPointer(i):ai(s,i))return s}}function E(i,t){return parseFloat(i.getPropertyValue(t))||0}function li(i){let{canvas:t,_s:e}=i,s=t.getBoundingClientRect(),n=e.transform!="none"?e.transform.replace("matrix(","").split(","):[1,1,1,1],r=parseFloat(n[0]),h=parseFloat(n[3]),o=(E(e,"border-left-width")+E(e,"border-right-width"))*r,l=(E(e,"border-top-width")+E(e,"border-bottom-width"))*h,a=(E(e,"padding-left")+E(e,"padding-right"))*r,d=(E(e,"padding-top")+E(e,"padding-bottom"))*h;return{scaleX:(s.width-o-a)/t.width,scaleY:(s.height-l-d)/t.height,offsetX:s.left+(E(e,"border-left-width")+E(e,"padding-left"))*r,offsetY:s.top+(E(e,"border-top-width")+E(e,"padding-top"))*h}}function $t(i){let t=i.button!=null?oe[i.button]:"left";pt[t]=!0,Lt(i,"onDown")}function Et(i){let t=i.button!=null?oe[i.button]:"left";pt[t]=!1,Lt(i,"onUp")}function Dt(i){Lt(i,"onOver")}function di(i){let t=G.get(i.target);t._oo=null,pt={}}function Bt(i,t,e){let s=ae(i);s&&s[t]&&s[t](e),it[t]&&it[t](e,s),t=="onOver"&&(s!=i._oo&&i._oo&&i._oo.onOut&&i._oo.onOut(e),i._oo=s)}function Lt(i,t){i.preventDefault();let e=i.target,s=G.get(e),{scaleX:n,scaleY:r,offsetX:h,offsetY:o}=li(s);i.type.includes("touch")?(Array.from(i.touches).map(({clientX:a,clientY:d,identifier:c})=>{let u=s.touches[c];u||(u=s.touches[c]={start:{x:(a-h)/n,y:(d-o)/r}},s.touches.length++),u.changed=!1}),Array.from(i.changedTouches).map(({clientX:a,clientY:d,identifier:c})=>{let u=s.touches[c];u.changed=!0,u.x=s.x=(a-h)/n,u.y=s.y=(d-o)/r,Bt(s,t,i),k("touchChanged",i,s.touches),t=="onUp"&&(delete s.touches[c],s.touches.length--,s.touches.length||k("touchEnd"))})):(s.x=(i.clientX-h)/n,s.y=(i.clientY-o)/r,Bt(s,t,i))}function le({radius:i=5,canvas:t=A()}={}){let e=G.get(t);if(!e){let s=window.getComputedStyle(t);e={x:0,y:0,radius:i,touches:{length:0},canvas:t,_cf:[],_lf:[],_o:[],_oo:null,_s:s},G.set(t,e)}return t.addEventListener("mousedown",$t),t.addEventListener("touchstart",$t),t.addEventListener("mouseup",Et),t.addEventListener("touchend",Et),t.addEventListener("touchcancel",Et),t.addEventListener("blur",di),t.addEventListener("mousemove",Dt),t.addEventListener("touchmove",Dt),e._t||(e._t=!0,M("tick",()=>{e._lf.length=0,e._cf.map(s=>{e._lf.push(s)}),e._cf.length=0})),e}function de(...i){i.flat().map(t=>{let e=t.context?t.context.canvas:A(),s=G.get(e);if(!s)throw new ReferenceError("Pointer events not initialized for the objects canvas");t._r||(t._r=t.render,t.render=function(){s._cf.push(this),this._r()},s._o.push(t))})}function ci(...i){i.flat().map(t=>{let e=t.context?t.context.canvas:A(),s=G.get(e);if(!s)throw new ReferenceError("Pointer events not initialized for the objects canvas");t.render=t._r,t._r=0,X(s._o,t)})}function ui(i){let t=i.context?i.context.canvas:A(),e=G.get(t);if(!e)throw new ReferenceError("Pointer events not initialized for the objects canvas");return e._o.includes(i)&&ae(e)===i}function ce(i,t){let e=i[0].toUpperCase()+i.substr(1);it["on"+e]=t}function ue(i){let t=i[0].toUpperCase()+i.substr(1);it["on"+t]=0}function fi(i){return!!pt[i]}let fe=class extends Ot{init({padX:t=0,padY:e=0,text:s,disabled:n=!1,onDown:r,onUp:h,...o}={}){super.init({padX:t,padY:e,...o}),this.textNode=he({...s,context:this.context}),this.width||(this.width=this.textNode.width,this.height=this.textNode.height),de(this),this.addChild(this.textNode),this._od=r||D,this._ou=h||D;let l=this._dn=document.createElement("button");l.style=Ft,l.textContent=this.text,n&&this.disable(),l.addEventListener("focus",()=>this.focus()),l.addEventListener("blur",()=>this.blur()),l.addEventListener("keydown",a=>this._kd(a)),l.addEventListener("keyup",a=>this._ku(a)),St(l,this.context.canvas),this._uw(),this._p()}get text(){return this.textNode.text}set text(t){this._d=!0,this.textNode.text=t}destroy(){this._dn.remove()}_p(){this.text!=this._dn.textContent&&(this._dn.textContent=this.text),this.textNode._p();let t=this.textNode.width+this.padX*2,e=this.textNode.height+this.padY*2;this.width=Math.max(t,this.width),this.height=Math.max(e,this.height),this._uw()}render(){this._d&&this._p(),super.render()}enable(){this.disabled=this._dn.disabled=!1,this.onEnable()}disable(){this.disabled=this._dn.disabled=!0,this.onDisable()}focus(){this.disabled||(this.focused=!0,document.activeElement!=this._dn&&this._dn.focus(),this.onFocus())}blur(){this.focused=!1,document.activeElement==this._dn&&this._dn.blur(),this.onBlur()}onOver(){this.disabled||(this.hovered=!0)}onOut(){this.hovered=!1}onEnable(){}onDisable(){}onFocus(){}onBlur(){}onDown(){this.disabled||(this.pressed=!0,this._od())}onUp(){this.disabled||(this.pressed=!1,this._ou())}_kd(t){(t.code=="Enter"||t.code=="Space")&&this.onDown()}_ku(t){(t.code=="Enter"||t.code=="Space")&&this.onUp()}};function pi(){return new fe(...arguments)}function _i(i){let t=i.canvas;i.clearRect(0,0,t.width,t.height)}function pe({fps:i=60,clearCanvas:t=!0,update:e=D,render:s,context:n=C(),blur:r=!1}={}){if(!s)throw Error("You must provide a render() function");let h=0,o=1e3/i,l=1/i,a=t?_i:D,d,c,u,p,g,w=!0;r||(window.addEventListener("focus",()=>{w=!0}),window.addEventListener("blur",()=>{w=!1})),M("init",()=>{g.context??(g.context=C())});function _(){if(c=requestAnimationFrame(_),!!w&&(u=performance.now(),p=u-d,d=u,!(p>1e3))){for(k("tick"),h+=p;h>=o;)g.update(l),h-=o;a(g.context),g.render()}}return g={update:e,render:s,isStopped:!0,context:n,start(){d=performance.now(),this.isStopped=!1,requestAnimationFrame(_)},stop(){this.isStopped=!0,cancelAnimationFrame(c)},_frame:_,set _last(f){d=f}},g}let P=[],st={},nt={},_t={0:"south",1:"east",2:"west",3:"north",4:"leftshoulder",5:"rightshoulder",6:"lefttrigger",7:"righttrigger",8:"select",9:"start",10:"leftstick",11:"rightstick",12:"dpadup",13:"dpaddown",14:"dpadleft",15:"dpadright"};function gi(i){P[i.gamepad.index]={pressedButtons:{},axes:{}}}function wi(i){delete P[i.gamepad.index]}function mi(){P.map(i=>{i.pressedButtons={},i.axes={}})}function _e(){let i=navigator.getGamepads?navigator.getGamepads():navigator.webkitGetGamepads?navigator.webkitGetGamepads:[];for(let t=0;t<i.length;t++){let e=i[t];if(!e)continue;e.buttons.map((n,r)=>{let h=_t[r],{pressed:o}=n,{pressedButtons:l}=P[e.index],a=l[h];!a&&o?[st[e.index],st].map(d=>{var c;(c=d==null?void 0:d[h])==null||c.call(d,e,n,h)}):a&&!o&&[nt[e.index],nt].map(d=>{var c;(c=d==null?void 0:d[h])==null||c.call(d,e,n,h)}),l[h]=o});let{axes:s}=P[e.index];s.leftstickx=e.axes[0],s.leftsticky=e.axes[1],s.rightstickx=e.axes[2],s.rightsticky=e.axes[3]}}function ge(){window.addEventListener("gamepadconnected",gi),window.addEventListener("gamepaddisconnected",wi),window.addEventListener("blur",mi),M("tick",_e)}function we(i,t,{gamepad:e,handler:s="gamepaddown"}={}){let n=s=="gamepaddown"?st:nt;[].concat(i).map(r=>{isNaN(e)?n[r]=t:(n[e]=n[e]||{},n[e][r]=t)})}function me(i,{gamepad:t,handler:e="gamepaddown"}={}){let s=e=="gamepaddown"?st:nt;[].concat(i).map(n=>{isNaN(t)?delete s[n]:(s[t]=s[t]||{},delete s[t][n])})}function xi(i,{gamepad:t}={}){return isNaN(t)?P.some(e=>e.pressedButtons[i]):P[t]?!!P[t].pressedButtons[i]:!1}function yi(i,t){var e;return((e=P[t])==null?void 0:e.axes[i])||0}let rt={},V,Ht=!1,ht={swipe:{touches:1,threshold:10,touchend({0:i}){let t=i.x-i.start.x,e=i.y-i.start.y,s=Math.abs(t),n=Math.abs(e);if(!(s<this.threshold&&n<this.threshold))return s>n?t<0?"left":"right":e<0?"up":"down"}},pinch:{touches:2,threshold:2,touchstart({0:i,1:t}){this.prevDist=Math.hypot(i.x-t.x,i.y-t.y)},touchmove({0:i,1:t}){let e=Math.hypot(i.x-t.x,i.y-t.y);if(Math.abs(e-this.prevDist)<this.threshold)return;let s=e>this.prevDist?"out":"in";return this.prevDist=e,s}}};function xe(){Ht||(Ht=!0,M("touchChanged",(i,t)=>{Object.keys(ht).map(e=>{var r;let s=ht[e],n;(!V||V==e)&&t.length==s.touches&&[...Array(t.length).keys()].every(h=>t[h])&&(n=((r=s[i.type])==null?void 0:r.call(s,t))??"")&&rt[e+n]&&(V=e,rt[e+n](i,t))})}),M("touchEnd",()=>{V=0}))}function ye(i,t){[].concat(i).map(e=>{rt[e]=t})}function ve(i){[].concat(i).map(t=>{rt[t]=0})}let vi={set(i,t,e){return t.startsWith("_")||(i._d=!0),Reflect.set(i,t,e)}},Ut={start(i){return i?1:0},center(){return .5},end(i){return i?0:1}};class Ee extends W{init({flow:t="column",align:e="start",justify:s="start",colGap:n=0,rowGap:r=0,numCols:h=1,dir:o="",breakpoints:l=[],...a}={}){return super.init({flow:t,align:e,justify:s,colGap:n,rowGap:r,numCols:h,dir:o,breakpoints:l,...a}),this._p(),new Proxy(this,vi)}addChild(t){this._d=!0,super.addChild(t)}removeChild(t){this._d=!0,super.removeChild(t)}render(){this._d&&this._p(),super.render()}destroy(){this.children.map(t=>t.destroy&&t.destroy())}_p(){this._d=!1,this.breakpoints.map(f=>{f.metric.call(this)&&this._b!==f&&(this._b=f,f.callback.call(this))});let t=this._g=[],e=this._cw=[],s=this._rh=[],n=this.children,r=this._nc=this.flow=="column"?1:this.flow=="row"?n.length:this.numCols,h=0,o=0;for(let f=0,m;m=n[f];f++){t[h]=t[h]||[],m._p&&m._p();let{width:B,height:x}=m.world||m;s[h]=Math.max(s[h]||0,x);let v=m.colSpan||1,b=v;do e[o]=Math.max(e[o]||0,B/b),t[h][o]=m;while(o++<=r&&--v);o>=r&&(o=0,h++)}for(;o>0&&o<r;)t[h][o++]=!1;let l=t.length,a=[].concat(this.colGap),d=[].concat(this.rowGap);this._w=e.reduce((f,m)=>f+=m,0);for(let f=0;f<r-1;f++)this._w+=a[f%a.length];this._h=s.reduce((f,m)=>f+=m,0);for(let f=0;f<l-1;f++)this._h+=d[f%d.length];this._uw();let u=this.context.canvas.dir=="rtl"&&!this.dir||this.dir=="rtl";this._rtl=u,u&&(this._g=t.map(f=>f.reverse()),this._cw=e.reverse(),a=a.reverse());let p=-this.anchor.y*this.height,g=[],w=[].concat(this.justify),_=[].concat(this.align);this._g.map((f,m)=>{let B=-this.anchor.x*this.width;f.map((x,v)=>{if(x&&!g.includes(x)){g.push(x);let b=Ut[x.justifySelf||w[v%w.length]](this._rtl),J=Ut[x.alignSelf||_[m%_.length]](),xt=x.colSpan||1,Tt=e[v];if(xt>1&&v+xt<=this._nc)for(let O=1;O<xt;O++)Tt+=e[v+O]+a[(v+O)%a.length];let I=Tt*b,N=s[m]*J,F=0,q=0,{width:yt,height:vt}=x.world||x;if(x.anchor&&(F=x.anchor.x,q=x.anchor.y),b==0)I=I+yt*F;else if(b==.5){let O=F<.5?-1:F==.5?0:1;I=I+O*yt*b}else I=I-yt*(1-F);if(J==0)N=N+vt*q;else if(J==.5){let O=q<.5?-1:q==.5?0:1;N=N+O*vt*J}else N=N-vt*(1-q);x.x=B+I,x.y=p+N}B+=e[v]+a[v%a.length]}),p+=s[m]+d[m%d.length]})}}function Ei(){return new Ee(...arguments)}let kt={},Gt={},gt={},L={Enter:"enter",Escape:"esc",Space:"space",ArrowLeft:"arrowleft",ArrowUp:"arrowup",ArrowRight:"arrowright",ArrowDown:"arrowdown"};function Se(i=D,t){i._pd&&t.preventDefault(),i(t)}function Si(i){let t=L[i.code],e=kt[t];gt[t]=!0,Se(e,i)}function Ci(i){let t=L[i.code],e=Gt[t];gt[t]=!1,Se(e,i)}function bi(){gt={}}function Ce(){let i;for(i=0;i<26;i++)L["Key"+String.fromCharCode(i+65)]=String.fromCharCode(i+97);for(i=0;i<10;i++)L["Digit"+i]=L["Numpad"+i]=""+i;window.addEventListener("keydown",Si),window.addEventListener("keyup",Ci),window.addEventListener("blur",bi)}function be(i,t,{handler:e="keydown",preventDefault:s=!0}={}){let n=e=="keydown"?kt:Gt;t._pd=s,[].concat(i).map(r=>n[r]=t)}function Ae(i,{handler:t="keydown"}={}){let e=t=="keydown"?kt:Gt;[].concat(i).map(s=>delete e[s])}function Ai(i){return!![].concat(i).some(t=>gt[t])}function ot(i,t){return Object.values(t).includes(i)}function Me(i){return Object.keys(ht).some(t=>i.startsWith(t))}function Mi(i={}){Ce();let t=le(i.pointer);return xe(),ge(),{pointer:t}}function Pi(i,t,{gamepad:e,key:s}={}){[].concat(i).map(n=>{if(ot(n,_t))we(n,t,e);else if(Me(n))ye(n,t);else if(ot(n,L))be(n,t,s);else if(["down","up"].includes(n))ce(n,t);else throw new TypeError(`"${n}" is not a valid input name`)})}function Oi(i,{gamepad:t,key:e}={}){[].concat(i).map(s=>{ot(s,_t)?me(s,t):Me(s)?ve(s):ot(s,L)?Ae(s,e):["down","up"].includes(s)&&ue(s)})}function Pe(i){let t=i.substr(i.search(/[A-Z]/));return t[0].toLowerCase()+t.substr(1)}function Li(i,t){let e=i.prototype;e&&(e._inc||(e._inc={},e._bInc=function(n,r,...h){return this._inc[r].before.reduce((o,l)=>{let a=l(n,...o);return a||o},h)},e._aInc=function(n,r,h,...o){return this._inc[r].after.reduce((l,a)=>{let d=a(n,l,...o);return d||l},h)}),Object.getOwnPropertyNames(t).map(s=>{let n=Pe(s);e[n]&&(e["_o"+n]||(e["_o"+n]=e[n],e[n]=function(...h){let o=this._bInc(this,n,...h),l=e["_o"+n].call(this,...o);return this._aInc(this,n,l,...h)}),e._inc[n]||(e._inc[n]={before:[],after:[]}),s.startsWith("before")?e._inc[n].before.push(t[s]):s.startsWith("after")&&e._inc[n].after.push(t[s]))}))}function ki(i,t){let e=i.prototype;!e||!e._inc||Object.getOwnPropertyNames(t).map(s=>{let n=Pe(s);s.startsWith("before")?X(e._inc[n].before,t[s]):s.startsWith("after")&&X(e._inc[n].after,t[s])})}function Gi(i,t){let e=i.prototype;e&&Object.getOwnPropertyNames(t).map(s=>{e[s]||(e[s]=t[s])})}class Oe{constructor({create:t,maxSize:e=1024}={}){let s;if(!t||!(s=t())||!(s.update&&s.init&&s.isAlive&&s.render))throw Error("Must provide create() function which returns an object with init(), update(), render(), and isAlive() functions");this._c=t,this.objects=[t()],this.size=0,this.maxSize=e}get(t={}){if(this.size==this.objects.length){if(this.size==this.maxSize)return;for(let s=0;s<this.size&&this.objects.length<this.maxSize;s++)this.objects.push(this._c())}let e=this.objects[this.size];return this.size++,e.init(t),e}getAliveObjects(){return this.objects.slice(0,this.size)}clear(){this.size=this.objects.length=0,this.objects.push(this._c())}update(t){let e,s=!1;for(let n=this.size;n--;)e=this.objects[n],e.update(t),e.isAlive()||(s=!0,this.size--);s&&this.objects.sort((n,r)=>r.isAlive()-n.isAlive())}render(){for(let t=this.size;t--;)this.objects[t].render()}}function Ii(){return new Oe(...arguments)}function Xt(i,t){let e=[],s=t.x+t.width/2,n=t.y+t.height/2,r=i.y<n,h=i.y+i.height>=n;return i.x<s&&(r&&e.push(0),h&&e.push(2)),i.x+i.width>=s&&(r&&e.push(1),h&&e.push(3)),e}class wt{constructor({maxDepth:t=3,maxObjects:e=25,bounds:s}={}){this.maxDepth=t,this.maxObjects=e;let n=A();this.bounds=s||{x:0,y:0,width:n.width,height:n.height},this._b=!1,this._d=0,this._o=[],this._s=[],this._p=null}clear(){this._s.map(t=>{t.clear()}),this._b=!1,this._o.length=0}get(t){let e=new Set;for(;this._s.length&&this._b;)return Xt(t,this.bounds).map(s=>{this._s[s].get(t).map(n=>e.add(n))}),Array.from(e);return this._o.filter(s=>s!==t)}add(...t){t.flat().map(e=>{if(this._b){this._a(e);return}this._o.push(e),this._o.length>this.maxObjects&&this._d<this.maxDepth&&(this._sp(),this._o.map(s=>this._a(s)),this._o.length=0)})}_a(t){Xt(t,this.bounds).map(e=>{this._s[e].add(t)})}_sp(t,e,s){if(this._b=!0,!this._s.length)for(t=this.bounds.width/2|0,e=this.bounds.height/2|0,s=0;s<4;s++)this._s[s]=new wt({bounds:{x:this.bounds.x+(s%2==1?t:0),y:this.bounds.y+(s>=2?e:0),width:t,height:e},maxDepth:this.maxDepth,maxObjects:this.maxObjects}),this._s[s]._d=this._d+1}}function Ni(){return new wt(...arguments)}function Ct(i){let t=[];return i._dn?t.push(i._dn):i.children&&i.children.map(e=>{t=t.concat(Ct(e))}),t}class Le{constructor({id:t,name:e=t,objects:s=[],context:n=C(),cullObjects:r=!0,cullFunction:h=ne,sortFunction:o,...l}){this._o=[],Object.assign(this,{id:t,name:e,context:n,cullObjects:r,cullFunction:h,sortFunction:o,...l});let a=this._dn=document.createElement("section");a.tabIndex=-1,a.style=Ft,a.id=t,a.setAttribute("aria-label",e);let d=this;class c extends W{set x(p){d.sx=p-this.centerX,super.x=p}get x(){return super.x}set y(p){d.sy=p-this.centerY,super.y=p}get y(){return super.y}}this.camera=new c({context:n,anchor:{x:.5,y:.5},render:this._rf.bind(this)}),this.add(s),this._i=()=>{this.context??(this.context=C());let u=this.context.canvas,{width:p,height:g}=u,w=p/2,_=g/2;Object.assign(this.camera,{centerX:w,centerY:_,x:w,y:_,width:p,height:g}),this._dn.isConnected||St(this._dn,u)},this.context&&this._i(),M("init",this._i)}set objects(t){this.remove(this._o),this.add(t)}get objects(){return this._o}add(...t){t.flat().map(e=>{this._o.push(e),e.parent=this,Ct(e).map(s=>{this._dn.appendChild(s)})})}remove(...t){t.flat().map(e=>{X(this._o,e),e.parent=null,Ct(e).map(s=>{St(s,this.context)})})}show(){this.hidden=this._dn.hidden=!1;let t=this._o.find(e=>e.focus);t?t.focus():this._dn.focus(),this.onShow()}hide(){this.hidden=this._dn.hidden=!0,this.onHide()}destroy(){qt("init",this._i),this._dn.remove(),this._o.map(t=>t.destroy&&t.destroy())}lookAt(t){let{x:e,y:s}=t.world||t;this.camera.x=e,this.camera.y=s}update(t){this.hidden||this._o.map(e=>e.update&&e.update(t))}_rf(){let{_o:t,context:e,_sx:s,_sy:n,camera:r,sortFunction:h,cullObjects:o,cullFunction:l}=this;e.translate(s,n);let a=t;o&&(a=a.filter(d=>l(r,d))),h&&a.sort(h),a.map(d=>d.render&&d.render())}render(){if(!this.hidden){let{context:t,camera:e}=this,{x:s,y:n,centerX:r,centerY:h}=e;t.save(),this._sx=r-s,this._sy=h-n,t.translate(this._sx,this._sy),e.render(),t.restore()}}onShow(){}onHide(){}}function Ri(){return new Le(...arguments)}function Ti(i){if(+i==i)return i;let t=[],e=i.split(".."),s=+e[0],n=+e[1],r=s;if(s<n)for(;r<=n;r++)t.push(r);else for(;r>=n;r--)t.push(r);return t}class ke{constructor({image:t,frameWidth:e,frameHeight:s,frameMargin:n,animations:r}={}){if(!t)throw Error("You must provide an Image for the SpriteSheet");this.animations={},this.image=t,this.frame={width:e,height:s,margin:n},this._f=t.width/e|0,this.createAnimations(r)}createAnimations(t){let e,s;for(s in t){let{frames:n,frameRate:r,loop:h}=t[s];if(e=[],n==null)throw Error("Animation "+s+" must provide a frames property");[].concat(n).map(o=>{e=e.concat(Ti(o))}),this.animations[s]=Kt({spriteSheet:this,frames:e,frameRate:r,loop:h,name:s})}}}function Yi(){return new ke(...arguments)}function Z(i,t){return i/t|0}function j(i,t){return i/t|0}class Ge{constructor(t={}){let{width:e,height:s,tilewidth:n,tileheight:r,tilesets:h}=t,o=e*n,l=s*r,a=document.createElement("canvas");a.width=o,a.height=l,this._c=a,this._ctx=a.getContext("2d"),h.map(d=>{let{__k:c,location:u}=window,p=(c?c.dm.get(t):"")||u.href,{source:g}=d;if(g){if(!c)throw Error('You must use "load" or "loadData" to resolve tileset.source');let _=c.d[c.u(g,p)];if(!_)throw Error(`You must load the tileset source "${g}" before loading the tileset`);Object.keys(_).map(f=>{d[f]=_[f]})}let{image:w}=d;if(""+w===w){if(!c)throw Error('You must use "load" or "loadImage" to resolve tileset.image');let _=c.i[c.u(w,p)];if(!_)throw Error(`You must load the image "${w}" before loading the tileset`);d.image=_}}),Object.assign(this,{context:C(),layerMap:{},layerCanvases:{},mapwidth:o,mapheight:l,_sx:0,_sy:0,_o:[],...t}),this.context&&this._p(),M("init",()=>{this.context??(this.context=C()),this._p()})}get sx(){return this._sx}get sy(){return this._sy}set sx(t){let e=Math.max(0,this.mapwidth-A().width);this._sx=z(0,e,t)}set sy(t){let e=Math.max(0,this.mapheight-A().height);this._sy=z(0,e,t)}set objects(t){this.remove(this._o),this.add(t)}get objects(){return this._o}add(...t){t.flat().map(e=>{this._o.push(e),e.parent=this})}remove(...t){t.flat().map(e=>{X(this._o,e),e.parent=null})}setTileAtLayer(t,e,s){let{layerMap:n,tileheight:r,tilewidth:h,width:o}=this,{row:l,col:a,x:d,y:c}=e,u=l??Z(c,r),p=a??j(d,h);n[t]&&(this._d=!0,n[t]._d=!0,n[t].data[u*o+p]=s)}setLayer(t,e){let{layerMap:s}=this;s[t]&&(this._d=!0,s[t]._d=!0,s[t].data=e)}layerCollidesWith(t,e){let{tilewidth:s,tileheight:n,layerMap:r}=this,{x:h,y:o,width:l,height:a}=K(e),d=Z(o,n),c=j(h,s),u=Z(o+a,n),p=j(h+l,s),g=r[t];for(let w=d;w<=u;w++)for(let _=c;_<=p;_++)if(g.data[_+w*this.width])return!0;return!1}tileAtLayer(t,e){let{layerMap:s,tileheight:n,tilewidth:r,width:h}=this,{row:o,col:l,x:a,y:d}=e,c=o??Z(d,n),u=l??j(a,r);return s[t]?s[t].data[c*h+u]:-1}render(t=this._c,e=!0){let{_d:s,context:n,sx:r=0,sy:h=0}=this;s&&this._p();let{width:o,height:l}=A(),a=Math.min(t.width,o),d=Math.min(t.height,l);n.drawImage(t,r,h,a,d,0,0,a,d),e&&(n.save(),(r||h)&&n.translate(-r,-h),this.objects.map(c=>c.render&&c.render()),n.restore())}renderLayer(t){let{layerCanvases:e,layerMap:s}=this,n=s[t],r=e[t],h=r==null?void 0:r.getContext("2d");if(!r){let{mapwidth:o,mapheight:l}=this;r=document.createElement("canvas"),h=r.getContext("2d"),r.width=o,r.height=l,e[t]=r,this._r(n,h)}n._d&&(n._d=!1,h.clearRect(0,0,r.width,r.height),this._r(n,h)),this.render(r,!1)}_p(){let{_ctx:t,layers:e=[],layerMap:s}=this;this._d=!1,e.map(n=>{let{name:r,data:h,visible:o}=n;n._d=!1,s[r]=n,h&&o!=!1&&this._r(n,t)})}_r(t,e){let{opacity:s,data:n=[]}=t,{tilesets:r,width:h,tilewidth:o,tileheight:l}=this;e.save(),e.globalAlpha=s,n.map((a,d)=>{if(!a)return;let c;for(let b=r.length-1;b>=0&&(c=r[b],!(a/c.firstgid>=1));b--);let{image:u,margin:p=0,firstgid:g,columns:w}=c,_=a-g,f=w??u.width/(o+p)|0,m=d%h*o,B=(d/h|0)*l,x=_%f*(o+p),v=(_/f|0)*(l+p);e.drawImage(u,x,v,o,l,m,B,o,l)}),e.restore()}}function $i(){return new Ge(...arguments)}let y={Animation:Kt,AnimationClass:ut,imageAssets:T,audioAssets:H,dataAssets:Y,setImagePath:He,setAudioPath:Ue,setDataPath:Xe,loadImage:te,loadAudio:ee,loadData:ie,load:ze,Button:pi,ButtonClass:fe,init:Te,getCanvas:A,getContext:C,on:M,off:qt,emit:k,GameLoop:pe,GameObject:si,GameObjectClass:W,gamepadMap:_t,updateGamepad:_e,initGamepad:ge,onGamepad:we,offGamepad:me,gamepadPressed:xi,gamepadAxis:yi,gestureMap:ht,initGesture:xe,onGesture:ye,offGesture:ve,Grid:Ei,GridClass:Ee,degToRad:We,radToDeg:Fe,angleToTarget:qe,rotatePoint:se,movePoint:Ke,randInt:Qe,seedRand:Je,lerp:Ve,inverseLerp:Ze,clamp:z,setStoreItem:je,getStoreItem:ti,collides:ne,getWorldRect:K,depthSort:ei,initInput:Mi,onInput:Pi,offInput:Oi,keyMap:L,initKeys:Ce,onKey:be,offKey:Ae,keyPressed:Ai,registerPlugin:Li,unregisterPlugin:ki,extendObject:Gi,initPointer:le,getPointer:oi,track:de,untrack:ci,pointerOver:ui,onPointer:ce,offPointer:ue,pointerPressed:fi,Pool:Ii,PoolClass:Oe,Quadtree:Ni,QuadtreeClass:wt,Scene:Ri,SceneClass:Le,Sprite:ni,SpriteClass:Ot,SpriteSheet:Yi,SpriteSheetClass:ke,Text:he,TextClass:re,TileEngine:$i,TileEngineClass:Ge,Vector:et,VectorClass:$};const It=document.getElementById("game-canvas"),Ie=It.getContext("2d"),Ne=window.devicePixelRatio||1,Re=It.getBoundingClientRect();Ie.canvas.width=Ne*Re.width;Ie.canvas.height=Ne*Re.height;y.init(It,{});y.initKeys();y.initPointer();var Q=(i=>(i.MENU="menu",i.GAME="game",i))(Q||{}),mt=(i=>(i.CHANGE_SCENE="changeScene",i))(mt||{});const{Button:Di}=y,zt=y.getCanvas();let at=Di({text:{color:"white",font:"16px monospace",text:"start game",anchor:{x:.5,y:.5}},anchor:{x:.5,y:.5},x:zt.width/2,y:zt.height/2,onDown(){this.y+=1},onUp(){this.y-=1,setTimeout(()=>y.emit(mt.CHANGE_SCENE,Q.GAME),50)},render(){this.draw(),this.pressed?this.textNode.color="#aaa":this.focused||this.hovered?this.textNode.color="#ccc":this.textNode.color="#fff"}});y.track(at);const Nt=y.Scene({id:Q.MENU,onShow(){at.focus()},focus(){at.focus()}});Nt.add(at);const{Button:Bi,Sprite:Hi}=y,lt=y.getCanvas();let S=Hi({x:100,y:80,color:"red",width:20,height:20,dx:2,dy:2}),dt=Bi({text:{color:"white",font:"16px monospace",text:"win game",anchor:{x:.5,y:.5}},anchor:{x:.5,y:.5},x:lt.width/2,y:lt.height/2,onDown(){this.y+=1},onUp(){this.y-=1,setTimeout(()=>y.emit(mt.CHANGE_SCENE,Q.MENU),50)},render(){this.draw(),this.pressed?this.textNode.color="#aaa":this.focused||this.hovered?this.textNode.color="#ccc":this.textNode.color="#fff"}});y.track(dt);const Rt=y.Scene({id:Q.GAME,onShow(){dt.focus()},focus(){dt.focus()},update(){S.update(),(S.x>lt.width-S.width||S.x<=0)&&(S.dx=-S.dx),(S.y>lt.height-S.height||S.y<=0)&&(S.dy=-S.dy)}});Rt.add(S);Rt.add(dt);const Ui=[Nt,Rt],Wt=Ui.reduce((i,t)=>({...i,[t.id]:t}),{});let ct=Nt;y.on(mt.CHANGE_SCENE,i=>{if(console.log(`Changing scene to ${i}`),Wt[i]!==void 0){const t=Wt[i];ct.hide(),t.show(),ct=t}});const Xi=pe({update:()=>ct.update(),render:()=>ct.render()});Xi.start();
