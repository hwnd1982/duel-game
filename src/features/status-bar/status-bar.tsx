import { useEffect, useState } from 'react';
import s from './status-bar.module.scss';
import { RootState } from '../../app';
import { useDispatch, useSelector } from 'react-redux';
import { switchGame } from '../../entities';

export const StatusBar = () => {
  const [hitsLeftHero, setHitsLeftHero] = useState(0);
  const [hitsRightHero, setHitsRightHero] = useState(0);
  const incHitsLeftHero = () => setHitsLeftHero(hitsLeftHero + 1);
  const incHitsRightHero = () => setHitsRightHero(hitsRightHero + 1);
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    game.controller.setHitsCounters([incHitsLeftHero, incHitsRightHero]);
  });

  return (
    <div className={s.status}>
        <p className={s.counter}>{hitsLeftHero}</p>
        <button type='button' className={s.button} onClick={() => dispatch(switchGame())}>
          {(game.status === 'pause' || game.status === 'stop') &&
            <svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 512 512">
              <path fill="#3C66B1" d="M256,0c-38.961,0-85.921,14.775-85.921,14.775C70.956,50.084,0,144.756,0,256  c0,141.385,114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,462.352c-113.965,0-206.352-92.387-206.352-206.352  S142.035,49.648,256,49.648S462.352,142.035,462.352,256S369.965,462.352,256,462.352z"/>
              <circle fill="#52A2E7" cx="256" cy="256" r="221.978"/>
              <g>
                <path fillOpacity={0.22} fill="#3C66B1" d="M404.465,47.428   c29.859,41.873,47.427,93.116,47.427,148.464c0,141.385-114.615,256-256,256c-55.348,0-106.592-17.568-148.465-47.427   C93.842,469.555,169.963,512,256,512c141.385,0,256-114.615,256-256C512,169.963,469.555,93.842,404.465,47.428z"/>
                <polygon fill="#3C66B1" points="213.706,178.212 213.706,141.108 372.298,250.017 213.706,358.925 213.706,246.997  "/>
              </g>
            </svg>
          }
          {game.status === 'play' && 
            <svg xmlns="http://www.w3.org/2000/svg" height="50" width="50"viewBox="0 0 512 512">
              <path fill="#3C66B1" d="M256,0c-38.961,0-85.921,14.775-85.921,14.775C70.956,50.084,0,144.756,0,256  c0,141.385,114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,462.352c-113.965,0-206.352-92.387-206.352-206.352  S142.035,49.648,256,49.648S462.352,142.035,462.352,256S369.965,462.352,256,462.352z"/>
              <circle fill="#52A2E7" cx="256" cy="256" r="221.978"/>
              <g>
                <path fillOpacity={0.22} fill="#3C66B1" d="M404.465,47.428   c29.859,41.873,47.427,93.116,47.427,148.464c0,141.385-114.615,256-256,256c-55.348,0-106.592-17.568-148.465-47.427   C93.842,469.555,169.963,512,256,512c141.385,0,256-114.615,256-256C512,169.963,469.555,93.842,404.465,47.428z"/>
                <polygon fill="#3C66B1" points="169.273,185.992 169.273,155.342 229.878,155.342 229.878,351.086 169.273,351.086    169.273,253.213  "/>
                <polygon fill="#3C66B1" points="277.223,275.853 277.223,155.342 337.827,155.342 337.827,351.086 277.223,351.086    277.223,338.111  "/>
              </g>
            </svg>
          }
        </button>
        <p className={s.counter}>{hitsRightHero}</p>
      </div>
  )
}