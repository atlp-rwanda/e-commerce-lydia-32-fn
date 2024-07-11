// src/slices/searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchTerm: string;
  minPrice: string;
  maxPrice: string;
  category: string;
}

const initialState: SearchState = {
  searchTerm: '',
  minPrice: '',
  maxPrice: '',
  category: '',
};
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    clearSearch: (state) => {
      return initialState;
    },
  },
});

export const { setSearchTerm, setMinPrice, setMaxPrice, setCategory, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;