import { Hero, Cursor, GameStatus, Fireball } from "../../entities";
import { debounce } from "../../shared";

export class GameConrtoller {
  heroies: Hero[] = [];
  fireballs: Fireball[] = [];
  explosions: Fireball[] = [];
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

    this.cursor = new Cursor(this);
    this.heroies = [
      new Hero({ side: "left", y: 10, radius: 50, color: "#30C032" }, this),
      new Hero({ side: "right", y: innerHeight - 110, radius: 50, color: "#8f6ed5" }, this),
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
    this.cursor!.draw();
    this.heroies.forEach(hero => hero.draw());
  }

  renderer() {
    if (!this.context) return;

    this.draw();
    this.heroies.forEach(hero => {
      if (this.status === "play") {
        hero.step();
      }
      hero.draw();
    });

    this.fireballs.forEach(fireball => {
      if (this.status === "play") {
        fireball.step();
      }
      fireball.draw();
    });

    this.explosions.forEach(fireball => {
      if (this.status === "play") {
        ++fireball.radius;
        --fireball.explosionDelay;
      }
      fireball.draw();
    });

    this.explosions = this.explosions.filter(fireball => fireball.explosionDelay);

    requestAnimationFrame(() => this.renderer());
  }

  resize = debounce(() => {
    this.heroies.forEach(hero => hero.setX());
    this.setSize({ width: innerWidth, height: innerHeight });
  }, 100);

  play() {
    this.status = "play";
    this.heroies.forEach(hero => hero.startFire());
  }

  pause() {
    this.status = "pause";
    this.heroies.forEach(hero => hero.stopFire());
  }

  fire({ x, y, radius, fireballColor, side }: Hero) {
    this.fireballs.push(
      new Fireball(
        {
          x: x + (side === "left" ? 2 * radius + 15 : -15),
          y: y + radius - 5,
          color: fireballColor,
          direction: side === "left" ? 1 : -1,
        },
        this
      )
    );
  }
}
