import { renderWithProviders, screen } from 'src/test/test-utils';
import { vi } from 'vitest';
import initI18n from 'src/utils/i18n';

import Navbar from './Navbar';

describe('Navbar', () => {
  beforeAll(() => {
    initI18n();
  });

  it('renders Navbar', () => {
    const onChange = vi.fn();

    renderWithProviders(<Navbar switchTheme={onChange} />);

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
