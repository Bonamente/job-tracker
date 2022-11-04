/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import Job from '../job/Job';
import Loading from '../loading/Loading';
import StyledJobsContainer from './StyledJobsContainer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllJobs } from '../../features/all-jobs/allJobsThunks';

const JobsContainer = () => {
  const { jobs, isLoading } = useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (jobs.length === 0) {
    return (
      <StyledJobsContainer>
        <h2>There are no jobs to display.</h2>
      </StyledJobsContainer>
    );
  }

  return (
    <StyledJobsContainer>
      <h2>Jobs info</h2>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
    </StyledJobsContainer>
  );
};

export default JobsContainer;
