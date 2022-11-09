import { useState } from 'react';

import AreaChart from '../area-chart/AreaChart';
import BarChart from '../bar-chart/BarChart';
import StyledChartsContainer from './StyledChartsContainer';
import { useAppSelector } from '../../hooks/redux-hooks';

const ChartsContainer = () => {
  const { monthlyApplications: data } = useAppSelector(
    (store) => store.allJobs
  );
  const [isBarChart, setIsBarChart] = useState(true);
  const currentBarType = `Show ${isBarChart ? 'area' : 'bar'} chart`;

  return (
    <StyledChartsContainer>
      <h3>Monthly Applications</h3>
      <button
        aria-label={currentBarType}
        title={currentBarType}
        type="button"
        onClick={() => setIsBarChart(!isBarChart)}
      >
        {isBarChart ? 'Bar Chart' : 'Area Chart'}
      </button>
      {isBarChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </StyledChartsContainer>
  );
};

export default ChartsContainer;
