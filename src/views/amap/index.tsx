/* eslint-disable @typescript-eslint/no-invalid-this */
/* global AMap */
import React,{ useEffect, useState } from "react"
import { asyncAMapLoader } from '@/utils/index'
import {
  // style1, 
  style2,
  //  style3
} from './mapStyles'
import './index.less'

export default () => {
  let [mapRef, setmapRef] = useState(null)
  let [currentPosition, setcurrentPosition] = useState([118.10388605, 24.48923061])
  let [currentMarkersArray, setcurrentMarkersArray] = useState([])
  let [circle, setcircle] = useState(null)
  useEffect(() => {
    asyncAMapLoader().then(res => {
      console.log(res)
      initMap()
    })
    return () => { }
  }, [])

  const initMap = async () => {

    // 实例化一个高德地图并取得引用
    mapRef = new AMap.Map('amap-container', {
      resizeEnable: true,
      zoom: 12,
      center: currentPosition,
      pitch: 45, // 地图俯仰角度，有效范围 0 度- 83 度
      viewMode: '3D', // 地图模式
      mapStyle: style2 // 自定义地图样式，需要线上定制发布后使用
    })
    // 浏览器获取当前定位
    const cur:any = await getCurrentPosition()
    console.log(cur)
    if (cur) {
      const { position: { lng, lat } } = cur
      setcurrentPosition(currentPosition = [lng, lat])
    }
    // 添加点标记
    const icon = new AMap.Icon({
      size: new AMap.Size(48, 48),
      image: require('./images/red.png').default, // 自定义icon
      imageSize: new AMap.Size(48, 48),
      imageOffset: new AMap.Pixel(0, 0)
    })
    const mk = addAMapMarker(icon, currentPosition, true)
    // 画圆
    const circleOpt = {
      map: mapRef,
      center: currentPosition,
      radius: 100,
      strokeColor: '#0ff',
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: '#f2f',
      fillOpacity: 0.7,
      strokeStyle: 'dashed'
    }
    drawCircle(circleOpt)

    mk.on('click', function (e: any) {
      const position = e.lnglat
      console.log(this, position, e)
      const contentInfo = `拖动当前点获取商机点信息`
      const content = `<div>${contentInfo}</div>`
      const infoWindowOpts = {
        // isCustom: true, //使用自定义窗体
        content: content,
        offset: new AMap.Pixel(0, -4)
      }
      const infoWinRef = addAMapInfoWindow(infoWindowOpts)
      infoWinRef.open(mapRef, position)
    })
    mk.on('dragend', function (e: any) {
      // console.log(e)
      // 移除信息窗口
      removeAMapInfoWindow()
      // 对当前地图定位点重新赋值
      setcurrentPosition(currentPosition = [e['lnglat'].lng, e['lnglat'].lat])
      // 移动定位点至当前地图中心
      mapRef.panTo(currentPosition)
      // 移除地图上除定位点外的其他点
      removeAMapMarker(currentMarkersArray)
      // 随机添加10个点标记
      generateNearBy10Markers()
      removeCircle()
      // 画圆
      const circleOpt = {
        map: mapRef,
        center: currentPosition,
        radius: 200,
        strokeColor: '#0ff',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#f2f',
        fillOpacity: 0.7,
        strokeStyle: 'dashed'
      }
      drawCircle(circleOpt)
    })
    // 随机添加10个点标记
    generateNearBy10Markers()
    // 添加点聚合
    // addAMapMarkerClusterer()
    // 添加旋转、倾斜、复位、缩放在内的地图控件
    addAMapCtrl()
    setmapRef(mapRef)
  }
  // 添加点聚合
  const addAMapMarkerClusterer = () => {
    let markers: any = [];
      let mk = null
    for (let i = 0; i < 2000; i += 1) {
      const icon = new AMap.Icon({
        size: new AMap.Size(20, 20),
        image: require('./images/blue.png').default, // 自定义icon
        imageSize: new AMap.Size(20, 20),
        imageOffset: new AMap.Pixel(0, 0)
      })
      const position = [
        currentPosition[0] + (Math.random() - 0.5) * 0.08,
        currentPosition[1] + (Math.random() - 0.5) * 0.08
      ]
      mk = addAMapMarker(icon, position)
      markers.push(mk)
    }
    // es6 module 规范引入
    import('./clustererStylesES6').then(clustererStylesES6 => {
      const styles = clustererStylesES6.default
      // eslint-disable-next-line no-new
      new AMap.MarkerClusterer(mapRef, markers, { gridSize: 80, styles })
    })
    // commonjs规范引入
    // const styles = require('./clustererStylesCommonJS')
    // new AMap.MarkerClusterer(this.state.mapRef, markers, { gridSize: 80, styles })
  }
  // 浏览器获取当前定位
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 20000, // 超过10秒后停止定位，默认：5s
        buttonPosition: 'RB', // 定位按钮的停靠位置
        markerOptions: null,
        // markerOptions: {
        //   //自定义定位点样式，同Marker的Options
        //   offset: new AMap.Pixel(-18, -36),
        //   content:
        //     '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
        // },
        buttonOffset: new AMap.Pixel(10, 10), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点
      })
      mapRef.addControl(geolocation)
      geolocation.getCurrentPosition(function (status: any, result: any) {
        if (status === 'complete') {
          console.log(result, 'success')
          resolve(result)
        } else {
          console.log(result, 'fail')
          reject(result)
        }
      })
    })
  }
  // 添加旋转、倾斜、复位、缩放在内的地图控件
  const addAMapCtrl = () => {
    const CtrlBarOpt = {
      position: { top: '10px', right: '10px' }
    }
    const controlBar = new AMap.ControlBar(CtrlBarOpt)
    mapRef.addControl(controlBar)
  }
  // 随机生成当前位置旁边的10个点标记-->后期的ajax请求
  const generateNearBy10Markers = () => {
    for (let i = 0; i < 10; i++) {
      const icon = new AMap.Icon({
        size: new AMap.Size(20, 20),
        image: require('./images/blue.png').default, // 自定义icon
        imageSize: new AMap.Size(20, 20),
        imageOffset: new AMap.Pixel(0, 0)
      })
      const position = [
        currentPosition[0] + (Math.random() - 0.5) * 0.002,
        currentPosition[1] + (Math.random() - 0.5) * 0.002
      ]
      const marker = addAMapMarker(icon, position)
      marker.dataId = i + 'dataId'
      currentMarkersArray.push(marker)
      marker.on('click', function () {
        // console.log(this)
        const { position } = marker.Ce
        // console.log(this, position)
        marker.contentInfo = `建行厦门科技支行${marker.dataId}`
        const content = `<div style='cursor:pointer;' id=${marker.dataId}>${marker.contentInfo}</div>`
        const infoWindowOpts = {
          // isCustom: true, //使用自定义窗体
          content: content,
          offset: new AMap.Pixel(0, -24)
        }
        const infoWinRef = addAMapInfoWindow(infoWindowOpts)
        infoWinRef.on('open', () => {
          // 需要等到 infoWinRef.open 方法执行后地图上已经存在该dom才可获取 否则获取不到报错 所以才需要异步操作
          setTimeout(() => {
            // eslint-disable-next-line max-nested-callbacks
            document.getElementById(infoWinRef.dataId).addEventListener('click', () => {
              console.log('infoWinRef.dataId', infoWinRef.dataId)
            })
          }, 500)
        })
        infoWinRef.open(mapRef, position)
      })
    }
  }
  // 添加点标记
  const addAMapMarker = (icon: any, position = currentPosition, draggable = false) => {
    const marker = new AMap.Marker({
      position,
      map: mapRef,
      animation: 'AMAP_ANIMATION_DROP',
      icon: icon,
      draggable
    })
    mapRef.add(marker)
    return marker
  }
  // 移除指定点标记
  const removeAMapMarker = (mk: any) => { mapRef.remove(mk);setcurrentMarkersArray(currentMarkersArray=[]) }
  // 画圆
  const drawCircle = (circleOpt: any) => { setcircle(circle = new AMap.Circle(circleOpt)) }
  // 移除圆
  const removeCircle = () => { circle?.setMap(null) }
  // 添加信息窗口
  const addAMapInfoWindow = (infoWindowOpts: any) => new AMap.InfoWindow(infoWindowOpts)
  // 移除信息窗口
  const removeAMapInfoWindow = () => { mapRef.clearInfoWindow() }
  // 返回地图中心点（当前定位点）
  const backToMapCenter = () => { mapRef.panTo(currentPosition) }

  return (
    <div className="amap-wrapper">
      <div id="amap-container" />
      <div title="点击聚焦当前点" className="backCenter-AMap" onClick={backToMapCenter} />
    </div>
  )
}