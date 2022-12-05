import {
  renderWithRouter,
  renderWithProviders,
  screen,
} from 'src/test/test-utils';

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

  it(`click on 'Back Home' button changes route properly`, async () => {
    const { router, user } = renderWithRouter(
      '/some/bad/route',
      <NotFoundPage />
    );

    expect(router.state.location.pathname).toEqual('/some/bad/route');

    await user.click(screen.getByRole('link', { name: /back home/i }));

    expect(router.state.location.pathname).toEqual('/');
  });
});
