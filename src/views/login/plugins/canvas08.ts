// CLASSES
class Shard {
  [x: string]: any;
  constructor(x: any, y: any, hue: any) {
    this.x = x;
    this.y = y;
    this.hue = hue;
    this.lightness = 50;
    this.size = 15 + Math.random() * 10;
    const angle = Math.random() * 2 * Math.PI;
    const blastSpeed = 1 + Math.random() * 6;
    this.xSpeed = Math.cos(angle) * blastSpeed;
    this.ySpeed = Math.sin(angle) * blastSpeed;
    this.target = getTarget();
    this.ttl = 100;
    this.timer = 0;
  }
  draw() {
    canvasCtx.fillStyle = `hsl(${this.hue}, 100%, ${this.lightness}%)`;
    canvasCtx.beginPath();
    canvasCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    canvasCtx.closePath();
    canvasCtx.fill();
  }
  update() {
    if (this.target) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const a = Math.atan2(dy, dx);
      const tx = Math.cos(a) * 5;
      const ty = Math.sin(a) * 5;
      this.size = lerp(this.size, 1.5, 0.05);

      if (dist < 5) {
        this.lightness = lerp(this.lightness, 100, 0.01);
        this.xSpeed = this.ySpeed = 0;
        this.x = lerp(this.x, this.target.x + fidelity / 2, 0.05);
        this.y = lerp(this.y, this.target.y + fidelity / 2, 0.05);
        this.timer += 1;
      } else if (dist < 10) {
        this.lightness = lerp(this.lightness, 100, 0.01);
        this.xSpeed = lerp(this.xSpeed, tx, 0.1);
        this.ySpeed = lerp(this.ySpeed, ty, 0.1);
        this.timer += 1;
      } else {
        this.xSpeed = lerp(this.xSpeed, tx, 0.02);
        this.ySpeed = lerp(this.ySpeed, ty, 0.02);
      }
    } else {
      this.ySpeed += 0.05;
      //this.xSpeed = lerp(this.xSpeed, 0, 0.1);
      this.size = lerp(this.size, 1, 0.05);

      if (this.y > canvas.height) {
        shards.forEach((shard: any, idx: any) => {
          if (shard === this) {
            shards.splice(idx, 1);
          }
        });
      }
    }
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
  }
}

class Rocket {
  [x: string]: any;
  constructor() {
    const quarterW = canvas.width / 4;
    this.x = quarterW + Math.random() * (canvas.width - quarterW);
    this.y = canvas.height - 15;
    this.angle = (Math.random() * Math.PI) / 4 - Math.PI / 6;
    this.blastSpeed = 6 + Math.random() * 7;
    this.shardCount = 15 + Math.floor(Math.random() * 15);
    this.xSpeed = Math.sin(this.angle) * this.blastSpeed;
    this.ySpeed = -Math.cos(this.angle) * this.blastSpeed;
    this.hue = Math.floor(Math.random() * 360);
    this.trail = [];
  }
  draw() {
    canvasCtx.save();
    canvasCtx.translate(this.x, this.y);
    canvasCtx.rotate(Math.atan2(this.ySpeed, this.xSpeed) + Math.PI / 2);
    canvasCtx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
    canvasCtx.fillRect(0, 0, 5, 15);
    canvasCtx.restore();
  }
  update() {
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
    this.ySpeed += 0.1;
  }

  explode() {
    for (let i = 0; i < 70; i++) {
      shards.push(new Shard(this.x, this.y, this.hue));
    }
  }
}

// INITIALIZATION
const canvas = document.createElement("canvas");
function setSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setSize();
const canvasCtx = canvas.getContext("2d");
let fontSize = 200;
const rockets: any = [];
const shards: any = [];
const targets: any = [];
const fidelity = 3;
let counter = 0;
let textWidth = 99999999;

// ANIMATION LOOP
let animationFrameId: any = null;
function loop() {
  canvasCtx.fillStyle = "rgba(0, 0, 0, .1)";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  counter += 1;

  if (counter % 15 === 0) {
    rockets.push(new Rocket());
  }
  rockets.forEach((r: any, i: any) => {
    r.draw();
    r.update();
    if (r.ySpeed > 0) {
      r.explode();
      rockets.splice(i, 1);
    }
  });

  shards.forEach((s: any, i: any) => {
    s.draw();
    s.update();

    if (s.timer >= s.ttl || s.lightness >= 99) {
      shards.splice(i, 1);
    }
  });
  clearFunc();
  animationFrameId = requestAnimationFrame(loop);
}
export const drawCanvas = (domId: string) => {
  const dom = document.getElementById(domId);
  dom.appendChild(canvas);
  dom.style.backgroundColor = "#000";
  loop();
};
export const clearFunc = () => {
  animationFrameId && cancelAnimationFrame(animationFrameId);
};
window.addEventListener("resize", () => {
  setSize();
});
// HELPER FUNCTIONS
const lerp = (a: any, b: any, t: any) =>
  Math.abs(b - a) > 0.1 ? a + t * (b - a) : b;

function getTarget() {
  if (targets.length > 0) {
    const idx = Math.floor(Math.random() * targets.length);
    let { x, y } = targets[idx];
    targets.splice(idx, 1);

    x += canvas.width / 2 - textWidth / 2;
    y += canvas.height / 2 - fontSize / 2;

    return { x, y };
  }
}
