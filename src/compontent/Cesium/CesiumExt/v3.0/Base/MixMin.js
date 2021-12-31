export default function MixMin(...mixins) {
    class MixMin {
      constructor() {
        for (let mixin of mixins) {
          copyProperties(this, new mixin()); // 拷贝实例属性
        }
      }
    }
  
    for (let mixin of mixins) {
      copyProperties(MixMin, mixin); // 拷贝静态属性
      copyProperties(MixMin.prototype, mixin.prototype); // 拷贝原型属性
    }
  
    return MixMin;
  }
  
  function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
      if ( key !== 'constructor'
        && key !== 'prototype'
        && key !== 'name'
      ) {
        let desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  }
