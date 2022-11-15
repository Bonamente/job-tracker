import { createAction } from '@reduxjs/toolkit';

// These actions are defined in a separate module to avoid circular dependency errors.

export const signOutUser = createAction<string | undefined>('user/signOutUser');

export const clearValues = createAction<undefined>('job/clearValues');

export const clearAllJobsState = createAction<undefined>(
  'allJobs/clearAllJobsState'
);
