import { useState, useRef, useEffect, useCallback } from 'react';

// Custom hook for scroll-triggered animations
const useScrollAnimation = (sectionId, threshold = 0.2, rootMargin = '0px 0px -50px 0px', triggerOnce = false) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!triggerOnce || !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            setIsVisible(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, sectionId, triggerOnce]);

  const triggerAnimation = useCallback((delay) => {
    if (triggerOnce && hasTriggeredRef.current) return;

    hasTriggeredRef.current = true;
    setIsVisible(false);
    if (ref.current) {
      ref.current.offsetHeight;
    }
    setTimeout(() => setIsVisible(true), delay);
  }, [triggerOnce]);

  // Listen for navigation events
  useEffect(() => {
    const handleNavigation = (event) => {
      const targetSectionId = event.detail?.sectionId;

      if (sectionId === targetSectionId) {
        triggerAnimation(100);
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    };

    const handleScrollToSection = (event) => {
      const targetSectionId = event.detail?.sectionId;

      if (sectionId === targetSectionId) {
        triggerAnimation(50);
      }
    };

    const handleHashChange = () => {
      const currentHash = window.location.hash.substring(1);

      if (sectionId === currentHash) {
        triggerAnimation(100);
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    };

    // Also check on mount in case we're already on the right hash
    const currentHash = window.location.hash.substring(1);
    if (sectionId === currentHash) {
      triggerAnimation(100);
    }

    window.addEventListener('navigateToSection', handleNavigation);
    window.addEventListener('scrollToSection', handleScrollToSection);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('navigateToSection', handleNavigation);
      window.removeEventListener('scrollToSection', handleScrollToSection);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [sectionId, triggerOnce, triggerAnimation]);

  return [ref, isVisible];
};

export default useScrollAnimation;
