import styled from 'styled-components';

const StyledJobInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;

  .icon {
    display: flex;
    align-items: center;
    margin-right: 1rem;

    font-size: 1rem;

    svg {
      color: var(--grey-400);
    }
  }

  .text {
    letter-spacing: var(--letterSpacing);
  }
`;
export default StyledJobInfo;
