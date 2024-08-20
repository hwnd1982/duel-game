import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import s from '../ui.module.scss';
import { RootState } from '../../../../app';
import { setFireballRate } from '../../../../entities';

export const FireballRateRange = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.game);
  const [fireballRate, setFRate] = useState(game.settingsHero?.fireballRate || 1);

  useEffect(() => {
    dispatch(setFireballRate(fireballRate));
  }, [fireballRate, dispatch]);

  useEffect(() => {
    setFRate(game.settingsHero?.fireballRate || 1);
  }, [game.settingsHero])

  return (
    <div className={s.row}>
      <p className={s.value}><span>Частота стрельбы:</span><span>{fireballRate}</span></p>
      <input className={s.input} type="range" min={1} max={10} value={fireballRate} onChange={({target}) => setFRate(+target.value)} />
    </div>
  )
}