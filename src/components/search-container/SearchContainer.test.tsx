import { renderWithProviders, screen } from 'src/test/test-utils';
import initI18n from 'src/utils/i18n';

import SearchContainer from './SearchContainer';

describe('SearchContainer', () => {
  beforeAll(() => {
    initI18n();
  });

  it('renders SearchContainer', () => {
    renderWithProviders(<SearchContainer />);

    expect(
      screen.getByRole('heading', { name: /search form/i })
    ).toBeInTheDocument();
  });

  it('user can select options and clear filters', async () => {
    const { user } = renderWithProviders(<SearchContainer />);

    const defaultOption = screen.getByRole<HTMLOptionElement>('option', {
      name: /latest/i,
    });

    expect(defaultOption.selected).toBe(true);

    await user.selectOptions(
      screen.getByRole('combobox', { name: /sort/i }),
      'oldest'
    );

    expect(
      screen.getByRole<HTMLOptionElement>('option', {
        name: /oldest/i,
      }).selected
    ).toBe(true);

    expect(defaultOption.selected).toBe(false);

    await user.click(screen.getByRole('button', { name: /clear filters/i }));
    expect(defaultOption.selected).toBe(true);
  });
});
