import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { EventElement, JobState } from 'src/types';
import { Input, Select } from 'src/components';
import StyledDashboardForm from 'src/styles/StyledDashboardForm';

import { useAppDispatch, useAppSelector } from 'src/hooks/redux-hooks';
import { clearValues } from 'src/features/shared-actions';
import { handleChange } from 'src/features/job/jobSlice';
import { createJob, editJob } from 'src/features/job/jobThunks';

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
  const { t } = useTranslation();

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

  const handleInputChange = (e: React.SyntheticEvent) => {
    const target = e.target as EventElement;
    const name = target.name as keyof JobState;
    const { value } = target;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error(t('toasts.all_fields'));
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
        <h2>{isEditing ? t('titles.edit_job') : t('titles.add_job')}</h2>
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
              {t('buttons.clear')}
            </button>
            <button
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
              type="submit"
            >
              {t('buttons.save')}
            </button>
          </div>
        </div>
      </form>
    </StyledDashboardForm>
  );
};

export default AddJob;
