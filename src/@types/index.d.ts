// 解决第三方引入的插件带来的编译语法报错
declare interface Window{
    AMap:any
    initAMap:()=>void
    BMap:any
    BMapLib:any
    MapLoadSuccess:any
}
declare const BMap: any
declare const BMapLib: any
declare const BMAP_ANIMATION_DROP: any
declare const BMAP_STATUS_SUCCESS: any
declare const BMAP_ANCHOR_BOTTOM_RIGHT: any
declare const BMAP_NAVIGATION_CONTROL_LARGE: any
declare const AMap: any
