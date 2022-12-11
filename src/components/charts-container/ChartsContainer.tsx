import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AreaChart from '../area-chart/AreaChart';
import BarChart from '../bar-chart/BarChart';
import StyledChartsContainer from './StyledChartsContainer';
import { useAppSelector } from '../../hooks/redux-hooks';

const ChartsContainer = () => {
  const { t } = useTranslation();
  const { monthlyApplications: data } = useAppSelector(
    (store) => store.allJobs
  );
  const [isBarChart, setIsBarChart] = useState(true);
  const currentBarType = isBarChart ? t('charts.area') : t('charts.bar');
  const btnTitle = `${t('charts.show')} ${currentBarType} ${t('charts.chart')}`;

  return (
    <StyledChartsContainer>
      <h3>{t('titles.charts')}</h3>
      <button
        title={btnTitle}
        type="button"
        onClick={() => setIsBarChart(!isBarChart)}
      >
        {isBarChart ? t('charts.bar_chart') : t('charts.area_chart')}
      </button>
      {isBarChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </StyledChartsContainer>
  );
};

export default ChartsContainer;
