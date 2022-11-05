import { Outlet } from 'react-router-dom';

import { Navbar, BigSidebar, SmallSidebar } from '../../../components';
import StyledSharedLayout from './StyledSharedLayout';

type SharedLayoutProps = {
  switchTheme: () => void;
};

const SharedLayout: React.FC<SharedLayoutProps> = ({ switchTheme }) => {
  return (
    <StyledSharedLayout>
      <div className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar switchTheme={switchTheme} />
          <main className="dashboard-page">
            <Outlet />
          </main>
        </div>
      </div>
    </StyledSharedLayout>
  );
};

export default SharedLayout;
