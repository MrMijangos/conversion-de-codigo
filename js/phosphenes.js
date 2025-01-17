Math.TAU = Math.PI * 2;

class Line {
  constructor(args) {
    this.lineWidth = args.radio / 30;
    this.radio = args.radio;
    this.from = args.from;
    this.to = args.from + 0.005; //args.to
  }

  draw(_ctx, _center) {
    _ctx.beginPath();
    _ctx.arc(_center.x, _center.y, this.radio, this.from, this.to, false);
    _ctx.stroke();
  }
}

class Phosphenes {
  constructor(containerId) {
    this.canvas = document.getElementById(containerId);
    this.context = this.canvas.getContext("2d");
    this.totalCircles = 12;
    this.slices = 30;
    this.amount = 1 / this.totalCircles;
    this.pos = { x: 0, y: 0 };
    this.deface = 2;
    this.resize();
    this.setup();
    this.animate();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.corner = { x: this.canvas.width, y: this.canvas.height };
    this.center = { x: this.corner.x / 2, y: this.corner.y / 2 };
    this.maxRadio = Math.hypot(this.center.x, this.center.y);
  }

  setup() {
    this.lines = [];
    this.sliceRadio = this.maxRadio / this.totalCircles;
    let anglePerSlice = Math.TAU / this.slices;
    for (let angle = anglePerSlice; angle < Math.TAU; angle += anglePerSlice) {
      let line = new Line({
        from: angle,
        to: angle + anglePerSlice,
        radio: this.maxRadio
      });
      this.lines.push(line);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.render();
  }

  render() {
    let time = new Date().getTime() * 0.001;
    this.deface = Math.sin(time) * 200;
    this.context.fillStyle = "rgba(0,0,0,0.1)";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.lineWidth = 15;
    this.context.lineCap = "round";
    for (let i = 0; i < this.totalCircles; i++) {
      let scale = i * this.amount;
      this.context.save();
      this.context.translate(this.center.x, this.center.y);
      this.context.rotate(Math.sin(time / i));
      this.context.scale(scale, scale);
      for (let j = 0; j < this.lines.length; j++) {
        this.pos.x = Math.cos(time + i - j) * this.deface;
        this.pos.y = Math.sin(time + i - j) * this.deface;
        this.lines[j].draw(this.context, this.pos);
        this.context.strokeStyle = `rgb(${Math.abs(Math.cos(time + i - j) * 255)},${Math.abs(Math.sin(time + i - j) * 255)},0)`;
        this.context.stroke();
      }
      this.context.restore();
    }
  }
}

new Phosphenes("phosphenes");
