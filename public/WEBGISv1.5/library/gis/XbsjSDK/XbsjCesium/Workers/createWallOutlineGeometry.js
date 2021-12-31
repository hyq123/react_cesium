define(["./when-cbf8cd21","./Check-35e1a91d","./Math-e66fad2a","./Cartesian2-72f33550","./Transforms-12e4beec","./RuntimeError-f4c64df1","./WebGLConstants-95ceb4e9","./ComponentDatatype-7ee14e67","./GeometryAttribute-454922e8","./GeometryAttributes-90846c5f","./IndexDatatype-66caba23","./IntersectionTests-27cc5733","./Plane-bbcdf4b1","./EllipsoidTangentPlane-5d981468","./EllipsoidRhumbLine-ad5cf971","./PolygonPipeline-e01df05d","./EllipsoidGeodesic-6e56c030","./PolylinePipeline-ab10b384","./WallGeometryLibrary-34db0083"],function(P,e,G,L,x,i,t,T,V,D,I,a,n,r,o,s,l,d,S){"use strict";var R=new L.Cartesian3,M=new L.Cartesian3;function m(e){var i=(e=P.defaultValue(e,P.defaultValue.EMPTY_OBJECT)).positions,t=e.maximumHeights,a=e.minimumHeights,n=P.defaultValue(e.granularity,G.CesiumMath.RADIANS_PER_DEGREE),r=P.defaultValue(e.ellipsoid,L.Ellipsoid.WGS84);this._positions=i,this._minimumHeights=a,this._maximumHeights=t,this._granularity=n,this._ellipsoid=L.Ellipsoid.clone(r),this._workerName="createWallOutlineGeometry";var o=1+i.length*L.Cartesian3.packedLength+2;P.defined(a)&&(o+=a.length),P.defined(t)&&(o+=t.length),this.packedLength=o+L.Ellipsoid.packedLength+1}m.pack=function(e,i,t){var a;t=P.defaultValue(t,0);var n=e._positions,r=n.length;for(i[t++]=r,a=0;a<r;++a,t+=L.Cartesian3.packedLength)L.Cartesian3.pack(n[a],i,t);var o=e._minimumHeights;if(r=P.defined(o)?o.length:0,i[t++]=r,P.defined(o))for(a=0;a<r;++a)i[t++]=o[a];var s=e._maximumHeights;if(r=P.defined(s)?s.length:0,i[t++]=r,P.defined(s))for(a=0;a<r;++a)i[t++]=s[a];return L.Ellipsoid.pack(e._ellipsoid,i,t),i[t+=L.Ellipsoid.packedLength]=e._granularity,i};var u=L.Ellipsoid.clone(L.Ellipsoid.UNIT_SPHERE),p={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:u,granularity:void 0};return m.unpack=function(e,i,t){var a;i=P.defaultValue(i,0);var n,r,o=e[i++],s=new Array(o);for(a=0;a<o;++a,i+=L.Cartesian3.packedLength)s[a]=L.Cartesian3.unpack(e,i);if(0<(o=e[i++]))for(n=new Array(o),a=0;a<o;++a)n[a]=e[i++];if(0<(o=e[i++]))for(r=new Array(o),a=0;a<o;++a)r[a]=e[i++];var l=L.Ellipsoid.unpack(e,i,u),d=e[i+=L.Ellipsoid.packedLength];return P.defined(t)?(t._positions=s,t._minimumHeights=n,t._maximumHeights=r,t._ellipsoid=L.Ellipsoid.clone(l,t._ellipsoid),t._granularity=d,t):(p.positions=s,p.minimumHeights=n,p.maximumHeights=r,p.granularity=d,new m(p))},m.fromConstantHeights=function(e){var i,t,a=(e=P.defaultValue(e,P.defaultValue.EMPTY_OBJECT)).positions,n=e.minimumHeight,r=e.maximumHeight,o=P.defined(n),s=P.defined(r);if(o||s){var l=a.length;i=o?new Array(l):void 0,t=s?new Array(l):void 0;for(var d=0;d<l;++d)o&&(i[d]=n),s&&(t[d]=r)}return new m({positions:a,maximumHeights:t,minimumHeights:i,ellipsoid:e.ellipsoid})},m.createGeometry=function(e){var i=e._positions,t=e._minimumHeights,a=e._maximumHeights,n=e._granularity,r=e._ellipsoid,o=S.WallGeometryLibrary.computePositions(r,i,a,t,n,!1);if(P.defined(o)){var s,l=o.bottomPositions,d=o.topPositions,m=d.length,u=2*m,p=new Float64Array(u),f=0;for(m/=3,s=0;s<m;++s){var c=3*s,h=L.Cartesian3.fromArray(d,c,R),g=L.Cartesian3.fromArray(l,c,M);p[f++]=g.x,p[f++]=g.y,p[f++]=g.z,p[f++]=h.x,p[f++]=h.y,p[f++]=h.z}var y=new D.GeometryAttributes({position:new V.GeometryAttribute({componentDatatype:T.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:p})}),v=u/3;u=2*v-4+v;var E=I.IndexDatatype.createTypedArray(v,u),_=0;for(s=0;s<v-2;s+=2){var b=s,C=s+2,H=L.Cartesian3.fromArray(p,3*b,R),A=L.Cartesian3.fromArray(p,3*C,M);if(!L.Cartesian3.equalsEpsilon(H,A,G.CesiumMath.EPSILON10)){var k=s+1,w=s+3;E[_++]=k,E[_++]=b,E[_++]=k,E[_++]=w,E[_++]=b,E[_++]=C}}return E[_++]=v-2,E[_++]=v-1,new V.Geometry({attributes:y,indices:E,primitiveType:V.PrimitiveType.LINES,boundingSphere:new x.BoundingSphere.fromVertices(p)})}},function(e,i){return P.defined(i)&&(e=m.unpack(e,i)),e._ellipsoid=L.Ellipsoid.clone(e._ellipsoid),m.createGeometry(e)}});
