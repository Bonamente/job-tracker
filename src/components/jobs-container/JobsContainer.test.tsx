import { renderWithProviders, screen, waitFor } from 'src/test/test-utils';
import { vi } from 'vitest';
import initI18n from 'src/utils/i18n';
import { setupServer } from 'msw/node';
import handlers from 'src/test/server-handlers';
import * as reduxHooks from 'react-redux';

import JobsContainer from './JobsContainer';

const allJobs = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
};

vi.mock('react-redux');
const mockedSelector = vi.spyOn(reduxHooks, 'useSelector');

describe('JobsContainer', () => {
  beforeAll(() => {
    initI18n();
  });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders JobsContainer with jobs', () => {
    const server = setupServer(...handlers);
    server.listen();

    renderWithProviders(<JobsContainer />);

    waitFor(() => {
      expect(
        screen.findByRole('heading', { name: /14 jobs found/i })
      ).toBeInTheDocument();
    });

    waitFor(() => {
      expect(
        screen.findByRole('button', { name: /prev/i })
      ).toBeInTheDocument();
    });

    server.resetHandlers();
    server.close();
  });

  it('renders JobsContainer without jobs', () => {
    mockedSelector.mockReturnValue(allJobs);
    renderWithProviders(<JobsContainer />);

    waitFor(() => {
      expect(
        screen.findByRole('heading', {
          name: /there are no jobs to display\./i,
        })
      ).toBeInTheDocument();
    });

    expect(
      screen.queryByRole('button', { name: /prev/i })
    ).not.toBeInTheDocument();

    mockedSelector.mockClear();
  });
});
