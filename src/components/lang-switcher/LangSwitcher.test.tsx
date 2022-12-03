import { renderWithProviders, screen } from 'src/test/test-utils';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import initI18n from 'src/utils/i18n';

import LangSwitcher from './LangSwitcher';

describe('LangSwitcher', () => {
  beforeAll(() => {
    initI18n();
  });

  it('renders LangSwitcher component', () => {
    const onChange = vi.fn();
    const lang = 'en';

    renderWithProviders(
      <LangSwitcher currentLang={lang} changeLang={onChange} />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls the onChange callback handler & renders LangSwitcher with different text content', async () => {
    const onChange = vi.fn();
    const lang = 'en';

    renderWithProviders(
      <LangSwitcher currentLang={lang} changeLang={onChange} />
    );

    const langSwitchBtn = screen.getByRole('button');

    expect(langSwitchBtn).toHaveTextContent(/en/i);

    await userEvent.click(langSwitchBtn);

    expect(onChange).toHaveBeenCalled();
    expect(langSwitchBtn).toHaveTextContent(/ru/i);
  });
});
