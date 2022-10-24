import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../utils/axios';
import { User, UserData, CustomFetchError } from '../../types';

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
