import React, { Component } from 'react';

import Ion from 'cesium/Source/Core/Ion'
import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import WebMapTileServiceImageryProvider from "cesium/Source/Scene/WebMapTileServiceImageryProvider"
import UrlTemplateImageryProvider from "cesium/Source/Scene/UrlTemplateImageryProvider"
import Cartographic from "cesium/Source/Core/Cartographic"
import Color from 'cesium/Source/Core/Color';
// import "./index.css"

import CesiumExt from "../compontent/Cesium/CesiumExt/CesiumExtV1.0"
import CesiumExt2 from "../compontent/Cesium/CesiumExt/v2.0/CesiumExtV2.0"
import CesiumExt3 from "../compontent/Cesium/CesiumExt/v3.0/CesiumExtV3.0"

import MenuSetup from '../compontent/MenuSetup'
import CesiumMath from "cesium/Source/Core/Math" 
import ScreenSpaceEventHandler from 'cesium/Source/Core/ScreenSpaceEventHandler'
import ScreenSpaceEventType from 'cesium/Source/Core/ScreenSpaceEventType'
import Cartesian3 from "cesium/Source/Core/Cartesian3"
import CesiumColor from "cesium/Source/Core/Color"

import {CustomPopup} from "../compontent/Cesium/CustomPopup/js/index"
import "../compontent/Cesium/CustomPopup/css/index.css"

import './index.less'
import { WGS84_to_Cartesian3 } from '../compontent/Cesium/CesiumTools/CoordinateTransform/CoordinateTransformTool';
import InformationPanel from '../compontent/InformationPanel';

import { Modal, Button ,Table} from 'antd';
import { AddMask } from '../compontent/Cesium/CesiumFunctionOperation/FunctionOperation';

export default class CesiumPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            legendlist:[],
            viewer:undefined,

            cesExt:undefined,
            handler:undefined,

            OnclicklayerName:"",

            IsGetCoordByOnclick:true,
            currentDate: null,
            weekDate:null,
            hDate:null,

            isModalVisible:false,

            basicModalTitle:"",

            modalDataList:[],

            tableValue:"??????????????????",

            tableColumns:[
                {
                    title: '????????????',
                    dataIndex: '????????????',
                    key: '????????????',
                  },
                  {
                    title: '??????',
                    dataIndex: '??????',
                    key: '??????',
                  },
                  {
                    title: '??????',
                    dataIndex: '??????',
                    key: '??????',
                  },
                  {
                    title: '??????',
                    dataIndex: '??????',
                    key: '??????',
                  },
                  {
                    title: '??????',
                    dataIndex: '??????',
                    key: '??????',
                  },
                  {
                    title: '????????????',
                    dataIndex: '????????????',
                    key: '????????????',
                  }
                ],

                tableColumns1:[
                    {
                        title: '??????',
                        dataIndex: '??????',
                        key: '??????',
                    },
                    {
                        title: '??????',
                        dataIndex: '??????',
                        key: '??????',
                    },
                    {
                        title: '????????????',
                        dataIndex: '????????????',
                        key: '????????????',
                    },
                ]
        
        }
    }
    componentDidMount(){
        this.getCurrentDate()
        Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5OGU1Y2E5ZC1hYjlkLTRlOGItYmI4Yi0zNTdjZWRlNWIzMGEiLCJpZCI6MzA4NTcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTQzNjg4NTl9.M_8jCTjgUSrddsnMiIc8zkvUmvtxgAeNbNB_bvuKL7o';
        var viewer = new Viewer("cesiumContainer",{
            contextOptions: {
                webgl: {
                    alpha: true
                }
            },

            animation:false,//??????????????????????????????????????????
            baseLayerPicker:false,//???????????????????????????????????????????????????
            fullscreenButton:false,//?????????????????????
            vrButton:false,//??????VR?????????
            geocoder:false,//???????????????(?????????????????????)???????????????
            homeButton:false,//???????????????Home????????????
            infoBox:false,//??????????????????????????????????????????
            sceneModePicker:false,//?????????????????????????????????????????????
            selectionIndicator:false,//??????????????????????????????????????????
            timeline:false,//????????????????????????
            navigationHelpButton:false,//??????????????????????????????
            skyBox:undefined,//????????????
            // skyAtmosphere:true,//???????????????????????????

            shadows: true,//??????????????????????????????????????????
            shouldAnimate: true,//????????????????????????

            creditContainer:"credit",//???????????????????????????????????????none

            // http://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}
           //url:"https://webst{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&style=6", // ??????????????????

           
           //?????????????????????
            // imageryProvider:new UrlTemplateImageryProvider({
            //     // url:"http://webst02.is.autonavi.com/appmaptile?style=6&x={TileRow}&y={TileCol}&z={TileMatrix}",
            //     url:"TileData/{z}/{x}/{y}.jpg",
            //     // subdomains:["01","02","03","04"], //???????????????
            //     //    url:"http://api0.map.bdimg.com/customimage/tile?=&x={x}&y={y}&z={z}&scale=1&customid=midnight",
            //     layer: "GaoDeImageryBasicLayer",
            //     // tileWidth:256,
            //     // tileHeight:256,
            //     style: "default",
            //     format: "image/jpeg",
            //     tileMatrixSetID: "GoogleMapsCompatible",

            //     minimumLevel: 3,
            //     maximumLevel: 18,
            //     show: false
                

            // })

            // imageryProvider : new WebMapTileServiceImageryProvider({
            //     url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
            //     // url:'http://10.111.15.8:8219/tile?customid=webmercator&x={TileRow}&y={TileCol}&z={TileMatrix}',
                
            //     // url: "http://api0.map.bdimg.com/customimage/tile?=&x={TileRow}&y={TileCol}&z={TileMatrix}&scale=1&customid=midnight",
            //     // srcCoordType: "BD09",
            // //    url:" http://www.supermapol.com/realspace/services/3D-dixingyingxiang/rest/realspace/datas/MosaicResult/data/index/{TileRow}/{TileCol}.jpg_png?level={TileMatrix}",
               
            //     layer: "tdtVecBasicLayer",
            //     // tileWidth:256,
            //     // tileHeight:256,
            //     style: "default",
            //     format: "image/jpeg",
            //     tileMatrixSetID: "GoogleMapsCompatible",
            //     show: false
            // })

        })


        this.setState({
            viewer:viewer
        },() =>{
            this.InitScene(viewer);
        })
        
    }

        /**
     * ???????????????
     */
         InitScene(viewer){
            if (!viewer) {
                alert('???????????????Viewer')
                return false
            }

            // debugger;
            // let cesExt2 = new CesiumExt2(
            //     viewer,{}
            // );

            let cesExt3 = new CesiumExt3(
                viewer,{}
            );
           let baiduImageryProvider = cesExt3.BaiduImageryProvider1({
                style:"vec"
            });

            viewer.imageryProvider = new cesExt3.BaiduImageryProvider1({
                style:"vec"
            });


            

        //    let a= cesExt2.BaiduImageryProvider({
        //        a:"1"
        //    })
    
            let cesExt = new CesiumExt(
                viewer,{}
            );

            let handler = new ScreenSpaceEventHandler(this.state.viewer.canvas);

            this.setState({
                cesExt:cesExt,
                handler:handler
            },() => {
                let sceneTimeOption = {
                    // state:"night"
                    state:"day"
                }

                cesExt.CustomSkyBox({});

                //???????????????

                // 116.75772420131203,39.6912447178685
                let position = WGS84_to_Cartesian3({
                    lat:116.31143241591587,
                    lon:39.880914312843814,
                    height:400
                })

                // cesExt.setDirectionalLight(
                //     new Cartesian3.fromDegrees(116.261209157595, 39.3042238956531, 480),
                //     {
                //         targetPosition: new Cartesian3.fromDegrees(116.261209157595, 39.3042238956531, 430),
                //         color: new CesiumColor(1.0, 1.0, 1.0, 1),
                //         intensity: 0.55
                //     }
                // )

                cesExt.setDirectionalLight(
                    position,
                    {
                        direction: position, //??????
                        color: new Color(1, 1, 1, 1),
                        intensity:  10
                    }
                )



                cesExt.setSceneTime(sceneTimeOption);

                cesExt.setUpdatePostProcess();
                
                let positionOption = {
                        state:"location",
                        //state:"location",
                        position:[116.31143241591587,39.880914312843814,2000],
                        heading:0,
                        pitch:-40
                }
                cesExt.setInitPosition(positionOption)
        
                //???????????????????????????
                if (this.state.IsGetCoordByOnclick) {
                    // cesExt.GetCoordByOnclick();
                }

                cesExt.KHR_technique_webgl();
                cesExt.Load3dTileData({
                    url:"tempshare1/tileset1.json",
                    id:"tileset1",
                    heightAboveGround:-49.5,
                    IsPositionToData:false
                })

                cesExt.Load3dTileData({
                    url:"tempshare1/tileset2.json",
                    id:"tileset2",
                    heightAboveGround:-49.5,
                    IsPositionToData:false
                })
                cesExt.Load3dTileData({
                    url:"tempshare1/tileset3.json",
                    id:"tileset3",
                    heightAboveGround:-49.5,
                    IsPositionToData:false
                })
                cesExt.Load3dTileData({
                    url:"tempshare1/tileset4.json",
                    id:"tileset4",
                    heightAboveGround:-49.5,
                    IsPositionToData:false
                })
        
                this.FunctionOperation()
            })
            
    }
    /**
     * ??????????????????????????????
     */
    FunctionOperation =() =>{
        //??????3dtile??????

        

        let this_ = this;
		this.state.handler.setInputAction(function (movement) {

			// this_.setState({
            //     isModalVisible:true
            // })
            let pickObj = this_.state.viewer.scene.pick(movement.position);

            let htmlArr = [];
            let bianhao = "";
            let layerName = "";
            let state = "";
            let parentType = "";

            if (pickObj) {
                let pickObjId  = pickObj.id;
                if (!pickObjId) {
                    pickObjId = pickObj.primitive;
                }
                if( !pickObjId || !pickObjId.properties) return;

                layerName = pickObjId.name;//?????????

                this_.setState({
                    OnclicklayerName:layerName
                });

                state = pickObjId.state;

                parentType = pickObjId.parentType;

                let propertyNames =  pickObjId.properties.propertyNames ;

                bianhao = pickObjId.properties["??????"] && pickObjId.properties["??????"].getValue();

                if (!bianhao) {
                    bianhao = pickObjId.properties["??????"] && pickObjId.properties["??????"].getValue();
                }



                propertyNames.forEach(propertyName => {

                    let propertyName1 = pickObjId.properties[propertyName];
                    let propertValue = "";
                    if (propertyName1) {
                        let value = pickObjId.properties[propertyName].getValue();
                        propertValue = value?value:"";
                    } 
                    
                    if (propertyName !== "??????" && propertyName !== "??????" && propertyName !== "OBJECTID") {

                        if (layerName === "????????????") {
                            if( propertyName !== 'Id' && propertyName !== '??????'){
                                htmlArr.push(`<p>${propertyName}???${propertValue}</p>`)
                            };
                        } else {
                            if( propertyName!=='Id' ){
                                htmlArr.push(`<p>${propertyName}???${propertValue}</p>`)
                            };
                        }
                       
                    };
                    
                });
            }

            if(htmlArr.length === 0) return;
            let htmlStr = ""
            if (bianhao && bianhao !== "") {
                htmlStr = `<button id="viewDetails" class="viewDetails" name=`+bianhao+` >????????????</button>`;
            }

            let zhigaodianHtmlArr = ""
            if (layerName === "?????????") {
                if (bianhao === "1") {
                    zhigaodianHtmlArr = `<div class="pag6">
                       
                    <img src="cesiumtubiao/Springframe/6.png"/>
                   <div class="scrool">
                     <img src="cesiumtubiao/Springframe/1-1.png"/>
                   </div>
                   <p class="pop-close"></p>
                   <span id="viewDetails"  name=`+bianhao+`></span>

                    
                    </div>`
                } else if (bianhao === "2")  {
                        zhigaodianHtmlArr = `<div class="pag6">
                       
                    <img src="cesiumtubiao/Springframe/6.png"/>
                   <div class="scrool">
                     <img src="cesiumtubiao/Springframe/2-1.png"/>
                   </div>
                   <p class="pop-close"></p>
                   <span id="viewDetails"  name=`+bianhao+`></span>

                    
                    </div>`

                    
                }else if (bianhao === "3")  {
                        zhigaodianHtmlArr = `<div class="pag6">
                       
                    <img src="cesiumtubiao/Springframe/6.png"/>
                   <div class="scrool">
                     <img src="cesiumtubiao/Springframe/3-1.png"/>
                   </div>
                   <p class="pop-close"></p>
                   <span id="viewDetails"  name=`+bianhao+`></span>

                    
                    </div>`
                }else if (bianhao === "4")  {
                         zhigaodianHtmlArr = `<div class="pag6">
                       
                    <img src="cesiumtubiao/Springframe/6.png"/>
                   <div class="scrool">
                     <img src="cesiumtubiao/Springframe/4-1.png"/>
                   </div>
                   <p class="pop-close"></p>
                   <span id="viewDetails"  name=`+bianhao+`></span>

                    
                    </div>`
                }else if (bianhao === "5")  {
                      zhigaodianHtmlArr =  `<div class="pag12">
                       
                     <img src="cesiumtubiao/Springframe/12.png"/>
                    <div class="scrool">
                    <img src="cesiumtubiao/Springframe/5-1.png"/>
                  </div>
                  <p class="pop-close"></p>
                  <span id="viewDetails"  name=`+bianhao+`></span>
                
                 </div>`
                }else if (bianhao === "6")  {
                      zhigaodianHtmlArr =   `<div class="pag6">
                       
                   <img src="cesiumtubiao/Springframe/6.png"/>
                   <div class="scrool">
                     <img src="cesiumtubiao/Springframe/6-1.png"/>
                   </div>
                   <p class="pop-close"></p>
                   <span id="viewDetails"  name=`+bianhao+`></span>

                
                </div>`
                }else if (bianhao === "7")  {
                      zhigaodianHtmlArr =   `<div class="pag6">
                       
                <img src="cesiumtubiao/Springframe/6.png"/>
                <div class="scrool">
                  <img src="cesiumtubiao/Springframe/7-1.png"/>
                </div>
                <p class="pop-close"></p>
                <span id="viewDetails"  name=`+bianhao+`></span>

                 
                 </div>`
                }else if (bianhao === "8")  {
                      zhigaodianHtmlArr =   `<div class="pag6">
                       
                            
                    <img src="cesiumtubiao/Springframe/6.png"/>
                    <div class="scrool">
                      <img src="cesiumtubiao/Springframe/8-1.png"/>
                    </div>
                    <p class="pop-close"></p>
                    <span id="viewDetails"  name=`+bianhao+`></span>
                 </div>`
                } else if (bianhao === "9")  {
                    zhigaodianHtmlArr = `<div class="pag6">
                       
                    <img src="cesiumtubiao/Springframe/6.png"/>
                   <div class="scrool">
                     <img src="cesiumtubiao/Springframe/9-1.png"/>
                   </div>
                   <p class="pop-close"></p>
                   <span id="viewDetails"  name=`+bianhao+`></span>

                    
                    </div>`

                    
                } else if (bianhao === "10")  {
                       zhigaodianHtmlArr = `<div class="pag6">
                       
                    <img src="cesiumtubiao/Springframe/6.png"/>
                   <div class="scrool">
                     <img src="cesiumtubiao/Springframe/10-1.png"/>
                   </div>
                   <p class="pop-close"></p>
                   <span id="viewDetails"  name=`+bianhao+`></span>

                    
                    </div>`

                    
                } else if (bianhao === "11")  {
                        zhigaodianHtmlArr = `<div class="pag6">
                       
                    <img src="cesiumtubiao/Springframe/6.png"/>
                   <div class="scrool">
                     <img src="cesiumtubiao/Springframe/11-1.png"/>
                   </div>
                   <p class="pop-close"></p>
                   <span id="viewDetails"  name=`+bianhao+`></span>

                    
                    </div>`

                    
                } else if (bianhao === "12")  {
                    zhigaodianHtmlArr = `<div class="pag12">
                       
                        <img src="cesiumtubiao/Springframe/12.png"/>
                        <div class="scrool">
                        <img src="cesiumtubiao/Springframe/12-1.png"/>
                        </div>
                        <p class="pop-close"></p>
                        <span id="viewDetails"  name=`+bianhao+`></span>

                    
                    </div>`

                    
                }
            


                let option ={
                    this_:this_,
                    viewer:this_.state.viewer,
                    movement:movement,
                    bianhao:bianhao,
                    layerName:layerName,
                    htmlDIv:`<div class="leaflet-popup-content-wrapper3">
                                <spam class="pop-close">??</spam>
                                <div id="trackPopUpLink" class="pop-main">
                                    ${zhigaodianHtmlArr}
                                </div>`+
    
                                // htmlStr +
                            `</div>`
                }
                CustomPopup(option);
                    
            }else{
                let option ={
                    this_:this_,
                    viewer:this_.state.viewer,
                    movement:movement,
                    bianhao:bianhao,
                    layerName:layerName,
                    htmlDIv:`<div class="leaflet-popup-content-wrapper2">
                                <spam class="pop-close">??</spam>
                                <div id="trackPopUpLink" class="pop-main">
                                    ${htmlArr.join("")}
                                </div>`+
    
                                htmlStr +
                            `</div>`
                }
                CustomPopup(option);
            }


  
		  }, ScreenSpaceEventType.LEFT_CLICK);

         
    }

    getTableValue(value){
        console.log(value)
        this.setState({
            tableValue:value
        })
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
        const weekArray = ['???', '???', '???', '???', '???', '???', '???']
        let width = window.innerWidth
        h = this.checkTime(h)
        m = this.checkTime(m)
        s = this.checkTime(s)
        this.timer = setTimeout(() => {
          this.setState({
            // currentDate: `${year}-${month}-${day}  ??????${weekArray[week]}      ${h}:${m}:${s} `
            currentDate: `${year}/${month}/${day} `,
            weekDate:  `??????${weekArray[week]} `,
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

      setModal1Visible(isModalVisible) {
        this.setState({ isModalVisible });
      }
    
      setModal2Visible(isModalVisible) {
        this.setState({ isModalVisible });
      }

      modalNodeRender(item){
        let modelList = []
        let {tableColumns,tableColumns1} = this.state;
        let tcs =[]; 
        if (item.key === "?????????????????????") {
            tcs = tableColumns1
        } else {
            tcs = tableColumns;
        }

        return(
            <div className="tableClass">
              <Table className="tableClass1" dataSource={item} columns={tcs} />
            </div>
        )

      }
      handlelegend = (legendlist) => {
        //   console.log(legendlist)
          this.setState({
            legendlist
          },()=>{
            // console.log(this.state.legendlist)
          })
      }
      handleText = (text) => {
        console.log(text)

      }
      handleClick = () => {
        this.setState({
            tableValue:''
        })
      }
    render(){
    
        let {basicModalTitle,isModalVisible,modalDataList,tableColumns,legendlist,tableValue,tableColumns1} = this.state;
        return(
            <div className="wrapbox">
                
                <div id="cesiumContainer" className="fullSize">
                </div>
               
                {/* ??????????????????????????? */}
                <div id="credit" style={{display:"none"}}></div>

              
                
                    <MenuSetup className="menu" 
                     viewer = {this.state.viewer}
                     cesExt = {this.state.cesExt}
                     handlelegend = {this.handlelegend}
                     chuandiTableValue={this.getTableValue.bind(this)}
                    />

                    <Modal title={basicModalTitle} visible={isModalVisible}
                    className="tableClass3"
                    centered
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                    >
                        {/* <div className="tableClass2"> */}
                        {this.state.OnclicklayerName === "?????????????????????" ?<Table className="tableClass1" dataSource={modalDataList} columns={tableColumns1}/>:<Table className="tableClass1" dataSource={modalDataList} columns={tableColumns} />}
                            {/* <Table className="tableClass1" dataSource={modalDataList} columns={tableColumns} /> */}
                        {/* </div> */}
                        {/* {this.modalNodeRender(modalDataList)} */}
                    </Modal>
                    <div className="legend">
                        <div className="top">
                            <img src="cesiumtubiao/pag/leng.png"/>
                            <p>??????</p>
                        </div>
                        <div className="cont">
                            <ul>
                                {
                                    legendlist&&legendlist.map((item,ind)=>{
                                        return <li key={ind}>
                                            {
                                                item.title == '?????????'||item.title == '?????????'||item.title == '?????????'||item.title == '??????'||item.title == '????????????'||item.title == '?????????'?<span style={{background: item.title == '?????????'?'rgba(255, 57, 57, 0.5)':item.title == '?????????'?'rgba(255, 126, 0, 0.5)':item.title == '?????????'?'rgba(237, 230, 32, 0.5)':item.title == '??????'?'rgba(0, 192, 255, 0.5)':item.title == '????????????'?'rgba(0, 255, 228, 0.5)':item.title == '?????????'?'#FF48AF':'#ccc',borderColor: item.title == '?????????'?'rgba(255, 57, 57, 0.5)':item.title == '?????????'?'rgba(255, 126, 0, 0.5)':item.title == '?????????'?'rgba(237, 230, 32, 0.5)':item.title == '??????'?'rgba(0, 192, 255, 0.5)':item.title == '????????????'?'rgba(0, 255, 228, 0.5)':item.title == '?????????'?'#FF48AF':'#ccc',borderStyle:'solid',borderWidth:'2px'}}></span>: <img src={item.legendUrl} />
                                            }
                                            
                                           
                                            <p>{item.title}</p>
                                        </li>
                                    })
                                }
                            </ul>




                        </div>

                    </div>
                    <div className="text">
                        {
                            tableValue == '??????????????????' ? <div className="box">
                                <img src="cesiumtubiao/pag/1.png" />
                                <p onClick={this.handleClick}></p>
                            </div> : tableValue == '????????????' ? <div className="box">
                                <img src="cesiumtubiao/pag/2.png" />
                                <p onClick={this.handleClick}></p>
                            </div> : tableValue == '??????????????????' ? <div className="box">
                                <img src="cesiumtubiao/pag/3.png" />
                                <p onClick={this.handleClick}></p>
                            </div> : tableValue == '??????????????????' ? <div className="box">
                                <img src="cesiumtubiao/pag/4.png" />
                                <p onClick={this.handleClick}></p>
                            </div> : tableValue == '????????????' ? <div className="box">
                                <img src="cesiumtubiao/pag/5.png" />
                                <p onClick={this.handleClick}></p>
                            </div> : null
                        }
                    

                    </div>
                    {/* <InformationPanel></InformationPanel> */}
            </div>
        )
    }
}