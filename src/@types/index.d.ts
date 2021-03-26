// 解决第三方引入的插件带来的编译语法报错
declare interface Window{
    AMap:any
    initAMap:()=>void
    BMap:any
    BMapLib:any
    MapLoadSuccess:any
}
declare module 'three'
declare module 'three/examples/jsm/misc/RollerCoaster.js'
declare module 'three/examples/jsm/controls/OrbitControls.js'
declare module  'three/examples/jsm/objects/Reflector.js'
declare module 'three/examples/jsm/libs/tween.module.min.js'
declare module 'three/examples/jsm/controls/TrackballControls.js'
declare module 'three/examples/jsm/renderers/CSS3DRenderer.js'
declare module '@ant-design/icons'
declare module 'src/view/amap/images/red.png'
declare module 'antd'
declare const TrackballControls: any
// declare const TWEEN: any
declare const BMap: any
declare const BMapLib: any
declare const BMAP_ANIMATION_DROP: any
declare const BMAP_STATUS_SUCCESS: any
declare const BMAP_ANCHOR_BOTTOM_RIGHT: any
declare const BMAP_NAVIGATION_CONTROL_LARGE: any
declare const AMap: any
