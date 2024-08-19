import { Cursor } from "../cursor";

export type HeroProps = {
  y: number;
  radius: number;
  color: string;
  side: "left" | "right";
  cursor: Cursor;
};

export class Hero {
  x: number = 10;
  y: number;
  side: "left" | "right";
  radius: number;
  color: string;
  speed: number = 1;
  highlighting: boolean = false;

  private incHitsCounter: (() => void) | null = null;
  private direction: number = 1;

  private cursor: Cursor;

  constructor({ side, y, radius, color, cursor }: HeroProps) {
    this.y = y;
    this.side = side;
    this.radius = radius;
    this.color = color;
    this.cursor = cursor;
    this.cursor.hero = this;

    this.setX();
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

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) return;

    context.fillStyle = this.color;
    if (this.highlighting) {
      context.strokeStyle = "#2394F2";
    } else {
      context.strokeStyle = this.color;
    }

    context.beginPath();
    context.lineWidth = 5;
    context.moveTo(this.x + this.radius, this.y);
    context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);

    context.stroke();
    context.fill();
    context.closePath();
  }

  crossX({ x, width }: Cursor) {
    return x + width / 2 >= this.x && x - width * 1.5 <= this.x;
  }

  crossY({ y, height }: Cursor) {
    return y + height / 2 >= this.y + 10 && y - height / 2 <= this.y + 2 * this.radius - 10;
  }

  step(context: CanvasRenderingContext2D | null) {
    if (!context) return this;

    const top = this.y + this.direction <= 10;
    const bottom = this.y + this.direction >= context.canvas.height - this.radius * 2 - 10;

    if (top || bottom || (this.crossX(this.cursor) && this.crossY(this.cursor))) {
      this.direction *= -1;
      if (this.incHitsCounter) this.incHitsCounter();
    }

    this.y += this.direction * this.speed;

    return this;
  }
}
