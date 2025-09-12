import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload; // ✅ store token
    },
    logout: (state) => {
      state.token = null; // ✅ clear token
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
