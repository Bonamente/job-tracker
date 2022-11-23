import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import StyledNotFoundPage from './StyledNotFoundPage';
import img from '../../assets/images/not-found.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <StyledNotFoundPage className="full-page">
      <main>
        <img src={img} alt="not found" />
        <h1>{t('titles.not_found')}</h1>
        <p>{t('notFound.text')}</p>
        <Link to="/">{t('notFound.link')}</Link>
      </main>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;
