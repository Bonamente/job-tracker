import { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';

import Logo from '../logo/Logo';
import StyledNavbar from './StyledNavbar';
import ThemeSwitcher from '../theme-switcher/ThemeSwitcher';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { toggleSidebar } from '../../features/user/userSlice';
import { clearStore } from '../../features/user/userThunks';

type NavbarProps = {
  switchTheme: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ switchTheme }) => {
  const [showSignOut, setShowSignOut] = useState(false);
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <StyledNavbar>
      <div className="nav-center">
        <button className="toggle-btn" type="button" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h1 className="logo-text">dashboard</h1>
        </div>

        <ThemeSwitcher changeTheme={switchTheme} />

        <div className="btn-container">
          <button
            className="btn"
            type="button"
            onClick={() => setShowSignOut(!showSignOut)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showSignOut ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              className="dropdown-btn"
              type="button"
              onClick={() => dispatch(clearStore('Signing Out...'))}
            >
              sign out
            </button>
          </div>
        </div>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
