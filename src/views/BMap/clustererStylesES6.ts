/*global BMap*/
// const EXAMPLE_URL = 'http://api.map.baidu.com/library/MarkerClusterer/1.2/examples/' //百度地图对外开放固定url
export const styles = [
  {
    url: require('./customerClustererImages/clusterer-36--green.png').default,//EXAMPLE_URL + 'images/heart30.png',
    size: new BMap.Size(36, 36),
    opt_anchor: [16, 0],
    textColor: '#ffffff',
    opt_textSize: 10
  },
  {
    url: require('./customerClustererImages/clusterer-40--blue.png').default,
    size: new BMap.Size(40, 40),
    opt_anchor: [40, 35],
    textColor: '#ff0000',
    opt_textSize: 12
  },
  {
    url: require('./customerClustererImages/clusterer-44--purple.png').default,//EXAMPLE_URL + 'images/heart50.png',
    size: new BMap.Size(44, 44),
    opt_anchor: [32, 0],
    textColor: '#0000ff',
    opt_textSize: 14
  }
]