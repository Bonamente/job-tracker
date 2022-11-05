import { Link } from 'react-router-dom';

import { Logo } from '../../components';
import ThemeSwitcher from '../../components/theme-switcher/ThemeSwitcher';
import StyledMainPage from './StyledMainPage';
import heroImage from '../../assets/images/main.svg';

type MainPageProps = {
  switchTheme: () => void;
};

const MainPage: React.FC<MainPageProps> = ({ switchTheme }) => (
  <StyledMainPage>
    <header>
      <nav>
        <Logo />
        <ThemeSwitcher changeTheme={switchTheme} />
      </nav>
    </header>

    <main className="container page">
      <div className="info">
        <h1>
          job <span>tracking</span> app
        </h1>

        <p>
          The purpose of this app is to make the job search process more
          convenient. Add jobs that you have applied for, track the progress of
          each of them, and watch monthly statistics on the number of
          applications submitted.
        </p>
        <p>
          <b>Happy job hunting!</b>
        </p>

        <Link to="/signup" className="btn btn-hero" type="button">
          Sign in / Sign up
        </Link>
      </div>

      <img className="img main-img" src={heroImage} alt="hero-img" />
    </main>
  </StyledMainPage>
);

export default MainPage;
