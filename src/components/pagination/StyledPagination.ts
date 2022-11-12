import styled from 'styled-components';

const StyledPagination = styled.section`
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;
  height: 6rem;
  margin-top: 2rem;

  .btn-container {
    background-color: var(--primary-100);
    border-radius: var(--borderRadius);
  }

  .pageBtn {
    width: 50px;
    height: 40px;

    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-500);

    background-color: transparent;
    border-color: transparent;
    border-radius: var(--borderRadius);

    transition: var(--transition);

    cursor: pointer;
  }

  .active {
    color: var(--white);
    background-color: var(--primary-500);
  }

  .prev-btn,
  .next-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100px;
    height: 40px;

    color: var(--primary-500);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);

    background-color: var(--white);
    border-color: transparent;
    border-radius: var(--borderRadius);

    transition: var(--transition);

    cursor: pointer;
  }

  .prev-btn:hover,
  .next-btn:hover {
    color: var(--white);
    background-color: var(--primary-500);
  }
`;

export default StyledPagination;
