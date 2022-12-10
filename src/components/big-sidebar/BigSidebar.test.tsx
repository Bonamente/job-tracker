import { renderWithProviders } from 'src/test/test-utils';
import initI18n from 'src/utils/i18n';

import BigSidebar from './BigSidebar';

describe('BigSidebar', () => {
  beforeAll(() => {
    initI18n();
  });

  it('renders BigSidebar', () => {
    const { container } = renderWithProviders(<BigSidebar />);

    expect(
      container.getElementsByClassName('sidebar-container')[0]
    ).toBeInTheDocument();
  });
});
