import { useEffect, useRef } from 'react';

const useOutsideClick = (isElementShown: boolean, callback: () => void) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = (event: globalThis.MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLElement) &&
        isElementShown
      ) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref, isElementShown]);

  return ref;
};

export default useOutsideClick;
