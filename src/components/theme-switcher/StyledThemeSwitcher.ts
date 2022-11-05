import styled from 'styled-components';

const StyledThemeSwitcher = styled.div`
  .btn {
    display: block;
    margin: 0;
    padding: 0;

    font: inherit;
    text-align: left;

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
    width: 40px;
    height: 32px;

    border-radius: 5px;
    opacity: 0.7;
  }
`;

export default StyledThemeSwitcher;
