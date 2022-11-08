/* eslint-disable react/no-array-index-key */
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

import StyledStatsContainer from './StyledStatsContainer';
import StatsItem from '../stats-item/StatsItem';
import { useAppSelector } from '../../hooks/redux-hooks';

const StatsContainer = () => {
  const { stats } = useAppSelector((store) => store.allJobs);

  const defaultStats = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bgColor: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bgColor: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bgColor: '#ffeeee',
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
