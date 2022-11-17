import styled from 'styled-components';

const StyledLangSwitcher = styled.div`
  .btn {
    display: block;
    margin: 0;
    padding: 0;

    font: inherit;
    text-align: center;

    appearance: none;
    border: none;
    background-color: transparent;

    cursor: pointer;
  }

  .lang-switch-btn {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;

    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    color: #ffffff;

    background-color: #2563eb;
    border-radius: 50%;
  }
`;

export default StyledLangSwitcher;
