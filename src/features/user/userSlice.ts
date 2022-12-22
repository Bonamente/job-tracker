import { createSlice, Reducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import type { UserState } from 'src/types';
import { error, greeting, userUpdated, welcomeBack } from 'src/utils/toasts';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from 'src/utils/localStorage';

import { signOutUser } from 'src/features/shared-actions';
import { signUpUser, signInUser, updateUser, clearStore } from './userThunks';

const initialState: UserState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signOutUser, (state, { payload }) => {
        state.user = null;
        state.isSidebarOpen = false;
        removeUserFromLocalStorage();

        if (payload) {
          toast.success(payload);
        }
      })
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(greeting(user.name));
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(welcomeBack(user.name));
      })
      .addCase(signInUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(userUpdated());
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error(error());
      });
  },
});

export const { toggleSidebar } = userSlice.actions;

export default userSlice.reducer as Reducer<typeof initialState>;
