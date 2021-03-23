import * as React from 'react';
import { message, Modal } from 'antd'
import { AsyncBMapLoader } from '@/utils/index'
import {
  style_1,
  // style_2
} from './style'
import './index.less'
const { useState, useEffect } = React
interface BMapState {
  mapRef: any
  currentPositionPointsArray: number[]
  currentPositionPointsObj: any
}
export default () => {
  const initialBMapState: BMapState = {
    mapRef: null,
    currentPositionPointsArray: [118.10388605, 24.48923061],
    currentPositionPointsObj: null
  }
  const [bMapState, setbMapState] = useState(initialBMapState)
  // console.log(bMapState)
  let { mapRef, currentPositionPointsArray, currentPositionPointsObj } = bMapState
  useEffect(() => {
    AsyncBMapLoader().then(res => {
      console.log(res)
      initMap()
    })
  }, [])
  // 初始化地图
  const initMap = async () => {
    mapRef = new BMap.Map('bmap-container')
    mapRef.setDefaultCursor('pointer')
    mapRef.enableScrollWheelZoom(true) // 设置鼠标滚轮地图放大缩小
    mapRef.clearOverlays()
    const point = new BMap.Point(...currentPositionPointsArray)
    mapRef.centerAndZoom(point, 12) // 初始化地图,设置中心点坐标和地图级别
    mapRef.setMapStyleV2({ styleJson: style_1 }) // 自定义地图
    // 浏览器获取当前定位
    try {
      const curPosiObj = await getCurPosition()
      console.log('当前定位信息', curPosiObj)
      getLocSuccess(curPosiObj)
    } catch (error) {
      console.log(error)
      message.error(error.msg)
      Modal.confirm({
        title: '是否启用默认定位?',
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk: () => {
          enableDefaultLoc(point)
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }

    // 生成点聚合
    addBMapMarkerClusterer()
    // 添加工具条和比例尺
    controllerTools()
  }
  // 获取当前定位成功
  const getLocSuccess = (curPosiObj: any) => {
    const { lng, lat } = curPosiObj
    currentPositionPointsObj = new BMap.Point(lng, lat)
    mapRef.panTo(currentPositionPointsObj)
    const iconConfig = { url: require('./images/red.png').default, size: { width: 48, height: 48 } }
    const mk = addBMapMarker(currentPositionPointsObj, true, iconConfig)
    generateNearByNMarkers(mk)
    drawCircle()

    mk.enableDragging() //点标记可拖拽
    // mk.disableDragging() //点标记不可拖拽

    mk.addEventListener('click', function () {
      const windowConfig = {}
      bdMapAddInfoWindow(windowConfig, this, true)
    })

    mk.addEventListener('dragend', function (e: any) {
      console.log(e)
      // setCurrentPositionPointsObj(e.point )
      currentPositionPointsObj = e.point
      console.log(currentPositionPointsObj)
      mapRef.panTo(currentPositionPointsObj)
      const allMarkers = mapRef.getOverlays()
      // 移除自身以外的其他点标记
      allMarkers.forEach((marker: any) => {
        if (marker !== this) {
          removeBMapMarker(marker)
        }
      })
      // 随机生成当前位置旁边的N个点标记
      generateNearByNMarkers(e, 20)
      drawCircle(7000)
    })
  }
  // 获取当前定位失败，启用默认定位
  const enableDefaultLoc = (point: any) => {
    currentPositionPointsObj = point
    const iconConfig = { url: require('./images/red.png').default, size: { width: 48, height: 48 } }
    const mk = addBMapMarker(currentPositionPointsObj, true, iconConfig)
    generateNearByNMarkers(mk)
    drawCircle()

    mk.enableDragging() //点标记可拖拽
    // mk.disableDragging() //点标记不可拖拽

    mk.addEventListener('click', function () {
      const windowConfig = {}
      bdMapAddInfoWindow(windowConfig, this, true)
    })

    mk.addEventListener('dragend', function (e: any) {
      console.log(e)
      // setCurrentPositionPointsObj(e.point )
      currentPositionPointsObj = e.point
      console.log(currentPositionPointsObj)
      mapRef.panTo(currentPositionPointsObj)
      const allMarkers = mapRef.getOverlays()
      // 移除自身以外的其他点标记
      allMarkers.forEach((marker: any) => {
        if (marker !== this) {
          removeBMapMarker(marker)
        }
      })
      // 随机生成当前位置旁边的N个点标记
      generateNearByNMarkers(e, 20)
      drawCircle(7000)
    })
  }
  // 移除点标记
  const removeBMapMarker = (marker: any) => {
    // 移除指定点标记
    marker && mapRef.removeOverlay(marker)
  }
  // 添加点标记
  const addBMapMarker = (point: any, animation: boolean, iconConfig: any) => {
    let marker
    if (iconConfig) {
      const { url, size } = iconConfig
      const icon = new BMap.Icon(url, new BMap.Size(size['width'], size['height']))
      marker = new BMap.Marker(point, { icon })
    } else {
      marker = new BMap.Marker(point)
    }
    mapRef.addOverlay(marker)
    animation && marker.setAnimation(BMAP_ANIMATION_DROP) //跳动的动画 移动端无效
    return marker
  }
  // 随机生成当前位置旁边的N个点标记-->后期的ajax请求
  const generateNearByNMarkers = (e: any, count: number = 10) => {
    for (let i = 0; i < count; i++) {
      const point = new BMap.Point(
        e.point['lng'] + (Math.random() - 0.5) * 0.08,
        e.point['lat'] + (Math.random() - 0.5) * 0.08
      )
      // 把地图上所有的点压人当前地图内的点数组
      let pointsArray = []
      pointsArray.push(point)
      const iconConfig = { url: require('./images/blue.png').default, size: { width: 20, height: 20 } }
      const marker = addBMapMarker(point, true, iconConfig)
      marker.dataId = i
      marker.addEventListener('click', function () {
        const windowConfig = {}
        bdMapAddInfoWindow(windowConfig, this, false)
      })
    }
  }
  // 添加信息窗口
  const bdMapAddInfoWindow = (windowConfig: any, marker: any, isCurrent: any) => {
    // console.log(marker)
    const opts = windowConfig
    const { lat, lng } = marker.point
    const { dataId } = marker
    const point = new BMap.Point(lng, lat)
    let sContent
    if (isCurrent) {
      sContent = `<div id=${dataId} style='cursor:pointer'><div>拖动当前点获取信息</div></div>`
    } else {
      sContent = `<div id=${dataId} style='cursor:pointer;'><div style='display:inline-block;margin:0 0 5px 0;padding:0.2em 0'>客户名称：</div><div>建设银行厦门科技支行${dataId}</div></div>`
    }

    const infoWindow = new BMap.InfoWindow(sContent, opts) // 创建信息窗口对象
    //判断窗口的打开状态
    if (!infoWindow.isOpen()) {
      //如果没有打开，则监听打开事件，获取按钮，添加事件
      infoWindow.addEventListener('open', function () {
        document.getElementById(dataId).onclick = function (e) {
          console.log('infoWindow noopened：', dataId)
        }
      })
    } else {
      //如果已经打开，直接获取按钮，添加事件
      document.getElementById(dataId).onclick = function (e) {
        console.log('infoWindow opened：', dataId)
      }
    }
    mapRef.openInfoWindow(infoWindow, point) //开启信息窗口
  }
  // 生成点聚合
  const addBMapMarkerClusterer = () => {
    let markers: any = []
    let pt = null
    let i = 0
    for (; i < 200; i++) {
      pt = new BMap.Point(Math.random() * 40 + 85, Math.random() * 30 + 21)
      const iconConfig = { url: require('./images/blue.png').default, size: { width: 20, height: 20 } }
      const markerInClusterer = addBMapMarker(pt, true, iconConfig)
      // 为点聚合内的点注册点击事件
      markerInClusterer.addEventListener('click', (pt: any) => {
        // 点击事件异步执行，需要闭包管理每个回调函数的专属变量pt
        return (pt => {
          // 点击点标记则把改点定位到地图中心
          mapRef.panTo(pt.point)
        })(pt)
      })
      markers.push(markerInClusterer)
      // 自定义点标记样式可以通过百度地图的window.BMap.Icon类实现
    }
    // 生成点聚合并自定义点聚合样式 可采用两种方式导入自定义聚合点样式文件 common.js规范和ES6 module规范
    import('./clustererStylesES6').then(clustererStylesES6 => {
      /*global BMapLib*/
      const { styles } = clustererStylesES6
      new BMapLib.MarkerClusterer(mapRef, { markers, styles })
    })
    // const styles = require('./clustererStylesCommonJS').default
    // new BMapLib.MarkerClusterer(mapRef, { markers, styles })
    // 自定义点聚合样式也可在MarkerClusterer构造函数的第二个参数中加入styles属性，直接将样式写入，如上styles，两种方式都行
    // new BMapLib.markerClusterer.setStyles(myStyles)
  }
  // 浏览器获取当前定位
  const getCurPosition = () => {
    /*global BMAP_STATUS_SUCCESS*/
    return new Promise((resolve, reject) => {
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(
        function (r: any) {
          if (this.getStatus() === BMAP_STATUS_SUCCESS) {
            resolve({ r: r, lng: r.point.lng, lat: r.point.lat })
          } else {
            reject({ msg: '获取定位失败', map: mapRef })
          }
        },
        { enableHighAccuracy: true }
      )
      //关于状态码
      //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
      //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
      //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
      //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
      //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
      //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
      //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
      //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
      //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
    })
  }
  // 添加工具条和比例尺
  const controllerTools = () => {
    /*global BMAP_ANCHOR_BOTTOM_RIGHT BMAP_NAVIGATION_CONTROL_LARGE*/
    const top_left_navigation = new BMap.NavigationControl({
      // 靠左上角位置
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
      // LARGE类型
      type: BMAP_NAVIGATION_CONTROL_LARGE,
      // 启用显示定位
      // enableGeolocation: true
    })
    //添加控件和比例尺
    mapRef.addControl(top_left_navigation)
  }
  // 返回地图中心点（当前定位点）
  const backToMapCenter = () => {
    mapRef.panTo(currentPositionPointsObj)
  }
  // 画圆
  const drawCircle = (
    radius = 5000,
    circleConfig = {
      strokeColor: '#f0f',
      fillColor: '#00f',
      strokeWeight: 1,
      strokeOpacity: 0.7,
      fillOpacity: 0.2,
      strokeStyle: 'dashed'
    }
  ) => {
    const BmapCircle = new BMap.Circle(currentPositionPointsObj, radius, circleConfig)
    mapRef.addOverlay(BmapCircle)
    // 根据地图上的所有点位置把地图的放大级别调整到合适级别
    // mapRef.setViewport(currentPositionPointsObj)
  }

  return <div className="bmap-wrapper">
    <div id="bmap-container" />
    <div title="点击聚焦当前点" className="backCenter-BMap" onClick={() => { backToMapCenter() }} />
  </div>
}