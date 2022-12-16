import { renderWithProviders, screen } from 'src/test/test-utils';
import { vi } from 'vitest';
import initI18n from 'src/utils/i18n';
import * as reduxHooks from 'react-redux';
import * as thunks from 'src/features/user/userThunks';
import Profile from './Profile';

vi.mock('react-redux');
const mockedDispatch = vi.spyOn(reduxHooks, 'useDispatch');
const mockedUpdateUser = vi.spyOn(thunks, 'updateUser');

describe('Profile', () => {
  beforeAll(() => {
    initI18n();
  });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders Profile page', async () => {
    renderWithProviders(<Profile />);

    expect(
      screen.getByRole('heading', { name: /profile/i })
    ).toBeInTheDocument();
  });

  it(`invokes the dispatcher with the 'updateUser' thunk`, async () => {
    const dummyDispatch = vi.fn();
    mockedDispatch.mockReturnValue(dummyDispatch);
    const { user } = renderWithProviders(<Profile />);

    await user.type(screen.getAllByRole('textbox')[0], 'John'); // For some reason 'getByRole' does not work on this particular input field
    await user.type(screen.getByRole('textbox', { name: /last name/i }), 'Doe');
    await user.type(screen.getByRole('textbox', { name: /email/i }), '1@te.st');
    await user.type(screen.getByRole('textbox', { name: /location/i }), 'Moon');
    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(dummyDispatch).toHaveBeenCalled();
    expect(mockedUpdateUser).toHaveBeenCalledTimes(1);

    mockedDispatch.mockClear();
    mockedUpdateUser.mockClear();
  });
});
