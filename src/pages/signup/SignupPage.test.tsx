import { setupServer } from 'msw/node';
import handlers from 'src/test/server-handlers';

import {
  renderWithProviders,
  screen,
  waitForElementToBeRemoved,
} from 'src/test/test-utils';

import { USERNAME, EMAIL, PASSWORD } from 'src/test/test-data';

import initI18n from 'src/utils/i18n';
import SignupPage from './SignupPage';

const server = setupServer(...handlers);

describe('SignupPage', () => {
  beforeAll(() => {
    initI18n();
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders SignupPage', () => {
    renderWithProviders(<SignupPage />);

    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  });

  it('users can switch between sign-in and sign-up forms', async () => {
    const { user } = renderWithProviders(<SignupPage />);

    expect(
      screen.getByRole('heading', { name: /sign in/i })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /sign up/i }));
    expect(
      screen.getByRole('heading', { name: /sign up/i })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /sign in/i }));
    expect(
      screen.getByRole('heading', { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it('submitting the form with empty fields returns an error message', async () => {
    const { user } = renderWithProviders(<SignupPage />);

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      /please fill out all fields/i
    );
  });

  it('sign-in form works properly', async () => {
    const { user } = renderWithProviders(<SignupPage />);

    await user.type(screen.getByLabelText(/email/i), EMAIL);
    await user.type(screen.getByLabelText(/password/i), PASSWORD);
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    await waitForElementToBeRemoved(() =>
      screen.getByRole('button', { name: /loading.../i })
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /welcome back, registered user!/i
    );
  });

  it('sign-up form works properly', async () => {
    const { user } = renderWithProviders(<SignupPage />);

    await user.click(screen.getByRole('button', { name: /sign up/i }));
    await user.type(screen.getByLabelText(/name/i), USERNAME);
    await user.type(screen.getByLabelText(/email/i), EMAIL);
    await user.type(screen.getByLabelText(/password/i), PASSWORD);
    await user.click(screen.getByRole('button', { name: /sign up/i }));
    await waitForElementToBeRemoved(() =>
      screen.getByRole('button', { name: /loading.../i })
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(/hi, user!/i);
  });
});
