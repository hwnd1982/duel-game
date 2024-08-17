import React, { forwardRef, RefObject, useEffect, useState } from "react";
import s from './canvas.module.scss';

import { RootState } from "../../app";
import { useSelector } from "react-redux";

export type Ref = React.Ref<HTMLCanvasElement>;

export const Canvas = forwardRef<HTMLCanvasElement & {onHitting: (e: CustomEvent) => void}, unknown>((_prors: unknown, ref:Ref) => {
  const game = useSelector((state: RootState) => state.game);
  const [size, setSize] = useState(game.controller.size);

  useEffect(() => {
    if (!(ref as RefObject<HTMLCanvasElement>).current) return;

    const canvas:HTMLCanvasElement | null = (ref as RefObject<HTMLCanvasElement>).current;
    const context = canvas?.getContext('2d');
    const resize = () => {
      setSize({width: innerWidth, height: innerHeight})
      game.controller.resize();
    };

    if (context) {
      game.controller.init(context);
    }

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  });

  return <canvas 
    width={size.width}
    height={size.height}
    className={s.canvas}
    ref={ref}
    onClick={() => game.controller.switch()}
  />
});