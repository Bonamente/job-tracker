import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import links from './links';

type NavLinksProps = {
  toggleSidebar?: () => void;
};

const NavLinks: React.FC<NavLinksProps> = ({ toggleSidebar }) => {
  const { t } = useTranslation();

  return (
    <nav className="nav-links">
      {links.map(({ text, path, id, icon }) => (
        <NavLink
          key={id}
          to={path}
          end
          className={({ isActive }) => {
            return isActive ? 'nav-link active' : 'nav-link';
          }}
          onClick={toggleSidebar}
        >
          <span className="icon">{icon}</span>
          {t(`links.${text}`)}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavLinks;
