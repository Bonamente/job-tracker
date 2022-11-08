/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { Input, Select } from '../../../components';
import StyledDashboardForm from '../../../styles/StyledDashboardForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import {
  clearValues,
  handleChange,
  createJob,
  editJob,
} from '../../../features/job/jobSlice';
import { JobState } from '../../../types';

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useAppSelector((store) => store.job);

  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isEditing) {
      dispatch(
        handleChange({
          name: 'jobLocation',
          value: user?.location || '',
        })
      );
    }
  }, []);

  type EventElement = HTMLInputElement | HTMLSelectElement;

  const handleInputChange = (e: React.SyntheticEvent) => {
    const target = e.target as EventElement;
    const name = target.name as keyof JobState;
    const { value } = target;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error('please fill out all fields');
      return;
    }

    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }

    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  return (
    <StyledDashboardForm>
      <form className="form">
        <h2>{isEditing ? 'edit job' : 'add job'}</h2>
        <div className="form-center">
          <Input
            type="text"
            name="position"
            value={position}
            handleChange={handleInputChange}
          />
          <Input
            type="text"
            name="company"
            value={company}
            handleChange={handleInputChange}
          />
          <Input
            type="text"
            name="jobLocation"
            labelText="job location"
            value={jobLocation}
            handleChange={handleInputChange}
          />
          <Select
            name="status"
            value={status}
            list={statusOptions}
            handleChange={handleInputChange}
          />
          <Select
            name="jobType"
            labelText="job type"
            value={jobType}
            list={jobTypeOptions}
            handleChange={handleInputChange}
          />

          <div className="btn-container">
            <button
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
              type="button"
            >
              clear
            </button>
            <button
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
              type="submit"
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </StyledDashboardForm>
  );
};

export default AddJob;
