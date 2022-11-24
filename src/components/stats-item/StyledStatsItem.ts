import styled from 'styled-components';

type StyledStatsItemProps = {
  color: string;
  bgColor: string;
};

const StyledStatsItem = styled.article<StyledStatsItemProps>`
  padding: 2rem;

  background-color: ${(props) => props.theme.secondaryBackground};
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .count {
    display: block;

    font-size: 50px;
    font-weight: 700;
    color: ${(props) => props.color};
  }

  .title {
    margin: 0;
    margin-top: 0.5rem;

    text-align: left;
    letter-spacing: var(--letterSpacing);
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 60px;

    background-color: ${(props) => props.bgColor};
    border-radius: var(--borderRadius);

    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
`;

export default StyledStatsItem;
