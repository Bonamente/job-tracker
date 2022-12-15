import { renderWithProviders, screen } from 'src/test/test-utils';
import initI18n from 'src/utils/i18n';
import ChartsContainer from './ChartsContainer';

describe('ChartsContainer', () => {
  beforeAll(() => {
    initI18n();
  });

  it('renders ChartsContainer', () => {
    renderWithProviders(<ChartsContainer />);

    expect(
      screen.getByRole('heading', { name: /monthly applications/i })
    ).toBeInTheDocument();
  });

  it('users can select the type of chart', async () => {
    const { user } = renderWithProviders(<ChartsContainer />);

    expect(screen.getByRole('button')).toHaveTextContent(/bar chart/i);

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveTextContent(/area chart/i);
  });
});
