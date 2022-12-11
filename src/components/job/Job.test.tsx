import { renderWithProviders, screen } from 'src/test/test-utils';
import { vi } from 'vitest';
import initI18n from 'src/utils/i18n';
import * as reduxHooks from 'react-redux';
import * as actions from 'src/features/job/jobSlice';
import * as thunks from 'src/features/job/jobThunks';
import Job from './Job';

const jobData = {
  _id: '63760c829ab737777bc3e4ab',
  company: 'The White Forest Inn',
  position: 'Inn administrator',
  status: 'interview',
  jobType: 'full-time',
  jobLocation: 'The Outlands',
  createdBy: '636dd36b6096b0c86ecfce4e',
  createdAt: '2022-11-17T10:27:14.441Z',
  updatedAt: '2022-11-17T10:27:14.441Z',
};

vi.mock('react-redux');
const mockedDispatch = vi.spyOn(reduxHooks, 'useDispatch');

describe('Job', () => {
  beforeAll(() => {
    initI18n();
  });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders Job', () => {
    renderWithProviders(<Job {...jobData} />);

    expect(
      screen.getByRole('heading', { name: /inn administrator/i })
    ).toBeInTheDocument();
  });

  it('clicking the edit button invokes the dispatcher with the setEditJob action', async () => {
    const dummyDispatch = vi.fn();
    const mockedSetEditJob = vi.spyOn(actions, 'setEditJob');
    mockedDispatch.mockReturnValue(dummyDispatch);
    const { user } = renderWithProviders(<Job {...jobData} />);

    await user.click(screen.getByText(/edit/i));
    expect(dummyDispatch).toHaveBeenCalled();
    expect(mockedSetEditJob).toHaveBeenCalled();

    mockedDispatch.mockClear();
  });

  it('clicking the delete button invokes the dispatcher with the deleteJob thunk', async () => {
    const dummyDispatch = vi.fn();
    const mockedDeleteJob = vi.spyOn(thunks, 'deleteJob');
    mockedDispatch.mockReturnValue(dummyDispatch);
    const { user } = renderWithProviders(<Job {...jobData} />);

    await user.click(screen.getByText(/delete/i));
    expect(dummyDispatch).toHaveBeenCalled();
    expect(mockedDeleteJob).toHaveBeenCalledWith('63760c829ab737777bc3e4ab');

    mockedDispatch.mockClear();
  });
});
