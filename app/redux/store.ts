import { configureStore } from '@reduxjs/toolkit';
import permissionReducer from './permissionSlice';
import getTokenReducer from './getToken';
const store = configureStore({
  reducer: {
    permissions: permissionReducer,
    getToken: getTokenReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
