import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../utils/axios';
import { CustomFetchError, FetchedJob, FetchedStats } from '../../types';

type FetchedJobs = {
  jobs: FetchedJob[] | [];
  totalJobs: number;
  numOfPages: number;
};

export const getAllJobs = createAsyncThunk<
  FetchedJobs,
  void,
  { rejectValue: string }
>('allJobs/getJobs', async (_, thunkApi) => {
  const url = `/jobs`;

  try {
    const res = await customFetch.get(url);
    return res.data;
  } catch (error) {
    const hasErrResponse = (error as CustomFetchError).response.data.msg;
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
    const hasErrResponse = (error as CustomFetchError).response.data.msg;
    if (!hasErrResponse) {
      throw error;
    }

    return thunkApi.rejectWithValue(hasErrResponse);
  }
});
