define(["exports","./when-cbf8cd21","./Check-35e1a91d"],function(e,c,t){"use strict";var a=Object.freeze({NONE:0,TOP:1,ALL:2});e.GeometryOffsetAttribute=a,e.arrayFill=function(e,t,a,f){if("function"==typeof e.fill)return e.fill(t,a,f);for(var r=e.length>>>0,n=c.defaultValue(a,0),i=n<0?Math.max(r+n,0):Math.min(n,r),l=c.defaultValue(f,r),u=l<0?Math.max(r+l,0):Math.min(l,r);i<u;)e[i]=t,i++;return e}});
