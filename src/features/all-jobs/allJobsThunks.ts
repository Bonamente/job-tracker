import { createAsyncThunk } from '@reduxjs/toolkit';

import customFetch from '../../utils/axios';
import { State, CustomFetchError } from '../../types';

type FetchedJob = {
  _id: string;
  company: string;
  createdAt: string;
  jobLocation: string;
  jobType: string;
  position: string;
  status: string;
};

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

export const anotherThunk = () => {}; // TODO
