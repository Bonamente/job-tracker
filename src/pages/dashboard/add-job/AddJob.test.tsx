import { renderWithProviders, screen } from 'src/test/test-utils';
import { vi } from 'vitest';
import initI18n from 'src/utils/i18n';
import { setupServer } from 'msw/node';
import handlers from 'src/test/server-handlers';
import * as reduxHooks from 'react-redux';
import * as actions from 'src/features/job/jobSlice';
import * as sharedActions from 'src/features/shared-actions';
import * as thunks from 'src/features/job/jobThunks';
import AddJob from './AddJob';

vi.mock('react-redux');
const mockedDispatch = vi.spyOn(reduxHooks, 'useDispatch');
const mockedHandleChange = vi.spyOn(actions, 'handleChange');
const mockedClearValues = vi.spyOn(sharedActions, 'clearValues');
const mockedCreateJob = vi.spyOn(thunks, 'createJob');

describe('AddJob', () => {
  beforeAll(() => {
    initI18n();
  });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    mockedDispatch.mockClear();
    mockedCreateJob.mockClear();
    mockedHandleChange.mockClear();
    mockedClearValues.mockClear();
  });

  it('renders AddJob page', () => {
    renderWithProviders(<AddJob />);

    expect(
      screen.getByRole('heading', { name: /add job/i })
    ).toBeInTheDocument();
  });

  it(`invokes the dispatcher with the 'handleChange' action`, async () => {
    const dummyDispatch = vi.fn();
    mockedDispatch.mockReturnValue(dummyDispatch);
    const { user } = renderWithProviders(<AddJob />);

    await user.type(screen.getByRole('textbox', { name: /position/i }), 'test');
    expect(dummyDispatch).toHaveBeenCalled();
    expect(mockedHandleChange).toHaveBeenCalled();
  });

  it(`invokes the dispatcher with the 'clearValues' action`, async () => {
    const dummyDispatch = vi.fn();
    mockedDispatch.mockReturnValue(dummyDispatch);
    const { user } = renderWithProviders(<AddJob />);

    await user.click(screen.getByRole('button', { name: /clear/i }));
    expect(dummyDispatch).toHaveBeenCalled();
    expect(mockedClearValues).toHaveBeenCalled();
  });

  it(`invokes the dispatcher with the 'createJob' thunk`, async () => {
    const server = setupServer(...handlers);
    server.listen();
    const { user } = renderWithProviders(<AddJob />);

    await user.type(screen.getByRole('textbox', { name: /position/i }), 'test');
    await user.type(screen.getByRole('textbox', { name: /company/i }), 'test');
    await user.type(
      screen.getByRole('textbox', { name: /job location/i }),
      'test'
    );

    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(mockedCreateJob).toHaveBeenCalled();

    server.resetHandlers();
    server.close();
  });
});
