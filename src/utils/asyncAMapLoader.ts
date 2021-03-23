// 加载高德地图
export const asyncAMapLoader = () => {
    return new Promise((resolve, reject) => {
      if (window.AMap) {
        resolve({ AMap: window.AMap, msg: '本地地图' })
      } else {
        /**
         *高德地图加载插件只需按如下格式加入plugin即可，比百度地图更为简单
         *"http://webapi.amap.com/maps?v=1.3&key=您申请的key值&plugin=Map3D,AMap.MarkerClusterer"
         */
        const url = 'http://webapi.amap.com/maps?v=1.4.1&key=809dee997bdb4ec644f5545d19bb7543&callback=initAMap&plugin=Map3D,AMap.MarkerClusterer,AMap.Geolocation,AMap.ControlBar'
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = url
        script.onerror = reject
        document.body.appendChild(script)
      }
      window.initAMap = () => {
        resolve({ AMap: window.AMap, msg: '首次加载地图' })
      }
    })
  }