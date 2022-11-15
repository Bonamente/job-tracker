import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import type { JobState } from '../../types';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { clearValues } from '../shared-actions';
import { createJob, deleteJob, editJob } from './jobThunks';

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
      state: JobState,
      action: PayloadAction<{ name: K; value: JobState[K] }>
    ) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearValues, () => {
        return {
          ...initialState,
          jobLocation: getUserFromLocalStorage()?.location || '',
        };
      })
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

export const { handleChange, setEditJob } = jobSlice.actions;

export default jobSlice.reducer as Reducer<typeof initialState>;
