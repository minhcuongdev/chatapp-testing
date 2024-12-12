import { useEffect, useState } from 'react';

const breakpoints = {
  xs: '321px',
  sm1: '539px',
  sm2: '541px',
  sm3: '692px',
  md2: '1025px',
  md3: '1367px',
  lg2: '1921px',
  lg3: '2561px',
};

type MediaQueryType = keyof typeof breakpoints;

export const mediaQueryBreakpoints = {
  up(query: MediaQueryType) {
    return `(min-width: ${breakpoints[query]})`;
  },
  down(query: MediaQueryType) {
    return `(max-width: ${breakpoints[query]})`;
  },
};

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };

    // Initial check
    updateMatches();

    // Listen for changes in the media query
    const mediaQueryListener = () => {
      updateMatches();
    };
    mediaQuery.addEventListener('change', mediaQueryListener);

    // Clean up listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', mediaQueryListener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
