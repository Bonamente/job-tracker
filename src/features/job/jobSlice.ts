/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  JobState,
  Job,
  FetchedJob,
  State,
  CustomFetchError,
} from '../../types';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import customFetch from '../../utils/axios';

import { showLoading, hideLoading } from '../all-jobs/allJobsSlice';
import { getAllJobs } from '../all-jobs/allJobsThunks';

// THUNKS are defined in this file because of the circular dependency (clearValues).
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

const initialState: JobState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: <K extends keyof JobState>(
      state: {
        [x: string]:
          | string
          | boolean
          | ['full-time', 'part-time', 'remote', 'internship']
          | ['interview', 'declined', 'pending'];
      },
      action: PayloadAction<{ name: K; value: JobState[K] }>
    ) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job Created');
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job Modified');
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteJob.fulfilled, (_, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, (_, { payload }) => {
        toast.error(payload);
      });
  },
});

export const { clearValues, handleChange, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
