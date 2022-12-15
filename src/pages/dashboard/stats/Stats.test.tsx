import { renderWithProviders, screen, waitFor } from 'src/test/test-utils';
import { vi } from 'vitest';
import initI18n from 'src/utils/i18n';
import { setupServer } from 'msw/node';
import handlers from 'src/test/server-handlers';
import * as reduxHooks from 'react-redux';
import Stats from './Stats';

vi.mock('react-redux');
const mockedSelector = vi.spyOn(reduxHooks, 'useSelector');

describe('Stats page', () => {
  beforeAll(() => {
    initI18n();
  });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the Stats page with ChartsContainer', () => {
    const server = setupServer(...handlers);
    server.listen();

    renderWithProviders(<Stats />);

    waitFor(() => {
      expect(
        screen.findByRole('heading', { name: /interviews scheduled/i })
      ).toBeInTheDocument();
    });

    waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /monthly applications/i })
      ).toBeInTheDocument();
    });

    server.resetHandlers();
    server.close();
  });

  it('renders the Stats page without ChartsContainer if there are no monthly applications', () => {
    mockedSelector.mockReturnValue({
      isLoading: false,
      monthlyApplications: [],
    });

    renderWithProviders(<Stats />);

    waitFor(() => {
      expect(
        screen.findByRole('heading', { name: /interviews scheduled/i })
      ).toBeInTheDocument();
    });

    expect(
      screen.queryByRole('heading', { name: /monthly applications/i })
    ).not.toBeInTheDocument();

    mockedSelector.mockClear();
  });
});
