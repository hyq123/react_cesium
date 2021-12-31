import Event from 'cesium/Source/Core/Event'
import EntityCollection from 'cesium/Source/DataSources/EntityCollection'
import EntityCluster from 'cesium/Source/DataSources/EntityCluster'


/**
 * 加载3DTil的JSON格式数据
 */
export default class ThreeDTileSetJsonHelper {

    constructor(option){
        option = option || {};

        this._viewer = option.viewer || {};

        this._url = "";

        // this._dataSource = new WebGLGlobeDataSource();

        // WebGLGlobeDataSource(name);

    }


    Load3DTileSetJsonData(option){
        option = option || {};
        this._url = option.url || "";


    }

     /**
      *此类是自定义数据源的示例。 它将JSON数据加载为
      *由Google的WebGL Globe定义，https：//github.com/dataarts/webgl-globe。
      * @alias WebGLGlobeDataSource
      * @构造函数
      *
      * @param {String} [名称]此数据源的名称。 如果未定义，则为名称
      *将从URL派生。
      *
      * @示例
      * var dataSource =new Cesium.WebGLGlobeDataSource（）;
      * dataSource.loadUrl（'sample.json'）;
      * viewer.dataSources.add（dataSource）;
      */
    WebGLGlobeDataSource(name){
        //所有公共配置都定义为ES5属性
        //这些只是“私有”变量及其默认值。
        this._name = name;
        this._changed = new Event();
        this._error = new Event();
        this._isLoading = false;
        this._loading = new Event();

        this._entityCollection = new EntityCollection();
        this._seriesNames = [];
        this._seriesToDisplay = undefined;
        this._heightScale = 10000000;

        this._entityCluster = new EntityCluster();
    }

    // Object.defineProperties(WebGLGlobeDataSource.prototype, {
    
    // });
}