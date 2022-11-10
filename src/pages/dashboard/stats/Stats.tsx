/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { Loading, ChartsContainer, StatsContainer } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { getStats } from '../../../features/all-jobs/allJobsThunks';

const Stats = () => {
  const { isLoading, monthlyApplications } = useAppSelector(
    (store) => store.allJobs
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStats());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
