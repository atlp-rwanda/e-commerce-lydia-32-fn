import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userInfo = localStorage.getItem('userInfo');
const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

const initialState = {
  userInfo: parsedUserInfo
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getCredentials(state, action: PayloadAction<string>) {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logOut(state) {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    }
  }
});

export const { getCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
