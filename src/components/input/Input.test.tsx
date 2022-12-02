import { renderWithProviders, screen } from 'src/test/test-utils';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import initI18n from 'src/utils/i18n';

import Input from './Input';

describe('Input', () => {
  beforeAll(() => {
    initI18n();
  });

  const labelText = 'Status';

  it('renders Input component', () => {
    const onChange = vi.fn();

    renderWithProviders(
      <Input name="test" value="" type="text" handleChange={onChange} />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders label text passed as a prop', () => {
    const onChange = vi.fn();

    renderWithProviders(
      <Input
        labelText={labelText}
        name="test"
        value=""
        type="text"
        handleChange={onChange}
      />
    );

    expect(
      screen.getByLabelText(/status/i, { selector: 'input' })
    ).toBeInTheDocument();
  });

  it('calls the onChange callback handler', async () => {
    const onChange = vi.fn();

    renderWithProviders(
      <Input name="some" value="" type="text" handleChange={onChange} />
    );

    await userEvent.type(screen.getByRole('textbox'), 'Abracadabra');

    expect(onChange).toHaveBeenCalledTimes(11);
  });
});
