/* eslint-disable react/jsx-key */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';

import heroImage from 'src/assets/images/main.svg';
import { Logo, LangSwitcher, ThemeSwitcher } from 'src/components';
import StyledMainPage from './StyledMainPage';

type MainPageProps = {
  switchTheme: () => void;
};

const MainPage: React.FC<MainPageProps> = ({ switchTheme }) => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const handleLangChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    localStorage.setItem('currentLang', lng);
  };

  return (
    <StyledMainPage>
      <header>
        <nav>
          <Logo />
          <div className="user-controls main-user-controls">
            <ThemeSwitcher changeTheme={switchTheme} />
            <LangSwitcher
              currentLang={currentLang}
              changeLang={handleLangChange}
            />
          </div>
        </nav>
      </header>

      <main className="container page">
        <div className="info">
          <h1>
            <Trans i18nKey="titles.main_page" components={[<span />]} />
          </h1>

          <p>{t('mainPage.description')}</p>
          <p>
            <b>{t('mainPage.wish_text')}</b>
          </p>

          <Link to="/signup" className="btn btn-hero" type="button">
            {t('buttons.login')}
          </Link>
        </div>

        <img className="img main-img" src={heroImage} alt="hero-img" />
      </main>
    </StyledMainPage>
  );
};

export default MainPage;
