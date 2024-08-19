import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameConrtoller } from "./game";
import { Hero } from "../hero";

export type GameStatus = "pause" | "play" | "stop";

export interface GameState {
  status: GameStatus;
  controller: GameConrtoller;
  settingsHero: Hero | null;
}

const initialState: GameState = {
  status: "stop",
  controller: new GameConrtoller(),
  settingsHero: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    playGame: state => {
      state.controller.play();
      state.status = "play";
    },
    pauseGame: state => {
      state.controller.pause();
      state.status = "pause";
    },
    switchGame: state => {
      const hero = state.controller.heroies.find(hero => hero.highlighting) || null;

      switch (state.status) {
        case "stop":
        case "pause":
          if (!hero) {
            state.controller.play();
            state.status = "play";
          }
          break;
        case "play":
          state.controller.pause();
          state.status = "pause";
          break;
      }

      state.settingsHero = hero;
    },
    setHeroSpeed: (state, action: PayloadAction<number>) => {
      state.settingsHero?.setSpeed(action.payload);
    },
    setHeroColor: (state, action: PayloadAction<string>) => {
      state.settingsHero?.setColor(action.payload);
    },
    setFireballRate: (state, action: PayloadAction<number>) => {
      state.settingsHero?.setFireballRate(action.payload);
    },
    setFireballColor: (state, action: PayloadAction<string>) => {
      state.settingsHero?.setFireballColor(action.payload);
    },
    closeSettings: state => {
      state.settingsHero = null;
      state.status = "play";
      state.controller.play();
    },
  },
});

export const {
  playGame,
  pauseGame,
  switchGame,
  closeSettings,
  setHeroSpeed,
  setHeroColor,
  setFireballRate,
  setFireballColor,
} = gameSlice.actions;

export default gameSlice.reducer;
