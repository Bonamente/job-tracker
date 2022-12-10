import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';

import Logo from '../logo/Logo';
import NavLinks from '../nav-links/NavLinks';
import StyledSmallSidebar from './StyledSmallSidebar';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { toggleSidebar } from '../../features/user/userSlice';

const SmallSidebar = () => {
  const { isSidebarOpen } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <StyledSmallSidebar>
      <div
        className={
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className="content">
          <button
            className="close-btn"
            aria-label={t('buttons.close_popup') as string}
            type="button"
            onClick={toggle}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </StyledSmallSidebar>
  );
};

export default SmallSidebar;
