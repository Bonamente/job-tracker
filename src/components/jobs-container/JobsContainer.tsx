/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Job from 'src/components/job/Job';
import Loading from 'src/components/loading/Loading';
import Pagination from 'src/components/pagination/Pagination';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux-hooks';
import { getAllJobs } from 'src/features/all-jobs/allJobsThunks';
import StyledJobsContainer from './StyledJobsContainer';

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
