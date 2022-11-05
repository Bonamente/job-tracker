import styled from 'styled-components';

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--nav-height);

  background-color: ${(props) => props.theme.primaryBackground};
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);

  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }

  .nav-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90vw;
  }

  .toggle-btn {
    display: flex;
    align-items: center;

    font-size: 1.75rem;
    color: var(--primary-500);

    background-color: transparent;
    border-color: transparent;

    cursor: pointer;
  }

  .btn-container {
    position: relative;
  }

  .btn {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;

    box-shadow: var(--shadow-2);
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;

    width: 100%;
    padding: 0.5rem;

    text-align: center;

    background-color: var(--primary-100);
    box-shadow: var(--shadow-2);
    border-radius: var(--borderRadius);

    visibility: hidden;
  }

  .show-dropdown {
    visibility: visible;
  }

  .dropdown-btn {
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;

    background-color: transparent;
    border-color: transparent;

    cursor: pointer;
  }

  .logo-text {
    display: none;
    margin: 0;

    font-size: 1.953rem;
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }

    .logo {
      display: none;
    }

    .logo-text {
      display: block;
    }
  }
`;

export default StyledNavbar;
