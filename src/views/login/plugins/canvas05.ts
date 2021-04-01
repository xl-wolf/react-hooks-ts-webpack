export const drawCanvas = (domId: string) => {
  const dom = document.getElementById(domId);
  dom.appendChild(canvas);
  dom.style.backgroundColor = "#000";
  render();
};
export const clearFunc = () => {
  animationFrameId && cancelAnimationFrame(animationFrameId);
};
var canvas = document.createElement("canvas");

(function () {
  if (!canvas || !canvas.getContext) {
    return console.log("canvas is invalid!");
  }
})();

/********************
        Random Number
      ********************/

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/********************
        Var
      ********************/

var ctx = canvas.getContext("2d");
var X = (canvas.width = window.innerWidth);
var Y = (canvas.height = window.innerHeight);
var mouseX = X;
var mouseY = Y;
var shapeNum = 1000;
var shapes: any = [];
var startColor = rand(0, 360);
var style = {
  black: "black",
  white: "white",
  lineWidth: 4,
};

if (X < 768) {
  shapeNum = 500;
}

/********************
        Animation
      ********************/

window.requestAnimationFrame =
  window.requestAnimationFrame || window.webkitRequestAnimationFrame;

/********************
        Shape
      ********************/

const Shape: any = function (ctx: any, x: any, y: any, c: any) {
  this.ctx = ctx;
  this.init(x, y, c);
};

Shape.prototype.init = function (x: any, y: any, c: any) {
  this.x = x;
  this.y = y;
  this.c = c;
  this.r = rand(1, 2);
  this.l = rand(0, 100);
  this.sl = this.l;
  this.ga = Math.random();
  this.v = {
    x: rand(-1, 1) * Math.random(),
    y: 0,
  };
};

Shape.prototype.draw = function () {
  var ctx = this.ctx;
  ctx.save();
  ctx.globalAlpha = this.ga;
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = "hsl(" + this.c + ", 80%, 60%)";
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.restore();
};

Shape.prototype.updateParams = function () {
  var ratio = (this.l / this.sl) * 1.1;
  this.r *= ratio;
  this.x += this.v.x;
  this.v.y = Y / 2 - this.y;
  this.y += this.v.y / 30;
  this.l -= 1;
  if (this.l < 0) {
    this.c += 10;
    this.init(rand(0, X), (Y / 2) * Math.random(), this.c);
  }
};

Shape.prototype.render = function (i: any) {
  this.updateParams();
  this.draw();
  ctx.translate(0, Y);
  ctx.scale(1, -1);
  this.draw();
};

for (var i = 0; i < shapeNum; i++) {
  var s = new Shape(ctx, rand(0, X), (Y / 2) * Math.random(), startColor);
  shapes.push(s);
}

/********************
        Render
      ********************/
let animationFrameId: any = null;
function render() {
  //ctx.clearRect(0, 0, X, Y);
  ctx.globalCompositeOperation = "darken";
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, X, Y);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  for (var i = 0; i < shapes.length; i++) {
    shapes[i].render(i);
  }
  
  clearFunc()
  animationFrameId = requestAnimationFrame(render);
}

render();

/********************
        Event
      ********************/

function onResize() {
  X = canvas.width = window.innerWidth;
  Y = canvas.height = window.innerHeight;
  if (X < 768) {
    shapeNum = 500;
  } else {
    shapeNum = 1000;
  }
}

window.addEventListener("resize", function () {
  onResize();
});

window.addEventListener(
  "mousemove",
  function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  },
  false
);
