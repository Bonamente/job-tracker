import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import jobReducer from './features/job/jobSlice';

export const store = configureStore({
  reducer: {
    job: jobReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
