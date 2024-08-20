import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app';
import s from './portal.module.scss';
import { closeSettings } from '../../entities';
import { FireballColorRange, FireballRateRange, HeroColorRange, HeroSpeedRange } from './ui';

export const Portal = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.game);

  return createPortal(<> {
    !!game.settingsHero &&  
    <div className={s.portal}>
      <div className={s.overlay} onClick={() => dispatch(closeSettings())}></div>
      <div className={s.modal}>
        <button type="button" className={s.close} onClick={() => dispatch(closeSettings())}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 378.303 378.303">
            <polygon fill='#dbdbdb' points="378.303,28.285 350.018,0 189.151,160.867 28.285,0 0,28.285 160.867,189.151 0,350.018   28.285,378.302 189.151,217.436 350.018,378.302 378.303,350.018 217.436,189.151 "/>
          </svg>
        </button>
        <HeroColorRange />
        <HeroSpeedRange />

        <FireballColorRange />
        <FireballRateRange />
      </div>
    </div>
  } </>, document.body);
}
