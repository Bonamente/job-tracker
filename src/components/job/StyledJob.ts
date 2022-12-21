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
    overflow-x: hidden;

    h3 {
      margin-bottom: 0.25rem;
      word-break: break-all;
    }

    p {
      margin: 0;

      color: var(--grey-400);
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
    }
  }

  .pending,
  .interview,
  .declined {
    color: var(--dark);
  }

  .pending {
    background-color: #ffef00;
  }

  .interview {
    background-color: #0bda51;
  }

  .declined {
    background-color: #ff6961;
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

    outline: none;
    cursor: pointer;
  }

  .edit-btn {
    margin-right: 0.5rem;

    color: var(--dark);
    background-color: var(--green-light);

    &:hover,
    &:focus {
      background-color: var(--green-dark);
    }
  }

  .delete-btn {
    color: var(--dark);
    background-color: var(--red-light);

    &:hover,
    &:focus {
      background-color: var(--red-dark);
    }
  }

  &:hover .actions {
    visibility: visible;
  }
`;

export default StyledJob;
