import { renderWithProviders, screen } from 'src/test/test-utils';
import { vi } from 'vitest';
import initI18n from 'src/utils/i18n';
import * as reduxHooks from 'react-redux';
import SmallSidebar from './SmallSidebar';

vi.mock('react-redux');
const mockedDispatch = vi.spyOn(reduxHooks, 'useDispatch');

describe('SmallSidebar', () => {
  beforeAll(() => {
    initI18n();
  });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders SmallSidebar', () => {
    renderWithProviders(<SmallSidebar />);

    expect(
      screen.getByRole('button', { name: /close the pop-up navigation menu/i })
    ).toBeInTheDocument();
  });

  it('clicking the close button invokes the dispatcher', async () => {
    const dummyDispatch = vi.fn();
    mockedDispatch.mockReturnValue(dummyDispatch);
    const { user } = renderWithProviders(<SmallSidebar />);

    await user.click(
      screen.getByRole('button', { name: /close the pop-up navigation menu/i })
    );

    expect(dummyDispatch).toHaveBeenCalled();

    mockedDispatch.mockClear();
  });
});
