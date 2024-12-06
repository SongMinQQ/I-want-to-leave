import { configureStore } from '@reduxjs/toolkit';
import permissionReducer from './permissionSlice';

const store = configureStore({
  reducer: {
    permissions: permissionReducer,
  },
});

export default store;
