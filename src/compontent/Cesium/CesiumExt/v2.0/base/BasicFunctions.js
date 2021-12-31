/**
 * 基础功能类
 */
export default class BasicFunctions {
    constructor(options){
    }

    /**
     * 安装组件
     * @param {} objects 
     */
    _install(objects){
        //拷贝
        for (const key in objects) {
            if (Object.hasOwnProperty.call(objects, key)) {
                const object = objects[key];
                this._mixin(object);
            }
        }
    }

    /**
     * 深拷贝
     * @param {}} obj 
     */
    _mixin(obj){
        if (obj instanceof Object) {
            
        }
    }
}