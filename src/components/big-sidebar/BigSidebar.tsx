import Logo from '../logo/Logo';
import NavLinks from '../nav-links/NavLinks';
import StyledBigSidebar from './StyledBigSidebar';
import { useAppSelector } from '../../hooks';

const BigSidebar = () => {
  const { isSidebarOpen } = useAppSelector((store) => store.user);

  return (
    <StyledBigSidebar>
      <div
        className={
          isSidebarOpen
            ? 'sidebar-container '
            : 'sidebar-container show-sidebar'
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </StyledBigSidebar>
  );
};

export default BigSidebar;
