import styled from 'styled-components';

const StyledMainPage = styled.div`
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: var(--fluid-width);
    max-width: var(--max-width);
    height: var(--nav-height);
    margin: 0 auto;
  }

  .main-user-controls {
    min-width: 5rem;
  }

  .page {
    display: grid;
    align-items: center;
    min-height: calc(100vh - var(--nav-height));
  }

  h1 {
    font-weight: 700;

    span {
      color: var(--primary-500);
    }
  }

  .main-img {
    display: none;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }

    .main-img {
      display: block;
    }
  }
`;

export default StyledMainPage;
