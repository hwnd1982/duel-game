import { createSlice } from "@reduxjs/toolkit";
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
    closeSettings: state => {
      state.settingsHero = null;
      state.status = "play";
      state.controller.play();
    },
  },
});

export const { playGame, pauseGame, switchGame, closeSettings } = gameSlice.actions;

export default gameSlice.reducer;
