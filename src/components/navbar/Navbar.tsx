import { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';

import Logo from '../logo/Logo';
import StyledNavbar from './StyledNavbar';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleSidebar } from '../../features/user/userSlice';

const Navbar = () => {
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
          <h3 className="logo-text">dashboard</h3>
        </div>
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
              // onClick={() => {}} // TODO clear data
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
