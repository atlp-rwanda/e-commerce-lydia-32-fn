import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const permissionInfo = localStorage.getItem('permissionInfo');
const parsedPermissionInfo = permissionInfo ? JSON.parse(permissionInfo) : [];

const initialState = {
  permissionInfo: Array.isArray(parsedPermissionInfo) ? parsedPermissionInfo : []
};

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setPermissionInfo(state, action: PayloadAction<any[]>) {
      state.permissionInfo = action.payload;
      localStorage.setItem('permissionInfo', JSON.stringify(action.payload));
    }
  }
});

export const { setPermissionInfo } = permissionSlice.actions;
export default permissionSlice.reducer;