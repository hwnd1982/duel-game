import { Hero, Cursor, GameStatus } from "../../entities";
import { debounce } from "../../shared";

export class GameConrtoller {
  heroies: Hero[] = [];
  cursor: Cursor | null = null;
  context: CanvasRenderingContext2D | null = null;

  size: {
    width: number;
    height: number;
  } = {
    width: innerWidth,
    height: innerHeight,
  };

  status: GameStatus = "stop";

  setHitsCounters(incs: (() => void)[]) {
    this.heroies.forEach((hero, i) => hero.setIncHitsCounter(incs[i]));
  }

  init(context: CanvasRenderingContext2D) {
    if (this.context) return;

    this.context = context;

    this.cursor = new Cursor(context);
    this.heroies = [
      new Hero({ side: "left", y: 10, radius: 50, color: "#30C032", cursor: this.cursor }),
      new Hero({ side: "right", y: innerHeight - 110, radius: 50, color: "#8f6ed5", cursor: this.cursor }),
    ];

    this.renderer();
  }

  setSize(size: { width: number; height: number }) {
    this.size = size;
  }

  draw() {
    if (!this.context) return;

    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.beginPath();
    this.context.fillStyle = "#2394F2";
    this.cursor!.draw(this.context);
    this.heroies.forEach(hero => hero.draw(this.context));
  }

  renderer() {
    if (!this.context) return;

    this.draw();
    this.heroies.forEach(hero => {
      if (this.status === "play") {
        hero.step(this.context);
      }
      hero.draw(this.context);
    });

    requestAnimationFrame(() => this.renderer());
  }

  resize = debounce(() => {
    this.heroies.forEach(hero => hero.setX());
    this.setSize({ width: innerWidth, height: innerHeight });
  }, 100);

  play() {
    this.status = "play";
  }

  pause() {
    this.status = "pause";
  }
}
