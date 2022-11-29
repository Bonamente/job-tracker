import styled from 'styled-components';

const StyledJob = styled.article`
  display: grid;
  grid-template-rows: 1fr auto;

  background-color: ${(props) => props.theme.secondaryBackground};
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);

  header {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    padding: 1rem 1.5rem;

    border-bottom: 1px solid var(--grey-100);

    h3 {
      letter-spacing: 0;
    }
  }

  .main-icon {
    display: grid;
    place-items: center;
    width: 60px;
    height: 60px;
    margin-right: 2rem;

    font-size: 1.5rem;
    font-weight: 700;
    color: var(--white);
    text-transform: uppercase;

    background-color: var(--primary-500);
    border-radius: var(--borderRadius);
  }

  .info {
    h3 {
      margin-bottom: 0.25rem;
    }

    p {
      margin: 0;

      color: var(--grey-400);
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
    }
  }

  .pending {
    color: #e9b949;
    background-color: #fcefc7;
  }

  .interview {
    color: #647acb;
    background-color: #e0e8f9;
  }

  .declined {
    color: #d66a6a;
    background-color: #ffeeee;
  }

  .content {
    padding: 1rem 1.5rem;
  }

  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;

    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }

    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    max-width: 160px;
    height: 30px;
    margin-top: 0.5rem;

    letter-spacing: var(--letterSpacing);
    text-align: center;

    border-radius: var(--borderRadius);
  }

  footer {
    margin-top: 1rem;
  }

  .edit-btn,
  .delete-btn {
    height: 30px;
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
  }

  .edit-btn {
    margin-right: 0.5rem;
    color: var(--green-dark);
    background-color: var(--green-light);
  }

  .delete-btn {
    color: var(--red-dark);
    background-color: var(--red-light);
  }

  &:hover .actions {
    visibility: visible;
  }
`;

export default StyledJob;
