import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app';
import s from './portal.module.scss';
import { closeSettings } from '../../entities';

export const Portal = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.game);

  return createPortal(
  <>{
    !!game.settingsHero &&
    
    <div className={s.portal}>
      <div className={s.overlay} onClick={() => dispatch(closeSettings())}></div>
      <div className={s.modal}>
        <p className={s.value}><span>Цвет:</span> {game.settingsHero.color}</p>
        <p className={s.value}><span>Скорость:</span> {game.settingsHero.speed}</p>
      </div>
    </div>
    
  }</>, document.body);
}
