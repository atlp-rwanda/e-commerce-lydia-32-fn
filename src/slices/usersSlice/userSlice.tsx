import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const usersInfo = localStorage.getItem('usersInfo');
const parsedUsersInfo = usersInfo ? JSON.parse(usersInfo) : [];

const initialState = {
  usersInfo: Array.isArray(parsedUsersInfo) ? parsedUsersInfo : []
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersInfo(state, action: PayloadAction<any[]>) {
      state.usersInfo = action.payload;
      localStorage.setItem('usersInfo', JSON.stringify(action.payload));
    }
  }
});

export const { setUsersInfo } = usersSlice.actions;
export default usersSlice.reducer;