import { useEffect } from 'react';

import { Loading, ChartsContainer, StatsContainer } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux-hooks';
import { getStats } from 'src/features/all-jobs/allJobsThunks';

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
