import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decodeToken } from "./../../utils/cryptoUtils";

const userInfo = localStorage.getItem('userInfo');
const logState = localStorage.getItem('logState');


const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
const parsedLogState = logState ? decodeToken(logState) : null;

const initialState = {
  userInfo: parsedUserInfo,
  logState: parsedLogState,
};

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
      localStorage.removeItem('logState');
    },

  }
});

export const { getCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
