!function(e){var t=window.webpackHotUpdate;window.webpackHotUpdate=function(e,r){!function(e,t){if(!C[e]||!P[e])return;for(var r in P[e]=!1,t)Object.prototype.hasOwnProperty.call(t,r)&&(m[r]=t[r]);0==--y&&0===g&&x()}(e,r),t&&t(e,r)};var r,i=!0,n="2e26d545062ed4cdf574",s=1e4,o={},c=[],a=[];function u(e){var t=j[e];if(!t)return D;var i=function(i){return t.hot.active?(j[i]?-1===j[i].parents.indexOf(e)&&j[i].parents.push(e):(c=[e],r=i),-1===t.children.indexOf(i)&&t.children.push(i)):(console.warn("[HMR] unexpected require("+i+") from disposed module "+e),c=[]),D(i)},n=function(e){return{configurable:!0,enumerable:!0,get:function(){return D[e]},set:function(t){D[e]=t}}};for(var s in D)Object.prototype.hasOwnProperty.call(D,s)&&"e"!==s&&"t"!==s&&Object.defineProperty(i,s,n(s));return i.e=function(e){return"ready"===p&&h("prepare"),g++,D.e(e).then(t,(function(e){throw t(),e}));function t(){g--,"prepare"===p&&(_[e]||w(e),0===g&&0===y&&x())}},i.t=function(e,t){return 1&t&&(e=i(e)),D.t(e,-2&t)},i}function d(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:r!==e,active:!0,accept:function(e,r){if(void 0===e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var i=0;i<e.length;i++)t._acceptedDependencies[e[i]]=r||function(){};else t._acceptedDependencies[e]=r||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"==typeof e)for(var r=0;r<e.length;r++)t._declinedDependencies[e[r]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var r=t._disposeHandlers.indexOf(e);r>=0&&t._disposeHandlers.splice(r,1)},check:b,apply:O,status:function(e){if(!e)return p;l.push(e)},addStatusHandler:function(e){l.push(e)},removeStatusHandler:function(e){var t=l.indexOf(e);t>=0&&l.splice(t,1)},data:o[e]};return r=void 0,t}var l=[],p="idle";function h(e){p=e;for(var t=0;t<l.length;t++)l[t].call(null,e)}var f,m,v,y=0,g=0,_={},P={},C={};function E(e){return+e+""===e?+e:e}function b(e){if("idle"!==p)throw new Error("check() is only allowed in idle status");return i=e,h("check"),(t=s,t=t||1e4,new Promise((function(e,r){if("undefined"==typeof XMLHttpRequest)return r(new Error("No browser support"));try{var i=new XMLHttpRequest,s=D.p+""+n+".hot-update.json";i.open("GET",s,!0),i.timeout=t,i.send(null)}catch(e){return r(e)}i.onreadystatechange=function(){if(4===i.readyState)if(0===i.status)r(new Error("Manifest request to "+s+" timed out."));else if(404===i.status)e();else if(200!==i.status&&304!==i.status)r(new Error("Manifest request to "+s+" failed."));else{try{var t=JSON.parse(i.responseText)}catch(e){return void r(e)}e(t)}}}))).then((function(e){if(!e)return h("idle"),null;P={},_={},C=e.c,v=e.h,h("prepare");var t=new Promise((function(e,t){f={resolve:e,reject:t}}));m={};return w(0),"prepare"===p&&0===g&&0===y&&x(),t}));var t}function w(e){C[e]?(P[e]=!0,y++,function(e){var t=document.createElement("script");t.charset="utf-8",t.src=D.p+""+e+"."+n+".hot-update.js",document.head.appendChild(t)}(e)):_[e]=!0}function x(){h("ready");var e=f;if(f=null,e)if(i)Promise.resolve().then((function(){return O(i)})).then((function(t){e.resolve(t)}),(function(t){e.reject(t)}));else{var t=[];for(var r in m)Object.prototype.hasOwnProperty.call(m,r)&&t.push(E(r));e.resolve(t)}}function O(t){if("ready"!==p)throw new Error("apply() is only allowed in ready status");var r,i,s,a,u;function d(e){for(var t=[e],r={},i=t.map((function(e){return{chain:[e],id:e}}));i.length>0;){var n=i.pop(),s=n.id,o=n.chain;if((a=j[s])&&!a.hot._selfAccepted){if(a.hot._selfDeclined)return{type:"self-declined",chain:o,moduleId:s};if(a.hot._main)return{type:"unaccepted",chain:o,moduleId:s};for(var c=0;c<a.parents.length;c++){var u=a.parents[c],d=j[u];if(d){if(d.hot._declinedDependencies[s])return{type:"declined",chain:o.concat([u]),moduleId:s,parentId:u};-1===t.indexOf(u)&&(d.hot._acceptedDependencies[s]?(r[u]||(r[u]=[]),l(r[u],[s])):(delete r[u],t.push(u),i.push({chain:o.concat([u]),id:u})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:r}}function l(e,t){for(var r=0;r<t.length;r++){var i=t[r];-1===e.indexOf(i)&&e.push(i)}}t=t||{};var f={},y=[],g={},_=function(){console.warn("[HMR] unexpected require("+b.moduleId+") to disposed module")};for(var P in m)if(Object.prototype.hasOwnProperty.call(m,P)){var b;u=E(P);var w=!1,x=!1,O=!1,M="";switch((b=m[P]?d(u):{type:"disposed",moduleId:P}).chain&&(M="\nUpdate propagation: "+b.chain.join(" -> ")),b.type){case"self-declined":t.onDeclined&&t.onDeclined(b),t.ignoreDeclined||(w=new Error("Aborted because of self decline: "+b.moduleId+M));break;case"declined":t.onDeclined&&t.onDeclined(b),t.ignoreDeclined||(w=new Error("Aborted because of declined dependency: "+b.moduleId+" in "+b.parentId+M));break;case"unaccepted":t.onUnaccepted&&t.onUnaccepted(b),t.ignoreUnaccepted||(w=new Error("Aborted because "+u+" is not accepted"+M));break;case"accepted":t.onAccepted&&t.onAccepted(b),x=!0;break;case"disposed":t.onDisposed&&t.onDisposed(b),O=!0;break;default:throw new Error("Unexception type "+b.type)}if(w)return h("abort"),Promise.reject(w);if(x)for(u in g[u]=m[u],l(y,b.outdatedModules),b.outdatedDependencies)Object.prototype.hasOwnProperty.call(b.outdatedDependencies,u)&&(f[u]||(f[u]=[]),l(f[u],b.outdatedDependencies[u]));O&&(l(y,[b.moduleId]),g[u]=_)}var S,I=[];for(i=0;i<y.length;i++)u=y[i],j[u]&&j[u].hot._selfAccepted&&g[u]!==_&&I.push({module:u,errorHandler:j[u].hot._selfAccepted});h("dispose"),Object.keys(C).forEach((function(e){!1===C[e]&&function(e){delete installedChunks[e]}(e)}));for(var H,X,T=y.slice();T.length>0;)if(u=T.pop(),a=j[u]){var z={},k=a.hot._disposeHandlers;for(s=0;s<k.length;s++)(r=k[s])(z);for(o[u]=z,a.hot.active=!1,delete j[u],delete f[u],s=0;s<a.children.length;s++){var A=j[a.children[s]];A&&((S=A.parents.indexOf(u))>=0&&A.parents.splice(S,1))}}for(u in f)if(Object.prototype.hasOwnProperty.call(f,u)&&(a=j[u]))for(X=f[u],s=0;s<X.length;s++)H=X[s],(S=a.children.indexOf(H))>=0&&a.children.splice(S,1);for(u in h("apply"),n=v,g)Object.prototype.hasOwnProperty.call(g,u)&&(e[u]=g[u]);var U=null;for(u in f)if(Object.prototype.hasOwnProperty.call(f,u)&&(a=j[u])){X=f[u];var V=[];for(i=0;i<X.length;i++)if(H=X[i],r=a.hot._acceptedDependencies[H]){if(-1!==V.indexOf(r))continue;V.push(r)}for(i=0;i<V.length;i++){r=V[i];try{r(X)}catch(e){t.onErrored&&t.onErrored({type:"accept-errored",moduleId:u,dependencyId:X[i],error:e}),t.ignoreErrored||U||(U=e)}}}for(i=0;i<I.length;i++){var N=I[i];u=N.module,c=[u];try{D(u)}catch(e){if("function"==typeof N.errorHandler)try{N.errorHandler(e)}catch(r){t.onErrored&&t.onErrored({type:"self-accept-error-handler-errored",moduleId:u,error:r,originalError:e}),t.ignoreErrored||U||(U=r),U||(U=e)}else t.onErrored&&t.onErrored({type:"self-accept-errored",moduleId:u,error:e}),t.ignoreErrored||U||(U=e)}}return U?(h("fail"),Promise.reject(U)):(h("idle"),new Promise((function(e){e(y)})))}var j={};function D(t){if(j[t])return j[t].exports;var r=j[t]={i:t,l:!1,exports:{},hot:d(t),parents:(a=c,c=[],a),children:[]};return e[t].call(r.exports,r,r.exports,u(t)),r.l=!0,r.exports}D.m=e,D.c=j,D.d=function(e,t,r){D.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},D.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},D.t=function(e,t){if(1&t&&(e=D(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(D.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)D.d(r,i,function(t){return e[t]}.bind(null,i));return r},D.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return D.d(t,"a",t),t},D.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},D.p="",D.h=function(){return n},u(0)(D.s=0)}([function(e,t,r){"use strict";let i,n,s,o,c,a,u;function d(e,t,r,s,o,c,a){let u,d,p;const h=XE.Obj.CustomPrimitive.Geometry.createCylinder(1,1,1,s);u=h.positions,d=h.sts,p=h.indices,i=i||new Cesium.Matrix4;const f=l(e,t,r,i);if(!f)return{positions:[],sts:[],indices:[]};const m=[];n=n||new Cesium.Cartesian3;const v=u,y=v.length/3|0;for(let e=0;e<y;++e){const t=Cesium.Cartesian3.fromElements(v[3*e+0],v[3*e+1],v[3*e+2]);Cesium.Matrix4.multiplyByPoint(f,t,t),m.push(t.x,t.y,t.z)}const g=[];for(let e=0;e<y;++e){const t=o+(c-o)*d[2*e+1];g.push(t,d[2*e+0])}const _=[],P=p.length;for(let e=0;e<P;++e)_.push(p[e]+a);return{positions:m,sts:g,indices:_}}r.r(t);const l=(e,t,r,i)=>{s=s||new Cesium.Cartesian3,o=o||new Cesium.Cartesian3,c=c||new Cesium.Cartesian3,a=a||new Cesium.Cartesian3,u=u||new Cesium.Quaternion;const n=s,d=o,l=c,p=a,h=Cesium.Cartesian3.fromElements(e[0],e[1],e[2],n),f=Cesium.Cartesian3.fromElements(t[0],t[1],t[2],d);let m=Cesium.Cartesian3.subtract(f,h,l),v=Cesium.Cartesian3.magnitude(m);if(v>0){v=v>0?v:.001,m=Cesium.Cartesian3.normalize(m,m);const e=Cesium.Cartesian3.angleBetween(m,Cesium.Cartesian3.UNIT_Z),t=Cesium.Cartesian3.cross(Cesium.Cartesian3.UNIT_Z,m,p),n=Cesium.Cartesian3.fromElements(r,r,v,d),s=Cesium.Quaternion.fromAxisAngle(t,e,u);return i=i||new Cesium.Matrix4,Cesium.Matrix4.fromTranslationQuaternionRotationScale(h,s,n,i),i}};class p extends XE.Core.XbsjCzmObj{constructor(e,t){super(e,t),this._createCustomPrimitive(e);const r=()=>{if(this.positions.length>1)if(this.isCurve)try{const{center:e,positions:t,sts:r,normals:i,indices:n,totalDistance:s}=function(e,t,r,i,n){if(!e||e.length<=1)throw new Error("rawPositions error!");let s,o,c=0;{const t=[],r=e.length;for(let i=0;i<r;++i)t.push([e[i][0],e[i][1],e[i][2]]);const[i,n]=XE.Obj.CustomPrimitive.Geometry.getLocalPositions(t);o=n;const a=i,u=a.length/3|0,d=[0];for(let e=0;e<u-1;++e){const t=a[3*(e+1)+0]-a[3*e+0],r=a[3*(e+1)+1]-a[3*e+1],i=a[3*(e+1)+2]-a[3*e+2],n=Math.sqrt(t*t+r*r+i*i)+d[e];d.push(n),c+=n}const l=[];for(let e=0;e<u;++e)l.push(new THREE.Vector3(i[3*e+0],i[3*e+1],i[3*e+2]));s=new THREE.CatmullRomCurve3(l)}let a=void 0;try{a=new THREE.TubeGeometry(s,t,r,i,n)}catch(e){throw new Error("TubeGeometry got error!")}var u=a.faces.flatMap(e=>{const t=a.vertices[e.a],r=a.vertices[e.b],i=a.vertices[e.c];return[t.x,t.y,t.z,r.x,r.y,r.z,i.x,i.y,i.z]}),d=a.faceVertexUvs[0].flatMap(e=>[e[0].x,e[0].y,e[1].x,e[1].y,e[2].x,e[2].y]),l=a.faces.flatMap(e=>{const t=e.vertexNormals[0],r=e.vertexNormals[1],i=e.vertexNormals[2];return[t.x,t.y,t.z,r.x,r.y,r.z,i.x,i.y,i.z]}),p=[];{const e=a.faces.length;for(let t=0;t<e;++t)p.push(3*t+0,3*t+1,3*t+2)}return{center:o,positions:u,sts:d,normals:l,indices:p,totalDistance:c}}(this.positions,this.tubularSegments,this.radius,this.radialSegments,this.closed);this._customPrimitive.position=e,this._customPrimitive.positions=t,this._customPrimitive.sts=r,this._customPrimitive.normals=i,this._customPrimitive.indices=n,this._totalDistance=s}catch(e){}else{const{center:e,positions:t,sts:r,indices:i,totalDistance:n}=function(e,t,r){if(e.length-1<=0)throw new Error("createVertexForLines error!");const i=[],n=e.length;for(let t=0;t<n;++t)i.push([e[t][0],e[t][1],e[t][2]]);const[s,o]=XE.Obj.CustomPrimitive.Geometry.getLocalPositions(i);let c=o;const a=s,u=(a.length/3|0)-1;let l=0;const p=[0];for(let e=0;e<u;++e){const t=a[3*(e+1)+0]-a[3*e+0],r=a[3*(e+1)+1]-a[3*e+1],i=a[3*(e+1)+2]-a[3*e+2],n=Math.sqrt(t*t+r*r+i*i)+p[e];p.push(n),l+=n}const h=[],f=[],m=[];let v=0;for(let e=0;e<u;++e){const i=[a[3*e+0],a[3*e+1],a[3*e+2]],n=[a[3*(e+1)+0],a[3*(e+1)+1],a[3*(e+1)+2]],s=p[e]/l,o=p[e+1]/l,c=v,{positions:u,sts:y,indices:g}=d(i,n,t,r,s,o,c);v+=u.length/3|0,u.forEach(e=>h.push(e)),y.forEach(e=>f.push(e)),g.forEach(e=>m.push(e))}return{center:c,positions:h,sts:f,indices:m,totalDistance:l}}(this.positions,this.radius,this.radialSegments);this._customPrimitive.position=e,this._customPrimitive.positions=t,this._customPrimitive.sts=r,this._customPrimitive.normals=void 0,this._customPrimitive.indices=i,this._totalDistance=n}};r(),this.disposers.push(XE.MVVM.watch(()=>({positions:[...this.positions],tubularSegments:this.tubularSegments,radius:this.radius,radialSegments:this.radialSegments,closed:this.closed,isCurve:this.isCurve}),r));const i=()=>{this._customPrimitive.color=this.color,this._customPrimitive.show=this.show};i(),this.disposers.push(XE.MVVM.watch(()=>({color:[...this.color],show:this.show}),i));const n=()=>{const e=this._totalDistance||0;this._customPrimitive.customParams[0]=this.speed[0]/e,this._customPrimitive.customParams[1]=this.speed[1]/(this.radius*Math.PI*2),this._customPrimitive.customParams[2]=e/this.textureSize[0],this._customPrimitive.customParams[3]=this.radius*Math.PI*2/this.textureSize[1]};n(),this.disposers.push(XE.MVVM.watch(()=>({speed:[...this.speed],textureSize:[...this.textureSize],radius:this.radius,positions:[...this.positions]}),n)),this.disposers.push(XE.MVVM.track(this._customPrimitive,"imageUrl",this,"imageUrl")),this._registerEditing(),this.disposers.push(XE.MVVM.bind(this,"enabled",this,"show")),XE.Earth.Interaction.Picking.registerPickingParent(this._customPrimitive,this)}_createCustomPrimitive(e){const t={customParams:[1,1,1,1],renderState:XE.Obj.CustomPrimitive.getRenderState(!0,!1),fragmentShaderSource:"\n            varying vec3 v_positionEC;\n            varying vec3 v_normalEC;\n            varying vec2 v_st;\n            varying vec4 v_color;\n            uniform sampler2D u_image;\n            uniform vec4 u_color;\n            uniform vec4 u_customParams;\n            void main()\n            {\n                float time = czm_frameNumber / 60.0;\n                float s = fract(u_customParams.z*(u_customParams.x * time + v_st.s));\n                float t = fract(u_customParams.w*(u_customParams.y * time + v_st.t));\n                vec4 imageColor = texture2D(u_image, vec2(s, t));\n                gl_FragColor = imageColor * u_color;\n            }\n        ",pass:Cesium.Pass.TRANSLUCENT};this._customPrimitive=new XE.Obj.CustomPrimitive(e),this._customPrimitive.xbsjFromJSON(t),this.disposers.push(()=>{this._customPrimitive=this._customPrimitive&&this._customPrimitive.destroy()})}flyTo(){this._customPrimitive.flyTo()}_registerEditing(){this.disposers.push(XE.Earth.Interaction.InteractionProperty.registerPolylineCreating(this._earth,this,{polylineCreatingProperty:"creating"})),this.disposers.push(XE.Earth.Interaction.InteractionProperty.registerPolylineEditing(this._earth,this,{polylineEditingProperty:"editing"}))}}p.defaultOptions={positions:[],tubularSegments:12,radius:20,radialSegments:5,closed:!1,speed:[10,5],textureSize:[100,10],imageUrl:"",color:[1,1,1,1],isCurve:!0,show:!0},XE.Core.XbsjCzmObj.registerType(p,"CustomPrimitiveExt_Tube");var h=p;XE.Obj.CustomPrimitiveExt=XE.Obj.CustomPrimitiveExt||{},XE.Obj.CustomPrimitiveExt.Tube=h}]);
//# sourceMappingURL=customPrimitive.js.map