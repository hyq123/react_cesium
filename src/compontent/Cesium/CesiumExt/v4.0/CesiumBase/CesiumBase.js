export function BaseImageryProviderExpand(viewer) {
    if(viewer){
        this._installBaiduImageryProvider()

        this._installGooGleImageryProvider()

        this._installAmapImageryProvider()

        this._installTencentImageryProvider()

        this._installTdtImageryProvider()
    }
    
}

/**
 * 为base函数添加属性
 */
 BaseImageryProviderExpand.prototype = {


}