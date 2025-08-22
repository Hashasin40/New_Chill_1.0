import { useMediaQuery } from 'react-responsive';

const useBreakpoint = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isSmallMobile = useMediaQuery({ maxWidth: 500 });
  const isTinyMobile = useMediaQuery({ maxWidth: 320 });

  return {
    isDesktop,
    isTablet,
    isMobile,
    isSmallMobile,
    isTinyMobile,
  };
};

export default useBreakpoint;
