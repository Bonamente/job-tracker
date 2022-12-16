import { setupServer } from 'msw/node';
import handlers from 'src/test/server-handlers';
import { renderWithProviders, screen, waitFor } from 'src/test/test-utils';
import initI18n from 'src/utils/i18n';
import AllJobs from './AllJobs';

const server = setupServer(...handlers);

describe('AllJobs', () => {
  beforeAll(() => {
    initI18n();
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders AllJobs page', async () => {
    renderWithProviders(<AllJobs />);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /14 jobs found/i })
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole('heading', { name: /search form/i })
    ).toBeInTheDocument();
  });
});
