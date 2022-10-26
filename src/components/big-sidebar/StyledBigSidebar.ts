import styled from 'styled-components';

const StyledBigSidebar = styled.aside`
  display: none;

  @media (min-width: 992px) {
    display: block;

    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);

    .sidebar-container {
      width: 250px;
      height: 100%;
      min-height: 100vh;
      margin-left: -250px;

      background-color: var(--white);

      transition: var(--transition);
    }

    .content {
      position: sticky;
      top: 0;
    }

    .show-sidebar {
      margin-left: 0;
    }

    header {
      display: flex;
      align-items: center;
      height: 6rem;
      padding-left: 2.5rem;
    }

    .nav-links {
      display: flex;
      flex-direction: column;
      padding-top: 2rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      padding: 1rem 0;
      padding-left: 2.5rem;

      color: var(--grey-500);
      text-transform: capitalize;

      transition: var(--transition);
    }

    .nav-link:hover {
      padding-left: 3rem;

      color: var(--grey-900);

      background-color: var(--grey-50);
    }

    .nav-link:hover .icon {
      color: var(--primary-500);
    }

    .icon {
      display: grid;
      place-items: center;
      margin-right: 1rem;

      font-size: 1.5rem;

      transition: var(--transition);
    }

    .active {
      color: var(--grey-900);
    }

    .active .icon {
      color: var(--primary-500);
    }
  }
`;

export default StyledBigSidebar;
