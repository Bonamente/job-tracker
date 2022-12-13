import { renderWithProviders, screen } from 'src/test/test-utils';
import { vi } from 'vitest';
import initI18n from 'src/utils/i18n';
import * as reduxHooks from 'react-redux';
import * as actions from 'src/features/all-jobs/allJobsSlice';
import Pagination from './Pagination';

vi.mock('react-redux');
const mockedDispatch = vi.spyOn(reduxHooks, 'useDispatch');

describe('Pagination', () => {
  beforeAll(() => {
    initI18n();
  });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders Pagination', () => {
    renderWithProviders(<Pagination />);

    expect(
      screen.getByRole('heading', { name: /pagination/i })
    ).toBeInTheDocument();
  });

  it(`clicking the 'prev' or the 'next' button invokes the dispatcher with the 'changePage' action`, async () => {
    const dummyDispatch = vi.fn();
    const mockedChangePage = vi.spyOn(actions, 'changePage');
    mockedDispatch.mockReturnValue(dummyDispatch);
    const { user } = renderWithProviders(<Pagination />);

    await user.click(screen.getByRole('button', { name: /prev/i }));
    expect(dummyDispatch).toHaveBeenCalled();
    expect(mockedChangePage).toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(dummyDispatch).toHaveBeenCalled();
    expect(mockedChangePage).toHaveBeenCalled();

    mockedDispatch.mockClear();
  });
});
