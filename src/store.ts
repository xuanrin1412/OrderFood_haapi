import { configureStore } from '@reduxjs/toolkit';
import formAuthReducer from '../src/features/FormAuth/formAuthSlice';

export const store = configureStore({
  reducer: {
    forms: formAuthReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
