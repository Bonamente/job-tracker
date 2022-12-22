import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from 'src/utils/axios';
import { unauthorizedError } from 'src/utils/toasts';
import { clearStore } from 'src/features/user/userThunks';

import type {
  CustomFetchError,
  FetchedJob,
  FetchedStats,
  State,
} from '../../types';

type FetchedJobs = {
  jobs: FetchedJob[] | [];
  totalJobs: number;
  numOfPages: number;
};

export const getAllJobs = createAsyncThunk<
  FetchedJobs,
  void,
  { state: State; rejectValue: string }
>('allJobs/getJobs', async (_, thunkApi) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkApi.getState().allJobs;

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

  if (search) {
    url += `&search=${search}`;
  }

  try {
    const res = await customFetch.get(url);
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

export const getStats = createAsyncThunk<
  FetchedStats,
  void,
  { rejectValue: string }
>('allJobs/getStats', async (_, thunkApi) => {
  try {
    const res = await customFetch.get('/jobs/stats');
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
