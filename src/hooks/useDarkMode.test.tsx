import { renderHook, act } from '@testing-library/react';
import useDarkMode from './useDarkMode';

describe('useDarkMode', () => {
  it(`exposes the variables 'theme', 'isMounted' and the switchTheme function.`, () => {
    const { result } = renderHook(useDarkMode);

    expect(result.current.theme).toBe('light');
    expect(result.current.isMounted).toBeTruthy();

    act(() => result.current.switchTheme());
    expect(result.current.theme).toBe('dark');
    console.log(result);
  });
});
