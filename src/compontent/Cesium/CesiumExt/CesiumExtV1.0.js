import SunLight from "cesium/Source/Scene/SunLight"
import JulianDate from "cesium/Source/Core/JulianDate"
import Cartesian3 from "cesium/Source/Core/Cartesian3"
import CesiumMath from "cesium/Source/Core/Math" 
import EasingFunction from "cesium/Source/Core/EasingFunction"
import Cesium3DTileset from "cesium/Source/Scene/Cesium3DTileset"
import HeadingPitchRange from "cesium/Source/Core/HeadingPitchRange"
import SkyBox from "cesium/Source/Scene/SkyBox"
import ScreenSpaceEventHandler from 'cesium/Source/Core/ScreenSpaceEventHandler'
import ScreenSpaceEventType from 'cesium/Source/Core/ScreenSpaceEventType'
import defined from 'cesium/Source/Core/defined'
import Cartographic from "cesium/Source/Core/Cartographic"
import Matrix3 from "cesium/Source/Core/Matrix3"
import Matrix4 from "cesium/Source/Core/Matrix4"
import Transforms from "cesium/Source/Core/Transforms"
import Color from "cesium/Source/Core/Color"
import defaultValue from "cesium/Source/Core/defaultValue"
import Event from "cesium/Source/Core/Event"
import createPropertyDescriptor from "cesium/Source/DataSources/createPropertyDescriptor"
import Property from "cesium/Source/DataSources/Property"
import Material from "cesium/Source/Scene/Material"
import Entity from "cesium/Source/DataSources/Entity"
import CustomDataSource from "cesium/Source/DataSources/CustomDataSource"

import PointGraphics from "cesium/Source/DataSources/PointGraphics"
import LabelGraphics from "cesium/Source/DataSources/LabelGraphics"

import BillboardGraphics from "cesium/Source/DataSources/BillboardGraphics"
import LabelStyle from "cesium/Source/Scene/LabelStyle"
import VerticalOrigin from "cesium/Source/Scene/VerticalOrigin"

import Cartesian2 from "cesium/Source/Core/Cartesian2"

import SampledPositionProperty from "cesium/Source/DataSources/SampledPositionProperty"
import TimeIntervalCollection from "cesium/Source/Core/TimeIntervalCollection"
import ClockRange from "cesium/Source/Core/ClockRange"
import TimeInterval from "cesium/Source/Core/TimeInterval"
import CallbackProperty from "cesium/Source/DataSources/CallbackProperty"
import PolylineGlowMaterialProperty from "cesium/Source/DataSources/PolylineGlowMaterialProperty"
import VelocityOrientationProperty from "cesium/Source/DataSources/VelocityOrientationProperty"
import PostProcessStageLibrary from "cesium/Source/Scene/PostProcessStageLibrary"

import BoxGeometry from "cesium/Source/Core/BoxGeometry"
import destroyObject from "cesium/Source/Core/destroyObject"
import DeveloperError from "cesium/Source/Core/DeveloperError"
import GeometryPipeline from "cesium/Source/Core/GeometryPipeline"
import VertexFormat from "cesium/Source/Core/VertexFormat"
import Model from "cesium/Source/Scene/Model"
import DirectionalLight from "cesium/Source/Scene/DirectionalLight";

import Cesium3DTileStyle  from "cesium/Source/Scene/Cesium3DTileStyle"

import {Cartesian3_to_WGS84} from "../CesiumTools/CoordinateTransform/CoordinateTransformTool"

/**
 * Cesium扩展类
 */
 export default class CesiumExt {
    
	constructor(viewer,options){
		// 版本
	    this.version = '1.0'
	    // 作者
	    this.author = 'houyanqing'

	    // cesium版本
	    // this.CesiumVersion = Cesium.VERSION || ''
	    
	    /**
	     * 全局参数
	     */
	    this.CONST_PARAM = {
	        LoadFunctionAttribute: '', // 加载方式
	        BasePath: '' // 路径
	    }
	    
	    /**
	     * 全局状态
	     */
	    this.CONST_STATE = {}
	    /**
	     * 全局类型
	     */
	    this.CONST_TYPE = {
	        POINT: 'point',
	        POLYLINE: 'polyLine',
	        POLYGON: 'polygon',
	    }
    
		this._viewer = viewer;
		options = options || {};
		
		if (this._viewer) {
			this._scene = this._viewer.scene;
			this._camera = this._viewer.camera; 
			/**
             * config
             * 局部参数配置
             */
            // 加载方式
            this.CONST_PARAM.LoadFunctionAttribute = options.loadFunctionAttribute || ''
            this.CONST_PARAM.BasePath = options.basePath || '/gis-manager/WEBGISv1.5/'
			
			this._handler = new ScreenSpaceEventHandler(this._viewer.canvas);

			this._graphicsLayer = new CustomDataSource('graphicsLayer')
            viewer && viewer.dataSources.add(this._graphicsLayer)

			let opt = {};

			//设置第二重烘焙纹理的效果（明暗程度）
			this._scene.shadowMap.darkness = 1.275;
			this._scene.shadows = true;

			//设置环境光
			// this._scene.lightSource.ambientLightColor = opt.ambientLightColor || new Color(0.7, 0.7, 0.7, 1);
	
			//深度检测
			this._scene.globe.depthTestAgainstTerrain = true;
	
			//地面调节
			//this._scene.globe.baseColor = Cesium.Color.BLACK;
			this._scene.globe.globeAlpha = 1;
			this._scene.undergroundMode = true;
			this._scene.terrainProvider.isCreateSkirt = false;
	
			//调节场景环境
			this._scene.sun.show = false;
			this._scene.moon.show = false;
			// this._scene.skyBox.show = false;
			this._scene.skyAtmosphere.show = false;
			this._scene.fxaa = true;
	
			//开启颜色校正
			// this._scene.colorCorrection.show = opt.colorCorrection || false;
			// this._scene.colorCorrection.saturation = opt.saturation || 3.1;
			// this._scene.colorCorrection.brightness = opt.brightness || 1.8;
			// this._scene.colorCorrection.contrast = opt.contrast || 1.2;
			// this._scene.colorCorrection.hue = opt.hue || 0;
	
			// //开启泛光和HDR
			// this._scene.bloomEffect.show = opt.bloomEffect || false;
			// this._scene.hdrEnabled = opt.hdrEnabled || true;
			// this._scene.bloomEffect.threshold = 1;
			// this._scene.bloomEffect.bloomIntensity = 2;
	
			//最大距离
			// this._scene.screenSpaceCameraController.maximumZoomDistance = 5000.0


			/**
             * 基础模块
             */
//          this._install([])
//          this._install([Base, Shaders, Graphics, Draw, Math3d, Math2d, Material, Plugin, PassEffect, DomUtil])

		} else{
			alert("请检查 Cesium 是否初始化 !!")
            return false
		}
	}

	setUpdatePostProcess(){

		 // 亮度设置
		 var stages = this._viewer.scene.postProcessStages;
		 this._viewer.scene.brightness =  this._viewer.scene.brightness || stages.add(PostProcessStageLibrary.createBrightnessStage());
		 this._viewer.scene.brightness.enabled = true;
		 this._viewer.scene.brightness.uniforms.brightness = Number(1.4);
		 var scene=this._viewer.scene;
		 var viewModel = {
            show : true,
            glowOnly : false,
            contrast : 120,
            brightness : -0.3,
            delta : -10.0,
            sigma : 3.78,
            stepSize : 5.0
        };
		var bloom = this._viewer.scene.postProcessStages.bloom;
		bloom.enabled = true;
		bloom.uniforms.glowOnly = Boolean(viewModel.glowOnly);
		bloom.uniforms.contrast = Number(viewModel.contrast);
		bloom.uniforms.brightness = Number(viewModel.brightness);
		bloom.uniforms.delta = Number(viewModel.delta);
		bloom.uniforms.sigma = Number(viewModel.sigma);
		bloom.uniforms.stepSize = Number(viewModel.stepSize);


	}
	
	/**
	 * 设置白天或者黑夜
	 */
	setSceneTime(option){
		option = option || {};
		let state = option.state || "day";
		let iso8601;
		
		if (state === "night") {
			iso8601 = "2020-01-09T20:00:39.018261982600961346Z";
			 /**
	         *对大气和雾启用动态照明效果。 这只会生效
	        *当<code> enableLighting </ code>为<code> true </ code>时。
	        */
			this._scene.globe.dynamicAtmosphereLighting = true;//
		    this._viewer.scene.globe.enableLighting = true;
		    /**
	         *动态气氛照明是否使用太阳方向而非场景的
	        *光的方向。 仅在<code> enableLighting </ code>和
	        * <code> dynamicAtmosphereLighting </ code>是<code> true </ code>。
	        */
			this._scene.globe.dynamicAtmosphereLightingFromSun = true;
			
		} else if(state === "day"){
			iso8601 = "2020-01-09T14:00:39.018261982600961346Z";
			/**SunLight:
	         *来自太阳的定向光源。
	        *
	        * @param {Object} [options]具有以下属性的对象：
	        * @param {Color} [options.color = Color.WHITE]灯光的颜色。
	        * @param {Number} [options.intensity = 2.0]灯光的强度。
	        */
			this._sunLight = new SunLight();
			this._scene.globe.dynamicAtmosphereLighting = true;
		    this._viewer.scene.globe.enableLighting = false;
			this._scene.globe.dynamicAtmosphereLightingFromSun = true;
			// this._scene.light = this._sunLight;
		}
		
		this.setTime(iso8601);
	    
	}
	
	setTime(iso8601) {
        var currentTime = JulianDate.fromIso8601(iso8601);
        var endTime =JulianDate.addDays(
          currentTime,
          2,
          new JulianDate()
        );
      
        this._viewer.clock.currentTime = currentTime;
      }

	  /**
	 * 平行光
	 * @param {*} position 
	 * @param {*} options 
	 */
	   setDirectionalLight(position, options) {
        this._scene.globe.enableLighting = true;
		if (this._viewer && position) {
			var DEF_OPTS = {
				direction: options.targetPosition, //方向
				color: options.color || new Color(1, 1, 2, 0.8),
				intensity: options.intensity || 1
			};
			options = options || DEF_OPTS

			// var directionalLight = new DirectionalLight(options)

			// this._viewer.scene.addLightSource(directionalLight);

			// var customColorLight = new DirectionalLight({
			// 	// direction: new Cartesian3(
			// 	//   -0.2454278300540191,
			// 	//   0.8842635425193919,
			// 	//   0.39729481195458805
			// 	// ),
			// 	color: Color.fromCssColorString("#ffffff"),
			// 	intensity:10.0
			//   });

			// var directionalLight = new DirectionalLight(position, options)

			var customColorLight = new DirectionalLight({
				direction:position,
				color: Color.fromCssColorString("#ffffff"),
				intensity:10.0
				});

			  this._viewer.scene.light = customColorLight;


			// return customColorLight
		}
	}
	
	/**
	 * 设置初始位置
	 */
	setInitPosition(option){
		option = option || {};
		let state = option.state || "";
		let position = option.position || [];
		let heading = option.heading || 0.0;
		let pitch = option.pitch || 0.0;
		
		let lon = position[0];
		let lat = position[1];
		let high = position[2];
		
		if (!this._viewer) {
	        return;
	    }
			
	    //东北向上框架中的视图
	    
	    if(state === "location"){
	    	this._camera.setView({
		      // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
		      // fromDegrees()方法，将经纬度和高程转换为世界坐标
		      destination:Cartesian3.fromDegrees(lon,lat,high),
		      orientation:{
			      // 指向 (方向)
			      heading:CesiumMath.toRadians(heading),
			      // 视角 (俯仰角)
			      pitch:CesiumMath.toRadians(pitch),
			      roll:0.0
		      }
		  });
	    }else if(state === "fly"){
		      
		      this._camera.flyTo({
		        destination: Cartesian3.fromDegrees(lon,lat,high),
		        orientation: {
		          heading: CesiumMath.toRadians(heading),
		          pitch: CesiumMath.toRadians(pitch),
		          roll:0.0
		        },
		        /**
		        *EasingFunction:与TweenCollection一起使用的缓动函数。 这些功能来自
		        * {@link https://github.com/sole/tween.js/|Tween.js}和Robert Penner。 看到
		        * {@每个功能的链接http://sole.github.io/tween.js/examples/03_graphs.html|Tween.js图}。
		        *
		        * @exports EasingFunction
		        */
		        easingFunction:EasingFunction.QUADRATIC_OUT,
		      });
		}
	    
	}
	
	/**
	 * 加载3dtile数据
	 */
	Load3dTileData(option){
		let info = "";
		option = option || {};
		let url = option.url || "";
		let id = option.id || "";

		let heightAboveGround = option.heightAboveGround || 0;

		let IsPositionToData  = option .IsPositionToData || true;
		
		if (url === "") return "3dtile数据url不能为空";
		
		let this_ = this;
		let tileset = new Cesium3DTileset({
            url: url,
            id:id
        });
        
        tileset.readyPromise
          .then(function (tileset) {

			//3dtile数据纠偏
            this_._viewer.scene.primitives.add(tileset);

			tileset.style = new Cesium3DTileStyle({
				color:"color('black',0.2)"
			})
            
            // if (IsPositionToData) {
            // 	this_._viewer.flyTo(tileset,
	        //      new HeadingPitchRange(
	        //         -1,
	        //         -0.1,
	        //         tileset.boundingSphere.radius * 0.1
	        //       ));
	        //     } 
            
            		  //模型据地高度

				let heightAboveGroundNumber = Number(heightAboveGround);

				var cartographic = Cartographic.fromCartesian(
					tileset.boundingSphere.center
				);
				//Cartesian3.fromRadians从以弧度给出的经度和纬度值返回Cartesian3位置。
				var surface = Cartesian3.fromRadians(
					cartographic.longitude,
					cartographic.latitude,
					0.0
				);
				var offset = Cartesian3.fromRadians(
					cartographic.longitude,
					cartographic.latitude,
					heightAboveGroundNumber
				);
				//Cartesian3.subtract:计算两个笛卡尔的分量差异。
				var translation = Cartesian3.subtract(
					offset,
					surface,
					new Cartesian3()
				);
				//Matrix4.fromTranslation从笛卡尔3创建一个表示转换的Matrix4实例。
				tileset.modelMatrix = Matrix4.fromTranslation(translation);
          })
          .otherwise(function (error) {
            console.log(error);
          });

		//   //模型据地高度

		//   let heightAboveGroundNumber = Number(heightAboveGround);

		//   var cartographic = Cartographic.fromCartesian(
		// 	tileset.boundingSphere.center
		//   );
		//   //Cartesian3.fromRadians从以弧度给出的经度和纬度值返回Cartesian3位置。
		//   var surface = Cartesian3.fromRadians(
		// 	cartographic.longitude,
		// 	cartographic.latitude,
		// 	0.0
		//   );
		//   var offset = Cartesian3.fromRadians(
		// 	cartographic.longitude,
		// 	cartographic.latitude,
		// 	heightAboveGroundNumber
		//   );
		//   //Cartesian3.subtract:计算两个笛卡尔的分量差异。
		//   var translation = Cartesian3.subtract(
		// 	offset,
		// 	surface,
		// 	new Cartesian3()
		//   );
		//   //Matrix4.fromTranslation从笛卡尔3创建一个表示转换的Matrix4实例。
		//   tileset.modelMatrix = Matrix4.fromTranslation(translation);


		  //模型移动
		//   116.397449,39.909205
		  //模型总调参数
		//   var params = {
        //     tx: 116.391331,  
        //     ty: 39.90738,   
        //     // tx: 116.2402,  
        //     // ty: 39.97708,    
        //     tz: 0,    
        //     rx: 0,   
        //     ry: 0,   
        //     rz: 0     
        // };
		//   tileset.readyPromise.then(function (argument) {
        //     //旋转
        //     var mx = Matrix3.fromRotationX(CesiumMath.toRadians(params.rx));
        //     var my = Matrix3.fromRotationY(CesiumMath.toRadians(params.ry));
        //     var mz = Matrix3.fromRotationZ(CesiumMath.toRadians(params.rz));
        //     var rotationX = Matrix4.fromRotationTranslation(mx);
        //     var rotationY = Matrix4.fromRotationTranslation(my);
        //     var rotationZ = Matrix4.fromRotationTranslation(mz);
            
            
        //     //平移
        //     var position = Cartesian3.fromDegrees(params.tx, params.ty, params.tz);
        //     var m = Transforms.eastNorthUpToFixedFrame(position);
        //     //旋转、平移矩阵相乘
        //     Matrix4.multiply(m, rotationX, m);
        //     Matrix4.multiply(m, rotationY, m);
        //     Matrix4.multiply(m, rotationZ, m);

        //     //缩放
        //     // var scale = Matrix4.fromUniformScale(0.775)
		// 	var scale = Matrix4.fromUniformScale(2)
        //     Matrix4.multiply(m, scale, m)

        //     //赋值给tileset
        //     tileset._root.transform = m;
        // })
	}
	
	/**
	 * 自定义天空盒
	 */
	CustomSkyBox(option){
		var scene=this._viewer.scene;
		scene.skyBox = new SkyBox({
		  sources : {
		    positiveX : 'WEBGISv1.5/datas/images/SkyBox/Right.jpg',
		    negativeX : 'WEBGISv1.5/datas/images/SkyBox/Left.jpg',
		    positiveY : 'WEBGISv1.5/datas/images/SkyBox/Front.jpg',
		    negativeY : 'WEBGISv1.5/datas/images/SkyBox/Back.jpg',
		    positiveZ : 'WEBGISv1.5/datas/images/SkyBox/Up.jpg',
		    negativeZ : 'WEBGISv1.5/datas/images/SkyBox/Down.jpg'
		  }
		});
	}

	GetCoordByOnclick(){
		let this_ = this;
		this._handler.setInputAction(function (movement) {
			var earthPosition  = this_._viewer.camera.pickEllipsoid(movement.position,this_._viewer.scene.globe.ellipsoid);
			var cartographic = Cartographic.fromCartesian(earthPosition, this_._viewer.scene.globe.ellipsoid, new Cartographic());
			var lat=CesiumMath.toDegrees(cartographic.latitude);
			var lng=CesiumMath.toDegrees(cartographic.longitude);
			var height=cartographic.height;
			// alert("[Lng=>"+lng+",Lat=>"+lat+",H=>"+height+"]");
			alert(lng+","+lat);


			// if (this_._scene.pickPositionSupported) {
			// 	//movement.position:二维笛卡尔点
			// 	//cartesian三维笛卡尔点
			// 	var cartesian = this_._scene.pickPosition(movement.position);
			// 	if (defined(cartesian)) {
			// 		let wgs84Coord = Cartesian3_to_WGS84(cartesian);
		  
			// 		var wgs84CoordText = "当前点击坐标经度:" + wgs84Coord.lng +
			// 		"纬度:" + wgs84Coord.lat +
			// 		"高度:"+ wgs84Coord.alt;
			// 		alert(wgs84CoordText)
			// 	}
				
			// }
			
  
		  }, ScreenSpaceEventType.LEFT_CLICK);
	}
	
/**
            * 获取一个材质围栏
            * @param {*} options 
            */
 getCustomMaterialWall (options) {

	if (this._viewer && options && options.image) {

		return this._initWallCustomMaterialProperty(options)
	}
}
// 动态初始化材质线
_initWallCustomMaterialProperty(options) {

	var Color1 = Color,
		defaultValue1 = defaultValue,
		defined1 = defined,
		defineProperties = Object.defineProperties,
		Event1 = Event,
		createPropertyDescriptor1 = createPropertyDescriptor,
		Property1 = Property,
		Material1 = Material,
		MaterialType = options.MaterialType || 'wallType' + parseInt(Math.random() * 1000);

	function WallLinkCustomMaterialProperty(options) {

		options = defaultValue1(options, defaultValue1.EMPTY_OBJECT);
		this._definitionChanged = new Event1();
		this._color = undefined;
		this._colorSubscription = undefined;
		this.color = options.color || Color1.BLUE;
		this.duration = options.duration || 3000;
		this._time = new Date().getTime();
	}

	defineProperties(WallLinkCustomMaterialProperty.prototype, {
		isvarant: {
			get: function () {
				return false;
			}
		},
		definitionChanged: {
			get: function () {
				return this._definitionChanged;
			}
		},
		color: createPropertyDescriptor1('color')
	});

	WallLinkCustomMaterialProperty.prototype.getType = function (time) {
		return MaterialType;
	};
	WallLinkCustomMaterialProperty.prototype.getValue = function (time, result) {
		if (!defined1(result)) {
			result = {};
		}
		result.color = Property.getValueOrClonedDefault(
			this._color,
			time,
			Color1.WHITE,
			result.color
		);
		result.image = options.image;;
		result.time =
			((new Date().getTime() - this._time) % this.duration) / this.duration;
		return result;
	};
	WallLinkCustomMaterialProperty.prototype.equals = function (other) {
		return (
			this === other ||
			(other instanceof WallLinkCustomMaterialProperty &&
				Property1.equals(this._color, other._color))
		);
	};
	//动态墙
	Material1._materialCache.addMaterial(MaterialType,
		{
			fabric: {
				type: MaterialType,
				uniforms: {
					color: new Color1(1.0, 0.0, 0.0, 0.5),
					image: options.image,
					time: 0
				},
				source: this._getDirectionWallShader({
					get: true,
					count: options.count,
					freely: options.freely,
					direction: options.direction
				})
			},
			translucent: function (material) {
				return true;
			}
		}
	);

	return new WallLinkCustomMaterialProperty(options)
}

	 // 带方向的墙体
	 _getDirectionWallShader(options) {

		if (options && options.get) {
			var materail =
				"czm_material czm_getMaterial(czm_materialInput materialInput)\n\
			{\n\
			czm_material material = czm_getDefaultMaterial(materialInput);\n\
			vec2 st = materialInput.st;\n\
			\n\ ";
			if (options.freely == "vertical") { //（由下到上）

				materail += "vec4 colorImage = texture2D(image, vec2(fract(float(" + options.count + ")*st.t " + options.direction + " time), fract(st.s)));\n\ ";
			} else { //（逆时针）

				materail += "vec4 colorImage = texture2D(image, vec2(fract(float(" + options.count + ")*st.s " + options.direction + " time), fract(st.t)));\n\ ";
			}
			//泛光
			materail += "vec4 fragColor;\n\
			fragColor.rgb = (colorImage.rgb+color.rgb) / 1.0;\n\
			fragColor = czm_gammaCorrect(fragColor);\n\ "

			materail += " material.diffuse = colorImage.rgb;\n\
			material.alpha = colorImage.a;\n\
			material.emission = fragColor.rgb;\n\
			\n\
			return material;\n\
			}\n\
			";

			return materail
		}
	}

	/**
	 * 创建信息点实体
	 * @param {*} options 
	 */
	 createPointsGraphics (options) {

		if (options && options.positions) {
			let positions = []
			for (let i in options.positions) {
				let position = options.positions[i]
				let entity = this.createGraphics()
				entity.name = options.name || ''
				entity.oid = options.oid || 'point';
				entity.position = position;
				if (options.point) entity.point = this.getPointGraphics();
				
				if (options.billboard) entity.billboard = this.getBillboardGraphics(options.billboard);
				if (options.label) entity.label = this.getLabelGraphics(options.label);
				positions.push(this._graphicsLayer.entities.add(entity))
			}
			return positions;
		}
	}

	/**
	 * 创建一个实体
	 * @returns 
	 */
	createGraphics () {
		return new Entity()
	}
	/**
	 * 获取点图形
	 * @param {*} options 
	 */
	 getPointGraphics (options) {

		options = options || {}
		if (options) {

			return new PointGraphics({
				color: options.color || Color.GREEN,
				pixelSize: options.pixelSize || 5,
				outlineColor: options.outlineColor || Color.WHITE,
				outlineWidth: options.outlineWidth || 1
			});
		}
	}

	/**
             * 获取标签
             * @param {*} options 
             */
	 getLabelGraphics (options) {

		options = options || {}
		if (options && options.l_text) {

			return new LabelGraphics({ //文字标签
				text: options.l_text,
				font: options.l_font || '14px sans-serif',
				fillColor: options.l_fillColor || Color.GOLD,
				style: options.l_style || LabelStyle.FILL_AND_OUTLINE,
				outlineWidth: options.l_outlineWidth || 2,
				outlineColor: options.l_outlineColor || undefined,
				showBackground: options.l_showBackground || false,
				backgroundColor: options.l_backgroundColor || new Color(0.165, 0.165, 0.165, 0.8),
				verticalOrigin: options.l_verticalOrigin || VerticalOrigin.BOTTOM,
				pixelOffset: options.l_pixelOffset || new Cartesian2(0, -30),
				//heightReference:Cesium.HeightReference.RELATIVE_TO_GROUND
			});
		}
	}
	/**
	 * 获取广告牌
	 * @param {*} options 
	 */
	getBillboardGraphics (options) {

		options = options || {}
		if (options && options.b_img) {

			return new BillboardGraphics({
				image: options.b_img,
				width: options.b_width || 35,
				height: options.b_height || 35,
				clampToGround: options.b_clampToGround || true,
				scale: options.b_scale || 1,
				// eyeOffset :new Cesium.Cartesian2(0, -20),
				pixelOffset: options.b_pixelOffset || new Cartesian2(0, -20),
				scaleByDistance: options.b_scaleByDistance || undefined
				// heightReference:Cesium.HeightReference.RELATIVE_TO_GROUND
			})
		}
	}

/**
 * 路径漫游 支持第一时间，匀速和自定义时间
 * @param {*} options 
 */
	buildPathRoaming(options) {

		if (this._viewer && options && options.paths) {

			var _paths = options.paths, _positionProperty = new SampledPositionProperty(),
				_rEntity = this.createGraphics(), _directionProperty = new SampledPositionProperty();
			var	_startTime = new JulianDate(), _direction = null, _stopTime = null, _increment = null;
			var	_time = null;

			if (options.times) {
				// 漫游时间
				let _times = options.times - options.times % (_paths.length - 1)
			    _stopTime = JulianDate.addSeconds(_startTime, _times, new JulianDate());
				_increment = _times / (_paths.length - 1);
			} else {
				// 自定义
				_stopTime = JulianDate.addSeconds(
					_startTime,
					(_paths.length - 1) * (options.step || 120),
					new JulianDate()
				);
			}
			var startTime = options.startTime || _startTime
			var stopTime = options.stopTime || _stopTime
			this._viewer.clock.startTime = startTime.clone(); // 设置始时钟始时间
			this._viewer.clock.currentTime = startTime.clone(); // 设置时钟当前时间
			this._viewer.clock.stopTime = stopTime.clone(); // 设置始终停止时间
			this._viewer.clock.multiplier = options.multiplier || 10; // 时间速率，数字越大时间过的越快
			this._viewer.clock.clockRange = options.clockRange || ClockRange.LOOP_STOP; // 循环执行
			for (var i = 0; i < _paths.length; i++) {
				var cartesian = Cartesian3.fromDegrees(
					_paths[i].lon,
					_paths[i].lat,
					_paths[i].alt
				);

				if (options.times) {
					// 漫游时间
					_time = JulianDate.addSeconds(startTime, i * _increment, new JulianDate())
				} else {
					// 自定义
					_time = JulianDate.addSeconds(
						startTime,
						_paths[i].time,
						new JulianDate()
					);
				}
				_positionProperty.addSample(_time, cartesian); // 添加位置，和时间对应

				// --------------
				let directionCartesian = null
				// let hpr = this.getObjectQuaternion(this.getObjectMatrix4(cartesian))  // 添加四元数插值
				if (i === _paths.length - 1) {
					_directionProperty.addSample(_time, _direction)
					continue;
				} else {
					directionCartesian = Cartesian3.fromDegrees(
						_paths[i + 1].lon,
						_paths[i + 1].lat,
						_paths[i + 1].alt
					);
				}
				_direction = this.getDirection(directionCartesian, cartesian)

				_directionProperty.addSample(_time, _direction)
			}
			_rEntity.name = options.name || "路径漫游";
			_rEntity.availability = new TimeIntervalCollection([

				new TimeInterval({ start: startTime, stop: stopTime })
			]); // 和时间轴关联

			_rEntity.position = _positionProperty;

			_rEntity.orientation = new VelocityOrientationProperty(_positionProperty);  // 基于位置移动自动计算方向

			_rEntity.direction = _directionProperty
			// 添加图形
			var polyline = [];
			if (options.polyline) {
				_rEntity.polyline = {
					positions: new CallbackProperty(function () {
						return polyline;
					}, false),
					width: 10,
					material: new PolylineGlowMaterialProperty({
						glowPower: 1,
						color: Color.RED
					}),
					clampToGround: true
				};
			}

			if (options.model) {
				_rEntity.model = this.getModelGraphics(options)
			}

			if (options.label) {

				_rEntity.label = this.getLabelGraphics(options)
			}
			if (options.billboard) {
				_rEntity.billboard = this.getBillboardGraphics(options)
			}

			// 视角跟踪
			if (options.firstView) {

				this._viewer.scene.postUpdate.addEventListener(() => {
					let position = _rEntity.position.getValue(this._viewer.clock.currentTime)
					let direction = _rEntity.direction.getValue(this._viewer.clock.currentTime)
					this._viewer.scene.camera.setView({
						destination: position, // 点的坐标
						orientation: {
							direction: direction,
							up: new Cartesian3(0, 0, 0),
						}
					});
					this._viewer.scene.camera.lookUp(options.up || 200)
					this._viewer.scene.camera.lookDown(options.down || 150)
					this._viewer.scene.camera.moveBackward(options.backward || 1200)
				})
			}
			return this._pluginLayer.entities.add(_rEntity)
		}
	}

	KHR_technique_webgl(){
		Object.defineProperties(Model.prototype, {
			_cachedGltf: {
				// cachedGltf:{
				set: function (value) {
					this._vtxf_cachedGltf = value;
					if (this._vtxf_cachedGltf && this._vtxf_cachedGltf._gltf) {
						fixGltf(this._vtxf_cachedGltf._gltf);
					}
				},
				get: function () {
					return this._vtxf_cachedGltf;
				}
			}
		})
	}


	//为墙上贴上静态图片-开始
	getCustomMaterialWallByStaticTextureImage(options){

		if (this._viewer && options && options.image) {

			return this.InitWallCustomMaterialPropertyByStaticTextureImage(options)
		}

	}

	/**
	 * 自定义静态墙体类
	 * @param {*} options 
	 */
	InitWallCustomMaterialPropertyByStaticTextureImage(options){
		var Color1 = Color,
		/**defaultValue：
		*如果未定义，则返回第一个参数，否则返回第二个参数。
		*用于设置参数的默认值。
		*@example
		*param=铯。defaultValue（参数“默认”）；
		*@返回未定义的第一个参数，否则返回第二个参数。
		*/
		defaultValue1 = defaultValue,
		/**defined：
		 * 如果定义了对象，则返回true；否则返回false。
		 */
		defined1 = defined,
		/**Object.defineProperties：
		*向对象添加一个或多个特性，和/或修改现有特性的属性。
		*@param o要在其上添加或修改属性的对象。这可以是本机JavaScript对象或DOM对象。
		*@param properties包含一个或多个描述符对象的JavaScript对象。每个描述符对象描述一个数据属性或访问器属性。
		*/
		defineProperties = Object.defineProperties,
		/**Event:
		*用于管理特定事件的订阅者的通用实用程序类。
		这个类通常在容器类中实例化
		公开为一个属性供他人订阅。
		* @example
		* MyObject.prototype.myListener = function(arg1, arg2) {
		*。myArg1Copy = __arg1;
		*。myArg2Copy =最长;
		*}
		* var myObjectInstance = new MyObject();
		* var evt = new Cesium.event ();
		* evt.addEventListener (MyObject.prototype。myListener myObjectInstance);
		* evt。raiseEvent (' 1 ', ' 2 ');
		* evt.removeEventListener (MyObject.prototype.myListener);
		*/
		Event1 = Event,
		/**createPropertyDescriptor:
		*用于一致地定义所有数据源图形对象。
		*这被分成两个功能，因为Chrome分析器做得更好
		*如果它注意到字符串在整个函数中是常量，则优化查找的工作。
		* @private
		*/
		createPropertyDescriptor1 = createPropertyDescriptor,
		/**Property:
		*所有属性的接口，这些属性表示可以随时间变化的值。
		*此类型定义接口，不能直接实例化。
		*/
		Property1 = Property,
		/**
		*材质通过漫反射、镜面反射、，
		*法线、发射和alpha分量。这些值是使用
		*JSON模式称为Fabric，它被解析并组装成glsl着色器代码
		*在幕后。查看{@链接https://github.com/CesiumGS/cesium/wiki/Fabric|wiki页面}
		*有关面料的更多详细信息。
		*/
		Material1 = Material,
		/**
		 * 材质类型
		 */
		MaterialType = options.MaterialType || 'wallType' + parseInt(Math.random() * 1000);

		/**
		 * 自定义构造函数
		 */
		function WallCustomMaterialPropertyByStaticTextureImage(options){
			options = defaultValue1(options, defaultValue1.EMPTY_OBJECT);
			this._definitionChanged = new Event1();
			this._color = undefined;
			this._colorSubscription = undefined;
			this.color = options.color || Color1.BLUE;
			this.duration = options.duration || 3000;//周期
			this._time = new Date().getTime();
		}

		/**
		 * 向自定义静态墙体类添加属性
		 */
		defineProperties(WallCustomMaterialPropertyByStaticTextureImage.prototype,{
			isvarant: {
				get: function () {
					return false;
				}
			},
			/**重写Property的方法：
			*definitionChanged：获取每当此属性的定义更改时引发的事件。
			*如果返回对getValue的调用，则认为该定义已更改
			*在同一时间出现不同的结果。
			 */
			definitionChanged: {//获取事件
				get: function () {
					return this._definitionChanged;
				}
			},
			/**createPropertyDescriptor:
			*用于一致地定义所有数据源图形对象。
			*这被分成两个功能，因为Chrome分析器做得更好
			*如果它注意到字符串在整个函数中是常量，则优化查找的工作。
			* @private
			*/
			color: createPropertyDescriptor1('color')
		})

		//获取材质类型
		WallCustomMaterialPropertyByStaticTextureImage.prototype.getType = function(time) {
			return MaterialType;
		}

		/**
		 * 获取材质对象
		 * @param {*} time 
		 * @param {*} result 
		 * @returns 
		 */
		WallCustomMaterialPropertyByStaticTextureImage.prototype.getValue = function (time, result) {
			if (!defined1(result)) {
				result = {};
			}
			/**Property:
			*所有属性的接口，这些属性表示可以随时间变化的值。
			*此类型定义接口，不能直接实例化。
			*/
			result.color = Property1.getValueOrClonedDefault(
				this._color,
				time,
				Color1.WHITE,
				result.color
			);
			result.image = options.image;;
			result.time =
				((new Date().getTime() - this._time) % this.duration) / this.duration;
			return result;
			
		}
		/**
		 * 判断该类是否为自定义静态墙体类，且颜色是否一致
		 * @param {*} other 
		 * @returns 
		 */
		WallCustomMaterialPropertyByStaticTextureImage.prototype.equals = function (other) {
			return (
				this === other ||
				(other instanceof WallCustomMaterialPropertyByStaticTextureImage &&
					/**Property.equals：
					*将此属性与提供的属性进行比较并返回
					*<code>true</code>如果它们相等，则<code>false</code>否则。
					*@param[other]-另一个属性。
					*@返回<code>true</code>如果左右相等，则返回<code>false</code>否则返回。
					*/
					Property1.equals(this._color, other._color))
			);
		};

		/**
		 * 添加材质：将材质放在属性_materialCache上
		 */
		Material1._materialCache.addMaterial(MaterialType,{

		})



	}


	//为墙上贴上静态图片-结束
	
	
}

 var fixGltf =function(gltf) {
	if (!gltf.extensionsUsed) {
		return;
	}

	var v = gltf.extensionsUsed.indexOf('KHR_technique_webgl');
	var t = gltf.extensionsRequired.indexOf('KHR_technique_webgl');
	// 中招了。。
	if (v !== -1) {
		gltf.extensionsRequired.splice(t, 1, 'KHR_techniques_webgl');
		gltf.extensionsUsed.splice(v, 1, 'KHR_techniques_webgl');
		gltf.extensions = gltf.extensions || {};
		gltf.extensions['KHR_techniques_webgl'] = {};
		gltf.extensions['KHR_techniques_webgl'].programs = gltf.programs;
		gltf.extensions['KHR_techniques_webgl'].shaders = gltf.shaders;
		gltf.extensions['KHR_techniques_webgl'].techniques = gltf.techniques;
		var techniques = gltf.extensions['KHR_techniques_webgl'].techniques;

		gltf.materials.forEach(function (mat, index) {
			gltf.materials[index].extensions || (gltf.materials[index].extensions = {KHR_technique_webgl: {}}); // vtxf 181025
			gltf.materials[index].extensions['KHR_technique_webgl'].values = gltf.materials[index].values;
			gltf.materials[index].extensions['KHR_techniques_webgl'] = gltf.materials[index].extensions['KHR_technique_webgl'];

			var vtxfMaterialExtension = gltf.materials[index].extensions['KHR_techniques_webgl'];
			vtxfMaterialExtension.technique || (vtxfMaterialExtension.technique = gltf.materials[index].technique); // vtxf 181025

			
			for (var value in vtxfMaterialExtension.values) {
				var us = techniques[vtxfMaterialExtension.technique].uniforms;
				for (var key in us) {
					if (us[key] === value) {
						vtxfMaterialExtension.values[key] = vtxfMaterialExtension.values[value];
						delete vtxfMaterialExtension.values[value];
						break;
					}
				}
			};
		});

		techniques.forEach(function (t) {
			for (var attribute in t.attributes) {
				var name = t.attributes[attribute];
				t.attributes[attribute] = t.parameters[name];
			};

			for (var uniform in t.uniforms) {
				var name = t.uniforms[uniform];
				t.uniforms[uniform] = t.parameters[name];
			};
		});
	}
}



