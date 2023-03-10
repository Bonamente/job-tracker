import { renderWithProviders, screen } from 'src/test/test-utils';
import { vi } from 'vitest';
import initI18n from 'src/utils/i18n';

import ThemeSwitcher from './ThemeSwitcher';

describe('ThemeSwitcher', () => {
  beforeAll(() => {
    initI18n();
  });

  it('renders ThemeSwitcher component', () => {
    const onChange = vi.fn();

    renderWithProviders(<ThemeSwitcher changeTheme={onChange} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls the onChange callback handler', async () => {
    const onChange = vi.fn();

    const { user } = renderWithProviders(
      <ThemeSwitcher changeTheme={onChange} />
    );

    await user.click(screen.getByRole('button'));

    expect(onChange).toHaveBeenCalled();
  });
});
