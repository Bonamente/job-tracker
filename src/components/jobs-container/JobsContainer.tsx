/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Job from '../job/Job';
import Loading from '../loading/Loading';
import StyledJobsContainer from './StyledJobsContainer';
import Pagination from '../pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getAllJobs } from '../../features/all-jobs/allJobsThunks';

const JobsContainer = () => {
  const { t } = useTranslation();

  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppSelector((store) => store.allJobs);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading />;
  }

  if (jobs.length === 0) {
    return (
      <StyledJobsContainer>
        <h2>{t('titles.no_job')}</h2>
      </StyledJobsContainer>
    );
  }

  return (
    <StyledJobsContainer>
      <h2>{t('jobs_found.job', { count: totalJobs })}</h2>

      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>

      {numOfPages > 1 && <Pagination />}
    </StyledJobsContainer>
  );
};

export default JobsContainer;
