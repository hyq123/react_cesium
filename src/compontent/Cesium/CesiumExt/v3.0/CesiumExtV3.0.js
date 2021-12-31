import Viewer from "cesium/Source/Widgets/Viewer/Viewer"

import MixMin from "./Base/MixMin"
import BasicFunctions from "./Base/BasicFunctions"
import CesiumBase from "./CesiumBase/CesiumBase"
import {Base} from "./CesiumBase/CesiumBaseFun"

/**
 * 参考WebMercator投影的几何图形的平铺方案，EPSG:3857。这是谷歌地图、微软Bing地图和大多数ESRI ArcGIS Online使用的平铺方案。
 */
 import WebMercatorTilingScheme from "cesium/Source/Core/WebMercatorTilingScheme"
 import Cartesian2 from "cesium/Source/Core/Cartesian2"
 /**
  * 构造因开发人员错误而引发的异常对象，例如，无效参数、参数超出范围等。此异常仅应在开发期间引发；它通常表示调用代码中存在错误。这个例外永远不应该被抓住；相反，调用代码应该尽量不生成它。
  * 另一方面，RuntimeError表示可能在运行时抛出的异常，例如内存不足，调用代码应该准备好捕获该异常。
  */
 import DeveloperError from "cesium/Source/Core/DeveloperError"
 /**
  * 提供要显示在椭球表面上的图像。此类型描述了接口，不能直接实例化。
  */
 import ImageryProvider from "cesium/Source/Scene/ImageryProvider"

/**
 * 全局参数
 */
 const CONST_PARAM = {
    LoadFunctionAttribute: '', // 加载方式
    BasePath: '' // 路径
}

export default class CesiumExt3 extends MixMin(BasicFunctions){

    constructor(viewer,options){
        super();  // ES6 要求，子类的构造函数必须执行一次 super 函数，否则会报错。
         // 版本
         this._version = '1.5'
         this._viewer = viewer;
         options = options || {}
         if (this._viewer && this._viewer instanceof Viewer) {
            // 加载方式
            CONST_PARAM.LoadFunctionAttribute = options.loadFunctionAttribute || ''
            CONST_PARAM.BasePath = options.basePath || '/gis-manager/WEBGISv1.5/'
            debugger;

            /**
             * 加载基础模块
             */
            this._install(this.Base)


       }else{
           console.log("您传入的viewer对象不合法");
       }
    }

    Base(_viewers){
        if (_viewers) {

            this.BaiduImageryProvider1()


        }
    }

    /**
             * 百度影像拓展
             */
BaiduImageryProvider1 () {
    let IMG_URL =
        'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46'

    let VEC_URL =
        'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020'

    let CUSTOM_URL =
        'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid={style}'
    let $this = this;
    function BaiduImageryProvider(options) {

        CUSTOM_URL = options.temp_url || CUSTOM_URL
        this._url =
            options.style === 'img'
                ? IMG_URL
                : options.style === 'vec'
                    ? VEC_URL
                    : CUSTOM_URL
        this._tileWidth = 256
        this._tileHeight = 256
        this._maximumLevel = 18
        this._minimumLevel = 1
        this._tilingScheme = options.tilingScheme || new WebMercatorTilingScheme({
            rectangleSouthwestInMeters: new Cartesian2(-33554054, -33746824),
            rectangleNortheastInMeters: new Cartesian2(33554054, 33746824)
        })
        this._rectangle = this._tilingScheme.rectangle
        this._credit = undefined
        this._token = undefined
        this._style = options.style || 'normal'
    }

    Object.defineProperties(BaiduImageryProvider.prototype, {
        url: {
            get: function () {
                return this._url;
            }
        },
        token: {
            get: function () {
                return this._token;
            }
        },
        tileWidth: {
            get: function () {
                if (!this.ready) {
                    throw new DeveloperError(
                        'tileWidth must not be called before the imagery provider is ready.'
                    )
                }
                return this._tileWidth
            }
        },
        tileHeight: {
            get: function () {
                if (!this.ready) {
                    throw new DeveloperError(
                        'tileHeight must not be called before the imagery provider is ready.'
                    )
                }
                return this._tileHeight
            }
        },
        maximumLevel: {
            get: function () {
                if (!this.ready) {
                    throw new DeveloperError(
                        'tileHeight must not be called before the imagery provider is ready.'
                    )
                }
                return this._tileHeight
            }
        },
        minimumLevel: {
            get: function () {
                if (!this.ready) {
                    throw new DeveloperError(
                        'minimumLevel must not be called before the imagery provider is ready.'
                    )
                }
                return 0
            }
        },
        tilingScheme: {
            get: function () {
                if (!this.ready) {
                    throw new DeveloperError(
                        'tilingScheme must not be called before the imagery provider is ready.'
                    )
                }
                return this._tilingScheme
            }
        },

        rectangle: {
            get: function () {
                if (!this.ready) {
                    throw new DeveloperError(
                        'rectangle must not be called before the imagery provider is ready.'
                    )
                }
                return this._rectangle
            }
        },

        ready: {
            get: function () {
                return !!this._url
            }
        },

        credit: {
            get: function () {
                return this._credit
            }
        },
        hasAlphaChannel: {
            get: function () {
                return true
            }
        }
    });

    BaiduImageryProvider.prototype.getTileCredits = function (x, y, level) { }

    BaiduImageryProvider.prototype.requestImage = function (x, y, level) {
        if (!this.ready) {
            throw new DeveloperError(
                'requestImage must not be called before the imagery provider is ready.'
            )
        }
        var xTiles = this._tilingScheme.getNumberOfXTilesAtLevel(level)
        var yTiles = this._tilingScheme.getNumberOfYTilesAtLevel(level)
        // var pick1 = new Cesium.Cartesian2(x, y);
        // var cartesian3 = $this._viewer.scene.globe.pick($this._viewer.camera.getPickRay(pick1), $this._viewer.scene);
        // if (cartesian3) {
        //     var ellipsoid = $this._viewer.scene.globe.ellipsoid;
        //     var cartographic = ellipsoid.cartesianToCartographic(cartesian3);
        //     var lat = Cesium.Math.toDegrees(cartographic.latitude);
        //     var lng = Cesium.Math.toDegrees(cartographic.longitude);
        //     var alt = cartographic.height;
        //     if (lat && lng) {
        //         let position = $this.bd09togcj02(lng, lat)
        //         position = $this.gcj02towgs84(position[0], position[1])
        //         let xy = Cesium.SceneTransforms.wgs84ToWindowCoordinates($this._viewer.scene, Cesium.Cartesian3.fromDegrees(position[0], position[1]));
        //         if (xy && xy.x && xy.y) {
        //             x = xy.x, y = xy.y
        //             this._tilingScheme.positionToTileXY(x, y, level,this._rectangle)
        //         }
        //     }
        // }
        var url = this._url
            .replace('{x}', x - xTiles / 2)
            .replace('{y}', yTiles / 2 - y - 1)
            .replace('{z}', level)
            .replace('{s}', 1)
            .replace('{style}', this._style)
        return ImageryProvider.loadImage(this, url)

    }
    /**
     * 拓展百度影像
     */
     return BaiduImageryProvider
}





}