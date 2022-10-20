import { Link } from 'react-router-dom';

import StyledNotFoundPage from './StyledNotFoundPage';
import img from '../../assets/images/not-found.svg';

const NotFoundPage = () => (
  <StyledNotFoundPage className="full-page">
    <main>
      <img src={img} alt="not found" />
      <h1>Sorry, Page Not Found</h1>
      <p>The page you requested could not be found</p>
      <Link to="/">back home</Link>
    </main>
  </StyledNotFoundPage>
);

export default NotFoundPage;
