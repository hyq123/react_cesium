import Viewer from "cesium/Source/Widgets/Viewer/Viewer"

import {BaseImageryProviderExpand} from "./CesiumBase/CesiumBase"

; if (typeof Cesium !== 'undefined')
    /**
    * 重构工具包 剥离功能模块 解耦合以及模块权限 可以自动安装不同模块使用
    * @author zhangti
    * @param viewer  {object} 三维对象
    * @param options {object} 初始化容器参数
    * @constructor
    */
    Cesium.CesiumExt4 = (function () {
        // 版本
        var version = '4.0'
        // 作者
        var author = 'houyanqing'
        // cesium版本
        var CesiumVersion = Cesium.VERSION || ''
        /**
         * 全局参数
         */
         var CONST_PARAM = {
            LoadFunctionAttribute: '', // 加载方式
            BasePath: '' // 路径
        }
        /**
         * 全局状态
         */
        var CONST_STATE = {}
        /**
         * 全局类型
         */
        var CONST_TYPE = {
            POINT: 'point',
            POLYLINE: 'polyLine',
            POLYGON: 'polygon',
        }
        /**
         * 初始化函数，相当于构造函数
         * @param {*} viewer 
         * @param {*} options 
         */
        function  _(viewer,options) {
            this._viewer = viewer;
            options = options || {}

            if (this._viewer && this._viewer instanceof Viewer) {
                 /**
                 * config
                 * 局部参数配置
                 */
                // 加载方式
                CONST_PARAM.LoadFunctionAttribute = options.loadFunctionAttribute || ''
                CONST_PARAM.BasePath = options.basePath || '/gis-manager/WEBGISv1.5/'
                /**
                 * 基础模块
                 */
                 this._install([BaseImageryProviderExpand]);

                //  this._install([Base, Shaders, Graphics, Draw, Math3d, Math2d, Material, Plugin, PassEffect, DomUtil]);

            }
            
        }

        /**
         * 为初始化函数(构造函数)赋予自身的函数和属性
         */
         _.prototype = {
            // 安装组件
            _install: function (objects) {
                // 拷贝
                for (var i in objects) {
                    this._mixin(objects[i])
                }
            },
            /**
             * 深拷贝功能函数
             * 
             * 如何区分深拷贝与浅拷贝，简单点来说，就是假设B复制了A，当修改A时，看B是否会发生变化，
             * 如果B也跟着变了，说明这是浅拷贝，拿人手短，如果B没变，那就是深拷贝，自食其力。
             * @param {*} obj 
             * @returns 
             */
            _mixin: function (obj) {
                if (obj instanceof Object) {
                    //拷贝方法
                    var keys = Object.keys(obj.prototype);
                    var i, len;
                    for (var i = 0, len = keys.length; i < len; i++) {
                        _.prototype[keys[i]] = obj.prototype[keys[i]];
                    }
                    //拷贝属性
                    if (CONST_PARAM.LoadFunctionAttribute === 'loadAttribute') return;
                    obj.call(this, this._viewer)
                }

            },

         }


        console.clear()
        console.log(
            `%c \n D3-KIT \n  %c \n  基于Cesium三维拓展包  %c \n
        版本:${version}
        作者:${author}

        Cesium版本:${CesiumVersion}
        版权声明:
        1.代码包基于Cesium拓展,部分模块开源已上传github。
        2.后续会继续更新拓展,目前该代码包不开源,如需使用:
            1)代码包的完整引用
            2)此版权信息在控制台输出
        我方保留对此版权信息的最终解释权。`,
            'font-size:20px;padding-left:70px;color:#EEB422',
            'font-size:14px;padding-left:50px;color:#EEB422;font-style:oblique',
            'font-size:14px;color:#0865ba'
        )

        return _
    })();