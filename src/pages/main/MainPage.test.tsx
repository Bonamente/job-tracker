import { renderWithProviders, screen } from 'src/test/test-utils';
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
});
