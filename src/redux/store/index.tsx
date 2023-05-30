import {configureStore} from '@reduxjs/toolkit';
import blogSlice from '../slices/blogSlice';
import saveItemsSlice from '../slices/saveSlice';

export const store = configureStore({
  reducer: {
    blogSlice: blogSlice,
    saveItemsSlice: saveItemsSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;
