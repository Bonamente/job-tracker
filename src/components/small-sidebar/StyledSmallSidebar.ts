import styled from 'styled-components';

const StyledSmallSidebar = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }

  .sidebar-container {
    position: fixed;
    z-index: -1;

    display: flex;
    align-items: center;
    justify-content: center;

    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0;

    transition: var(--transition);
  }

  .show-sidebar {
    z-index: 100;
    opacity: 1;
  }

  .content {
    position: relative;

    display: flex;
    align-items: center;
    flex-direction: column;
    width: var(--fluid-width);
    height: 95vh;
    padding: 4rem 2rem;

    background-color: ${(props) => props.theme.secondaryBackground};
    border-radius: var(--borderRadius);
  }

  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;

    font-size: 2rem;
    color: var(--red-dark);

    background-color: transparent;
    border-color: transparent;

    cursor: pointer;
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

    color: var(--grey-500);
    text-transform: capitalize;

    transition: var(--transition);
  }

  .nav-link:hover {
    color: ${(props) => props.theme.activeNavLinkColor};
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
    font-weight: bold;
    color: ${(props) => props.theme.activeNavLinkColor};
  }

  .active .icon {
    color: var(--primary-500);
  }
`;

export default StyledSmallSidebar;
