import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MealPreview = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

interface FavoritesState {
  meals: MealPreview[];
}

const initialState: FavoritesState = {
  meals: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<MealPreview>) => {
      const exists = state.meals.find(m => m.idMeal === action.payload.idMeal);
      if (!exists) state.meals.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.meals = state.meals.filter(m => m.idMeal !== action.payload);
    },
    clearFavorites: (state) => {
      state.meals = [];
    },
    setFavorites: (state, action: PayloadAction<MealPreview[]>) => {
      state.meals = action.payload; // overwrite with provided list
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
