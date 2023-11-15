import { configureStore } from '@reduxjs/toolkit';
import pageReducer from '../features/page.slice';
import filterReducer from '../features/filter.slice';

export const store = configureStore({
  reducer: {
    page: pageReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
