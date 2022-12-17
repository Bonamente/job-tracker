import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from 'src/test/test-utils';
import initI18n from 'src/utils/i18n';
import { setupServer } from 'msw/node';
import handlers from 'src/test/server-handlers';
import { EMAIL, PASSWORD } from 'src/test/test-data';
import App from 'src/App';
import { setupStore } from './store';

const server = setupServer(...handlers);

const setup = (jsx: React.ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

describe('App', () => {
  beforeAll(() => {
    initI18n();
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('full app rendering/navigating', async () => {
    const history = createMemoryHistory();

    const { user } = setup(
      <HistoryRouter history={history}>
        <Provider store={setupStore()}>
          <App />
        </Provider>
      </HistoryRouter>
    );

    // Renders the main page
    expect(
      screen.getByRole('heading', { name: /job tracking app/i })
    ).toBeInTheDocument();

    // Users from the main page can navigate to the signup page
    await user.click(screen.getByRole('link', { name: /sign in \/ sign up/i }));

    // Authorized user is redirected to the dashboard page
    await user.type(screen.getByLabelText(/email/i), EMAIL);
    await user.type(screen.getByLabelText(/password/i), PASSWORD);
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /sign in/i }));
    });
    await waitForElementToBeRemoved(() =>
      screen.getByRole('button', { name: /loading.../i })
    );
    act(() => {
      history.push('/');
    });

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();

    // Renders the all-jobs page
    act(() => {
      history.push('/all-jobs');
    });

    expect(
      screen.getByRole('heading', { name: /search form/i })
    ).toBeInTheDocument();

    // Renders the add-job page
    act(() => {
      history.push('/add-job');
    });

    expect(
      screen.getByRole('heading', { name: /add job/i })
    ).toBeInTheDocument();

    // Renders the profile page
    act(() => {
      history.push('/profile');
    });

    expect(
      screen.getByRole('heading', { name: /profile/i })
    ).toBeInTheDocument();
  });

  test('landing on a bad page', async () => {
    const history = createMemoryHistory();
    history.push('/some/bad/route');

    const { user } = setup(
      <HistoryRouter history={history}>
        <Provider store={setupStore()}>
          <App />
        </Provider>
      </HistoryRouter>
    );

    expect(
      screen.getByText(/the page you requested could not be found/i)
    ).toBeInTheDocument();

    // Users can go away from the NotFound page
    await act(async () => {
      await user.click(screen.getByRole('link', { name: /back home/i }));
    });

    expect(
      screen.getByRole('heading', { name: /job tracking app/i })
    ).toBeInTheDocument();
  });
});
