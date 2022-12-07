import { renderWithProviders, screen } from 'src/test/test-utils';
import initI18n from 'src/utils/i18n';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  beforeAll(() => {
    initI18n();
  });

  it('renders NotFoundPage', () => {
    renderWithProviders(<NotFoundPage />);

    expect(
      screen.getByRole('heading', { name: /sorry, page not found/i })
    ).toBeInTheDocument();
  });
});
