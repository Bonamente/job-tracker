import { renderWithProviders } from 'src/test/test-utils';
import initI18n from 'src/utils/i18n';

import AreaChartComponent from './AreaChart';

describe('AreaChartComponent', () => {
  beforeAll(() => {
    initI18n();
  });

  const data = [
    {
      date: 'Jan 2022',
      count: 15,
    },
  ];

  it('renders AreaChartComponent', () => {
    const { container } = renderWithProviders(
      <AreaChartComponent data={data} />
    );

    expect(
      container.getElementsByClassName('recharts-responsive-container')[0]
    ).toBeInTheDocument();
  });
});
