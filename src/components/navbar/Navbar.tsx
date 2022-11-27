import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';

import Logo from '../logo/Logo';
import StyledNavbar from './StyledNavbar';
import LangSwitcher from '../lang-switcher/LangSwitcher';
import ThemeSwitcher from '../theme-switcher/ThemeSwitcher';

import useOutsideClick from '../../hooks/useOutsideClick';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { toggleSidebar } from '../../features/user/userSlice';
import { clearStore } from '../../features/user/userThunks';

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

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  const handleClick = () => setShowSignOut(!showSignOut);
  const ref = useOutsideClick(showSignOut, handleClick);

  return (
    <StyledNavbar>
      <div className="nav-center">
        <button className="toggle-btn" type="button" onClick={toggle}>
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
            >
              <FaUserCircle />
              {user?.name}
              <FaCaretDown />
            </button>
            <div
              className={showSignOut ? 'dropdown show-dropdown' : 'dropdown'}
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
