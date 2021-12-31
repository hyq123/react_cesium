import { options } from "less";
import BasicFunctions from "../base/BasicFunctions"

/**
 * Cesium 基础类
 */
export default class CesiumBase extends  BasicFunctions{

    constructor(viewer){
        super();  // ES6 要求，子类的构造函数必须执行一次 super 函数，否则会报错。
        this._viewer = viewer;

        this.BaiduImageryProvider();
    }

    Base(){
        if (this._viewer) {
            this._installBaiduImageryProvider()
        }
    }

    /**
     * 百度影像拓展
     */
    _installBaiduImageryProvider(){
        let IMG_URL =
            'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46'

        let VEC_URL =
            'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020'

        let CUSTOM_URL =
            'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid={style}';
    
           function BaiduImageryProvider(options){
               debugger;
            }
        
        return BaiduImageryProvider
    }

    BaiduImageryProvider(options){
        debugger;
    }
}