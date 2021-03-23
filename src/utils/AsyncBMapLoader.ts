// 加载除百度地图核心api外的其他插件
let count = 0
// libs百度地图插件列表，需要什么插件加入什么插件的url
const libs = [
  'http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js',
  'http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js',
  'http://api.map.baidu.com/library/GeoUtils/1.2/src/GeoUtils_min.js'
]
const body = document.body
const loadLib = (src: string, resolve: (data: any) => void, reject: (str: string) => void) => {
  const lib = document.createElement('script')
  lib.setAttribute('type', 'text/javascript')
  lib.setAttribute('src', src)
  lib.onerror = function () {
    reject('地图初始化失败')
  }
  lib.onload = function () {
    count += 1;
    if (count === libs.length) {
      // libs全部加载成功才返回
      resolve({ BMap: window.BMap, BMapLib: window.BMapLib, msg: '首次加载地图' })
    }
  }
  body.appendChild(lib)
}

export const AsyncBMapLoader = () => {
  return new Promise((resolve, reject) => {
    if (window.BMap && window.BMapLib) {
      // 已经加载百度地图与所需插件则直接返回
      resolve({ BMap: window.BMap, BMapLib: window.BMapLib, msg: '本地地图' })
    } else {
      // 异步加载
      const bmap = document.createElement('script')
      bmap.type = 'text/javascript'
      bmap.src = 'https://api.map.baidu.com/api?v=3.0&ak=hlLd70ecS9icuYL3RiQqGeCEl0Pm3LKl&callback=MapLoadSuccess'
      body.appendChild(bmap)
      window.MapLoadSuccess = function () {
        // BMap加载完成，开始加载libs
        libs.forEach(lib => {
          loadLib(lib, resolve, reject)
        })
      }
      bmap.onerror = function () {
        reject('地图初始化失败')
      }
    }
  })
}