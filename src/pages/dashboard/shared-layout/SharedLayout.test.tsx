import { renderWithProviders } from 'src/test/test-utils';
import initI18n from 'src/utils/i18n';
import SharedLayout from './SharedLayout';

describe('SharedLayout', () => {
  beforeAll(() => {
    initI18n();
  });

  it('renders SharedLayout', () => {
    const { container } = renderWithProviders(
      <SharedLayout switchTheme={() => {}} />
    );

    expect(container).toMatchSnapshot();
  });
});
