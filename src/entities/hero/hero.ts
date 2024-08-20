import { Cursor } from "../cursor";
import { Fireball } from "../fireball";
import { GameConrtoller } from "../game";

export type HeroProps = {
  y: number;
  radius?: number;
  color: string;
  side: "left" | "right";
};

export class Hero {
  x: number = 10;
  y: number;
  side: "left" | "right";
  radius: number = 50;
  color: string;
  speed: number = 1;
  fireballRate: number = 1;
  fireballColor: string;
  highlighting: boolean = false;
  recoveryDelay: number = 0;

  incHitsCounter: (() => void) | null = null;

  private direction: number = 1;
  private conrtoller: GameConrtoller;
  private fireDelay: number | null = null;

  constructor({ side, y, radius, color }: HeroProps, conrtoller: GameConrtoller) {
    this.y = y;
    this.side = side;
    this.color = color;
    this.conrtoller = conrtoller;
    this.fireballColor = color;

    if (radius) this.radius = radius;
    this.conrtoller.cursor!.hero = this;

    this.setX();
  }

  startFire() {
    const fire = () => {
      this.conrtoller.fire(this);
      if (this.fireDelay) clearTimeout(this.fireDelay);
      this.fireDelay = null;
    };

    if (this.fireDelay) return;

    this.fireDelay = setTimeout(fire, 1400 - 100 * this.fireballRate);
  }

  stopFire() {
    if (!this.fireDelay) return;

    clearTimeout(this.fireDelay);
    this.fireDelay = null;
  }

  setIncHitsCounter(inc: () => void) {
    this.incHitsCounter = inc;
  }

  setX() {
    switch (this.side) {
      case "left":
        this.x = 10;
        break;
      case "right":
        this.x = innerWidth - this.radius * 2 - 10;
        break;
    }
  }

  setSpeed(value: number) {
    this.speed = value;
  }

  setColor(value: string) {
    this.color = value;
  }

  setFireballColor(value: string) {
    this.fireballColor = value;
  }

  setFireballRate(value: number) {
    this.fireballRate = value;
  }

  draw() {
    this.conrtoller.context!.fillStyle = this.color;
    if (this.highlighting) {
      this.conrtoller.context!.strokeStyle = "#2394F2";
    } else {
      this.conrtoller.context!.strokeStyle = this.color;
    }

    this.conrtoller.context!.beginPath();
    this.conrtoller.context!.lineWidth = 5;
    this.conrtoller.context!.moveTo(this.x + this.radius, this.y);
    this.conrtoller.context!.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);

    this.conrtoller.context!.stroke();
    this.conrtoller.context!.fill();
    this.conrtoller.context!.closePath();
  }

  crossX({ x, width }: Cursor | Fireball) {
    return x + width >= this.x + this.radius && x - width <= this.x + this.radius;
  }

  crossY({ y, height }: Cursor | Fireball) {
    return (
      y + height / 2 >= this.y + (this.speed + height / 2) &&
      y - height / 2 <= this.y + 2 * this.radius - (this.speed + height / 2)
    );
  }

  isInWay(cursor: Cursor) {
    return (
      this.crossX(cursor) &&
      ((this.direction === -1 && cursor.y + cursor.height / 2 <= this.y + (this.speed + cursor.height)) ||
        (this.direction === 1 &&
          cursor.y - cursor.height / 2 >= this.y + 2 * this.radius - (this.speed + cursor.height)))
    );
  }

  step() {
    const top = this.y + this.direction <= 10;
    const bottom =
      this.y + this.direction >= this.conrtoller.context!.canvas.height - this.radius * 2 - (this.speed + 5);

    if (
      top ||
      bottom ||
      (this.crossX(this.conrtoller.cursor!) &&
        this.crossY(this.conrtoller.cursor!) &&
        this.isInWay(this.conrtoller.cursor!))
    ) {
      this.direction *= -1;
    }

    if (this.recoveryDelay) {
      this.recoveryDelay--;
    } else {
      this.y += this.direction * this.speed;
      this.startFire();
    }

    return this;
  }
}
