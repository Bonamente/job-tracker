import styled from 'styled-components';

const StyledDashboardForm = styled.section`
  width: 100%;
  padding: 3rem 2rem 4rem;

  background-color: ${(props) => props.theme.secondaryBackground};
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);

  h2 {
    margin-top: 0;

    font-size: 1.953rem;
  }

  .form {
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0;

    background-color: ${(props) => props.theme.secondaryBackground};
    border-radius: 0;
    box-shadow: none;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }

  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;

    margin-top: 0.5rem;

    button {
      height: 35px;
    }
  }

  .clear-btn {
    background-color: var(--grey-500);
  }

  .clear-btn:hover {
    background-color: var(--black);
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }

    .btn-container {
      margin-top: 0;
    }
  }

  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .form-center button {
      margin-top: 0;
    }
  }
`;

export default StyledDashboardForm;
