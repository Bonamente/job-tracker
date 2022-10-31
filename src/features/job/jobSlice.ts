import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { JobState, Job, State, CustomFetchError } from '../../types';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import customFetch from '../../utils/axios';

// THUNKS are defined in this file because of the circular dependency (clearValues).
export const createJob = createAsyncThunk<
  Job, // replace with FetchedJob { Job + _id, createdBy, createdAt, updatedAt }
  Job,
  {
    state: State;
    rejectValue: string;
  }
>('job/createJob', async (job, thunkApi) => {
  try {
    const res = await customFetch.post('/jobs', job, {
      headers: {
        authorization: `Bearer ${thunkApi.getState().user.user?.token}`,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
      });
  },
});

export const { clearValues, handleChange } = jobSlice.actions;
export default jobSlice.reducer;
