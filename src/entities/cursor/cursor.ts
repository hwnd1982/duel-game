import { Hero } from "../hero";

export class Cursor {
  x: number;
  y: number;
  width: number;
  height: number;
  heroies: Hero[] = [];

  constructor(context: CanvasRenderingContext2D) {
    this.x = innerWidth / 2;
    this.y = innerHeight / 2;
    this.width = 100;
    this.height = 20;

    this.init(context);
  }

  init(context: CanvasRenderingContext2D) {
    context.canvas?.addEventListener("mousemove", (e: MouseEvent) => {
      this.y = e.y;
      this.x = e.x;

      this.heroies.forEach(hero => {
        if (hero.crossX(this) && hero.crossY(this)) {
          hero.highlighting = true;

          switch (hero.side) {
            case "left":
              this.x = hero.x + hero.radius * 2 + this.width / 2 + 5;
              break;
            case "right":
              this.x = hero.x - hero.radius * 2 + this.width / 2 - 5;
              break;
          }
        } else {
          hero.highlighting = false;
        }
      });
    });

    this.draw(context);
  }

  draw(context: CanvasRenderingContext2D) {
    context.moveTo(this.x - this.width / 2, this.y - this.height / 2);
    context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  set hero(hero: Hero) {
    this.heroies.push(hero);
  }
}
