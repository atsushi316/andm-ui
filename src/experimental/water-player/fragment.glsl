precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_wave;
uniform float u_fill;
float sq(float x){return x*x;}
vec3 studio(vec2 p){
 float light=exp(-dot(p-vec2(-.35,.3),p-vec2(-.35,.3))*1.8);
 vec3 c=mix(vec3(.63,.67,.66),vec3(.94,.95,.93),light);
 c+=.08*exp(-sq((p.x-.45)/.12));
 c-=.12*exp(-sq((p.x+.7)/.085));
 c-=.07*(1.-smoothstep(-.5,.2,p.y));
 return c;
}
float rounded(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
vec2 outward(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;vec2 o=max(q,0.);if(length(o)>.0001)return normalize(o)*sign(p);return q.x>q.y?vec2(sign(p.x),0.):vec2(0.,sign(p.y));}
void main(){
 vec2 p=(gl_FragCoord.xy/u_resolution-.5)*vec2(u_resolution.x/u_resolution.y,1.);
 vec2 b=vec2(min(u_resolution.x/u_resolution.y*.41,.95),.27);
 float r=.13,sd=rounded(p,b,r),aa=1.4/u_resolution.y;
 vec3 bg=studio(p);
 float shadow=exp(-sq((p.y+.305)/.028))*exp(-pow(abs(p.x/(b.x*.95)),6.));
 bg*=1.-shadow*.25;
 float mask=1.-smoothstep(-aa,aa,sd);
 if(mask<.001){gl_FragColor=vec4(bg,1.);return;}
 vec2 outn=outward(p,b,r);
 float rim=exp(min(sd,0.)/.025);
 vec2 slope=outn*rim*.93+p/b*.11;
 vec3 n=normalize(vec3(slope,sqrt(max(.02,1.-dot(slope,slope)))));
 vec3 glass=studio(p-n.xy*.14);
 float waterY=-b.y+.03+(2.*b.y-.06)*u_fill;
 float x=p.x/b.x;
 waterY+=u_wave.x*sin(x*1.57)+u_wave.y*cos(x*3.14);
 float wet=1.-smoothstep(-aa,aa,p.y-waterY);
 float inside=1.-smoothstep(-.025,-.01,sd);
 vec2 waterShift=vec2(p.x*.02+u_wave.x*.16,p.y*.025-.012);
 vec3 water=studio(p-n.xy*.14+waterShift);
 // Neutral transmission and thickness; no coloured liquid fill.
 water*=vec3(.984,.994,.989);
 glass=mix(glass,water,wet*inside);
 float fresnel=.035+.55*pow(1.-n.z,5.);
 vec3 refl=studio(vec2(n.x*1.4,n.y*.8+.35));
 glass=mix(glass,refl,fresnel);
 float left=pow(max(0.,dot(n,normalize(vec3(-.65,.35,.7)))),36.);
 float right=pow(max(0.,dot(n,normalize(vec3(.75,.1,.65)))),48.);
 glass+=left*.36+right*.14;
 // Paired inner/outer boundaries and substantial glass bottom.
 float outerDark=exp(-sq((sd+.002)/.0028));
 float innerDark=exp(-sq((sd+.013)/.003));
 float innerLight=exp(-sq((sd+.018)/.0035));
 glass*=1.-outerDark*.22-innerDark*.15;
 glass+=innerLight*(.04+.13*max(0.,-outn.x)+.08*max(0.,outn.y));
 float base=exp(-sq((p.y+b.y-.025)/.012))*inside;
 glass=mix(glass,studio(p+vec2(p.x*.045,.12))*.64,base*.7);
 glass+=exp(-sq((p.y+b.y-.04)/.004))*inside*.11;
 // Meniscus has reflected sky, a dark underside and curved vessel contact.
 float men=exp(-sq((p.y-waterY)/.0025))*inside;
 float under=exp(-sq((p.y-waterY+.004)/.003))*inside;
 glass=glass*(1.-under*.17)+men*(.04+.11*exp(-sq((p.x+.35)/.5)));
 float contact=exp(-sq((sd+.026)/.008))*exp(-sq((p.y-waterY)/.012));
 glass*=1.-contact*.14;
 gl_FragColor=vec4(mix(bg,glass,mask),1.);
}
