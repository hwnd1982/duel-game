import { GameConrtoller } from "../game";
import { Hero } from "../hero";

export class Cursor {
  x: number;
  y: number;
  width: number;
  height: number;
  conrtoller: GameConrtoller;

  constructor(conrtoller: GameConrtoller) {
    this.x = innerWidth / 2;
    this.y = innerHeight / 2;
    this.width = 100;
    this.height = 20;
    this.conrtoller = conrtoller;

    this.init();
  }

  init() {
    document.addEventListener("mousemove", (e: MouseEvent) => {
      const portal = (e.target as HTMLElement).closest("#portal");

      this.y = e.y;
      this.x = e.x;

      this.conrtoller.heroies.forEach(hero => {
        if (!portal && hero.crossX(this) && hero.crossY(this) && !hero.isInWay(this)) {
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

    this.draw();
  }

  draw() {
    this.conrtoller.context!.moveTo(this.x - this.width / 2, this.y - this.height / 2);
    this.conrtoller.context!.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  set hero(hero: Hero) {
    this.conrtoller.heroies.push(hero);
  }
}
