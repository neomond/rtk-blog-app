import {configureStore} from '@reduxjs/toolkit';
import blogSlice from '../slices/blogSlice';

export const store = configureStore({
  reducer: {
    blogSlice: blogSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;
