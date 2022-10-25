import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAppSelector((store) => store.user);

  if (!user) {
    return <Navigate to="/main" />;
  }

  return children;
};

export default ProtectedRoute;
