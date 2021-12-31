import CesiumColor from "cesium/Source/Core/Color" 
import Cartesian3 from "cesium/Source/Core/Cartesian3"
import Cartesian2 from "cesium/Source/Core/Cartesian2"
import BoundingSphere from "cesium/Source/Core/BoundingSphere"
import BoundingRectangle from "cesium/Source/Core/BoundingRectangle"
import JulianDate from "cesium/Source/Core/JulianDate"
import Ellipsoid from "cesium/Source/Core/Ellipsoid"
import NearFarScalar from "cesium/Source/Core/NearFarScalar"
import GeoJsonDataSource from "cesium/Source/DataSources/GeoJsonDataSource"
import LabelStyle from "cesium/Source/Scene/LabelStyle"
import HeightReference from "cesium/Source/Scene/HeightReference"
import HorizontalOrigin from "cesium/Source/Scene/HorizontalOrigin"
import VerticalOrigin from "cesium/Source/Scene/VerticalOrigin"
import EllipsoidGraphics from "cesium/Source/DataSources/EllipsoidGraphics"
import CesiumMath from "cesium/Source/Core/Math"
import Entity from "cesium/Source/DataSources/Entity"
import Model from "cesium/Source/Scene/Model"
import HeadingPitchRoll from "cesium/Source/Core/HeadingPitchRoll"
import Transforms from "cesium/Source/Core/Transforms"
import PrimitiveCollection from "cesium/Source/Scene/PrimitiveCollection"
import ImageMaterialProperty from "cesium/Source/DataSources/ImageMaterialProperty"

import CornerType from 'cesium/Source/Core/CornerType'

import {Cartesian3_to_WGS84} from "../CesiumTools/CoordinateTransform/CoordinateTransformTool"

/**
 * 添加区域边界并添加中心点标牌
 */
export function AreaBoundaryAddCenterPoint(option){
    let cesExt = option.cesExt || {};
    let viewer = option.viewer || {};
    let id = option.id || "";
    let data = option.data || [];
    let image = option.image || "";

    let material =  cesExt.getCustomMaterialWall({
        image: image,
        freely: 'vertical',
        direction: '+',
        count: 2,
        color: CesiumColor,
        duration: 2000
    })
    let three = viewer.entities.add({
        id:id,
        name: 'aaaaa',
        wall: {
            positions: Cartesian3.fromDegreesArrayHeights(data),
            material: material
        }
    })

    var polyPositions = three.wall.positions.getValue();

    var polyCenter = BoundingSphere.fromPoints(polyPositions).center;

    polyCenter = Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);

    polyCenter = Cartesian3_to_WGS84(polyCenter);
    polyCenter.alt = 50

    cesExt.createPointsGraphics({
        positions: [Cartesian3.fromDegrees(polyCenter.lng, polyCenter.lat, polyCenter.alt)],
        // positions: [polyCenter],
        billboard: {
            b_img: 'WEBGISv1.5/datas/images/Textures/xfc.png',
            b_width: 45,
            b_height: 25,
            b_scale: 1.5,
            b_scaleByDistance: new NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5)
        }
    })

}

 /**
     * 警情模拟状态
     */
var _state = undefined;
var _STATECODE = {
    zero: 0,
    one: 1,
    tow: 2,
    three: 3,
    all: 'all'
}

export function AddStaticTextureWallByGeoJSON(option){

    let viewer = option.viewer;
    
    let cesExt = option.cesExt;
    let name = option.name;

    let dataUrl =  option.dataUrl || "";
    let imageUrl = option.imageUrl;
    let pointImgUrl = option.pointImgUrl;

    if (dataUrl === "") {
        return;
    }

    var promise = GeoJsonDataSource.load(
        dataUrl
    );
    promise
        .then(function (dataSource) {
        // viewer.entities.add(dataSource);
        // viewer.flyTo(dataSource);
        //获取实体数组
        var entities = dataSource.entities.values;
        viewer.entities.add(entities)
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];

            let properties =  entity.properties;
            let polyline =  entity.polyline.positions;

            let  CartesianCartesian3Arr = entity.polyline.positions.getValue();
            //将3d笛卡尔坐标转为带高度的坐标
            let wgs84Height = Cartesian3ToWGS84(CartesianCartesian3Arr,50);
            
            entity.polyline = undefined;//将此设为undefined，否则新生成entity的无法生效
            entity.name = name;

            let material =  cesExt.getCustomMaterialWall({
                image: imageUrl,
                freely: 'vertical',
                direction: '+',
                count: 2,
                color: CesiumColor,
                duration: 2000
            })
            // entity.billboard.image = "";//不写此代码会加载默认图像
            entity.wall = {
                // name: 'aaaaa',
                positions:Cartesian3.fromDegreesArrayHeights(wgs84Height),
                // material:material
                material:imageUrl,
                // outline: true,
            }

            viewer.entities.add(entity);
            // viewer.flyTo(entity);

            //添加中央标牌
            var polyPositions = entity.wall.positions.getValue();

            var polyCenter = BoundingSphere.fromPoints(polyPositions).center;

            polyCenter = Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);

            polyCenter = Cartesian3_to_WGS84(polyCenter);
            polyCenter.alt = 50

            if (name === "核心区") {
                polyCenter.lng+=0.0001;
            } else if(name === "警戒区"){
                polyCenter.lng-=0.0004;
            }

            viewer.entities.add({
                name:name,
                position:Cartesian3.fromDegrees(polyCenter.lng, polyCenter.lat, polyCenter.alt),
                billboard : {
                    // image:imgUrl,
                    image:pointImgUrl,
                    // width:45,
                    // height:45,
                    scale:0.5,
                    scaleByDistance: new NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5)
                }
            });

        }

    });
}

export function AddStaticTextureImageByGeoJSON(option){
    let viewer = option.viewer;
    
    let cesExt = option.cesExt;
    let name = option.name;

    let dataUrl =  option.dataUrl || "";
    let imageUrl = option.imageUrl;
    let pointImgUrl = option.pointImgUrl;

    let textureImageUrl = option.textureImageUrl;

    if (dataUrl === "") {
        return;
    }

    var promise = GeoJsonDataSource.load(
        dataUrl
    );
    promise
        .then(function (dataSource) {
        // viewer.entities.add(dataSource);
        // viewer.flyTo(dataSource);
        //获取实体数组
        var entities = dataSource.entities.values;
        viewer.entities.add(entities)
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];

            let properties =  entity.properties;
            let polyline =  entity.polyline.positions;

            let  CartesianCartesian3Arr = entity.polyline.positions.getValue();
            //将3d笛卡尔坐标转为带高度的坐标
            let wgs84Height = Cartesian3ToWGS84(CartesianCartesian3Arr,5);
            
            entity.polyline = undefined;//将此设为undefined，否则新生成entity的无法生效
            entity.name = name;

            // entity.billboard.image = "";//不写此代码会加载默认图像
            entity.wall = {
                // name: 'aaaaa',
                positions:Cartesian3.fromDegreesArrayHeights(wgs84Height),
                // material:material
                // material:imageUrl,
                // outline: true,
                outlineWidth:10,

                material:new ImageMaterialProperty({
                    image:textureImageUrl,
                    // image:pointImgUrl,
                    
                    repeat : new Cartesian2(4, 1),
                    // transparent:true
                })
            }

            viewer.entities.add(entity);
            // viewer.flyTo(entity);

        }

    });
}

export function AddStaticPointAndBillboardByGeoJSON(option){
    let viewer = option.viewer;
    let cesExt = option.cesExt;
    let name = option.name;

    let dataUrl =  option.dataUrl || "";
    let moduleUrl = option.moduleUrl;

    let moduleScale = option.moduleScale || 1;

    let imageUrl = option.imageUrl;

    if (dataUrl === "") {
        return;
    }

    var promise = GeoJsonDataSource.load(
        dataUrl
    );
    promise
        .then(function (dataSource) {

        //获取实体数组
        var entities = dataSource.entities.values;

        for (var i = 0; i < entities.length; i++) {

            var entity = entities[i];

            entity.billboard.image = "";//不写此代码会加载默认图像

            entity.name = name;
            entity.model = {
                uri: moduleUrl,
             	color:CesiumColor.WHITE,
                // minimumPixelSize: 128,
                // maximumScale: 10,
                minimumPixelSize: 60,
                maximumScale: 6,
                scale:moduleScale,
            }

            viewer.entities.add(entity);
            // viewer.flyTo(entity);
            var position = entity.position._value;
            
            //获取属性

            position = Cartesian3_to_WGS84(position);
            position.alt = 10

            viewer.entities.add({
                properties:entity.properties,
                name:name,
                position:Cartesian3.fromDegrees(position.lng, position.lat, position.alt),
                billboard : {
                    // image:imgUrl,
                    image:imageUrl,
                    // width:45,
                    // height:45,
                    scale:0.5,
                    scaleByDistance: new NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5)
                }
            });              
            

        }
        })
        .otherwise(function (error) {
        //显示加载时遇到的任何错误。
        window.alert(error);
    });
}

export function AddStaticTextureCorridorByGeoJSON(option){
    let viewer = option.viewer;
    
    let name = option.name;

    let dataUrl =  option.dataUrl || "";
    let imageUrl = option.imageUrl;
    let pointImgUrl = option.pointImgUrl;

    let textureImageUrl = option.textureImageUrl;

    if (dataUrl === "") {
        return;
    }

    var promise = GeoJsonDataSource.load(
        dataUrl
    );
    promise
        .then(function (dataSource) {
        // viewer.entities.add(dataSource);
        // viewer.flyTo(dataSource);
        //获取实体数组
        var entities = dataSource.entities.values;
        viewer.entities.add(entities)
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];

            let  CartesianCartesian3Arr = entity.polyline.positions.getValue();
            //将3d笛卡尔坐标转为带高度的坐标
            let wgs84Height = Cartesian3ToWGS84(CartesianCartesian3Arr,5);
            
            entity.polyline = undefined;//将此设为undefined，否则新生成entity的无法生效
            entity.name = name;

            // entity.billboard.image = "";//不写此代码会加载默认图像
            entity.corridor = {
                // name: 'aaaaa',
                positions:Cartesian3.fromDegreesArrayHeights(wgs84Height),

                height: 10.0,
                width: 20.0,
                /**
                 * CornerType:
                 *角落的样式选项。
                * <img src =“ Images / CornerTypeMitered.png” style =“ vertical-align：middle;” 宽度=“ 186”高度=“ 189” />
                *CornerType.MITERED:
                *角点是相邻边的交点。
                */
                cornerType: CornerType.MITERED,
                outline: true, // 显示轮廓所需的高度


                material:new ImageMaterialProperty({
                    image:textureImageUrl,
                    // image:pointImgUrl,
                    
                    repeat : new Cartesian2(1, 1),
                    // transparent:true
                })
            }

            viewer.entities.add(entity);
            viewer.flyTo(entity);

        }

    });
}

/**
 * 添加标牌和文字
 * @param {*} option 
 * @returns 
 */
export function AddStaticPointAndBillboardTextByGeoJSON(option){
    
    let viewer = option.viewer;
    let cesExt = option.cesExt;
    let name = option.name;

    let dataUrl =  option.dataUrl || "";
    let moduleUrl = option.moduleUrl;

    let moduleScale = option.moduleScale || 1;

    let imageUrl = option.imageUrl;

    let parentType = option.parentType;

    if (dataUrl === "") {
        return;
    }

    // cesExt.KHR_technique_webgl();

    var promise = GeoJsonDataSource.load(
        dataUrl
    );
    promise
        .then(function (dataSource) {

        //获取实体数组
        var entities = dataSource.entities.values;

        for (var i = 0; i < entities.length; i++) {

            //以实体的方式加载
            var entity = entities[i];

            // entity.billboard.image = "";//不写此代码会加载默认图像

            // entity.state ="addStaticPointAndBillboardTextByGeoJSON";

            // entity.name = name;
            // entity.parentType = parentType;

            // entity.model = {
            //     // gltf:moduleUrl,
            //     uri: moduleUrl,
            //  	color:CesiumColor.WHITE,
            //     // minimumPixelSize: 128,
            //     // maximumScale: 10,
            //     minimumPixelSize: 60,
            //     maximumScale: 6,
            //     scale:moduleScale,

            //     luminanceAtZenith:1
            // }

            // viewer.entities.add(entity);
            var position = entity.position._value;


            // viewer.flyTo(entity);

            if (moduleUrl !== "") {
                //以图元的方式加载
                // var height = 0.0;
                var hpr = new HeadingPitchRoll(0.0, 0.0, 0.0);
                // var origin = Cartesian3.fromDegrees(
                //     -123.0744619,
                //     44.0503706,
                //     height
                // );
                var origin = position;

                var modelMatrix = Transforms.headingPitchRollToFixedFrame(
                    origin,
                    hpr
                );

                var model = viewer.scene.primitives.add(
                    Model.fromGltf({
                        url: moduleUrl,
                        modelMatrix: modelMatrix,
                        scale:moduleScale,
                        color:CesiumColor.WHITE,
                        minimumPixelSize: 60,
                        maximumScale: 6,
                    })
                );
                model.state ="addStaticPointAndBillboardTextByGeoJSON";
                model.properties = entity.properties;

                model.luminanceAtZenith = 2;//添加model在阳光下的亮度

                model.name = name;
                //以图元的方式加载   
            }

            //获取属性

            position = Cartesian3_to_WGS84(position);
            position.alt = 10

            let gangwei1 = "";

            let gangwei = entity.properties["岗位"];
            let mingcheng = "";
            if (gangwei) {
                gangwei1 =  gangwei;
            } else{
                gangwei1 = entity.properties["名称"];
            }

            viewer.entities.add({
                state:"addStaticPointAndBillboardTextByGeoJSON",
                properties:entity.properties,
                name:name,

                parentType:parentType,

                position:Cartesian3.fromDegrees(position.lng, position.lat, position.alt),

                label: {
                    text: gangwei1,
                    font: "16px Helvetica",
                    fillColor: CesiumColor.WHITE,
                    pixelOffset: new Cartesian2(20, -80), //偏移量
                    // outlineColor: CesiumColor.BLACK,
                    outlineWidth: 2,
                    showBackground:true,
                    /**
                     * LabelStyle:描述如何绘制标签
                     * LabelStyle.FILL_AND_OUTLINE：填写并概述标签文本。
                     */
                    style: LabelStyle.FILL_AND_OUTLINE,
                    backgroundColor: new CesiumColor(0, 0, 0, 0.6),
                    horizontalOrigin :HorizontalOrigin.LEFT,
                    // VerticalOrigin :
                },
                billboard : {
                    // image:imgUrl,
                    image:imageUrl,
                    // width:45,
                    // height:45,
                    scale:0.5,
                    scaleByDistance: new NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
                }
                    
            });              
            

        }

        if (name === "无人机反制车") {
            AddMask({
                viewer:viewer,
                cesExt:cesExt,
                name:name,
                position:[116.31476805388291,39.90597584375046]
            });

            let streetDatas = [{

                text:"西二环",
                name:name,
                position:{
                    lng:116.35053003896842,
                    lat:39.9060688326805, 
                    alt:100
                },                
                verticalOrigin:VerticalOrigin.CENTER
                

            },{
                text:"六里桥",
                name:name,
                position:{
                    lng:116.31485069898056,
                    lat:39.87856013937389,
                    alt:100
                },
                horizontalOrigin :HorizontalOrigin.CENTER,

            },{
                text:"西翠路",
                name:name,
                position:{
                    lng: 116.27766938728074,
                    lat:39.90631468458718,
                    alt:100
                },
                verticalOrigin:VerticalOrigin.CENTER

            },{
                text:"车公庄西路",
                name:name,
                position:{
                    lng: 116.31461050926731,
                    lat:39.937590493803945,
                    alt:100
                },
                horizontalOrigin :HorizontalOrigin.CENTER,

            }]
            streetDatas.forEach(streetData => {
                AddLable({
                    viewer:viewer,
                    name:streetData.name,
                    text:streetData.text,
                    position:streetData.position,

                    horizontalOrigin :streetData.horizontalOrigin,
                    verticalOrigin:streetData.verticalOrigin
                }) 
            });


         }
        })
        .otherwise(function (error) {
        //显示加载时遇到的任何错误。
        window.alert(error);
    });
}

/**
 * 添加广告牌
 * @param {*} option 
 */
export function AddStaticBillboardByGeoJSON(option){
    let viewer = option.viewer;
    let cesExt = option.cesExt;

    let dataUrl =  option.dataUrl || "";
    let imageUrl = option.imageUrl;
    let name = option.name;

    if (dataUrl === "") {
        return;
    }

    var promise = GeoJsonDataSource.load(
        dataUrl
    );
    promise
        .then(function (dataSource) {
        // viewer.dataSources.add(dataSource);
        // viewer.flyTo(dataSource);

        //获取实体数组
        var entities = dataSource.entities.values;

        for (var i = 0; i < entities.length; i++) {
            //对于每个实体，根据状态名称创建随机颜色。
            //某些州有多个实体，因此我们将颜色存储在
            //散列，以便我们对整个状态使用相同的颜色。
            var entity = entities[i];
            // var name = entity.name;

            // entity.billboard.image = "";//不写此代码会加载默认图像

            // entity.billboard.scale = 100;//不写此代码会加载默认图像

            var position = entity.position._value;
            
            //获取属性
            entity.name  = name;
            position = Cartesian3_to_WGS84(position);
            position.alt = 20

            viewer.entities.add({
                properties:entity.properties,
                name:name,
                position:Cartesian3.fromDegrees(position.lng, position.lat, position.alt),
                billboard : {
                    image:imageUrl,
                    // width:45,
                    // height:45,
                    scale:0.5,
                    scaleByDistance: new NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5)
                }
            });  




        }
        })
        .otherwise(function (error) {
        //显示加载时遇到的任何错误。
        window.alert(error);
    });
}

export function AddStaticModelByGeoJSON(option){
    let viewer = option.viewer;
    let dataUrl =  option.dataUrl || "";
    let gltfUrl = option.gltfUrl;
    let scaleValue  = option.scale;

    if (dataUrl === "") {
        return;
    }

    var promise = GeoJsonDataSource.load(
        dataUrl
    );
    promise
        .then(function (dataSource) {
        viewer.dataSources.add(dataSource);
        viewer.flyTo(dataSource);

        //获取实体数组
        var entities = dataSource.entities.values;

        for (var i = 0; i < entities.length; i++) {
            //对于每个实体，根据状态名称创建随机颜色。
            //某些州有多个实体，因此我们将颜色存储在
            //散列，以便我们对整个状态使用相同的颜色。
            var entity = entities[i];
            var name = entity.name;

            entity.billboard.image = "";//不写此代码会加载默认图像
                
            
            entity.model = {
                uri: gltfUrl,
             	color:CesiumColor.WHITE,
                // color:CesiumColor ( 1.0 , 1.0 , 1.0 , 1.0),
                minimumPixelSize: 128,
//	                maximumScale: 2000,
                maximumScale: 10,
                scale:scaleValue,
                // lightColor:CesiumColor.WHITE
            }
        }
        })
        .otherwise(function (error) {
        //显示加载时遇到的任何错误。
        window.alert(error);
    });
}

export function RemoveEntityByName(option){
    let viewer = option.viewer;
    let name = option.name;
    // 清除之前的实体
    const entitys = viewer.entities._entities._array;

    // let dataSources = viewer.dataSources._dataSources;
    let entityslength = entitys.length;
    // let dataSourceslength = dataSources.length;
    // 倒叙遍历防止实体减少之后entitys[f]不存在
    for (let f = entityslength - 1; f >= 0; f--) {
        if (entitys[f]._name && entitys[f]._name === name) {
            viewer.entities.remove(entitys[f]);
        }
    }
}

export function RemoveAllEntity(option){
    let viewer = option.viewer;
    let name = option.name;
    // 清除之前的实体
    const entitys = viewer.entities.removeAll();
}

export function RemovePrimitivesByName(option){
    let viewer = option.viewer;
    let name = option.name;


    // // 清除之前的实体
    const primitives = viewer.scene.primitives._primitives;

    // let dataSources = viewer.dataSources._dataSources;
    let primitiveslength = primitives.length;
    // let dataSourceslength = dataSources.length;
    // 倒叙遍历防止实体减少之后entitys[f]不存在
    for (let f = primitiveslength - 1; f >= 0; f--) {
        if (primitives[f].name && primitives[f].name === name) {
            viewer.scene.primitives.remove(primitives[f]);
        }
    }
}

export function RemoveAllPrimitives(option){
    let viewer = option.viewer;
    let name = option.name;


    const primitives = viewer.scene.primitives._primitives;

    // let dataSources = viewer.dataSources._dataSources;
    let primitiveslength = primitives.length;
    // let dataSourceslength = dataSources.length;
    // 倒叙遍历防止实体减少之后entitys[f]不存在
    for (let f = primitiveslength - 1; f >= 0; f--) {
        if (primitives[f].name) {
            viewer.scene.primitives.remove(primitives[f]);
        }
    }


    //     const primitives = viewer.scene.primitives;

    // // 清除之前的实体
    // const primitivesArr = viewer.scene.primitives._primitives;

    // // // let dataSources = viewer.dataSources._dataSources;
    // let primitivesArrlength = primitivesArr.length;

    // // const primitives = viewer.scene.primitives.removeAll();

    // for (let f = primitivesArrlength - 1; f >= 0; f--) {

    //     if (! primitivesArr[f] instanceof PrimitiveCollection) {
    //         viewer.scene.primitives.remove(primitivesArr[f]);
    //     }
    // }

    // primitivesArr.forEach(primitive => {
    //     if (! primitive instanceof PrimitiveCollection) {
    //         viewer.scene.primitives.remove(primitive);
    //     }
    // });

}

function Cartesian3ToWGS84(CartesianCartesian3Arr,height){
    let wgs84Arr = [];

    if (CartesianCartesian3Arr instanceof Cartesian3) {
        let wgs84 = Cartesian3_to_WGS84(CartesianCartesian3Arr);
        wgs84.alt = height;
        
        wgs84Arr.push(
            [wgs84.lng,wgs84.lat,wgs84.alt]
        )
    } else {
        CartesianCartesian3Arr.forEach(CartesianCartesian3 => {
            let wgs84 = Cartesian3_to_WGS84(CartesianCartesian3);
            wgs84.alt = height;
            
            wgs84Arr.push(
                [wgs84.lng,wgs84.lat,wgs84.alt]
            )
         });   
    }

    return  flatten(wgs84Arr)
}

export function AddMask(option){
    
    let viewer = option.viewer;
    let cesExt = option.cesExt;
    let name = option.name;
    let position = option.position;

    let material = cesExt.getCustomMaterialWall({
        image: 'WEBGISv1.5/datas/images/Textures/test1.png',
        freely: 'cross',
        direction: '+',
        count: 1.0,
        color: CesiumColor.BLUE,
        duration: 2000
    })
    var ellipsoid = new EllipsoidGraphics({
        radii: new Cartesian3(3000, 3000, 2000), //单位 米
        material: material,
        maximumCone: CesiumMath.PI_OVER_TWO,
    })
    var position1 = Cartesian3.fromDegrees(position[0],position[1])
    let three1 = viewer.entities.add({
        name: name,
        position: position1,
        ellipsoid: ellipsoid
    })
}

/**
 * 添加文本标签
 * @param {*} option 
 */
export function AddLable(option){
    let viewer  = option.viewer;
    let name = option.name;
    let position = option.position;
    let text = option.text;

    let horizontalOriginValue = option.horizontalOrigin === 0?option.horizontalOrigin:undefined;
    let verticalOriginValue = option.verticalOrigin === 0?option.verticalOrigin:undefined;

    viewer.entities.add({
        state:"addStaticPointAndBillboardTextByGeoJSON",
        name:name,
        // Cartesian3.fromDegrees(lat,lon,height);
        position:Cartesian3.fromDegrees( position.lng,position.lat, position.alt),

        label: {
            text: text,
            font: "24px Helvetica",
            // fillColor: CesiumColor.WHITE,
            fillColor: CesiumColor.WHITE,
            pixelOffset: new Cartesian2(0, 0), //偏移量
            // outlineColor: CesiumColor.BLACK,
            outlineWidth: 2,
            showBackground:true,
            /**
             * LabelStyle:描述如何绘制标签
             * LabelStyle.FILL_AND_OUTLINE：填写并概述标签文本。
             */
            style: LabelStyle.FILL_AND_OUTLINE,
            backgroundColor: new CesiumColor(0, 0, 0, 0.8),

            horizontalOrigin :horizontalOriginValue,
            verticalOrigin:verticalOriginValue
        }
            
    });  
}

/**
 * 将嵌套的多层数组变为一个数组
 * @param {*} arr 
 * @returns 
 */
 function flatten(arr) { return [].concat( ...arr.map(x => Array.isArray(x) ? flatten(x) : x) ) }
