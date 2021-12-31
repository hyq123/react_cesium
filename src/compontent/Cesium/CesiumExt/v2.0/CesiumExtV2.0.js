import Viewer from "cesium/Source/Widgets/Viewer/Viewer"

import CesiumBase from "./cesiumBase/CesiumBase"

/**
 * 全局参数
 */
 const CONST_PARAM = {
    LoadFunctionAttribute: '', // 加载方式
    BasePath: '' // 路径
}
/**
 * 全局类型
 */
 const CONST_TYPE = {
    POINT: 'point',
    POLYLINE: 'polyLine',
    POLYGON: 'polygon',
}


/**
 * Cesium扩展类
 */
 export default class CesiumExt2 extends CesiumBase{

    /**
     * 初始化入口 三维地图工具拓展 。目前该对象对外隐藏，所有属性及方法追加到d3kit上 
     * @constructor
     * @param {*} viewer 
     * @param {*} options 
     */
    constructor(viewer,options){
        super();  // ES6 要求，子类的构造函数必须执行一次 super 函数，否则会报错。
        debugger;
        
         // 版本
        this._version = '1.5'
        this._viewer = viewer;
        options = options || {}

        if (this._viewer && this._viewer instanceof Viewer) {
             // 加载方式
             CONST_PARAM.LoadFunctionAttribute = options.loadFunctionAttribute || ''
             CONST_PARAM.BasePath = options.basePath || '/gis-manager/WEBGISv1.5/'

             this.Base();

             this._install(this.Base);

        }else{
            console.log("您传入的viewer对象不合法");
        }

    }

    

 }


