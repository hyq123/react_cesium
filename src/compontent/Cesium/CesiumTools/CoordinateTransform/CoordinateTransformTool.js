import Cartesian3 from "cesium/Source/Core/Cartesian3"
import Cartographic from "cesium/Source/Core/Cartographic"
import CesiumMath from 'cesium/Source/Core/Math'

/**
 * 笛卡尔坐标系转WGS84坐标系
 * @param point
 * @return {{lat: *, lng: *, alt: *}}
 * @constructor
 */
export function Cartesian3_to_WGS84 (point) {
    var cartesian33 = new Cartesian3(point.x, point.y, point.z);
    /**Cartographic
          *由经度，纬度和高度定义的位置。
          * @param [经度= 0.0]-经度，以弧度为单位。
          * @param [latitude = 0.0]-纬度，以弧度为单位。
          * @param [height = 0.0]-椭圆上方的高度（以米为单位）。
          */
    /**Cartographic.fromCartesian:
      *从笛卡尔位置创建一个新的制图实例。 中的值
      *结果对象将以弧度表示。
      * @param Cartesian-要转换为制图表达的笛卡尔位置。
      * @param [椭球= Ellipsoid.WGS84]-位置所在的椭球。
      * @param [结果]-将结果存储到的对象。
      * @returns修改后的结果参数，如果未提供，则为新的制图实例；如果笛卡尔位于椭圆体的中心，则为未定义。
      */
    var cartographic = Cartographic.fromCartesian(cartesian33);
    /**CesiumMath.toDegrees:
      *将弧度转换为度。
      * @param弧度-以弧度转换的角度。
      * @returns相应的角度（以度为单位）。
      */
    var lat = CesiumMath.toDegrees(cartographic.latitude);
    var lng = CesiumMath.toDegrees(cartographic.longitude);
    var alt = cartographic.height;
    return {lng: lng, lat: lat, alt: alt};
}

export function WGS84_to_Cartesian3(option){
  let lat = option.lat;
  let lon = option.lon;
  let height = option.height;

  return Cartesian3.fromDegrees(lat,lon,height);
}