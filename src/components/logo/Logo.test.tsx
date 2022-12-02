import { renderWithProviders, screen } from 'src/test/test-utils';

import Logo from './Logo';

describe('Logo', () => {
  it('renders Logo component', () => {
    renderWithProviders(<Logo />);

    const logo = screen.getByAltText(/logo/i);

    expect(logo).toBeInTheDocument();
  });
});
