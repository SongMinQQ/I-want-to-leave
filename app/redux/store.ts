import { configureStore } from '@reduxjs/toolkit';
import permissionReducer from './permissionSlice';

const store = configureStore({
  reducer: {
    permissions: permissionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
