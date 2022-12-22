import { useTranslation } from 'react-i18next';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Application } from 'src/types';

type BarChartComponentProps = {
  data: Application[];
};

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="10 10 " />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar
          dataKey="count"
          name={t('charts.count') as string}
          fill="#3b82f6"
          barSize={75}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
