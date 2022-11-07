import { ReactElement } from 'react';
import StyledStatsItem from './StyledStatsItem';

type StatsItemProps = {
  count: number;
  title: string;
  icon: ReactElement;
  color: string;
  bgColor: string;
};

const StatsItem: React.FC<StatsItemProps> = ({
  count,
  title,
  icon,
  color,
  bgColor,
}) => (
  <StyledStatsItem color={color} bgColor={bgColor}>
    <header>
      <span className="count">{count}</span>
      <span className="icon">{icon}</span>
    </header>
    <h3 className="title">{title}</h3>
  </StyledStatsItem>
);

export default StatsItem;
