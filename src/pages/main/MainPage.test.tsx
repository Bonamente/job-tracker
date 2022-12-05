import {
  renderWithRouter,
  renderWithProviders,
  screen,
} from 'src/test/test-utils';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import initI18n from 'src/utils/i18n';

import MainPage from './MainPage';

describe('MainPage', () => {
  beforeAll(() => {
    initI18n();
  });

  it('renders MainPage', () => {
    const onChange = vi.fn();

    renderWithProviders(<MainPage switchTheme={onChange} />);

    expect(
      screen.getByRole('heading', { name: /job tracking app/i })
    ).toBeInTheDocument();
  });

  it(`click on 'Sign In / Sign Up' button changes route properly`, async () => {
    const onChange = vi.fn();
    const { router } = renderWithRouter(
      '/main',
      <MainPage switchTheme={onChange} />
    );

    expect(router.state.location.pathname).toEqual('/main');

    await userEvent.click(
      screen.getByRole('link', { name: /sign in \/ sign up/i })
    );

    expect(router.state.location.pathname).toEqual('/signup');
  });
});
