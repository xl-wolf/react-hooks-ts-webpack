export const drawCanvas = (domId: string) => {
  const dom = document.getElementById(domId);
  dom.appendChild(canvas);
  dom.style.backgroundColor = "#000";
  fitCanvasSize();
  density();
  update();
};
export const clearFunc = () => {
  timeoutId && clearTimeout(timeoutId);
};
const canvas = document.createElement("canvas");
(() => {
  if (typeof canvas.getContext === "undefined") {
    return console.log("canvas is invalid!");
  }
})();
const ctx = canvas.getContext("2d");

function fitCanvasSize() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

window.onresize = fitCanvasSize;

var balls: any = [];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Ball: any = function () {
  this.r = rand(10, 18);
  this.x = rand(0 + this.r, canvas.width - this.r);
  this.y = rand(0 + this.r, canvas.height - this.r);
  this.vx = rand(-3, 3);
  this.vy = rand(-3, 3);
  this.opacity = Math.random();
  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    var color = ctx.createRadialGradient(
      this.x,
      this.y,
      this.r * 0.7,
      this.x,
      this.y,
      this.r
    );
    color.addColorStop(0.7, "#fffbff");
    color.addColorStop(1, "#2effff");
    ctx.shadowColor = "#2effff";
    ctx.shadowBlur = this.r * 1.6;
    ctx.fillStyle = color;
    ctx.globalAlpha = this.opacity;
    ctx.closePath();
    ctx.fill();
  };
  this.move = function () {
    if (this.x + this.r > canvas.width || this.x - this.r < 0) {
      this.vx *= -1;
    }
    if (this.y + this.r > canvas.height || this.y - this.r < 0) {
      this.vy *= -1;
    }
    this.x += this.vx;
    this.y += this.vy;
  };
};

function density() {
  var i;
  for (i = 0; i < 100; i++) {
    balls.push(new Ball());
  }
}

let timeoutId: any = null;
function update() {
  var i;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < 100; i++) {
    balls[i].draw();
    balls[i].move();
  }
  clearFunc();
  timeoutId = setTimeout(() => {
    update();
  }, 30);
}
