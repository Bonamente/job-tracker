import { renderWithProviders } from 'src/test/test-utils';
import initI18n from 'src/utils/i18n';

import BarChartComponent from './BarChart';

describe('BarChartComponent', () => {
  beforeAll(() => {
    initI18n();
  });

  const data = [
    {
      date: 'Jan 2022',
      count: 15,
    },
  ];

  it('renders BarChartComponent', () => {
    const { container } = renderWithProviders(
      <BarChartComponent data={data} />
    );

    expect(
      container.getElementsByClassName('recharts-responsive-container')[0]
    ).toBeInTheDocument();
  });
});
