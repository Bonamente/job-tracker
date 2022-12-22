import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import type { JobState } from 'src/types';
import { getUserFromLocalStorage } from 'src/utils/localStorage';
import { jobCreatedMsg, jobModifiedMsg, jobRemovedMsg } from 'src/utils/toasts';
import { clearValues } from 'src/features/shared-actions';
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
      state[name] =
        typeof value === 'string' ? (value.trimStart() as JobState[K]) : value;
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
        toast.success(jobCreatedMsg());
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
        toast.success(jobModifiedMsg());
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteJob.fulfilled, () => {
        toast.success(jobRemovedMsg());
      })
      .addCase(deleteJob.rejected, (_, { payload }) => {
        toast.error(payload);
      });
  },
});

export const { handleChange, setEditJob } = jobSlice.actions;

export default jobSlice.reducer as Reducer<typeof initialState>;
