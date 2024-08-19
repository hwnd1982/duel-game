import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../../entities/game/gameSlice";

const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredPaths: ["game.controller", "game.settingsHero"],
  },
};

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(defaultMiddlewareConfig),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
