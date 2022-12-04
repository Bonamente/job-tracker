import { renderWithProviders, screen } from 'src/test/test-utils';
import { vi } from 'vitest';
import initI18n from 'src/utils/i18n';

import Select from './Select';

describe('Input', () => {
  beforeAll(() => {
    initI18n();
  });

  const list = ['all', 'interview', 'declined', 'pending'];
  const labelText = 'Status';

  it('renders Select component', () => {
    const onChange = vi.fn();

    renderWithProviders(
      <Select name="test" value="" list={list} handleChange={onChange} />
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders label text passed as a prop', () => {
    const onChange = vi.fn();

    renderWithProviders(
      <Select
        labelText={labelText}
        name="test"
        value=""
        list={list}
        handleChange={onChange}
      />
    );

    expect(
      screen.getByLabelText(/status/i, { selector: 'select' })
    ).toBeInTheDocument();
  });

  it('should display the correct number of options', () => {
    const onChange = vi.fn();

    renderWithProviders(
      <Select name="test" value="" list={list} handleChange={onChange} />
    );

    expect(screen.getAllByRole('option').length).toBe(4);
  });

  it('default option has been selected', () => {
    const onChange = vi.fn();

    renderWithProviders(
      <Select name="test" value="" list={list} handleChange={onChange} />
    );

    const defaultOption = screen.getByRole<HTMLOptionElement>('option', {
      name: /all/i,
    });

    expect(defaultOption.selected).toBe(true);
  });

  it('calls the onChange callback handler', async () => {
    const onChange = vi.fn();

    const { user } = renderWithProviders(
      <Select name="some" value="" list={list} handleChange={onChange} />
    );

    await user.selectOptions(screen.getByRole('combobox'), 'declined');

    expect(onChange).toHaveBeenCalled();
  });
});
