/*global BMap*/
const EXAMPLE_URL = 'http://api.map.baidu.com/library/MarkerClusterer/1.2/examples/' //百度地图对外开放固定url
module.exports = [
  {
    url: EXAMPLE_URL + 'images/heart30.png',
    size: new BMap.Size(30, 26),
    opt_anchor: [16, 0],
    textColor: '#ff00ff',
    opt_textSize: 10
  },
  {
    url: EXAMPLE_URL + 'images/heart40.png',
    size: new BMap.Size(40, 35),
    opt_anchor: [40, 35],
    textColor: '#ff0000',
    opt_textSize: 12
  },
  {
    url: EXAMPLE_URL + 'images/heart50.png',
    size: new BMap.Size(50, 44),
    opt_anchor: [32, 0],
    textColor: '#ffffff',
    opt_textSize: 14
  }
]