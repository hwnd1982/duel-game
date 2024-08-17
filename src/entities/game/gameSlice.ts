import { createSlice } from "@reduxjs/toolkit";
import { GameConrtoller } from "./game";

export interface GameState {
  controller: GameConrtoller;
}

const initialState: GameState = {
  controller: new GameConrtoller(),
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    play: state => {
      state.controller.play();
    },
    pause: state => {
      state.controller.pause();
    },
  },
});

export const { play, pause } = gameSlice.actions;

export default gameSlice.reducer;
