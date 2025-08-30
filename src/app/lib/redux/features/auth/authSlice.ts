
// src/lib/redux/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the user object from Next-Auth session
interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

// Define a type for the slice state
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Define the initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the user on login/session restoration
    setUser: (state, action: PayloadAction<User | null>) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
      }
    },
    // Action to clear the user on logout
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
    },
    setAuthLoading: (state) => {
        state.status = 'loading';
    }
  },
});

// Export the actions
export const { setUser, clearAuth, setAuthLoading } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;