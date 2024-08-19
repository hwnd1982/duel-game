import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import s from '../ui.module.scss';
import { RootState } from '../../../../app';
import { setHeroSpeed } from '../../../../entities';

export const HeroSpeedRange = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.game);
  const [speed, setHSpeed] = useState(game.settingsHero?.speed || 1);

  useEffect(() => {
    dispatch(setHeroSpeed(speed));
  }, [speed, dispatch]);

  useEffect(() => {
    setHSpeed(game.settingsHero?.speed || 1);
  }, [game.settingsHero])

  return (
    <div className={s.row}>
      <p className={s.value}><span>Скорость:</span> {speed}</p>
      <input className={s.input} type="range" min={1} max={10} value={speed} onChange={({target}) => setHSpeed(+target.value)} />
    </div>
  )
}