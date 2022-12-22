/* eslint-disable react/no-array-index-key */
import { useTranslation } from 'react-i18next';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

import { useAppSelector } from 'src/hooks/redux-hooks';

import StatsItem from 'src/components/stats-item/StatsItem';
import StyledStatsContainer from './StyledStatsContainer';

const StatsContainer = () => {
  const { t } = useTranslation();
  const { stats } = useAppSelector((store) => store.allJobs);

  const defaultStats = [
    {
      title: t('stats.pending'),
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#ffef00',
      bgColor: 'transparent',
    },
    {
      title: t('stats.interviews'),
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#0bda51',
      bgColor: 'transparent',
    },
    {
      title: t('stats.declined'),
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#ff6961',
      bgColor: 'transparent',
    },
  ];

  return (
    <StyledStatsContainer>
      {defaultStats.map((item, idx) => (
        <StatsItem key={idx} {...item} />
      ))}
    </StyledStatsContainer>
  );
};

export default StatsContainer;
