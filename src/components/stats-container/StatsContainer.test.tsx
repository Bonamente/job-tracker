import { renderWithProviders, screen } from 'src/test/test-utils';
import initI18n from 'src/utils/i18n';
import StatsContainer from './StatsContainer';

describe('StatsContainer', () => {
  beforeAll(() => {
    initI18n();
  });

  it('renders StatsContainer', () => {
    renderWithProviders(<StatsContainer />);

    expect(
      screen.getByRole('heading', { name: /pending applications/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /interviews scheduled/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /jobs declined/i })
    ).toBeInTheDocument();
  });
});
