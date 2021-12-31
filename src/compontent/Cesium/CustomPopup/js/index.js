
import ScreenSpaceEventHandler from 'cesium/Source/Core/ScreenSpaceEventHandler'
import ScreenSpaceEventType from 'cesium/Source/Core/ScreenSpaceEventType'
import Cartesian3 from "cesium/Source/Core/Cartesian3"
import Cartesian2 from "cesium/Source/Core/Cartesian2"
import SceneTransforms from "cesium/Source/Scene/SceneTransforms"

import $ from "jquery"

var Popups = [];

let this_1;
		
export	function CustomPopup(option){
	    this_1 = option.this_;

		let viewer = option.viewer || {};
		let movement = option.movement || {};
		let htmlDIv = option.htmlDIv || "";
		let bianhao = option.bianhao;
		let layerName = option.layerName || "";
		
		var handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

		//获取当前点击的位置坐标
		var cartesian = viewer.scene.pickPosition(movement.position);
		//弹窗 参数 
		var paramObj = {
			id: 'trackPopUpContent',
			HTMLdiv: htmlDIv,
			Offset: {
				x: 0,
				y: 0
			},
			coordinate: cartesian, //笛卡尔坐标参数
			lineStyle: {
				Linewidth: 0,
				Lineheight: 0,
				Linebackground: '#0e76d6'
			},
			CircleStyle: {
				Circleradius: 0,
				Circlecolor: '#0e76d6'
			},
			heighthidenum: 1000, //高度隐藏值
		}
		//固定弹窗 位置
		PopupCoordinatePositioning(paramObj,viewer,bianhao,layerName);

		$(".pop-close").click(function(){
            $("#bubbleContent").remove();
          })

		/*滚轮事件 监听高度值*/
		handler.setInputAction(function(wheelment) {
			var height = Math.ceil(viewer.camera.positionCartographic.height);
			console.log("高：" + height);
		}, ScreenSpaceEventType.WHEEL)	
	}

	var PopupCoordinatePositioning = function(paramObj,viewer,bianhao,layerName) {
		$("#" + paramObj.id).remove(); //移除
		var position = paramObj.coordinate;
		if (!position) {
			position = Cartesian3.fromDegrees(0, 0, 0);
		}
		var MarkStr = '<div id="' + paramObj.id +
			'" class="leaflet-popup" style="bottom: 0px; left: 0px;background: transparent;">' +
			paramObj.HTMLdiv +
			'<div class="leaflet-popup-tip-container" style="height: initial;">' +
			'<div class="leaflet-popup-tip" style="transform: inherit; width:' + paramObj.lineStyle.Linewidth + 'px; height:' +
			paramObj.lineStyle.Lineheight + 'px; background: ' + paramObj.lineStyle.Linebackground +
			'; margin: auto; box-shadow:' + paramObj.lineStyle.Linebackground + ' 0px 1px 10px;"></div>' +
			'<div style="box-shadow: 0px 0px 8px ' + paramObj.CircleStyle.Circlecolor + ';width:' + paramObj.CircleStyle.Circleradius +
			'px;height:' + paramObj.CircleStyle.Circleradius + 'px;background:' + paramObj.CircleStyle.Circlecolor +
			';margin:auto;border-radius:50%;"></div>' +
			'</div>' +
			'</div>';
		var id = viewer._container.id;
		
		//新建bubbleContent的Div将它加载父级div下
		var bubbleContentDiv = document.createElement('div');
		bubbleContentDiv.setAttribute("id", "bubbleContent");//给创建的div设置id值；
		
		var bo = document.body; //获取body对象
		//动态插入到body中
		bo.insertBefore(bubbleContentDiv, bo.lastChild);
	
		$("#bubbleContent").append(MarkStr);
		

		var AllClass = $("#" + paramObj.id).attr("class");
		
		if (AllClass && AllClass.indexOf("leaflet-popup-content-wrapper") == -1) {

			$("#" + paramObj.id).attr("class", AllClass + " leaflet-popup-content-wrapper");
		}
		
		var realTime = new Object(); //示例初始化一个Object 
		realTime.PopupsID = paramObj.id;
		realTime.scenePosition = position;
		realTime.paramObj = paramObj;
		if (Popups.length == 0) {
			Popups.push(realTime);
		}
		var bools = true;
		for (var i = 0; i < Popups.length; i++) {
			if (Popups[i].PopupsID == paramObj.id) {
				Popups[i] = realTime;
				bools = false;
			}
		}
		if (bools) {
			Popups.push(realTime);
		}
				
		$("#" + paramObj.id).show();

		let viewDetails =  document.getElementById("viewDetails");
		if (viewDetails) {
			viewDetails.onclick = function(){
				let url = "";
				if (layerName === "制高点") {
					url = "CesiumData/zhigaodian/jingcha/jcdata.json";
				}else if(layerName === "门窗防开启报警"){
					url = "CesiumData/zhigaodian/jingcha/zhigaodian_menchuangfangkaiqibaojing_jcdata.json";
				}
				else{
					url = getJingChaJsonData(this_1.state.tableValue);
				}
				
				fetch(url, {
					method: "GET",
					// headers: {
					//     "Content-Type": "application/json",
					// },
					// mode: "cors",
					// body: JSON.stringify({
					//     content: "留言内容"
					// })
				}).then((res)=> 
					res.json()
				).then((res)=> {

					let modelListData = res 
					let newModelListData = [];
					//过滤数据
					if (layerName === "门窗防开启报警") {
						newModelListData = modelListData.filter(item => item.编号 && item.编号.toString() === bianhao )
					} else {
						newModelListData = modelListData.filter(item => item.岗位编号 && item.岗位编号.toString() === bianhao )	
					}
					

					this_1.setState({
						isModalVisible:true,
						modalDataList:newModelListData
					})
				}).catch((err) =>{
				console.log(err);
				});

			}
		}

		
		viewer.scene.postRender.addEventListener(function() { // 每一帧都去计算气泡的正确位置
			if (Popups.length > 0) {
				for (var i = 0; i < Popups.length; i++) {
					var infoboxContainer = document.getElementById(Popups[i].PopupsID); //morphComplete
					if (infoboxContainer != null) {
						//var infoboxContainer = document.getElementById("bubble");//morphComplete
						if (Popups[i].scenePosition) {
							var canvasHeight = viewer.scene.canvas.height;
							var windowPosition = new Cartesian2();

							SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, Popups[i].scenePosition, windowPosition);
							infoboxContainer.style.bottom = (canvasHeight - windowPosition.y + Popups[i].paramObj.Offset.y) + 'px';
							infoboxContainer.style.left = (windowPosition.x + -(infoboxContainer.scrollWidth / 2)) + 'px';
						}
					}
				}
			}
			var height = Math.ceil(viewer.camera.positionCartographic.height);
			
		});

	}

	function getJingChaJsonData(tableValue){
		
        if(tableValue === "会场一级加强"){
            return "CesiumData/wwhcyjjq/jingcha/jcdata.json";
        }else if(tableValue === "会场一级"){
			return "CesiumData/wwhcyj/jingcha/jcdata.json";
        }else if(tableValue === "住地一级加强"){
            return "CesiumData/wwzdyjjq/jingcha/jcdata.json";
        }else if(tableValue === "住地一级"){
            return "CesiumData/wwzdyj/jingcha/jcdata.json";
        }else if(tableValue === "路线一级"){
            return "CesiumData/xclxyj/jingcha/jcdata.json";
        }else if(tableValue === "路线一级加强"){
            return "CesiumData/xclxyjjq/jingcha/jcdata.json";
        }
	}
