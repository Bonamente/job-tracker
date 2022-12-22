import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import img from 'src/assets/images/not-found.svg';
import StyledNotFoundPage from './StyledNotFoundPage';

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
