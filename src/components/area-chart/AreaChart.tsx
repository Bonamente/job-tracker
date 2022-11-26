import { useTranslation } from 'react-i18next';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Application } from '../../types';

type AreaChartComponentProps = {
  data: Application[];
};

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="count"
          name={t('charts.count') as string}
          stroke="#1e3a8a"
          fill="#3b82f6"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
