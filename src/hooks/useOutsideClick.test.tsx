import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useOutsideClick from './useOutsideClick';

describe('useOutsideClick', () => {
  it('exposes a ref object and works as intended', async () => {
    let isElementShown = false;
    const handleClick = () => {
      isElementShown = !isElementShown;
    };

    const { result } = renderHook(() =>
      useOutsideClick(isElementShown, handleClick)
    );

    render(
      <button type="button" ref={result.current} onClick={handleClick}>
        Click me
      </button>
    );

    await userEvent.click(screen.getByRole('button'));
    expect(isElementShown).toBeTruthy();
  });
});
