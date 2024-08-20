import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { hexToRGB, RGBToHex } from '../../../../shared';
import { setHeroColor } from '../../../../entities';
import { RootState } from '../../../../app';
import s from '../ui.module.scss';

export const HeroColorRange = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.game);
  const [heroColor, setHColor] = useState(hexToRGB(game.settingsHero?.color || '#ffffff'));

  useEffect(() => {
    dispatch(setHeroColor(RGBToHex(heroColor)));
  }, [heroColor, dispatch]);

  useEffect(() => {
    setHColor(hexToRGB(game.settingsHero?.color || '#ffffff'));
  }, [game.settingsHero]);


  return (
    <div className={s.row}>
      <p className={s.value}>
        {
          game.settingsHero?.side === "left" &&
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
            <path d="M15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711L10.4142 12L15.7071 17.2929C16.0976 17.6834 16.0976 18.3166 15.7071 18.7071C15.3165 19.0976 14.6834 19.0976 14.2929 18.7071L8.46963 12.8839C7.98148 12.3957 7.98148 11.6043 8.46963 11.1161L14.2929 5.29289C14.6834 4.90237 15.3165 4.90237 15.7071 5.29289Z" fill={RGBToHex(heroColor)}/>
          </svg>
        }
        {
          game.settingsHero?.side === "right" &&
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
            <path xmlns="http://www.w3.org/2000/svg" d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.5303 11.1161C16.0185 11.6043 16.0185 12.3957 15.5303 12.8839L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z" fill={RGBToHex(heroColor)}/>
          </svg>
        }
        <span>{`Цвет ${game.settingsHero?.side === "right" ? 'правого' : ''}${game.settingsHero?.side === "left" ? 'левого' : ''} героя:`}</span>
        <span className={s.color} style={{backgroundColor: RGBToHex(heroColor)}}></span>
      </p>
      <div className={s.value}>
        <span className={s.color} style={{backgroundColor: `#${(+heroColor.r).toString(16).padStart(2, "0")}0000`}}></span>
        <input className={s.input} type="range" min={0} max={255} value={heroColor.r} onChange={({target}) => setHColor({...heroColor, r: target.value})} />
      </div>
      <div className={s.value}>
        <span className={s.color} style={{backgroundColor: `#00${(+heroColor.g).toString(16).padStart(2, "0")}00`}}></span>
        <input className={s.input} type="range" min={0} max={255} value={heroColor.g} onChange={({target}) => setHColor({...heroColor, g: target.value})} />
      </div>
      <div className={s.value}>
        <span className={s.color} style={{backgroundColor: `#0000${(+heroColor.b).toString(16).padStart(2, "0")}`}}></span>
        <input className={s.input} type="range" min={0} max={255} value={heroColor.b} onChange={({target}) => setHColor({...heroColor, b: target.value})} />
      </div>
    </div>
  )
}