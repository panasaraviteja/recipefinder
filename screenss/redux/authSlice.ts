import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      state.user = action.payload; // Save name/email/password
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;

      if (state.user && state.user.email === email && state.user.password === password) {
        state.token = "fake-jwt-token-" + Date.now(); // Generate fake token
        state.isLoggedIn = true;
      } else {
        throw new Error("Invalid credentials");
      }
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
