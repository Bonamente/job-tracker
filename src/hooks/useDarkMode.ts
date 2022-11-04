import { useLayoutEffect, useState } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [isMounted, setIsMounted] = useState(false);

  const setMode = (mode: 'dark' | 'light') => {
    localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const switchTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useLayoutEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    }

    setIsMounted(true);
  }, []);

  return { theme, switchTheme, isMounted };
};

export default useDarkMode;
