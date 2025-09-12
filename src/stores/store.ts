import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import favoritesReducer from "../features/favoritesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
