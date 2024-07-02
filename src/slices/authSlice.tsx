import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userInfo: {
    email: string;
    token: string;
  } | null;
}

// Load userInfo from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;

const initialState: AuthState = {
  userInfo: userInfoFromStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getCredentials: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { getCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;