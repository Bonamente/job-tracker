import styled from 'styled-components';

const StyledSharedLayout = styled.div`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }

  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;

    background-color: ${(props) => props.theme.dashboardBackground};
  }

  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }

    .dashboard-page {
      width: 90%;
    }
  }
`;

export default StyledSharedLayout;
