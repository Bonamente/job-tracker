import { NavLink } from 'react-router-dom';

import links from './links';

type NavLinksProps = {
  toggleSidebar?: () => void;
};

const NavLinks: React.FC<NavLinksProps> = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map(({ text, path, id, icon }) => (
        <NavLink
          key={id}
          to={path}
          className={({ isActive }) => {
            return isActive ? 'nav-link active' : 'nav-link';
          }}
          onClick={toggleSidebar}
        >
          <span className="icon">{icon}</span>
          {text}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
