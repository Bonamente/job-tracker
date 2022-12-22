import { createAsyncThunk } from '@reduxjs/toolkit';

import type {
  User,
  UserData,
  CustomFetchError,
  FetchedUser,
  State,
} from 'src/types';
import customFetch from 'src/utils/axios';
import { unauthorizedError } from 'src/utils/toasts';

import {
  clearValues,
  clearAllJobsState,
  signOutUser,
} from 'src/features/shared-actions';

export const signUpUser = createAsyncThunk<
  UserData,
  User,
  { rejectValue: string }
>('user/signUpUser', async (user, thunkApi) => {
  try {
    const res = await customFetch.post('auth/register', user);
    return res.data;
  } catch (error) {
    const hasErrResponse = (error as CustomFetchError).response.data.msg;
    if (!hasErrResponse) {
      throw error;
    }

    return thunkApi.rejectWithValue(hasErrResponse);
  }
});

export const signInUser = createAsyncThunk<
  UserData,
  User,
  { rejectValue: string }
>('user/signInUser', async (user, thunkApi) => {
  try {
    const res = await customFetch.post('auth/login', user);
    return res.data;
  } catch (error) {
    const hasErrResponse = (error as CustomFetchError).response.data.msg;
    if (!hasErrResponse) {
      throw error;
    }

    return thunkApi.rejectWithValue(hasErrResponse);
  }
});

export const clearStore = createAsyncThunk(
  'user/clearStore',
  (message: string | undefined, thunkApi) => {
    try {
      thunkApi.dispatch(signOutUser(message));
      thunkApi.dispatch(clearAllJobsState());
      thunkApi.dispatch(clearValues());
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);

export const updateUser = createAsyncThunk<
  UserData,
  FetchedUser,
  { state: State; rejectValue: string }
>('user/updateUser', async (user, thunkApi) => {
  try {
    const res = await customFetch.patch('/auth/updateUser', user);
    return res.data;
  } catch (error) {
    const statusCode = (error as CustomFetchError).response.status;
    const hasErrResponse = (error as CustomFetchError).response.data.msg;

    if (statusCode === 401) {
      thunkApi.dispatch(clearStore());
      return thunkApi.rejectWithValue(unauthorizedError());
    }

    if (!hasErrResponse) {
      throw error;
    }

    return thunkApi.rejectWithValue(hasErrResponse);
  }
});
