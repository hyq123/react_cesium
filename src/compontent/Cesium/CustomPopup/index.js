	Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5OGU1Y2E5ZC1hYjlkLTRlOGItYmI4Yi0zNTdjZWRlNWIzMGEiLCJpZCI6MzA4NTcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTQzNjg4NTl9.M_8jCTjgUSrddsnMiIc8zkvUmvtxgAeNbNB_bvuKL7o';

	var viewer = new Cesium.Viewer('cesiumContainer', {
		//imageryProvider: globemap,
		selectionIndicator: false,
		animation: false,
		baseLayerPicker: false,
		geocoder: false,
		timeline: false,
		sceneModePicker: false,
		navigationHelpButton: false,
		infoBox: false,
		fullscreenButton: false,
		homeButton: false,
	});

	viewer.scene.globe.depthTestAgainstTerrain = true;

	viewer.camera.flyTo({
		destination: Cesium.Cartesian3.fromDegrees(114.21772195, 22.725681793, 53298.0),
	})
	
	var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
		handler.setInputAction(function(movement) {
			var windowPosition = viewer.camera.getPickRay(movement.position);
			var cartesianCoordinates = viewer.scene.globe.pick(windowPosition, viewer.scene);
			var cartoCoordinates = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesianCoordinates);
			var cartesian2 = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
			var carto2 = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian2);
			latitude = carto2.latitude * 180 / Math.PI;
			longitude = carto2.longitude * 180 / Math.PI;
			//alert("纬度:"+latitude+","+"经度:"+longitude);
			var cartesian = viewer.scene.pickPosition(movement.position);
			//弹窗 参数 
			
			let option ={
				viewer:viewer,
				movement:movement,
				htmlDIv:'<div class="leaflet-popup-content-wrapper" style="background:#FFF;">' +
							'<div id="trackPopUpLink" class="leaflet-popup-content" style="max-width:300px;max-height:500px"><h5>纬度:' +
							latitude + ',<br>经度:' + longitude + '</h5></div>' +
							'</div>'
			}
			CustomPopup(option);
	
			//固定弹窗 位置
//			PopupCoordinatePositioning(paramObj);
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
