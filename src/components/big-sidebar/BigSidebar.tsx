import { useAppSelector } from 'src/hooks/redux-hooks';
import Logo from 'src/components/logo/Logo';
import NavLinks from 'src/components/nav-links/NavLinks';
import StyledBigSidebar from './StyledBigSidebar';

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
