import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const roleInfo = localStorage.getItem('roleInfo');
const parsedRoleInfo = roleInfo ? JSON.parse(roleInfo) : [];

const initialState = {
  roleInfo: Array.isArray(parsedRoleInfo) ? parsedRoleInfo : []
};

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRoleInfo(state, action: PayloadAction<any[]>) {
      state.roleInfo = action.payload;
      localStorage.setItem('roleInfo', JSON.stringify(action.payload));
    }
  }
});

export const { setRoleInfo } = roleSlice.actions;
export default roleSlice.reducer;