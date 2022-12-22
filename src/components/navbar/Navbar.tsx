import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';

import useOutsideClick from 'src/hooks/useOutsideClick';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux-hooks';
import { toggleSidebar } from 'src/features/user/userSlice';
import { clearStore } from 'src/features/user/userThunks';

import Logo from 'src/components/logo/Logo';
import LangSwitcher from 'src/components/lang-switcher/LangSwitcher';
import ThemeSwitcher from 'src/components/theme-switcher/ThemeSwitcher';
import StyledNavbar from './StyledNavbar';

type NavbarProps = {
  switchTheme: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ switchTheme }) => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const [showSignOut, setShowSignOut] = useState(false);
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const handleLangChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    localStorage.setItem('currentLang', lng);
  };

  const togglerText = t('buttons.nav_menu');

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  const handleClick = () => setShowSignOut(!showSignOut);
  const ref = useOutsideClick(showSignOut, handleClick);

  return (
    <StyledNavbar>
      <div className="nav-center">
        <button
          className="toggle-btn"
          aria-label={togglerText}
          title={togglerText}
          type="button"
          onClick={toggle}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h1 className="logo-text">{t('titles.navbar')}</h1>
        </div>

        <div className="user-controls">
          <ThemeSwitcher changeTheme={switchTheme} />
          <LangSwitcher
            currentLang={currentLang}
            changeLang={handleLangChange}
          />

          <div className="btn-container">
            <button
              className="btn"
              type="button"
              ref={ref}
              onClick={handleClick}
              aria-expanded={showSignOut}
              aria-controls="dropdown"
            >
              <FaUserCircle />
              <span className="user-name">{user?.name}</span>
              <FaCaretDown />
            </button>
            <div
              className={showSignOut ? 'dropdown show-dropdown' : 'dropdown'}
              id="dropdown"
            >
              <button
                className="dropdown-btn"
                type="button"
                onClick={() =>
                  dispatch(clearStore(t('toasts.sign_out') as string))
                }
              >
                {t('buttons.logout')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
