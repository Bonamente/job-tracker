import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';

import StyledThemeSwitcher from './StyledThemeSwitcher';

type ThemeSwitcherProps = {
  changeTheme: () => void;
};

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ changeTheme }) => {
  const { name } = useContext(ThemeContext);
  const [isLight, setIsLight] = useState(name === 'light');
  const { t } = useTranslation();

  const currentMode = `${t('theme.activate')} ${
    isLight ? t('theme.dark') : t('theme.light')
  } ${t('theme.mode')}`;

  const handleClick = () => {
    setIsLight(!isLight);
    changeTheme();
  };

  return (
    <StyledThemeSwitcher>
      <button
        className="theme-switch-btn btn"
        aria-label={currentMode}
        title={currentMode}
        type="button"
        onClick={handleClick}
      >
        {isLight ? (
          <BsSunFill style={{ color: '#000000' }} />
        ) : (
          <BsFillMoonFill style={{ color: '#ffffff' }} />
        )}
      </button>
    </StyledThemeSwitcher>
  );
};

export default ThemeSwitcher;
