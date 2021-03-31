export const drawCanvas = (domId: string) => {
  const dom = document.getElementById(domId);
  dom.appendChild(canvas);
  dom.style.backgroundColor = "#000";
  render();
};
export const clearFunc = () => {
  animationFrameId && cancelAnimationFrame(animationFrameId);
};
var canvas: any = document.createElement("canvas");

(function () {
  if (!canvas || !canvas.getContext) {
    return console.log('canvas is invalid!');
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
var mouseX = null;
var mouseY = null;
// spark
var rad = (Math.PI * 2) / 8;
var sparks: any = [];
var sparkNum = 800;
var time = 0;
var color = "hsl(" + Math.sin((time * Math.PI) / 180) * 360 + ", 80%, 60%)";

/********************
    Animation
********************/

window.requestAnimationFrame =
  window.requestAnimationFrame || window.webkitRequestAnimationFrame;

/********************
    Stick
********************/

function stickDraw(xPosi:number) {
  ctx.save();
  ctx.lineWidth = 4;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(X * xPosi, 0);
  ctx.lineTo(X * xPosi, Y / 2);
  ctx.stroke();
  ctx.restore();
}

/********************
    Fire Ball
********************/

var fireBallNum = 1;
var fireBalls: any = [];

const FireBall: any = function (ctx: any, x: any, y: any) {
  this.ctx = ctx;
  this.init(x, y);
};

FireBall.prototype.init = function (x: any, y: any) {
  this.x = x;
  this.y = y;
  this.r = 10;
  this.ga = Math.random();
  this.flg = false;
  this.v = {
    y: 1,
  };
};

FireBall.prototype.draw = function () {
  var ctx = this.ctx;
  ctx.save();
  ctx.globalAlpha = this.ga;
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = color;
  for (var i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, rand(5, 10), 0, Math.PI * 2, false);
    ctx.fill();
  }
  ctx.restore();
};

FireBall.prototype.fall = function (i: number) {
  if (this.y > Y - this.r) {
    this.y = Y - this.r;
    this.v.y *= -1.1;
    this.flg = true;
  } else {
    this.v.y += 0.05;
    this.y += this.v.y;
  }
  if (this.y < Y / 2 && this.flg === true) {
    this.y = Y / 2;
    this.v.y = 1;
    for (var i = 0; i < sparkNum; i++) {
      var s1 = new Spark(ctx, X / 4, Y / 2, 0);
      var s2 = new Spark(ctx, X / 4*3, Y / 2, 0);
      sparks.push(s1,s2);
    }
  }
};

FireBall.prototype.render = function (i: any) {
  if (sparks.length === 0) {
    this.fall(i);
  } else {
    this.signal = false;
  }
  this.draw();
};

for (var i = 0; i < fireBallNum; i++) {
  var f1 = new FireBall(ctx, X / 4, Y / 2);
  var f2 = new FireBall(ctx, X / 4*3, Y / 2);
  fireBalls.push(f1,f2);
}

/********************
    Spark
********************/

const Spark: any = function (ctx: any, x: any, y: any, cl: any) {
  this.ctx = ctx;
  this.init(x, y, cl);
};

Spark.prototype.init = function (x: any, y: any, cl: any) {
  this.x = x;
  this.y = y;
  this.cl = cl;
  this.r = rand(5, 40);
  Math.random() < 0.8 ? (this.l = rand(0, 50)) : (this.l = rand(100, 150));
  this.ga = Math.random() * Math.random();
  this.v = {
    x: Math.cos((rand(0, 360) * Math.PI) / 180) * Math.random() * 8,
    y: Math.sin((rand(0, 360) * Math.PI) / 180) * Math.random() * 6,
  };
};

Spark.prototype.draw = function () {
  var ctx = this.ctx;
  ctx.save();
  ctx.globalAlpha = this.ga;
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = color;
  for (var i = 1; i < 9; i++) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      Math.cos(rad * i) * this.r + this.x,
      Math.sin(rad * i) * this.r + this.y
    );
    ctx.stroke();
  }
  ctx.restore();
};

Spark.prototype.updateParams = function (i: any) {
  // life
  this.l -= 1;
  if (this.l < 0) {
    this.cl++;
    this.init(X / 4, Y / 2, this.cl);
  }
  if (this.cl > 10) {
    sparks.splice(i - 1, 1);
  }
};

Spark.prototype.updatePosition = function () {
  this.v.y += 0.05;
  this.x += this.v.x;
  this.y += this.v.y;
};

Spark.prototype.render = function (i: any) {
  this.updateParams(1);
  this.updatePosition();
  this.draw();
};

for (var i = 0; i < sparkNum; i++) {
  var s1 = new Spark(ctx, X / 4, Y / 2, 0);
  var s2 = new Spark(ctx, X / 4*3, Y / 2, 0);
  sparks.push(s1,s2);
}

/********************
    Render
********************/
let animationFrameId: number = null;
function render() {
  ctx.clearRect(0, 0, X, Y);
  stickDraw(1/4);
  stickDraw(3/4);
  time += 0.1;
  color = "hsl(" + Math.sin((time * Math.PI) / 180) * 360 + ", 80%, 60%)";
  for (var i = 0; i < fireBalls.length; i++) {
    fireBalls[i].render(i);
  }
  for (var i = 0; i < sparks.length; i++) {
    sparks[i].render(i);
  }
  
  clearFunc()
  animationFrameId = requestAnimationFrame(render);
}

/********************
        Event
      ********************/

function onResize() {
  X = canvas.width = window.innerWidth;
  Y = canvas.height = window.innerHeight;
  fireBalls = [];
  sparks = [];
  for (var i = 0; i < sparkNum; i++) {
    var s1 = new Spark(ctx, X / 4, Y / 2, 0);
    var s2 = new Spark(ctx, X / 4*3, Y / 2, 0);
    sparks.push(s1,s2);
  }
  for (var i = 0; i < fireBallNum; i++) {
    var f1 = new FireBall(ctx, X / 4, Y / 2);
    var f2 = new FireBall(ctx, X / 4*3, Y / 2);
    fireBalls.push(f1,f2);
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
