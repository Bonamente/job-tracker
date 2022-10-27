import { Outlet } from 'react-router-dom';

import { Navbar, BigSidebar, SmallSidebar } from '../../../components';
import StyledSharedLayout from './StyledSharedLayout';

const SharedLayout = () => {
  return (
    <StyledSharedLayout>
      <div className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <main className="dashboard-page">
            <Outlet />
          </main>
        </div>
      </div>
    </StyledSharedLayout>
  );
};

export default SharedLayout;
