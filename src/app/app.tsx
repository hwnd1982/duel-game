import { useEffect, useRef, useState } from 'react'
import { Canvas, Portal } from '../components'
import s from './app.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from './store';

export const App = () => {
  const ref = useRef(null);
  const [hitsLeftHero, setHitsLeftHero] = useState(0);
  const [hitsRightHero, setHitsRightHero] = useState(0);
  const incHitsLeftHero = () => setHitsLeftHero(hitsLeftHero + 1);
  const incHitsRightHero = () => setHitsRightHero(hitsRightHero + 1);
  const game = useSelector((state: RootState) => state.game);

  useEffect(() => {
    game.controller.setHitsCounters([incHitsLeftHero, incHitsRightHero]);
  });

  return (
    <>
      <div className={s.status}>
        <p className={s.counter}>{hitsLeftHero}</p>
        <p className={s.counter}>{hitsRightHero}</p>
      </div>
      <Canvas ref={ref} />
      <Portal />
    </>
  )
}

export default App;
