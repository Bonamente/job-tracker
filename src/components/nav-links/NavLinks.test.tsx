import { renderWithProviders, screen } from 'src/test/test-utils';
import { vi } from 'vitest';
import initI18n from 'src/utils/i18n';

import NavLinks from './NavLinks';

describe('MainPage', () => {
  beforeAll(() => {
    initI18n();
  });

  it('renders NavLinks', () => {
    const toggle = vi.fn();

    renderWithProviders(<NavLinks toggleSidebar={toggle} />);

    expect(screen.getByRole('link', { name: /stats/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /all jobs/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /add job/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
  });

  it('calls the toggle callback handler', async () => {
    const toggle = vi.fn();

    const { user } = renderWithProviders(<NavLinks toggleSidebar={toggle} />);

    await user.click(screen.getByRole('link', { name: /add job/i }));

    expect(toggle).toHaveBeenCalled();
  });
});
