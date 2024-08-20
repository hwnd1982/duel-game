import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { hexToRGB, RGBToHex } from '../../../../shared';
import { setFireballColor } from '../../../../entities';
import { RootState } from '../../../../app';
import s from '../ui.module.scss';

export const FireballColorRange = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.game);
  const [fireballColor, setFColor] = useState(hexToRGB(game.settingsHero?.fireballColor || '#ffffff'));

  useEffect(() => {
    dispatch(setFireballColor(RGBToHex(fireballColor)));
  }, [fireballColor, dispatch]);

  useEffect(() => {
    setFColor(hexToRGB(game.settingsHero?.fireballColor || '#ffffff'));
  }, [game.settingsHero]);

  return (
    <div className={s.row}>
      <p className={s.value}>
        <span>{`Цвет заклинания:`}</span>
        <span className={s.color} style={{backgroundColor: RGBToHex(fireballColor)}}></span>
      </p>
      <div className={s.value}>
        <span className={s.color} style={{backgroundColor: `#${(+fireballColor.r).toString(16).padStart(2, "0")}0000`}}></span>
        <input className={s.input} type="range" min={0} max={255} value={fireballColor.r} onChange={({target}) => setFColor({...fireballColor, r: target.value})} />
      </div>
      <div className={s.value}>
        <span className={s.color} style={{backgroundColor: `#00${(+fireballColor.g).toString(16).padStart(2, "0")}00`}}></span>
        <input className={s.input} type="range" min={0} max={255} value={fireballColor.g} onChange={({target}) => setFColor({...fireballColor, g: target.value})} />
      </div>
      <div className={s.value}>
        <span className={s.color} style={{backgroundColor: `#0000${(+fireballColor.b).toString(16).padStart(2, "0")}`}}></span>
        <input className={s.input} type="range" min={0} max={255} value={fireballColor.b} onChange={({target}) => setFColor({...fireballColor, b: target.value})} />
      </div>
    </div>
  )
}