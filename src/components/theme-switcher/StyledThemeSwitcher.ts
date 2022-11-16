import styled from 'styled-components';

const StyledThemeSwitcher = styled.div`
  .btn {
    display: block;
    margin: 0;
    padding: 0;

    font: inherit;
    text-align: left;

    appearance: none;
    border: none;
    background-color: transparent;
    box-shadow: unset;

    cursor: pointer;
  }

  .theme-switch-btn {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;

    border-radius: 50%;
  }
`;

export default StyledThemeSwitcher;
