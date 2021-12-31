import React, { Component } from 'react'
import './index.less'
import {
    Checkbox,
    Menu,
  } from 'antd';
import 'antd/dist/antd.css'

import { Tabs } from 'antd';

import CesiumColor from "cesium/Source/Core/Color"
import { AddStaticBillboardByGeoJSON, AddStaticPointAndBillboardByGeoJSON, AddStaticPointAndBillboardTextByGeoJSON, AddStaticTextureCorridorByGeoJSON, AddStaticTextureImageByGeoJSON, AddStaticTextureWallByGeoJSON, RemoveAllEntity, RemoveAllPrimitives, RemoveEntityByName, RemovePrimitivesByName } from '../Cesium/CesiumFunctionOperation/FunctionOperation';
 const { SubMenu } = Menu;

 const { TabPane } = Tabs;


 class MenuSetup extends Component {
     state={
        viewer:undefined,
        cesExt:undefined,
        currentDate: null,
        weekDate:null,
        hDate:null,
        openKeys: [],
        current: '1',
        checkedState: false,
        searElementchId: [],
        selectList:[],
        searchId: '',

        teshuSelectList:[],

        tableValue:"会场一级加强",
        hoverTitle:'',
        tableList:[
            {
                key:"会场一级加强",
                text:"会场一级加强",
                imgUrl:"cesiumtubiao/pag/1.png",
                type:"",
                dataUrl:"",

            },
            {
                key:"会场一级",
                text:"会场一级",
                imgUrl:"cesiumtubiao/pag/2.png",
                type:"",
                dataUrl:""
            },
            {
                key:"住地一级加强",
                text:"住地一级加强",
                imgUrl:"cesiumtubiao/pag/3.png",
                type:"",
                dataUrl:""
            },
            // {
            //     key:"住地一级",
            //     text:"住地一级",
            //     dataUrl:"",
            //     type:""
            // },
            {
                key:"路线一级加强",
                text:"路线一级加强",
                imgUrl:"cesiumtubiao/pag/4.png",
                type:"",
                dataUrl:""
            },
            {
                key:"路线一级",
                text:"路线一级",
                imgUrl:"cesiumtubiao/pag/5.png",
                type:"",
                dataUrl:""
            }
        ],

        list:[
            { 
                key: "管控区域",
                title: "管控区域",
                nodeType:"0",
                children: [{
                    key: "核心区",
                    title: "核心区",
                    dataUrl:"CesiumData/hexinqu.json",
                    // imageUrl: "cesiumtubiao/png/hexinqupingmian.png",
                    imageUrl: CesiumColor.RED.withAlpha(0.5),
                    pointImgUrl:"cesiumtubiao/png/hexinqu.png",
                    loadType:"PolygonAndBillboard"
                },{
                    key: "警戒区",
                    title: "警戒区",
                    dataUrl:"CesiumData/jingjiequ.json",
                    // imageUrl: "cesiumtubiao/png/jingjiequpingmian.png",
                    imageUrl: CesiumColor.ORANGE.withAlpha(0.5),

                    pointImgUrl:"cesiumtubiao/png/jingjiequ.png",
                    loadType:"PolygonAndBillboard"
                },{
                    key: "防控区",
                    title: "防控区",
                    dataUrl:"CesiumData/kongzhiqu.json",
                    // imageUrl: "cesiumtubiao/png/fangkongqupingmian.png",
                    imageUrl: CesiumColor.YELLOW.withAlpha(0.5),

                    pointImgUrl:"cesiumtubiao/png/fangkongqu.png",
                    loadType:"PolygonAndBillboard"
                }],
               
            },
            { 
                key: "电子围栏",
                title: "电子围栏",
                nodeType:"0",
                children: [
                    {
                    key: "警支",
                    title: "警支",
                    dataUrl:"CesiumData/jingzhi.json",

                    // imageUrl:"cesiumtubiao/png/jingzhipingmian.png",
                    imageUrl:CesiumColor.GREEN.withAlpha(0.5),
                    
                    pointImgUrl:"cesiumtubiao/png/jingzhi.png",
                    
                    loadType : "PolygonAndBillboard"
                },
                {
                    key: "十二总队",
                    title: "十二总队",
                    dataUrl:"CesiumData/dianziweilan.json",

                    // imageUrl:"cesiumtubiao/png/jingzhipingmian.png",
                    imageUrl:CesiumColor.GREEN.withAlpha(0.5),
                    
                    pointImgUrl:"cesiumtubiao/png/shierzongdui.png",
                    
                    loadType : "PolygonAndBillboard"
                },
            ],
               
            },
            { 
                imgurl: null,
                key: "安保警力",
                title: "安保警力",
                nodeType:"0",
                children: [{
                    key: "京西联勤指挥部",
                    title: "京西联勤指挥部",
                    dataUrl:"CesiumData/anbaojingli_jingxilianqinzhihuibu.json",
                    moduleUrl:"cesiumtubiao/gltf/jingcha/jingcha.gltf",
                    moduleScale:2,
                    imageUrl:"cesiumtubiao/png/shangqinjinglipoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/sqjl.png',
                    landmarkUrl:'cesiumtubiao/img/sqjl.png',

                    parentType:"安保警力",

                    dataUrl1:"CesiumData/wwhcyjjq/jingcha.json",
                    dataUrl2:"CesiumData/wwhcyj/jingcha.json",
                    dataUrl3:"CesiumData/wwzdyjjq/jingcha.json",
                    dataUrl4:"CesiumData/wwzdyj/jingcha.json",
                    dataUrl5:"CesiumData/xclxyj/jingcha.json",
                    dataUrl6:"CesiumData/xclxyjjq/jingcha.json",

                    checked:true,
                },{
                    key: "上勤警力",
                    title: "上勤警力",
                    dataUrl:"CesiumData/shangqinjingli.json",
                    moduleUrl:"cesiumtubiao/gltf/jingcha/jingcha.gltf",
                    moduleScale:2,
                    imageUrl:"cesiumtubiao/png/shangqinjinglipoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/sqjl.png',
                    landmarkUrl:'cesiumtubiao/img/sqjl.png',
                    
                    parentType:"安保警力",

                    dataUrl1:"CesiumData/wwhcyjjq/jingcha.json",
                    dataUrl2:"CesiumData/wwhcyj/jingcha.json",
                    dataUrl3:"CesiumData/wwzdyjjq/jingcha.json",
                    dataUrl4:"CesiumData/wwzdyj/jingcha.json",
                    dataUrl5:"CesiumData/xclxyj/jingcha.json",
                    dataUrl6:"CesiumData/xclxyjjq/jingcha.json",

                    checked:true,
                    hoverStr:'要对管辖区域进行感官检查，确保执勤岗位周边无可疑人、可以物，主动对过往人进行排查核录，可疑人员要进行开包检查，首长车队出发时，利用移动护栏提前纵深卡断相关路口，快速发现和处置安全隐患和突发事件。'
                },{
                    key: "备勤警力",
                    title: "备勤警力",
                    dataUrl:"CesiumData/beiqinjingli.json",
                    //模型为备勤车
                    moduleUrl:"cesiumtubiao/gltf/yiweike/yiweike.gltf",
                    moduleScale:0.05,
                    imageUrl:"cesiumtubiao/png/beiqinjinglipoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/bqjl.png',
                    landmarkUrl:'cesiumtubiao/img/bqjl.png',

                    parentType:"安保警力",

                    dataUrl1:"CesiumData/wwhcyjjq/beiqin.json",
                    dataUrl2:"CesiumData/wwhcyj/beiqin.json",
                    dataUrl3:"",
                    dataUrl4:"",
                    dataUrl5:"",
                    dataUrl6:"",

                    checked:true,
                    hoverStr:'听联勤指挥部电台通知，做好支援工作，并开展相关的路线巡控、可疑人可疑物快速处置、纵深卡控工作。'
                },{
                    key: "警犬",
                    title: "警犬",
                    dataUrl:"CesiumData/anbaojingli_jingquan.json",
                    //模型为备勤车
                    moduleUrl:"cesiumtubiao/gltf/jingquan/jingquan.gltf",
                    
                    moduleScale:1,

                    imageUrl:"cesiumtubiao/png/jingquan.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/jq.png',
                    landmarkUrl:'cesiumtubiao/img/jq.png',

                    parentType:"安保警力",

                    dataUrl1:"CesiumData/wwhcyjjq/beiqin.json",
                    dataUrl2:"CesiumData/wwhcyj/beiqin.json",
                    dataUrl3:"",
                    dataUrl4:"",
                    dataUrl5:"",
                    dataUrl6:"",

                    checked:true,
                    hoverStr:'携犬巡逻警力，加强夜间巡逻检查，及时发现可疑人员，把危险控制在源头。'
                },{
                    key: "交警",
                    title: "交警",
                    dataUrl:"CesiumData/anbaojingli_jiaotongjing.json",
                    //模型为备勤车
                    moduleUrl:"cesiumtubiao/gltf/jiaojing/jiaojing.gltf",
                    moduleScale:2,
                    imageUrl:"cesiumtubiao/png/beiqinjinglipoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/jj.png',
                    landmarkUrl:'cesiumtubiao/img/jj.png',

                    parentType:"安保警力",

                    dataUrl1:"CesiumData/wwhcyjjq/jiaojing.json",
                    dataUrl2:"CesiumData/wwhcyj/jiaojing.json",
                    dataUrl3:"CesiumData/wwhcyj/jiaojing.json",
                    dataUrl4:"CesiumData/wwhcyj/jiaojing.json",
                    dataUrl5:"CesiumData/xclxyj/jiaojing.json",
                    dataUrl6:"CesiumData/xclxyjjq/jiaojing.json",

                    checked:true,
                    hoverStr:'落实会场外围及行车路线交通指挥疏导、车辆盘查和秩序清理整治工作。'
                },{
                    key: "武警",
                    title: "武警",
                    dataUrl:"CesiumData/anbaojingli_wujing.json",
                    //模型为备勤车
                    moduleUrl:"cesiumtubiao/gltf/wujing/wujing.gltf",
                    moduleScale:2,
                    imageUrl:"cesiumtubiao/png/beiqinjinglipoint.png",

                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/wj.png',
                    landmarkUrl:'cesiumtubiao/img/wj.png',

                    parentType:"安保警力",

                    dataUrl1:"CesiumData/wwhcyjjq/beiqin.json",
                    dataUrl2:"CesiumData/wwhcyj/beiqin.json",
                    dataUrl3:"",
                    dataUrl4:"",
                    dataUrl5:"",
                    dataUrl6:"",

                    checked:true,
                    hoverStr:'落实驻地围墙封闭控制，加强警戒区围墙巡视，防范可疑人、可疑物翻阅围墙进入封闭区。'
                },{
                    key: "消防员",
                    title: "消防员",
                    dataUrl:"CesiumData/anbaojingli_xiaofangxunshi.json",
                    //模型为备勤车
                    moduleUrl:"cesiumtubiao/gltf/xiaofangyuan/xiaofangyuan.gltf",
                    moduleScale:2,
                    imageUrl:"cesiumtubiao/png/beiqinjinglipoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/xfy.png',
                    landmarkUrl:'cesiumtubiao/img/xfy.png',

                    parentType:"安保警力",

                    dataUrl1:"CesiumData/wwhcyjjq/beiqin.json",
                    dataUrl2:"CesiumData/wwhcyj/beiqin.json",
                    dataUrl3:"",
                    dataUrl4:"",
                    dataUrl5:"",
                    dataUrl6:"",

                    checked:true,
                    hoverStr:'确保京西宾馆周边消除排除消防安全隐患，确保周边不发生起火冒烟事故。'
                },],
               
            },{ 
                imgurl: null,
                key: "车辆",
                title: "车辆",
                nodeType:"0",
                children: [{
                    key: "巡逻车",
                    title: "巡逻车",
                    dataUrl:"CesiumData/xunluoche.json",
                    moduleUrl:"cesiumtubiao/gltf/jingche/jingche.gltf",
                    moduleScale:2,
                    imageUrl:"cesiumtubiao/png/xunluochepoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/xlc.png',
                    landmarkUrl:'cesiumtubiao/img/xlc.png',

                    parentType:"车辆",

                    dataUrl1:"CesiumData/wwhcyjjq/xunluoche.json",
                    dataUrl2:"",
                    dataUrl3:"",
                    dataUrl4:"",
                    dataUrl5:"",
                    dataUrl6:"",

                    checked:true,
                    hoverStr:'加强属地区域内巡视控制，重点加强对可以人员突发事件的发现，快速发现果断处置及时上报。'
                },{
                    key: "处突车",
                    title: "处突车",
                    dataUrl:"CesiumData/chutuche.json",
                    moduleUrl:"cesiumtubiao/gltf/chutuche/BJ80.gltf",
                    moduleScale:2,
                    imageUrl:"cesiumtubiao/png/chutuchepoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/ctc.png',
                    landmarkUrl:'cesiumtubiao/img/ctc.png',
                    
                    parentType:"车辆",

                    dataUrl1:"CesiumData/wwhcyjjq/chutuche.json",
                    dataUrl2:"CesiumData/wwhcyj/chutuche.json",
                    dataUrl3:"CesiumData/wwzdyjjq/chutuche.json",
                    dataUrl4:"CesiumData/wwzdyj/chutuche.json",
                    dataUrl5:"CesiumData/xclxyj/chutuche.json",
                    dataUrl6:"CesiumData/xclxyjjq/chutuche.json",
                    checked:true,
                    hoverStr:'携带必要的防爆器材，承担驻地外围的机动防爆任务，做好应急值守警戒支援。'
                },{
                    key: "上访处置车",
                    title: "上访处置车",
                    dataUrl:"CesiumData/shangfangchuzhiche.json",
                    moduleUrl:"cesiumtubiao/gltf/gongjiaoche/gongjiaoche.gltf",
                    moduleScale:2,
                    imageUrl:"cesiumtubiao/png/shangfangchuzhichepoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/sfczc.png',
                    landmarkUrl:'cesiumtubiao/img/sfczc.png',

                    parentType:"车辆",

                    dataUrl1:"CesiumData/wwhcyjjq/shangfangchuzhiche.json",
                    dataUrl2:"",
                    dataUrl3:"",
                    dataUrl4:"",
                    dataUrl5:"",
                    dataUrl6:"",

                    checked:true,
                    hoverStr:'对上访人员进行初步的核查，并且将上访人员送至久敬庄、马家楼，劝返分流点。'
                },{
                    key: "指挥车",
                    title: "指挥车",
                    dataUrl:"CesiumData/cheliang_zhihuiche.json",
                    moduleUrl:"cesiumtubiao/gltf/gongjiaoche/gongjiaoche.gltf",
                    moduleScale:2,
                    imageUrl:"cesiumtubiao/png/chutuchepoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/zhc.png',
                    landmarkUrl:'cesiumtubiao/img/zhc.png',

                    parentType:"车辆",

                    dataUrl1:"CesiumData/wwhcyjjq/chutuche.json",
                    dataUrl2:"CesiumData/wwhcyj/chutuche.json",
                    dataUrl3:"CesiumData/wwzdyjjq/chutuche.json",
                    dataUrl4:"CesiumData/wwzdyj/chutuche.json",
                    dataUrl5:"CesiumData/xclxyj/chutuche.json",
                    dataUrl6:"CesiumData/xclxyjjq/chutuche.json",
                    checked:true,
                    hoverStr:'快速搭建现场指挥中心，运用卫星的通讯设备实现现场通讯指挥、应急调度、信息回传等功能及多部门联动。'
                },{
                    key: "消防车",
                    title: "消防车",
                    dataUrl:"CesiumData/cheliang_xiaofangche.json",
                    moduleUrl:"cesiumtubiao/gltf/xiaofangche/xiaofangche.gltf",
                    moduleScale:2,
                    imageUrl:"cesiumtubiao/png/chutuchepoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/xfc.png',
                    landmarkUrl:'cesiumtubiao/img/xfc.png',

                    parentType:"车辆",
                    
                    dataUrl1:"CesiumData/wwhcyjjq/chutuche.json",
                    dataUrl2:"CesiumData/wwhcyj/chutuche.json",
                    dataUrl3:"CesiumData/wwzdyjjq/chutuche.json",
                    dataUrl4:"CesiumData/wwzdyj/chutuche.json",
                    dataUrl5:"CesiumData/xclxyj/chutuche.json",
                    dataUrl6:"CesiumData/xclxyjjq/chutuche.json",
                    checked:true,
                    hoverStr:'确保京西周边以及勤务路线灭火应急救援工作。'
                },
                // ,{
                //     key: "交通巡逻车",
                //     title: "交通巡逻车",
                //     dataUrl:"CesiumData/cheliang_jiaotongxunluoche.json",
                //     moduleUrl:"cesiumtubiao/gltf/jingche/jingche.gltf",
                //     moduleScale:2,
                //     imageUrl:"cesiumtubiao/png/chutuchepoint.png",
                //     loadType : "PointAndBillboard",
                //     legendUrl:'cesiumtubiao/pag/jtxlc.png',
                //     landmarkUrl:'cesiumtubiao/img/jtxlc.png',

                //     parentType:"车辆",

                //     dataUrl1:"CesiumData/wwhcyjjq/chutuche.json",
                //     dataUrl2:"CesiumData/wwhcyj/chutuche.json",
                //     dataUrl3:"CesiumData/wwzdyjjq/chutuche.json",
                //     dataUrl4:"CesiumData/wwzdyj/chutuche.json",
                //     dataUrl5:"CesiumData/xclxyj/chutuche.json",
                //     dataUrl6:"CesiumData/xclxyjjq/chutuche.json",
                //     checked:true,
                //     hoverStr:'落实会场外围及行车路线交通指挥疏导、车辆盘查和秩序清理整治工作。'
                // },
                {
                    key: "特警车",
                    title: "特警车",
                    dataUrl:"CesiumData/cheliang_tejingche.json",
                    moduleUrl:"cesiumtubiao/gltf/heiseyiweike/heiseyiweike.gltf",
                    moduleScale:0.1,
                    imageUrl:"cesiumtubiao/png/chutuchepoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/tjc.png',
                    landmarkUrl:'cesiumtubiao/img/tjc.png',

                    parentType:"车辆",

                    dataUrl1:"CesiumData/wwhcyjjq/chutuche.json",
                    dataUrl2:"CesiumData/wwhcyj/chutuche.json",
                    dataUrl3:"CesiumData/wwzdyjjq/chutuche.json",
                    dataUrl4:"CesiumData/wwzdyj/chutuche.json",
                    dataUrl5:"CesiumData/xclxyj/chutuche.json",
                    dataUrl6:"CesiumData/xclxyjjq/chutuche.json",
                    checked:true,
                    hoverStr:'承担驻地外围机动防爆任务，在首长车队出发时，担负主路的阻截任务。'
                },{
                    key: "无人机反制车",
                    title: "无人机反制车",
                    dataUrl:"CesiumData/cheliang_wurenjifanzhijiche.json",
                    moduleUrl:"cesiumtubiao/gltf/wurenjifanzhiche/wurenjifanzhiche.gltf",
                    moduleScale:0.1,
                    imageUrl:"cesiumtubiao/png/chutuchepoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/wrjfzc.png',
                    landmarkUrl:'cesiumtubiao/img/wrjfzc.png',

                    parentType:"车辆",

                    dataUrl1:"CesiumData/wwhcyjjq/chutuche.json",
                    dataUrl2:"CesiumData/wwhcyj/chutuche.json",
                    dataUrl3:"CesiumData/wwzdyjjq/chutuche.json",
                    dataUrl4:"CesiumData/wwzdyj/chutuche.json",
                    dataUrl5:"CesiumData/xclxyj/chutuche.json",
                    dataUrl6:"CesiumData/xclxyjjq/chutuche.json",
                    checked:true,
                    hoverStr:'加强“低、慢、小”航空器及空飘物的地面管控，及升空后的反制措施，确保严管区内不出现飞行物、空飘物影响警卫对象安全的情况。'
                },{
                    key: "餐车",
                    title: "餐车",
                    dataUrl:"CesiumData/cheliang_canche.json",
                    moduleUrl:"cesiumtubiao/gltf/yidongkuaicanche/yidongkuaicanche.gltf",
                    moduleScale:1,
                    imageUrl:"cesiumtubiao/png/chutuchepoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/cc.png',
                    landmarkUrl:'cesiumtubiao/img/cc.png',

                    parentType:"车辆",

                    dataUrl1:"CesiumData/wwhcyjjq/chutuche.json",
                    dataUrl2:"CesiumData/wwhcyj/chutuche.json",
                    dataUrl3:"CesiumData/wwzdyjjq/chutuche.json",
                    dataUrl4:"CesiumData/wwzdyj/chutuche.json",
                    dataUrl5:"CesiumData/xclxyj/chutuche.json",
                    dataUrl6:"CesiumData/xclxyjjq/chutuche.json",
                    checked:true,
                },{
                    key: "移动厕所",
                    title: "移动厕所",
                    dataUrl:"CesiumData/cheliang_yidongcesuo.json",
                    moduleUrl:"cesiumtubiao/gltf/yidongceshuo/yidongceshuo.gltf",
                    moduleScale:2,
                    imageUrl:"cesiumtubiao/png/chutuchepoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/ydcs.png',
                    landmarkUrl:'cesiumtubiao/img/ydcs.png',

                    parentType:"车辆",

                    dataUrl1:"CesiumData/wwhcyjjq/chutuche.json",
                    dataUrl2:"CesiumData/wwhcyj/chutuche.json",
                    dataUrl3:"CesiumData/wwzdyjjq/chutuche.json",
                    dataUrl4:"CesiumData/wwzdyj/chutuche.json",
                    dataUrl5:"CesiumData/xclxyj/chutuche.json",
                    dataUrl6:"CesiumData/xclxyjjq/chutuche.json",
                    checked:true,
                }

                ,{
                    key: "捕犬车",
                    title: "捕犬车",
                    dataUrl:"CesiumData/cheliang_bqc.json",
                    moduleUrl:"",
                    moduleScale:2,
                    imageUrl:"cesiumtubiao/png/bqc.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/bqc.png',
                    landmarkUrl:'cesiumtubiao/img/bqc.png',

                    parentType:"车辆",

                    dataUrl1:"CesiumData/wwhcyjjq/chutuche.json",
                    dataUrl2:"CesiumData/wwhcyj/chutuche.json",
                    dataUrl3:"CesiumData/wwzdyjjq/chutuche.json",
                    dataUrl4:"CesiumData/wwzdyj/chutuche.json",
                    dataUrl5:"CesiumData/xclxyj/chutuche.json",
                    dataUrl6:"CesiumData/xclxyjjq/chutuche.json",
                    checked:true,
                }
                ,{
                    key: "技侦车",
                    title: "技侦车",
                    dataUrl:"CesiumData/cheliang_jzc.json",
                    moduleUrl:"",
                    moduleScale:2,
                    imageUrl:"cesiumtubiao/png/jzc.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/jzc.png',
                    landmarkUrl:'cesiumtubiao/img/jzc.png',

                    parentType:"车辆",

                    dataUrl1:"CesiumData/wwhcyjjq/chutuche.json",
                    dataUrl2:"CesiumData/wwhcyj/chutuche.json",
                    dataUrl3:"CesiumData/wwzdyjjq/chutuche.json",
                    dataUrl4:"CesiumData/wwzdyj/chutuche.json",
                    dataUrl5:"CesiumData/xclxyj/chutuche.json",
                    dataUrl6:"CesiumData/xclxyjjq/chutuche.json",
                    checked:true,
                }

            ],
               
            }

            //护栏
            ,{ 
                key: "护栏",
                title: "护栏",
                nodeType:"0",
                children: [{
                    key: "护栏",
                    title: "护栏",

                    dataUrl:"CesiumData/hulan.json",
                    
                    textureImageUrl:"cesiumtubiao/png/qiang.png",

                    imageUrl:CesiumColor.RED.withAlpha(0.5),
                    loadType : "StaticTextureImage",

                    pointImgUrl:"cesiumtubiao/png/hexinqu.png",

                    legendUrl:'cesiumtubiao/pag/hlz.png',
                    landmarkUrl:'cesiumtubiao/img/hlz.png',
    
                    // dataUrl1:"CesiumData/zhigaodian/zhigaodian.json",
                    // dataUrl2:"CesiumData/zhigaodian/zhigaodian.json",
                    // dataUrl3:"CesiumData/zhigaodian/zhigaodian.json",
                    // dataUrl4:"CesiumData/zhigaodian/zhigaodian.json",
                    // dataUrl5:"CesiumData/zhigaodian/zhigaodian.json",
                    // dataUrl6:"CesiumData/zhigaodian/zhigaodian.json",
                }]

            }

            ,{ 
                key: "核录桩",
                title: "核录桩",
                dataUrl:"CesiumData/heluzhuang.json",
                moduleUrl:"",
                moduleScale:4,
                imageUrl:"cesiumtubiao/img/hlz.png",
                loadType : "Billboard",

                legendUrl:'cesiumtubiao/pag/hlz.png',
                landmarkUrl:'cesiumtubiao/img/hlz.png',
            }


            ,{ 
                key: "警务站/岗亭",
                title: "警务站/岗亭",
                dataUrl:"CesiumData/gangting.json",
                moduleUrl:"cesiumtubiao/gltf/gangting/gangting.gltf",
                moduleScale:4,
                imageUrl:"cesiumtubiao/png/gangtingpoint.png",
                loadType : "PointAndBillboard",

                legendUrl:'cesiumtubiao/pag/gt.png',
                landmarkUrl:'cesiumtubiao/img/gt.png',
            }
            ,{ 
                imgurl: null,
                key: "制高点",
                title: "制高点",
                nodeType:"0",
                children: [{
                    key: "制高点",
                    title: "制高点",
                    dataUrl:"CesiumData/zhigaodian/zhigaodian.json",
                    imageUrl:"cesiumtubiao/img/zgd.png",
                    loadType : "Billboard",

                    legendUrl:'cesiumtubiao/pag/zgd.png',
                    landmarkUrl:'cesiumtubiao/img/zgd.png',
    
                    dataUrl1:"CesiumData/zhigaodian/zhigaodian.json",
                    dataUrl2:"CesiumData/zhigaodian/zhigaodian.json",
                    dataUrl3:"CesiumData/zhigaodian/zhigaodian.json",
                    dataUrl4:"CesiumData/zhigaodian/zhigaodian.json",
                    dataUrl5:"CesiumData/zhigaodian/zhigaodian.json",
                    dataUrl6:"CesiumData/zhigaodian/zhigaodian.json",
                },{
                    key: "门窗防开启报警",
                    title: "门窗防开启报警",
                    dataUrl:"CesiumData/zhigaodian/zhigaodian_menchuangfangkaiqibaojing.json",
                    imageUrl:"cesiumtubiao/img/mckqbj.png",
                    loadType : "Billboard",

                    legendUrl:'cesiumtubiao/pag/mckqbj.png',
                    landmarkUrl:'cesiumtubiao/img/mckqbj.png',
    
                    dataUrl1:"CesiumData/zhigaodian/zhigaodian.json",
                    dataUrl2:"CesiumData/zhigaodian/zhigaodian.json",
                    dataUrl3:"CesiumData/zhigaodian/zhigaodian.json",
                    dataUrl4:"CesiumData/zhigaodian/zhigaodian.json",
                    dataUrl5:"CesiumData/zhigaodian/zhigaodian.json",
                    dataUrl6:"CesiumData/zhigaodian/zhigaodian.json",
                },]

            },{ 
                key: "安保围栏",
                title: "安保围栏",
                dataUrl:"CesiumData/anbaoweilan.json",
                moduleUrl:"cesiumtubiao/gltf/weilan/weilan.gltf",
                moduleScale:6,
                imageUrl:"cesiumtubiao/png/anbaoweilan.png",
                loadType : "PointAndBillboard"
            }
            // ,{ 
            //     imgurl: null,
            //     key: "电子围栏",
            //     title: "电子围栏",
            //     nodeType:"0",
            //     children: [{
            //         imgurl: null,
            //         key: "警支",
            //         title: "警支",
            //     },{
            //         imgurl: null,
            //         key: "十二总队",
            //         title: "十二总队",
            //     },],
               
            // }
            ,{ 
                imgurl: null,
                key: "摄像头",
                title: "摄像头",
                nodeType:"0",
                children: [{
                    key: "人卡",
                    title: "人卡",
                    dataUrl:"CesiumData/shexiangtou_renka.json",
                    moduleUrl:"cesiumtubiao/gltf/shexiangtou/shexiangtou.gltf",
                    moduleScale:10,
                    imageUrl:"cesiumtubiao/png/renkapoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/rk.png',
                    landmarkUrl:'cesiumtubiao/img/rk.png',

                },{
                    key: "车卡",
                    title: "车卡",
                    dataUrl:"CesiumData/shexiangtou_cheka.json",
                    moduleUrl:"cesiumtubiao/gltf/shexiangtou/shexiangtou.gltf",
                    moduleScale:10,
                    imageUrl:"cesiumtubiao/png/chekapoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/ck.png',
                    landmarkUrl:'cesiumtubiao/img/ck.png',
                },{
                    key: "高清",
                    title: "高清",
                    dataUrl:"CesiumData/shexiangtou_gaoqing.json",
                    moduleUrl:"cesiumtubiao/gltf/shexiangtou/shexiangtou.gltf",
                    moduleScale:10,
                    imageUrl:"cesiumtubiao/png/gaoqingpoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/gq.png',
                    landmarkUrl:'cesiumtubiao/img/gq.png',
                },{
                    key: "高点",
                    title: "高点",
                    dataUrl:"CesiumData/shexiangtou_gaodian.json",
                    moduleUrl:"cesiumtubiao/gltf/shexiangtou/shexiangtou.gltf",
                    moduleScale:10,
                    imageUrl:"cesiumtubiao/png/gaodianpoint.png",
                    loadType : "PointAndBillboard",
                    legendUrl:'cesiumtubiao/pag/gd.png',
                    landmarkUrl:'cesiumtubiao/img/gd.png',
                }],
               
            }

        ]
     }

     componentDidMount(){
         this.handlelist()
         this.getCurrentDate()
         //添加默认加载的
     }
     strlist = [
        '京西联勤指挥部',
        '警犬',
        '交警',
        '武警',
        '消防员',
        '上勤警力',
        '备勤警力',
        '巡逻车',
        '上访处置车',
        '处突车',
        '消防车',
        '交通巡逻车',
        '特警车',
        '无人机反制车',
        '指挥车',
        '餐车',
        '移动厕所',
        '捕犬车',
        '技侦车'
    ]

    speStrlist = this.strlist.filter(item=>item != '京西联勤指挥部' && item != '餐车' && item != '移动厕所')
    handlelist = (state) => {
        const {list} = this.state
        var listtwo=[]
        for(var i=0;i<list.length;i++){
            console.log(list[i])
            if(list[i].children){
                for(var j = 0;j<list[i].children.length;j++){
                         
                    if(this.strlist.includes(list[i].children[j].title)){
                        listtwo.push(list[i].children[j])

                        let listij = list[i].children[j];
    
                    }
                }
    
            }
        }

        this.setState({
            selectList:listtwo,
            
        },()=>{
            this.props.handlelegend(this.state.selectList)

            if (state === "TableChage") {
                
                RemoveAllEntity({
                    viewer:this.state.viewer
                })

                RemoveAllPrimitives({
                    viewer:this.state.viewer
                })
                let selectList =  this.state.selectList;
                selectList.forEach(sl => {
                    
                    // this.JudgmentFunction(sl,true);
                });   
            }
        })
       
    
    }
    componentWillReceiveProps(props) {
        if (props.viewer !== undefined && this.state.viewer === undefined && props.cesExt !== undefined && this.state.cesExt === undefined) {
            this.setState({
                viewer: props.viewer,
                cesExt: props.cesExt,
            },()=>{
               let selectList =  this.state.selectList;

               selectList.forEach(sl => {
                // this.JudgmentFunction(sl,true);
               });
            });
          }
    }

     treeNodeRender(item) {
    //    console.log(item,'123')
        let renderList = []
     
        renderList = item.map((item, index) => {

            let checked = item.checked?item.checked:false;
    
          if (item.nodeType == "0") {
            return (
              <SubMenu
                key={item.key} title={<span style={{ color: '#9BC8FF' }}>{item.title}</span>}
                title={<span className='titleName' style={{ fontSize: '14px', color: '#9BC8FF'}}>{item.title}</span>}
              >
                {item.children && item.children.length ? this.treeNodeRender(item.children) : null}
    
              </SubMenu>
            )
          } else {
              let itemdata =  this.state.selectList.find(arg=>arg.key==item.key);
              let isSpeItem = this.speStrlist.includes(item.title);
                return <Menu.Item style={{ height: '40px' }} key={item.key} >
                <Checkbox onChange={(e) => this.handchecked(item,e)} checked={!!itemdata} style={{ marginRight: "10px", color: "#9BC8FF"}}>
                    <span
                    onMouseOver={isSpeItem ? ()=>{
                        this.setState({
                            hoverTitle:item.hoverStr
                        })
                    }:null}
                    onMouseOut={isSpeItem ? ()=>{
                        this.setState({
                            hoverTitle:''
                        })
                    }:null} className='titleName' style={ {fontSize: '14px', lineHeight: '16px', } }
                    >{item.title}</span>
                </Checkbox>
    
            </Menu.Item>
          }
    
        })
        // console.log(renderList,'123')
        return renderList
        
      }

      TabsNodeRender(item){
        let tableList = []
        tableList = item.map((item, index) => {
            return (
                <TabPane tab={item.text} key={item.key} type={item.type} dataUrl={item.dataUrl}>
                </TabPane>
            )
        })
        return tableList;
        
      }
      handleTabPane = (item) => {
          console.log(item)

      }
      handchecked = (item, e) => {
        //   console.log(item,e)
          let list = [...this.state.selectList]

        //   let teshuSelectList1 = [...this.state.teshuSelectList];

          this.JudgmentFunction(item,e.target.checked);

            if(e.target.checked){
                list.push(item)

                // if (item.key === "上勤警力" || item.key === "备勤警力" || item.key === "巡逻车" || item.key === "上访处置车" || item.key === "处突车") {
                //     this.state.teshuSelectList.push(item);

                // }

            }else{
                let itemindex = list.findIndex(arg=>arg.key==item.key)
                if(itemindex!=-1){
                    list.splice(itemindex,1)
                }

                // let teshuSelectList1 = this.state.teshuSelectList.findIndex(arg=>arg.key==item.key)
                // if(teshuSelectList1!=-1){
                //     this.state.teshuSelectList.splice(teshuSelectList1,1)
                // }

            }
          this.setState({
            selectList: list,
          },()=>{
            //   console.log(this.state.selectList)
            this.props.handlelegend(this.state.selectList)
          })
       
        // this.setState({
        //   searchId: item.id,
        // }, () => {
        //   if (item.checked) { // 被选中
        //     if (this.state.searElementchId.indexOf(item.resourceInfo.id) === -1) {
        //       this.state.searElementchId.push(item.resourceInfo.id);
        //     }
        //   } else { // 被取消
        //     let index = this.state.searElementchId.indexOf(item.resourceInfo.id);
        //     if (index !== -1) {
        //       this.state.searElementchId.splice(index, 1);
        //     }
        //   }
    
        // })
    
      }
     handleClick = (checkedValue) => {

        let tempList = [...checkedValue];
        this.setState({
          openKeys: tempList
        }, () => {
          // console.log(this.state.openKeys, 'openk')
        })
      }

      JudgmentFunction(item,checked){
        let {viewer,cesExt} =this.state;

        let  key = item.key;
        let loadType = item.loadType;
        if (checked) {
            let dataUrl = "";
            if (key === "上勤警力" || key === "备勤警力" || key === "巡逻车" ||  key === "上访处置车" ||  key === "处突车" ||  key === "交警" ) {
                dataUrl = this.getJingliDataurl(item);
            }else{
                dataUrl = item.dataUrl;
            }
            if (loadType === "PolygonAndBillboard" ) {
                //添加核心区 通过geojson添加model
                 AddStaticTextureWallByGeoJSON({
                    viewer:this.state.viewer,
                    cesExt:this.state.cesExt,
                    name:key,
        
                    dataUrl:dataUrl,
                    imageUrl:item.imageUrl,
        
                    pointImgUrl:item.pointImgUrl,
                })
            }else if(loadType === "PointAndBillboard"){
                //添加核心区 通过geojson添加model
                AddStaticPointAndBillboardTextByGeoJSON({
                // AddStaticPointAndBillboardByGeoJSON({
                    viewer:this.state.viewer,
                    cesExt:this.state.cesExt,
                    name:key,
        
                    dataUrl:dataUrl,
                    moduleUrl:item.moduleUrl,
                    moduleScale:item.moduleScale,
                    imageUrl:item.landmarkUrl, 
                    
                    parentType:item.parentType,
                })
            }else if(loadType === "Billboard"){
                 //添加核心区 通过geojson添加model
                 AddStaticBillboardByGeoJSON({
                    viewer:this.state.viewer,
                    cesExt:this.state.cesExt,
                    name:key,
        
                    dataUrl:dataUrl,
                    imageUrl:item.imageUrl,        
                })
            }else if(loadType === "StaticTextureImage"){
                //添加核心区 通过geojson添加model
                // AddStaticTextureImageByGeoJSON({
                //     viewer:this.state.viewer,
                //     cesExt:this.state.cesExt,
                //     name:key,
        
                //     dataUrl:dataUrl,
                //     imageUrl:item.imageUrl,
                //     textureImageUrl:item.textureImageUrl,
                //     pointImgUrl:item.pointImgUrl,
                // })

                AddStaticTextureCorridorByGeoJSON({
                    viewer:this.state.viewer,
                    cesExt:this.state.cesExt,
                    name:key,
        
                    dataUrl:dataUrl,
                    imageUrl:item.imageUrl,
                    textureImageUrl:item.textureImageUrl,
                    pointImgUrl:item.pointImgUrl,
                })
            }else if(loadType === "StaticTextureCorridor"){
                
                AddStaticTextureCorridorByGeoJSON({
                    viewer:this.state.viewer,
                    cesExt:this.state.cesExt,
                    name:key,
        
                    dataUrl:dataUrl,
                    imageUrl:item.imageUrl,
                    textureImageUrl:item.textureImageUrl,
                    pointImgUrl:item.pointImgUrl,
                })
            }


        }else{
            RemoveEntityByName({
                viewer:viewer,
                name:key,
            })

            RemovePrimitivesByName({
                viewer:viewer,
                name:key,
            })
        }

      }

      getJingliDataurl(item){
        let {tableValue} = this.state;
        if(tableValue === "会场一级加强"){
            return item.dataUrl1;
        }else if(tableValue === "会场一级"){
            return item.dataUrl2;
        }else if(tableValue === "住地一级加强"){
            return item.dataUrl3;
        }else if(tableValue === "住地一级"){
            return item.dataUrl4;
        }else if(tableValue === "路线一级"){
            return item.dataUrl5;
        }else if(tableValue === "路线一级加强"){
            return item.dataUrl6;
        }
      }

    TableChage(value){
        console.log(value)
        this.setState({
            tableValue:value,
            selectList:[]
        },()=>{
            this.handlelist("TableChage")


        })
        this.props.chuandiTableValue(value)



    }


    getCurrentDate = () => {
        const today = new Date()
        let h = today.getHours()
        let m = today.getMinutes()
        let s = today.getSeconds()
        let year = today.getFullYear()
        let month = today.getMonth() + 1
        let day = today.getDate()
        let week = today.getDay()
        const weekArray = ['日', '一', '二', '三', '四', '五', '六']
        let width = window.innerWidth
        h = this.checkTime(h)
        m = this.checkTime(m)
        s = this.checkTime(s)
        this.timer = setTimeout(() => {
          this.setState({
            // currentDate: `${year}-${month}-${day}  星期${weekArray[week]}      ${h}:${m}:${s} `
            currentDate: `${year}/${month}/${day} `,
            weekDate:  `星期${weekArray[week]} `,
            hDate:  `${h}:${m}:${s}`
          }, () => {
            this.getCurrentDate()
          })
        }, 500)
      }
    
      checkTime = i => {
        if (i < 10) { i = '0' + i }
        return i
      } 
    render() {
        const {hoverTitle} = this.state;
        return (
            <div className="wrapapp">
                <div className="header">
                    <div className="headerleft">
                        <img src="cesiumtubiao/pag/ga.png"/>
                        <p>京西安保三维平台</p>
                    </div>
                    <div className="tableClass">
                        <Tabs defaultActiveKey="1" onChange={this.TableChage.bind(this)}>
                            {this.TabsNodeRender(this.state.tableList)}
                            
                        </Tabs>
                    </div>
                    <div className = 'headerRight'>
                        <p className = 'hDate'>{this.state.hDate}</p>
                        <p className = 'currentDate'>{this.state.currentDate}</p>
                        <p className = 'weekDate'>{this.state.weekDate}</p>
                        
                    </div>
                </div>
                

                <div className="menu">
                    {hoverTitle ? 
                    <div className='hover_title'>
                        <p>岗位职责</p>
                        <span>{hoverTitle}</span>
                    </div>:null}
                    <Menu
                        className="box"
                        style={{
                        width: "100%", 
                        height:'830px',
                        overflowY: "auto",
                        overflowX: " hidden"
                    
                        }}
                        defaultOpenKeys={["安保警力","车辆"]}
                        // openKeys={this.state.openKeys}
                        selectedKeys={[this.state.current]}
                        onOpenChange={this.handleClick}
                        mode="inline"
                        >
                        {this.treeNodeRender(this.state.list)}

                    </Menu>
                </div>
            </div>
        )
    }
}
export default MenuSetup