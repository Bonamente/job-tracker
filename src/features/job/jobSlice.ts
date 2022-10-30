import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';

import { JobState } from '../../types';
// import { getUserFromLocalStorage } from '../../utils/localStorage';

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
      };
    },
  },
});

export const { clearValues, handleChange } = jobSlice.actions;

export default jobSlice.reducer;
