import styled from 'styled-components';

const StyledNotFoundPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  img {
    display: block;
    width: 90vw;
    max-width: 600px;
    margin-bottom: 2rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 0.5rem;

    color: var(--grey-500);
  }

  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

export default StyledNotFoundPage;
