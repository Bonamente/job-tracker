import styled from 'styled-components';

const StyledJobsContainer = styled.section`
  margin-top: 4rem;

  h2 {
    text-transform: none;
  }

  & > h3 {
    font-weight: 700;
  }

  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }

  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default StyledJobsContainer;
