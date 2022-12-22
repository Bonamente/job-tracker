import { createAsyncThunk } from '@reduxjs/toolkit';

import type { Job, FetchedJob, State, CustomFetchError } from 'src/types';
import customFetch from 'src/utils/axios';

import { showLoading, hideLoading } from 'src/features/all-jobs/allJobsSlice';
import { getAllJobs } from 'src/features/all-jobs/allJobsThunks';
import { clearValues } from 'src/features/shared-actions';

export const createJob = createAsyncThunk<
  FetchedJob,
  Job,
  {
    state: State;
    rejectValue: string;
  }
>('job/createJob', async (job, thunkApi) => {
  try {
    const res = await customFetch.post('/jobs', job);
    thunkApi.dispatch(clearValues());
    return res.data;
  } catch (error) {
    const hasErrResponse = (error as CustomFetchError).response.data.msg;
    if (!hasErrResponse) {
      throw error;
    }

    return thunkApi.rejectWithValue(hasErrResponse);
  }
});

export const editJob = createAsyncThunk<
  FetchedJob,
  { jobId: string; job: Job },
  {
    state: State;
    rejectValue: string;
  }
>('job/editJob', async ({ jobId, job }, thunkApi) => {
  try {
    const res = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkApi.dispatch(clearValues());
    return res.data;
  } catch (error) {
    const hasErrResponse = (error as CustomFetchError).response.data.msg;
    if (!hasErrResponse) {
      throw error;
    }

    return thunkApi.rejectWithValue(hasErrResponse);
  }
});

export const deleteJob = createAsyncThunk<
  string,
  string,
  {
    state: State;
    rejectValue: string;
  }
>('job/deleteJob', async (jobId, thunkApi) => {
  thunkApi.dispatch(showLoading());
  try {
    const res = await customFetch.delete(`/jobs/${jobId}`);
    thunkApi.dispatch(getAllJobs());
    return res.data.msg;
  } catch (error) {
    thunkApi.dispatch(hideLoading());

    const hasErrResponse = (error as CustomFetchError).response.data.msg;
    if (!hasErrResponse) {
      throw error;
    }

    return thunkApi.rejectWithValue(hasErrResponse);
  }
});
