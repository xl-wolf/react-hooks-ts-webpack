//获取canvas元素，浏览器窗口宽高
const canvas: any = document.createElement("canvas");
let aRain: any = []; //存放雨滴
let w: any, h: any;

function setSize(dom:any) {
  w = dom.offsetWidth;
  h = dom.offsetHeight;
  canvas.width = w;
  canvas.height = h;
}

//获取能操作画布的对象，可以说是画笔
const canCon = canvas.getContext("2d");
canCon.fillStyle = "aqua"; //设置画笔颜色

//返回最小值到最大值之间的值
function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

//构造函数
const Rain: any = function () {};
//相当于一个雨滴类
Rain.prototype = {
  //初始化雨滴
  init: function () {
    //生成雨滴位置
    this.x = random(0, w); //从0到w
    this.y = 0;
    this.vY = random(4, 5); //每秒下降的距离
    this.h = random(0.8 * h, 0.9 * h); //地板高度
    this.r = 1; //雨滴绽放的初始半径
    this.vr = 1; //雨滴半径扩大的速度
  },
  //画出雨滴
  draw: function () {
    //让雨滴
    if (this.y < this.h) {
      //开始一条路径，可以说是下笔
      canCon.beginPath();
      //设置颜色
      canCon.fillStyle = "aqua";
      //四个参数分别是矩形x,y坐标和宽度高度
      canCon.fillRect(this.x, this.y, 4, 10);
    } else {
      canCon.beginPath();
      canCon.strokeStyle = "aqua";
      canCon.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      canCon.stroke();
    }
  },
  move: function () {
    if (this.y < this.h) {
      this.y += this.vY; //雨滴每秒下降4-5
    } else {
      if (this.r < 80) {
        this.r += this.vr;
      } else {
        this.init();
      }
    }
    this.draw(); //画移动雨滴
  },
};
function createRain(num: number) {
  aRain = [];
  for (let i = 0; i < num; i++) {
    setTimeout(function () {
      const rain = new Rain();
      rain.init();
      rain.draw();
      aRain.push(rain);
    }, 200 * i);
  }
}
let intervalId: any = null;
export const drawCanvas = (domId: string) => {
  const dom = document.getElementById(domId);
  dom.appendChild(canvas);
  dom.style.backgroundColor = "#000";
  createRain(66);
  setSize(dom);
  window.addEventListener("resize", ()=>setSize(dom));
  intervalId = startInterval();
};
export const clearFunc = () => {
  intervalId && clearInterval(intervalId);
};

clearFunc();
function startInterval() {
  return setInterval(function () {
    //加蒙版
    canCon.fillStyle = "rgba(0,0,0,0.05)";
    canCon.fillRect(0, 0, w, h);
    //item指数组的每一个变量
    for (const item of aRain) {
      item.move();
    }
  }, 1000 / 60);
}
