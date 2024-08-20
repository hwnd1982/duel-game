import { GameConrtoller } from "../game";

export class Fireball {
  x: number;
  y: number;
  color: string;
  radius: number = 10;

  width: number = 20;
  height: number = 20;

  speed: number = 10;
  direction: number;
  explosionDelay: number = 20;

  private conrtoller: GameConrtoller;

  constructor(
    {
      x,
      y,
      radius,
      color,
      speed,
      direction,
    }: {
      x: number;
      y: number;
      color: string;
      radius?: number;
      speed?: number;
      direction: number;
    },
    conrtoller: GameConrtoller
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.direction = direction;
    this.conrtoller = conrtoller;
    if (speed) this.speed = speed;
    if (radius) {
      this.radius = radius;
      this.width = 2 * radius * -direction;
      this.height = 2 * radius;
    }
  }

  draw() {
    this.conrtoller.context!.fillStyle = this.color;
    this.conrtoller.context!.beginPath();
    this.conrtoller.context!.moveTo(this.x + this.radius, this.y);
    this.conrtoller.context!.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
    this.conrtoller.context!.fill();
    this.conrtoller.context!.closePath();
  }

  hit() {
    return this.conrtoller.heroies.find(hero => hero.crossX(this) && hero.crossY(this)) || null;
  }

  distroy() {
    this.conrtoller.fireballs = this.conrtoller.fireballs.filter(fireball => fireball !== this);
  }

  step() {
    const left = this.x <= 10;
    const right = this.x >= this.conrtoller.size.width - 10;
    const hitHero = this.hit();

    if (hitHero && hitHero?.incHitsCounter) {
      hitHero.incHitsCounter();
      hitHero.recoveryDelay = 10;
      this.conrtoller.explosions.push(this);
    }

    if (left || right || hitHero) {
      this.distroy();
    }

    this.x += this.direction * this.speed;

    return this;
  }
}
