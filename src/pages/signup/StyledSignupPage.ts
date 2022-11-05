import styled from 'styled-components';

const StyledSignupPage = styled.main`
  display: grid;
  align-items: center;

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }

  .form {
    max-width: 400px;

    background-color: ${(props) => props.theme.secondaryBackground};
    border-top: 5px solid var(--primary-500);
  }

  h1 {
    text-align: center;
  }

  p {
    margin: 0;
    margin-top: 1rem;

    text-align: center;
  }

  .btn {
    margin-top: 1rem;
  }

  .member-btn {
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);

    background: transparent;
    border: transparent;
  }
`;

export default StyledSignupPage;
